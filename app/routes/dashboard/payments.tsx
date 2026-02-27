import { useState, useEffect } from "react";
import { Search, Filter, Download, ArrowDownLeft, ArrowUpRight, Wallet, TrendingUp, CheckCircle2, Clock, MoreHorizontal, ChevronDown, CreditCard } from "lucide-react";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { PageSkeleton } from "~/components/ui/skeleton";
import { pToast } from "~/lib/toast";

const payments = [
    { id: "TXN-001", name: "David Musa", email: "david@mail.com", collection: "Project Dues", amount: "₦20,000", date: "Feb 26, 2026", time: "2:30 PM", status: "completed", type: "credit" },
    { id: "TXN-002", name: "Grace John", email: "grace@mail.com", collection: "Birthday Fund", amount: "₦15,000", date: "Feb 26, 2026", time: "11:15 AM", status: "completed", type: "credit" },
    { id: "TXN-003", name: "Tola Adeniyi", email: "tola@mail.com", collection: "Class Dues", amount: "₦5,000", date: "Feb 25, 2026", time: "4:45 PM", status: "completed", type: "credit" },
    { id: "TXN-004", name: "Ayo Badmus", email: "ayo@mail.com", collection: "Project Dues", amount: "₦20,000", date: "Feb 25, 2026", time: "9:20 AM", status: "completed", type: "credit" },
    { id: "TXN-005", name: "Chioma Okeke", email: "chioma@mail.com", collection: "Office Lunch", amount: "₦3,000", date: "Feb 24, 2026", time: "1:00 PM", status: "completed", type: "credit" },
    { id: "TXN-006", name: "Anonymous", email: "—", collection: "Charity Drive", amount: "₦10,000", date: "Feb 24, 2026", time: "10:30 AM", status: "completed", type: "credit" },
    { id: "TXN-007", name: "Emeka Nwosu", email: "emeka@mail.com", collection: "Department Dinner", amount: "₦5,000", date: "Feb 23, 2026", time: "3:15 PM", status: "pending", type: "credit" },
    { id: "TXN-008", name: "Blessing Ade", email: "blessing@mail.com", collection: "Project Dues", amount: "₦20,000", date: "Feb 23, 2026", time: "8:45 AM", status: "failed", type: "credit" },
];

export default function Payments() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const filtered = payments.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.collection.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: "₦98,000",
        completed: payments.filter(p => p.status === "completed").length,
        pending: payments.filter(p => p.status === "pending").length,
        failed: payments.filter(p => p.status === "failed").length,
    };

    if (loading) {
        return <AppLayout><PageSkeleton /></AppLayout>;
    }

    return (
        <AppLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Payments</h1>
                        <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Track all incoming payments across your collections</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        <button onClick={() => pToast.success("Export started", "Check your downloads")} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden lg:grid grid-cols-4 gap-4">
                    {[
                        { label: "Total Received", value: stats.total, icon: Wallet, bg: "bg-blue-50", color: "text-blue-600" },
                        { label: "Completed", value: stats.completed, icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
                        { label: "Pending", value: stats.pending, icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
                        { label: "Failed", value: stats.failed, icon: TrendingUp, bg: "bg-red-50", color: "text-red-500" },
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

                {/* Search + Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <div className="relative flex-1 lg:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-600 outline-none text-sm placeholder:text-gray-400 transition-all" />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "completed", "pending", "failed"] as const).map(s => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors",
                                    statusFilter === s ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-2">Contributor</div>
                        <div className="col-span-2">Email</div>
                        <div className="col-span-2">Collection</div>
                        <div className="col-span-1 text-right">Amount</div>
                        <div className="col-span-2">Date & Time</div>
                        <div className="col-span-1 text-center">Status</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <CreditCard className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 font-medium">No payments found</p>
                        </div>
                    ) : (
                        filtered.map((p, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors group">
                                <div className="col-span-1">
                                    <p className="text-xs font-mono text-gray-400">{p.id}</p>
                                </div>
                                <div className="col-span-2 flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                                        {p.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500 truncate">{p.email}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-700 truncate">{p.collection}</p>
                                </div>
                                <div className="col-span-1 text-right">
                                    <p className="text-sm font-bold text-emerald-600">+{p.amount}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-700">{p.date}</p>
                                    <p className="text-[10px] text-gray-400">{p.time}</p>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <span className={cn(
                                        "text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize border",
                                        p.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                            p.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                "bg-red-50 text-red-600 border-red-100"
                                    )}>
                                        {p.status}
                                    </span>
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                                        <MoreHorizontal size={15} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3 pb-6">
                    {filtered.map((p, i) => (
                        <div key={i} className="bg-white rounded-[20px] border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Wallet size={18} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                                        <span className={cn(
                                            "inline-flex text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider mt-1",
                                            p.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                p.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                    "bg-red-50 text-red-600 border-red-100"
                                        )}>
                                            {p.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-base font-bold text-emerald-600">+{p.amount}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-50/50 p-2.5 rounded-xl border border-gray-50 mt-2">
                                <div>
                                    <p className="font-medium text-gray-400 mb-0.5">Collection</p>
                                    <p className="text-gray-900 font-semibold truncate">{p.collection}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-400 mb-0.5">Date</p>
                                    <p className="text-gray-900 font-semibold">{p.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
