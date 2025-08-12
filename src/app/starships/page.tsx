"use client";

import { StarshipTable } from "@/components/StarshipTable";
import { SearchBar } from "@/components/SearchBar";
import { CompareModal } from "@/components/CompareModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCompare } from "@/hooks/useCompare";
import { useStarshipsWithPagination } from "@/hooks/useStarships";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/state/searchQueryAtom";
import { useState } from "react";

export default function StarshipsPage() {
    const { selectedStarships } = useCompare();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
    const { data: starshipsData, isLoading } = useStarshipsWithPagination(searchQuery);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Starships</h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        {selectedStarships.length > 0 && (
                            <button
                                onClick={openModal}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Compare ({selectedStarships.length})
                            </button>
                        )}
                    </div>
                </div>

                <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
                <StarshipTable
                    starships={starshipsData?.results || []}
                    isLoading={isLoading}
                    searchQuery={searchQuery}
                />

                <CompareModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
}
