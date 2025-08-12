"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = { id, type, message };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = useCallback((message: string, type: ToastType = "info") => {
        addToast(message, type);
    }, [addToast]);

    const success = useCallback((message: string) => {
        addToast(message, "success");
    }, [addToast]);

    const error = useCallback((message: string) => {
        addToast(message, "error");
    }, [addToast]);

    const info = useCallback((message: string) => {
        addToast(message, "info");
    }, [addToast]);

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case "success":
                return "bg-green-500 dark:bg-green-600 text-white border border-green-600 dark:border-green-500";
            case "error":
                return "bg-red-500 dark:bg-red-600 text-white border border-red-600 dark:border-red-500";
            case "info":
                return "bg-blue-500 dark:bg-blue-600 text-white border border-blue-600 dark:border-blue-500";
            default:
                return "bg-blue-500 dark:bg-blue-600 text-white border border-blue-600 dark:border-blue-500";
        }
    };

    return (
        <ToastContext.Provider value={{ toast, success, error, info }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 300, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${getToastStyles(toast.type)}`}
                        >
                            <div className="flex-shrink-0 mr-3">
                                {toast.type === "success" && <CheckCircle className="h-5 w-5" />}
                                {toast.type === "error" && <AlertCircle className="h-5 w-5" />}
                                {toast.type === "info" && <Info className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 text-sm font-medium">{toast.message}</div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 ml-3 text-white hover:text-gray-200 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </motion.button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
