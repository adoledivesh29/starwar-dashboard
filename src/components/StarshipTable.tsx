"use client";

import { Starship, StarshipDetails } from "@/lib/types";
import { Star, Eye, Plus, Check, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCompare } from "@/hooks/useCompare";
import { useToast } from "@/components/Toast";
import { motion, AnimatePresence } from "framer-motion";

interface StarshipTableProps {
    starships: Starship[];
    isLoading?: boolean;
    searchQuery?: string;
}

export function StarshipTable({ starships, isLoading, searchQuery }: StarshipTableProps) {
    const router = useRouter();
    const { addStarship, isSelected, canAddMore } = useCompare();
    const { success, error } = useToast();

    const handleViewDetails = (uid: string) => {
        router.push(`/starships/${uid}`);
    };

    const handleAddToComparison = (starship: Starship) => {
        try {
            // Create a minimal StarshipDetails object with available data
            const minimalStarship: StarshipDetails = {
                uid: starship.uid,
                name: starship.name,
                model: "Loading...",
                manufacturer: "Loading...",
                crew: "Loading...",
                hyperdrive_rating: "Loading...",
                cost_in_credits: "Loading...",
                length: "Loading...",
                max_atmosphering_speed: "Loading...",
                passengers: "Loading...",
                cargo_capacity: "Loading...",
                consumables: "Loading...",
                vehicle_class: "Loading...",
                pilots: [],
                films: [],
                created: "",
                edited: "",
            };

            addStarship(minimalStarship);
            success(`${starship.name} added to comparison`);
        } catch (err) {
            if (err instanceof Error) {
                error(err.message);
            } else {
                error("Failed to add starship to comparison");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-16 bg-muted rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (starships.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-12 text-center"
            >
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                    {searchQuery ? `No starships found for "${searchQuery}"` : "No starships found"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                    {searchQuery ? "Try adjusting your search terms or browse all available starships." : "Try adjusting your search criteria to find what you're looking for."}
                </p>
            </motion.div>
        );
    }

    return (
        <div className="rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full divide-y divide-border">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Starship
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                    <AnimatePresence>
                        {starships.map((starship, index) => {
                            const isInComparison = isSelected(starship.name);
                            const canAdd = canAddMore || isInComparison;

                            return (
                                <motion.tr
                                    key={starship.uid}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        scale: 1.01,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group hover:bg-muted/50 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4">
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {starship.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                ID: {starship.uid}
                                            </div>
                                        </motion.div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleViewDetails(starship.uid)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-all duration-200"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Details
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleAddToComparison(starship)}
                                                disabled={!canAdd}
                                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isInComparison
                                                    ? "text-green-600 bg-green-50 dark:bg-green-950/20 cursor-default"
                                                    : canAdd
                                                        ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                                                        : "text-muted-foreground cursor-not-allowed opacity-50"
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={isInComparison ? { rotate: 360 } : { rotate: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {isInComparison ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Plus className="h-4 w-4" />
                                                    )}
                                                </motion.div>
                                                {isInComparison ? "Added" : "Compare"}
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
}
