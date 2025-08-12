"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    // Remove fdprocessedid attributes after hydration
    useEffect(() => {
        if (containerRef.current) {
            const buttons = containerRef.current.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.hasAttribute('fdprocessedid')) {
                    button.removeAttribute('fdprocessedid');
                }
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("light")}
                className={`p-2 rounded-md transition-colors ${theme === "light"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                title="Light mode"
                suppressHydrationWarning
            >
                <Sun className="h-4 w-4" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-md transition-colors ${theme === "dark"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                title="Dark mode"
                suppressHydrationWarning
            >
                <Moon className="h-4 w-4" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("system")}
                className={`p-2 rounded-md transition-colors ${theme === "system"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                title="System theme"
                suppressHydrationWarning
            >
                <Monitor className="h-4 w-4" />
            </motion.button>
        </div>
    );
}
