// Utility functions for performance optimization

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Virtual scrolling utilities
export function calculateVisibleRange(
    scrollTop: number,
    itemHeight: number,
    containerHeight: number,
    totalItems: number
) {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight) + 1,
        totalItems
    );

    return { startIndex, endIndex };
}

// Memory management utilities
export function createLRUCache<T>(maxSize: number) {
    const cache = new Map<string, T>();

    return {
        get: (key: string): T | undefined => {
            if (cache.has(key)) {
                const value = cache.get(key)!;
                cache.delete(key);
                cache.set(key, value);
                return value;
            }
            return undefined;
        },
        set: (key: string, value: T) => {
            if (cache.has(key)) {
                cache.delete(key);
            } else if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                if (firstKey !== undefined) {
                    cache.delete(firstKey);
                }
            }
            cache.set(key, value);
        },
        clear: () => cache.clear(),
        size: () => cache.size,
    };
}
