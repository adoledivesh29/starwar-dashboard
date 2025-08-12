"use client";

import { useAtom } from "jotai";
import { selectedStarshipsAtom } from "@/state/selectedStarshipsAtom";
import { StarshipDetails } from "@/lib/types";

export function useCompare() {
    const [selectedStarships, setSelectedStarships] = useAtom(selectedStarshipsAtom);

    const addStarship = (starship: StarshipDetails) => {
        if (selectedStarships.length >= 3) {
            throw new Error("Maximum 3 starships can be compared");
        }
        if (selectedStarships.find(s => s.name === starship.name)) {
            throw new Error("Starship already selected for comparison");
        }
        setSelectedStarships([...selectedStarships, starship]);
    };

    const removeStarship = (starshipName: string) => {
        setSelectedStarships(selectedStarships.filter(s => s.name !== starshipName));
    };

    const clearSelection = () => {
        setSelectedStarships([]);
    };

    const isSelected = (starshipName: string) => {
        return selectedStarships.some(s => s.name === starshipName);
    };

    return {
        selectedStarships,
        addStarship,
        removeStarship,
        clearSelection,
        isSelected,
        canAddMore: selectedStarships.length < 3,
    };
}
