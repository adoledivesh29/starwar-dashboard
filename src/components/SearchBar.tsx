"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="relative"
            suppressHydrationWarning
        >
            <div className="relative">
                <motion.div
                    animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search starships by name..."
                        className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        suppressHydrationWarning
                    />
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            suppressHydrationWarning
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </motion.form>
    );
}
