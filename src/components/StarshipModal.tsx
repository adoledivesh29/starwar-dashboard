"use client";

import { StarshipDetails } from "@/lib/types";
import { X, Users, Zap, Calendar, Ruler, DollarSign, Factory, Gauge, Users2, Package, Clock, Film, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StarshipModalProps {
    starship: StarshipDetails;
    isOpen: boolean;
    onClose: () => void;
}

export function StarshipModal({ starship, isOpen, onClose }: StarshipModalProps) {
    const formatValue = (value: string, unit?: string) => {
        if (value === "unknown" || value === "n/a") {
            return "Unknown";
        }
        return unit ? `${value} ${unit}` : value;
    };

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
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">{starship.name}</h2>
                                <p className="text-muted-foreground">ID: {starship.uid}</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                                        Basic Information
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Factory className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Model:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.model)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Factory className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Manufacturer:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.manufacturer)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Ruler className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Length:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.length, "m")}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Cargo Capacity:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.cargo_capacity, "kg")}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Crew & Passengers */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                                        Crew & Passengers
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Crew:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.crew)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Users2 className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Passengers:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.passengers)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Consumables:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.consumables)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                                        Performance
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Max Speed:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.max_atmosphering_speed, "km/h")}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Hyperdrive Rating:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.hyperdrive_rating)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cost & Class */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                                        Cost & Class
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Cost:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.cost_in_credits, "credits")}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Film className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">Vehicle Class:</span>
                                            <span className="text-muted-foreground">{formatValue(starship.vehicle_class)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
