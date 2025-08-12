"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function Loader() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
                animate={{
                    rotate: 360,
                    y: [0, -10, 0]
                }}
                transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <Rocket className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground font-medium"
            >
                Loading starships...
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full max-w-xs"
            />
        </div>
    );
}
