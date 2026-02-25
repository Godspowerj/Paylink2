"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Store, Briefcase, Heart, Users, CheckCircle2, Zap } from "lucide-react";
import { cn } from "~/lib/utils";
import { useState, useEffect } from "react";

const TRANSACTIONS = [
    {
        icon: <Store size={18} className="text-blue-600" />,
        bg: "bg-blue-100",
        title: "Vintage Tee Store",
        subtitle: "New Order #2491",
        status: "Paid",
        amount: "+$45.00",
        delay: 0
    },
    {
        icon: <Briefcase size={18} className="text-purple-600" />,
        bg: "bg-purple-100",
        title: "Web Design Project",
        subtitle: "Milestone Payment",
        status: "Paid",
        amount: "+$850.00",
        delay: 1.5
    },
    {
        icon: <Heart size={18} className="text-pink-600" />,
        bg: "bg-pink-100",
        title: "Coffee Support",
        subtitle: "One-time Donation",
        status: "Paid",
        amount: "+$5.00",
        delay: 3
    },
    {
        icon: <Users size={18} className="text-amber-600" />,
        bg: "bg-amber-100",
        title: "Design Community",
        subtitle: "Monthly Membership",
        status: "Paid",
        amount: "+$20.00",
        delay: 4.5
    }
];

export function InfinitePossibilities() {
    const [visibleTransactions, setVisibleTransactions] = useState<number[]>([]);

    useEffect(() => {
        const timeouts = TRANSACTIONS.map((_, index) => {
            return setTimeout(() => {
                setVisibleTransactions(prev => [...prev, index]);
            }, 500 + (index * 1200)); // Staggered appearance
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4">
            {/* Main Card Container */}
            <div className="relative bg-white rounded-[40px] border border-gray-200/60 shadow-xl overflow-hidden min-h-[550px] md:min-h-[500px] group">

                {/* Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                    {/* Left Side: Text Content */}
                    <div className="p-8 md:p-16 flex flex-col justify-center z-10 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Accent Line & Heading */}
                            <div className="flex gap-6">
                                <motion.div
                                    className="w-1.5 h-auto self-stretch bg-gradient-to-b from-blue-500 to-purple-600 rounded-full flex-shrink-0"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                />
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                                        One link.<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
                                            Infinite possibilities.
                                        </span>
                                    </h2>
                                    <p className="text-gray-500 text-lg leading-relaxed">
                                        Paylink adapts to your needs. From e-commerce to freelancing, it's the only link you'll ever need to get paid.
                                    </p>
                                </div>
                            </div>

                            {/* Tags/Features - Animated Stagger */}
                            <div className="flex flex-wrap gap-2 pl-8 mt-2">
                                {["Instant Checkout", "Global Payments", "Zero Code"].map((tag, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                                        className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100 cursor-default transition-colors"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Visual Mockup */}
                    <div className="relative h-[350px] md:h-full w-full bg-gray-50/50 md:bg-transparent overflow-hidden">

                        {/* Background Elements */}
                        <div className="absolute inset-0 opacity-30 pointer-events-none">
                            <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                            <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                        </div>

                        {/* The UI Window */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: 2 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                            className="absolute md:top-[15%] md:right-0 w-[90%] md:w-full left-[5%] md:left-auto bg-white/80 backdrop-blur-xl rounded-t-[32px] md:rounded-l-[32px] md:rounded-tr-none border border-gray-200/60 shadow-2xl overflow-hidden h-full z-20"
                        >
                            {/* Mockup Header */}
                            <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">Live Activity</span>
                                </div>
                            </div>

                            {/* Mockup Content - Live Transaction List */}
                            <div className="p-6 flex flex-col gap-3 h-full overflow-hidden">
                                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-gray-400 mb-2 px-2 uppercase">
                                    <span>Source</span>
                                    <span>Status</span>
                                    <span>Amount</span>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {visibleTransactions.map((txIndex) => {
                                        const tx = TRANSACTIONS[txIndex];
                                        return (
                                            <TransactionItem
                                                key={txIndex}
                                                {...tx}
                                                // Dynamic time for realism (just mockup)
                                                time="Just now"
                                            />
                                        );
                                    })}
                                </AnimatePresence>

                                {visibleTransactions.length < TRANSACTIONS.length && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center py-8 text-gray-400 gap-2"
                                    >
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TransactionItem({ icon, bg, title, subtitle, status, time, amount }: any) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
            className="group flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100/50 hover:shadow-sm"
        >
            <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300", bg)}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</span>
                    <span className="text-[11px] text-gray-500">{subtitle}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden md:flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 group-hover:bg-green-100 transition-colors">
                        <CheckCircle2 size={10} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{status}</span>
                    </div>
                </div>
                <div className="text-right min-w-[60px]">
                    <div className="text-sm font-bold text-gray-900">{amount}</div>
                    <div className="text-[10px] text-gray-400 group-hover:text-blue-400 transition-colors">{time}</div>
                </div>
            </div>
        </motion.div>
    )
}
