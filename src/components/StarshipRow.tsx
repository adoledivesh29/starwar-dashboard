"use client";

import { Starship, StarshipDetails } from "@/lib/types";
import { Star, Users, Zap, Plus, Minus } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useStarshipDetails } from "@/hooks/useStarships";
import { motion } from "framer-motion";

interface StarshipRowProps {
    starship: Starship;
    onSelect?: (starship: Starship) => void;
}

export function StarshipRow({ starship, onSelect }: StarshipRowProps) {
    const { isSelected, addStarship, removeStarship, canAddMore } = useCompare();
    const { data: details } = useStarshipDetails(starship.uid);

    const handleToggleSelection = () => {
        try {
            if (isSelected(starship.name)) {
                removeStarship(starship.name);
            } else {
                // We need to create a detailed starship object for comparison
                if (details?.result) {
                    const detailedStarship: StarshipDetails = {
                        uid: starship.uid,
                        name: starship.name,
                        model: details.result.properties.model,
                        manufacturer: details.result.properties.manufacturer,
                        crew: details.result.properties.crew,
                        hyperdrive_rating: details.result.properties.hyperdrive_rating,
                        cost_in_credits: details.result.properties.cost_in_credits,
                        length: details.result.properties.length,
                        max_atmosphering_speed: details.result.properties.max_atmosphering_speed,
                        passengers: details.result.properties.passengers,
                        cargo_capacity: details.result.properties.cargo_capacity,
                        consumables: details.result.properties.consumables,
                        vehicle_class: details.result.properties.vehicle_class,
                        pilots: details.result.properties.pilots,
                        films: details.result.properties.films,
                        created: details.result.properties.created,
                        edited: details.result.properties.edited,
                    };
                    addStarship(detailedStarship);
                } else {
                    // Create minimal StarshipDetails with available data
                    const minimalStarship: StarshipDetails = {
                        uid: starship.uid,
                        name: starship.name,
                        model: "Unknown",
                        manufacturer: "Unknown",
                        crew: "Unknown",
                        hyperdrive_rating: "Unknown",
                        cost_in_credits: "Unknown",
                        length: "Unknown",
                        max_atmosphering_speed: "Unknown",
                        passengers: "Unknown",
                        cargo_capacity: "Unknown",
                        consumables: "Unknown",
                        vehicle_class: "Unknown",
                        pilots: [],
                        films: [],
                        created: "",
                        edited: "",
                    };
                    addStarship(minimalStarship);
                }
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "An error occurred");
        }
    };

    const selected = isSelected(starship.name);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                            {starship.name}
                        </h3>
                        <Star className="h-4 w-4 text-yellow-400" />
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">ID: {starship.uid}</p>

                    {details?.result && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">Model:</span>
                                <span className="text-muted-foreground">{details.result.properties.model}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">Manufacturer:</span>
                                <span className="text-muted-foreground">{details.result.properties.manufacturer}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">Crew:</span>
                                <span className="text-muted-foreground">
                                    {details.result.properties.crew === "unknown" ? "Unknown" : details.result.properties.crew}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">Hyperdrive:</span>
                                <span className="text-muted-foreground">
                                    {details.result.properties.hyperdrive_rating === "unknown" ? "Unknown" : details.result.properties.hyperdrive_rating}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-end gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggleSelection}
                        disabled={!selected && !canAddMore}
                        className={`p-2 rounded-full transition-colors ${selected
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                        title={selected ? "Remove from comparison" : "Add to comparison"}
                    >
                        {selected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </motion.button>

                    {onSelect && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(starship)}
                            className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
                        >
                            View Details
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
