"use client";

import { useCompare } from "@/hooks/useCompare";
import { useStarshipDetails, useMultipleStarshipDetails } from "@/hooks/useStarships";
import { X, Star, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StarshipDetails } from "@/lib/types";

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CompareModal({ isOpen, onClose }: CompareModalProps) {
    const { selectedStarships, clearSelection, removeStarship } = useCompare();

    // Fetch details only for selected starships
    const uids = selectedStarships.map(starship => starship.uid);
    const { data: starshipDetails, isLoading, isError } = useMultipleStarshipDetails(uids);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-card rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="text-xl font-semibold text-foreground">
                                Compare Starships ({selectedStarships.length}/3)
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </motion.button>
                        </div>

                        <div className="p-6">
                            {selectedStarships.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No starships selected for comparison</p>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedStarships.map((starship, index) => (
                                        <motion.div
                                            key={starship.uid}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <StarshipComparisonCard
                                                starship={starship}
                                                onRemove={() => removeStarship(starship.name)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between p-6 border-t border-border">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearSelection}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Clear All
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Close
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface StarshipComparisonCardProps {
    starship: StarshipDetails;
    onRemove: () => void;
}

function StarshipComparisonCard({ starship, onRemove }: StarshipComparisonCardProps) {
    console.log("starship", starship)
    const { data: details, isLoading } = useStarshipDetails(starship.uid);

    return (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">{starship.name}</h3>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onRemove}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                >
                    <X className="h-4 w-4" />
                </motion.button>
            </div>

            <div className="space-y-3 text-sm">
                <div>
                    <span className="font-medium text-foreground">ID:</span>
                    <span className="ml-2 text-muted-foreground">{starship.uid}</span>
                </div>

                {isLoading ? (
                    <div className="flex items-center">
                        <Loader className="h-4 w-4 animate-spin mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Loading details...</span>
                    </div>
                ) : details?.result?.properties ? (
                    <>
                        <div>
                            <span className="font-medium text-foreground">Model:</span>
                            <span className="ml-2 text-muted-foreground">{details.result.properties.model}</span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Manufacturer:</span>
                            <span className="ml-2 text-muted-foreground">{details.result.properties.manufacturer}</span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Cost:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.cost_in_credits === "unknown" ? "Unknown" : `${details.result.properties.cost_in_credits} credits`}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Length:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.length === "unknown" ? "Unknown" : `${details.result.properties.length}m`}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Crew:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.crew === "unknown" ? "Unknown" : details.result.properties.crew}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Passengers:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.passengers === "unknown" ? "Unknown" : details.result.properties.passengers}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Max Speed:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.max_atmosphering_speed === "unknown" ? "Unknown" : `${details.result.properties.max_atmosphering_speed} km/h`}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Cargo Capacity:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.cargo_capacity === "unknown" ? "Unknown" : `${details.result.properties.cargo_capacity} kg`}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Consumables:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.consumables === "unknown" ? "Unknown" : details.result.properties.consumables}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Hyperdrive Rating:</span>
                            <span className="ml-2 text-muted-foreground">
                                {details.result.properties.hyperdrive_rating === "unknown" ? "Unknown" : details.result.properties.hyperdrive_rating}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-foreground">Vehicle Class:</span>
                            <span className="ml-2 text-muted-foreground">{details.result.properties.vehicle_class}</span>
                        </div>
                    </>
                ) : (
                    <div className="text-muted-foreground">Failed to load details</div>
                )}
            </div>
        </div>
    );
}
