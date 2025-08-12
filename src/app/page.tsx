"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStarshipsWithPagination } from "@/hooks/useStarships";
import { useCompare } from "@/hooks/useCompare";
import { SearchBar } from "@/components/SearchBar";
import { StarshipTable } from "@/components/StarshipTable";
import { Pagination } from "@/components/Pagination";
import { Loader } from "@/components/Loader";
import { CompareModal } from "@/components/CompareModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Scale, X, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedStarships, clearSelection } = useCompare();

  const { data, isLoading, isError, error } = useStarshipsWithPagination(
    searchQuery,
    page,
    10 // pageSize
  );

  // Handle URL parameters for search and pagination
  useEffect(() => {
    const urlSearch = searchParams.get('search') || "";
    const urlPage = parseInt(searchParams.get('page') || "1");

    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams, searchQuery, page]);

  const handleSearch = useCallback((query: string) => {
    // Only update if the search query actually changed
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1); // Reset to first page when searching

      // Update URL only if the query is different from current URL param
      const currentUrlSearch = searchParams.get('search') || "";
      if (query !== currentUrlSearch) {
        const params = new URLSearchParams();
        if (query) params.set('search', query);
        params.set('page', '1');
        router.push(`/?${params.toString()}`);
      }
    }
  }, [searchQuery, router, searchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    console.log("Changing to page:", newPage); // Debug log
    setPage(newPage);

    // Update URL
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  }, [searchQuery, router]);

  const handleOpenCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const handleCloseCompareModal = () => {
    setIsCompareModalOpen(false);
  };

  // Show loading only on initial load, not on page changes
  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Starships</h2>
          <p className="text-muted-foreground">
            {error?.message || "Failed to load starships. Please try again later."}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-18 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Rocket className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Star Wars Starships
                </h1>
                <p className="text-muted-foreground">
                  Explore the vast fleet of starships from the Star Wars universe
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>

        <div className="space-y-6">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border shadow-sm p-6"
          >
            <div className="space-y-4">
              <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
              {searchQuery && data && (
                <div className="text-sm text-muted-foreground">
                  Found {data.totalRecords} starship{data.totalRecords !== 1 ? 's' : ''} for "{searchQuery}"
                </div>
              )}
            </div>
          </motion.div>

          {/* Comparison Section */}
          <AnimatePresence>
            {selectedStarships.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-xl border border-border shadow-sm p-4 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Scale className="h-5 w-5 text-purple-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-foreground">
                      Selected for comparison ({selectedStarships.length}/3)
                    </span>
                    <div className="flex items-center space-x-2">
                      {selectedStarships.map((starship, index) => (
                        <motion.span
                          key={starship.uid}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
                        >
                          {starship.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenCompareModal}
                      className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                    >
                      Compare Starships
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearSelection}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      title="Clear selection"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Starships Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            <StarshipTable
              starships={data?.results || []}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </motion.div>

          {/* Pagination */}
          {data && data.totalPages > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border shadow-sm p-4"
            >
              <Pagination
                currentPage={page}
                totalPages={data.totalPages || 1}
                totalRecords={data.totalRecords || 0}
                onPageChange={handlePageChange}
                hasNext={data.hasNext || false}
                hasPrevious={data.hasPrevious || false}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Comparison Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={handleCloseCompareModal}
      />
    </div>
  );
}
