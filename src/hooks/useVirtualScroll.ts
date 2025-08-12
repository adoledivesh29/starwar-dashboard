"use client";

import { useRef, useState, useCallback } from "react";
import { calculateVisibleRange } from "@/utils/performance";

interface UseVirtualScrollOptions {
    itemHeight: number;
    containerHeight: number;
    totalItems: number;
    overscan?: number;
}

export function useVirtualScroll({
    itemHeight,
    containerHeight,
    totalItems,
    overscan = 5,
}: UseVirtualScrollOptions) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startIndex, endIndex } = calculateVisibleRange(
        scrollTop,
        itemHeight,
        containerHeight,
        totalItems
    );

    const visibleStartIndex = Math.max(0, startIndex - overscan);
    const visibleEndIndex = Math.min(totalItems, endIndex + overscan);
    const visibleItems = visibleEndIndex - visibleStartIndex;

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    const scrollToIndex = useCallback((index: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTop = index * itemHeight;
        }
    }, [itemHeight]);

    return {
        containerRef,
        scrollTop,
        visibleStartIndex,
        visibleEndIndex,
        visibleItems,
        handleScroll,
        scrollToIndex,
        totalHeight: totalItems * itemHeight,
    };
}
