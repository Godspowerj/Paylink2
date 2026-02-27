import { useState, useEffect } from "react";
import { Search, Plus, Filter, Link2, ChevronDown, Layers, MoreHorizontal, Copy, ExternalLink, Eye, Calendar, Users, TrendingUp, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { PageSkeleton } from "~/components/ui/skeleton";
import { pToast } from "~/lib/toast";
import { motion } from "framer-motion";

export default function PaymentLinks() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("active");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const links = [
        { id: "PL-8821", title: "Project Dues 2026", description: "Final year project dues collection", amount: "₦350,000", target: "₦500,000", contributors: 24, date: "Mar 10, 2026", deadline: "Mar 20, 2026", status: "Active", progress: 70 },
        { id: "PL-8822", title: "Department Dinner", description: "Departmental dinner fund", amount: "₦120,000", target: "₦200,000", contributors: 15, date: "Feb 28, 2026", deadline: "Mar 15, 2026", status: "Active", progress: 60 },
        { id: "PL-8823", title: "Birthday Gift for Tola", description: "Surprise birthday fund", amount: "₦42,000", target: "₦50,000", contributors: 14, date: "Feb 20, 2026", deadline: "Feb 28, 2026", status: "Active", progress: 84 },
        { id: "PL-8810", title: "Charity Drive", description: "End of year charity collection", amount: "₦250,000", target: "₦250,000", contributors: 42, date: "Nov 30, 2025", deadline: "Dec 31, 2025", status: "Ended", progress: 100 },
        { id: "PL-8805", title: "Team Jersey Fund", description: "Football team jersey contributions", amount: "₦120,000", target: "₦120,000", contributors: 24, date: "Nov 15, 2025", deadline: "Dec 15, 2025", status: "Ended", progress: 100 },
    ];

    const filtered = links.filter(l => {
        if (activeTab === "active") return l.status === "Active";
        return l.status === "Ended";
    });

    const stats = {
        total: links.length,
        active: links.filter(l => l.status === "Active").length,
        ended: links.filter(l => l.status === "Ended").length,
    };

    if (loading) {
        return <AppLayout><PageSkeleton /></AppLayout>;
    }

    return (
        <AppLayout>
            <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Collections</h1>
                        <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Manage and track all your payment collections</p>
                    </div>
                    <button
                        onClick={() => navigate("/collections/create")}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        New Collection
                    </button>
                </div>

                {/* ═══ DESKTOP: Stats Row ═══ */}
                <div className="hidden lg:grid grid-cols-4 gap-4">
                    {[
                        { label: "Total Collections", value: stats.total, icon: Layers, bg: "bg-blue-50", color: "text-blue-600" },
                        { label: "Active", value: stats.active, icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-600" },
                        { label: "Completed", value: stats.ended, icon: FolderOpen, bg: "bg-gray-50", color: "text-gray-600" },
                        { label: "Contributors", value: links.reduce((sum, l) => sum + l.contributors, 0), icon: Users, bg: "bg-purple-50", color: "text-purple-600" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className={cn("p-2.5 rounded-xl", s.bg)}>
                                <s.icon size={18} className={s.color} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">{s.label}</p>
                                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs + Search */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex gap-6 border-b border-gray-200 lg:border-0">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={cn(
                                "pb-3 lg:pb-0 text-sm font-medium transition-all relative",
                                activeTab === 'active' ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            Active ({stats.active})
                            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full lg:hidden" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('archived')}
                            className={cn(
                                "pb-3 lg:pb-0 text-sm font-medium transition-all relative",
                                activeTab === 'archived' ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            Archived ({stats.ended})
                            {activeTab === 'archived' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full lg:hidden" />}
                        </button>
                    </div>

                    <div className="relative group lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search collections..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-600 outline-none text-sm placeholder:text-gray-400 transition-all"
                        />
                    </div>
                </div>

                {/* ═══ DESKTOP TABLE ═══ */}
                <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <div className="col-span-4">Collection</div>
                        <div className="col-span-2 text-right">Raised / Target</div>
                        <div className="col-span-2 text-center">Progress</div>
                        <div className="col-span-1 text-center">People</div>
                        <div className="col-span-1 text-center">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <FolderOpen className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 font-medium">No collections found</p>
                        </div>
                    ) : (
                        filtered.map((link) => (
                            <div
                                key={link.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors cursor-pointer group"
                                onClick={() => navigate(`/collections/${link.id}`)}
                            >
                                <div className="col-span-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <Link2 size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{link.title}</p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{link.id} · {link.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 text-right">
                                    <p className="text-sm font-bold text-gray-900">{link.amount}</p>
                                    <p className="text-[11px] text-gray-400">of {link.target}</p>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full", link.progress >= 100 ? "bg-emerald-500" : link.progress >= 80 ? "bg-green-500" : "bg-blue-600")}
                                                style={{ width: `${link.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 w-10 text-right">{link.progress}%</span>
                                    </div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <span className="text-sm font-semibold text-gray-700">{link.contributors}</span>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <span className={cn(
                                        "text-[10px] font-semibold px-2.5 py-1 rounded-full border",
                                        link.status === "Active"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                            : "bg-gray-50 text-gray-600 border-gray-200"
                                    )}>
                                        {link.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center justify-end gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); navigate(`/collections/${link.id}`); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="View"><Eye size={15} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); pToast.success("Link copied!", "Payment link copied to clipboard"); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Copy Link"><Copy size={15} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); pToast.info("Share link opened"); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Share"><ExternalLink size={15} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"><MoreHorizontal size={15} /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ═══ MOBILE CARDS ═══ */}
                <div className="lg:hidden space-y-4">
                    {filtered.map((link) => (
                        <div key={link.id} onClick={() => navigate(`/collections/${link.id}`)} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <Link2 size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{link.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{link.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 text-base">{link.amount}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                                <span>{link.contributors} contributors</span>
                                <span className={cn(
                                    "font-medium px-2 py-0.5 rounded-full",
                                    link.status === "Active" ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-100"
                                )}>
                                    {link.status}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", link.progress >= 100 ? "bg-emerald-500" : "bg-blue-600")} style={{ width: `${link.progress}%` }} />
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-12">
                            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No collections found</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </AppLayout>
    );
}
