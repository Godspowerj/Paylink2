import {
    Plus,
    Wallet,
    Layers,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    Link2,
    Share2,
    Activity,
    BarChart3,
    Download,
    Filter,
    MoreHorizontal,
    Clock,
    ArrowRight,
    ChevronRight,
    ExternalLink,
    Search,
} from "lucide-react";
import {
    Users,
    Calendar,
    Copy,
    Eye,
} from "lucide-react";
import AppLayout from "~/components/layouts/app-layout";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth";
import { getGreeting } from "~/lib/utils";
import { useState } from "react";


export default function Dashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
    const hasNoBusiness = user.business == null;

    return (
        <AppLayout>
            <div className="space-y-6 lg:space-y-8 pt-4">

                {/* Business Setup Warning */}
                {hasNoBusiness && (
                    <div className="w-full bg-[#FFFAEB] flex items-start gap-3 px-4 py-3.5 rounded-xl border border-[#FFE4A8]">
                        <img src="/dashboard/warning-2.svg" alt="warning" className="mt-0.5" />
                        <div className="text-sm text-gray-800">
                            <p className="font-semibold">Create Your Business Profile</p>
                            <p className="mt-0.5 text-xs">
                                Set up your business profile to start creating and managing collections.{" "}
                                <Link to="/profile" className="text-[#B45309] font-semibold hover:underline">Set up now →</Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Header Row */}
                <div className="flex items-center justify-between">
                    {/* Greeting — hidden on mobile since the app header already shows it */}
                    <div className="hidden sm:block">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                            {getGreeting()}, {user.firstName}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Here's an overview of your collections and payments
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex bg-gray-100 rounded-full p-1">
                            {(["7d", "30d", "90d"] as const).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${period === p ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                >
                                    {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate("/collections/create")}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            <span className="hidden sm:inline">Create Collection</span>
                            <span className="sm:hidden">Create</span>
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                    {[
                        { label: "Total Collected", value: "₦1,250,000", change: "+12.4%", changeUp: true, icon: Wallet, iconBg: "bg-blue-50", iconColor: "text-blue-600", sub: "from 186 contributors" },
                        { label: "Active Collections", value: "4", change: "2 near goal", changeUp: true, icon: Layers, iconBg: "bg-purple-50", iconColor: "text-purple-600", sub: "₦485,000 pending" },
                        { label: "Completed", value: "12", change: "100% success", changeUp: true, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600", sub: "₦2.4M total collected" },
                        { label: "Contributors", value: "186", change: "+24 this month", changeUp: true, icon: Users, iconBg: "bg-indigo-50", iconColor: "text-indigo-600", sub: "89% completion rate" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-5 hover:border-gray-200 transition-colors group">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 lg:p-2.5 rounded-xl ${stat.iconBg}`}>
                                    <stat.icon className={stat.iconColor} size={18} />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] lg:text-xs font-medium text-green-600">
                                    <TrendingUp size={12} />
                                    {stat.change}
                                </div>
                            </div>
                            <div className="mt-3 lg:mt-4">
                                <p className="text-xs lg:text-sm text-gray-500">{stat.label}</p>
                                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</h3>
                                <p className="text-[10px] lg:text-[11px] text-gray-400 mt-1 hidden sm:block">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column — Active Collections (2/3 width on desktop) */}
                    <div className="hidden lg:block lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-4 lg:p-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-sm lg:text-base font-semibold text-gray-900">Active Collections</h2>
                                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">Monitor and manage active collections</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition hidden sm:block">
                                    <Search size={16} />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition hidden sm:block">
                                    <Filter size={16} />
                                </button>
                                <Link to="/collections" className="text-xs text-blue-600 font-medium hover:underline ml-2">
                                    View All →
                                </Link>
                            </div>
                        </div>

                        {/* Table Header — hidden on mobile */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            <div className="col-span-4">Collection</div>
                            <div className="col-span-2 text-right">Collected</div>
                            <div className="col-span-2 text-right">Target</div>
                            <div className="col-span-2 text-center">Progress</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        {/* Collection Rows */}
                        {[
                            { name: "Final Year Project Dues", status: "active", collected: "₦300,000", target: "₦500,000", progress: 60, contributors: 32, deadline: "Mar 20" },
                            { name: "Class Dues — 400L", status: "active", collected: "₦85,000", target: "₦150,000", progress: 57, contributors: 17, deadline: "Apr 1" },
                            { name: "Birthday Gift for Tola", status: "active", collected: "₦42,000", target: "₦50,000", progress: 84, contributors: 14, deadline: "Feb 28" },
                            { name: "Office Lunch Fund", status: "active", collected: "₦18,500", target: "₦30,000", progress: 62, contributors: 7, deadline: "Mar 5" },
                        ].map((col, i) => (
                            <div key={i}>
                                {/* Desktop table row */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-4 items-center border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                    onClick={() => navigate(`/collections/${i + 1}`)}>
                                    <div className="col-span-4">
                                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{col.name}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{col.contributors} contributors · Due {col.deadline}</p>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <p className="text-sm font-semibold text-gray-900">{col.collected}</p>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <p className="text-sm text-gray-500">{col.target}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all ${col.progress >= 80 ? "bg-green-500" : "bg-blue-600"}`} style={{ width: `${col.progress}%` }} />
                                            </div>
                                            <span className="text-[11px] font-medium text-gray-500 w-8 text-right">{col.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end gap-1">
                                        <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Copy Link">
                                            <Copy size={14} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Share">
                                            <ExternalLink size={14} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile card row */}
                                <div className="md:hidden flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => navigate(`/collections/${i + 1}`)}>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{col.name}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{col.contributors} contributors · Due {col.deadline}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${col.progress >= 80 ? "bg-green-500" : "bg-blue-600"}`} style={{ width: `${col.progress}%` }} />
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-500 w-7 text-right">{col.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-gray-900">{col.collected}</p>
                                        <p className="text-[10px] text-gray-400">of {col.target}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column — Recent Payments + Quick Stats (1/3 width on desktop) */}
                    <div className="space-y-6">

                        {/* Revenue Summary */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Revenue Trend</h3>
                                <BarChart3 size={16} className="text-gray-400" />
                            </div>
                            {/* Mini Chart Bars */}
                            <div className="flex items-end gap-1.5 h-24 mb-3">
                                {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 72].map((h, i) => (
                                    <div key={i} className="flex-1 rounded-t-sm bg-blue-100 hover:bg-blue-500 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500">This Month</p>
                                    <p className="text-lg font-bold text-gray-900 mt-0.5">₦320,000</p>
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                                    <TrendingUp size={12} />
                                    +18.2%
                                </div>
                            </div>
                        </div>

                        {/* Recent Payments */}
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Recent Payments</h3>
                                <Link to="/contributors" className="text-xs text-blue-600 font-medium hover:underline">All</Link>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {[
                                    { name: "David Musa", collection: "Project Dues", amount: "₦20,000", time: "2h ago" },
                                    { name: "Grace John", collection: "Birthday Fund", amount: "₦15,000", time: "5h ago" },
                                    { name: "Tola Adeniyi", collection: "Class Dues", amount: "₦5,000", time: "1d ago" },
                                    { name: "Ayo Badmus", collection: "Project Dues", amount: "₦20,000", time: "1d ago" },
                                    { name: "Chioma Okeke", collection: "Office Lunch", amount: "₦3,000", time: "2d ago" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                                            {p.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                                            <p className="text-[10px] text-gray-400 truncate">{p.collection} · {p.time}</p>
                                        </div>
                                        <p className="text-xs font-bold text-gray-900 shrink-0">{p.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Export / Reporting */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Reports</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition text-left group">
                                    <div className="p-2 rounded-lg bg-blue-50">
                                        <Download size={14} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-900">Export Data</p>
                                        <p className="text-[10px] text-gray-400">Download CSV/PDF reports</p>
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition" />
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition text-left group">
                                    <div className="p-2 rounded-lg bg-purple-50">
                                        <BarChart3 size={14} className="text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-900">Analytics</p>
                                        <p className="text-[10px] text-gray-400">View detailed insights</p>
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

