"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export function Pagination({
    currentPage,
    totalPages,
    totalRecords,
    onPageChange,
    hasNext,
    hasPrevious,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Showing page {currentPage} of {totalPages} ({totalRecords} total records)
            </div>

            <div className="flex items-center space-x-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                    className={`p-2 rounded-lg transition-colors ${hasPrevious
                        ? "text-foreground hover:bg-muted hover:text-primary"
                        : "text-muted-foreground cursor-not-allowed"
                        }`}
                >
                    <ChevronLeft className="h-4 w-4" />
                </motion.button>

                <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => typeof page === 'number' && onPageChange(page)}
                            disabled={page === '...'}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === currentPage
                                ? "bg-primary text-primary-foreground"
                                : page === '...'
                                    ? "text-muted-foreground cursor-default"
                                    : "text-foreground hover:bg-muted hover:text-primary"
                                }`}
                        >
                            {page}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className={`p-2 rounded-lg transition-colors ${hasNext
                        ? "text-foreground hover:bg-muted hover:text-primary"
                        : "text-muted-foreground cursor-not-allowed"
                        }`}
                >
                    <ChevronRight className="h-4 w-4" />
                </motion.button>
            </div>
        </div>
    );
}
