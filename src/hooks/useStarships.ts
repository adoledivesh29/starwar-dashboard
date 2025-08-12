"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ApiResponse, Starship } from "@/lib/types";

// Hook to fetch only basic starships data (no details)
export function useBasicStarships() {
    return useQuery({
        queryKey: ["basic-starships"],
        queryFn: async (): Promise<Starship[]> => {
            const allStarships: Starship[] = [];
            let page = 1;
            let hasNext = true;

            while (hasNext) {
                const params = new URLSearchParams();
                params.append("page", page.toString());
                params.append("limit", "100"); // Fetch more per request to reduce API calls

                const response = await fetch(`https://swapi.tech/api/starships?${params}`);
                if (!response.ok) throw new Error("Failed to fetch starships");

                const data: ApiResponse<Starship> = await response.json();
                console.log("Basic starships data:", data.results);

                allStarships.push(...data.results);

                hasNext = !!data.next;
                page++;
            }

            return allStarships;
        },
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

// Hook for client-side pagination and search (using basic data only)
export function useStarshipsWithPagination(
    search?: string,
    page: number = 1,
    pageSize: number = 10
) {
    const { data: basicStarships, isLoading, isError, error } = useBasicStarships();

    const filteredAndPaginatedData = useMemo(() => {
        if (!basicStarships) return { results: [], totalRecords: 0, totalPages: 0 };

        // Apply search filter
        let filtered = basicStarships;
        if (search && search.trim()) {
            const searchLower = search.trim().toLowerCase();
            filtered = basicStarships.filter(starship =>
                starship.name.toLowerCase().includes(searchLower) ||
                starship.uid.toLowerCase().includes(searchLower)
            );
        }

        const totalRecords = filtered.length;
        const totalPages = Math.ceil(totalRecords / pageSize);

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = filtered.slice(startIndex, endIndex);

        return {
            results: paginatedResults,
            totalRecords,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        };
    }, [basicStarships, search, page, pageSize]);

    return {
        data: filteredAndPaginatedData,
        isLoading,
        isError,
        error,
        allStarships: basicStarships, // Expose basic data for other uses
    };
}

// Hook to fetch detailed starship information (only when needed)
export function useStarshipDetails(uid: string) {
    return useQuery({
        queryKey: ["starship-details", uid],
        queryFn: async () => {
            const response = await fetch(`https://swapi.tech/api/starships/${uid}`);
            if (!response.ok) throw new Error("Failed to fetch starship details");
            const data = await response.json();
            console.log("Fetched detailed data for starship:", uid, data);
            return data; // Return the entire response, not just data.result
        },
        enabled: !!uid,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
}

// Hook to fetch multiple starship details for comparison
export function useMultipleStarshipDetails(uids: string[]) {
    return useQuery({
        queryKey: ["multiple-starship-details", uids.sort().join(",")],
        queryFn: async () => {
            const detailsPromises = uids.map(async (uid) => {
                const response = await fetch(`https://swapi.tech/api/starships/${uid}`);
                if (!response.ok) throw new Error(`Failed to fetch details for starship ${uid}`);
                const data = await response.json();
                return data.result;
            });

            const results = await Promise.all(detailsPromises);
            console.log("Fetched details for comparison:", results);
            return results;
        },
        enabled: uids.length > 0,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
}

// Legacy hook for backward compatibility (deprecated)
export function useAllStarships() {
    console.warn("useAllStarships is deprecated. Use useBasicStarships instead for better performance.");
    return useBasicStarships();
}
