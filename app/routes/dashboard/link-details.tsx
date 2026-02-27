import { useState, useEffect } from "react";
import { ArrowLeft, Share2, MoreHorizontal, QrCode, Copy, Check, Wallet, Calendar, TrendingUp, Users, Target, Download, Search, Filter, Pause, XCircle, ExternalLink, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { pToast } from "~/lib/toast";
import { Skeleton } from "~/components/ui/skeleton";

export default function LinkDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(t);
    }, []);

    const link = {
        title: "Final Year Project Dues",
        url: "paylink.app/pay/fyp-2026",
        fullUrl: "https://paylink.app/pay/fyp-2026",
        description: "Final year project dues collection for graduation activities, excursion, and dinner.",
        amount_raised: "₦350,000",
        goal: "₦500,000",
        perPerson: "₦5,000",
        progress: 70,
        status: "Active",
        deadline: "Mar 20, 2026",
        created: "Feb 1, 2026",
        totalExpected: 40,
        customFields: ["T-Shirt Size", "Department", "Matric No."],
        contributors: [
            { name: "David Musa", email: "david@mail.com", amount: "₦20,000", time: "2m ago", avatar: "DM", bg: "bg-blue-600 text-white", customData: { "T-Shirt Size": "L", "Department": "Computer Science", "Matric No.": "CSC/2022/045" } },
            { name: "Sarah Johnson", email: "sarah@mail.com", amount: "₦15,000", time: "1h ago", avatar: "SJ", bg: "bg-purple-100 text-purple-700", customData: { "T-Shirt Size": "M", "Department": "Economics", "Matric No.": "ECO/2022/112" } },
            { name: "Anonymous", email: "—", amount: "₦5,000", time: "3h ago", avatar: "AN", bg: "bg-gray-100 text-gray-500", customData: { "T-Shirt Size": "XL", "Department": "—", "Matric No.": "—" } },
            { name: "John Doe", email: "john@mail.com", amount: "₦50,000", time: "5h ago", avatar: "JD", bg: "bg-indigo-600 text-white", customData: { "T-Shirt Size": "L", "Department": "Engineering", "Matric No.": "ENG/2022/078" } },
            { name: "Grace Obi", email: "grace@mail.com", amount: "₦10,000", time: "1d ago", avatar: "GO", bg: "bg-emerald-100 text-emerald-700", customData: { "T-Shirt Size": "S", "Department": "Mass Comm", "Matric No.": "MAC/2022/033" } },
            { name: "Tunde Bakare", email: "tunde@mail.com", amount: "₦5,000", time: "2d ago", avatar: "TB", bg: "bg-amber-100 text-amber-700", customData: { "T-Shirt Size": "M", "Department": "Law", "Matric No.": "LAW/2022/019" } },
        ]
    };

    const copyLink = () => {
        navigator.clipboard.writeText(link.fullUrl);
        setCopied(true);
        pToast.success("Link copied!", "Payment link is in your clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const shareWhatsApp = () => {
        const msg = encodeURIComponent(`Hey! Please contribute to "${link.title}". Pay here: ${link.fullUrl}`);
        window.open(`https://wa.me/?text=${msg}`, "_blank");
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                    <div className="hidden lg:grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5">
                                <Skeleton className="h-9 w-9 rounded-xl mb-3" />
                                <Skeleton className="h-3 w-16 mb-2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-4">
                            <Skeleton className="h-6 w-full rounded-2xl" />
                            <Skeleton className="h-64 w-full rounded-2xl" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full rounded-2xl" />
                            <Skeleton className="h-40 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white lg:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200 shrink-0">
                            <ArrowLeft size={18} />
                        </button>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight truncate">{link.title}</h1>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-100 shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    {link.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">Created {link.created} · Due {link.deadline}</p>
                        </div>
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden lg:flex items-center gap-2">
                        <button onClick={copyLink} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy Link"}
                        </button>
                        <button onClick={shareWhatsApp} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                            <Share2 size={14} /> Share
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                            <Pause size={14} /> Pause
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                            <XCircle size={14} /> Close
                        </button>
                    </div>
                </div>

                {/* ═══ DESKTOP: Two-Column Layout ═══ */}
                <div className="hidden lg:grid grid-cols-3 gap-6">

                    {/* Left: Main (2/3) */}
                    <div className="col-span-2 space-y-6">

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: "Raised", value: link.amount_raised, icon: Wallet, bg: "bg-blue-50", color: "text-blue-600" },
                                { label: "Goal", value: link.goal, icon: Target, bg: "bg-purple-50", color: "text-purple-600" },
                                { label: "Contributors", value: `${link.contributors.length}/${link.totalExpected}`, icon: Users, bg: "bg-indigo-50", color: "text-indigo-600" },
                                { label: "Per Person", value: link.perPerson, icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-600" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5">
                                    <div className={cn("p-2 rounded-xl w-fit mb-3", s.bg)}>
                                        <s.icon size={16} className={s.color} />
                                    </div>
                                    <p className="text-xs text-gray-500">{s.label}</p>
                                    <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-900">Collection Progress</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar size={12} /> Deadline: {link.deadline}
                                </div>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${link.progress}%` }} />
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-400">{link.amount_raised} of {link.goal}</p>
                                <p className="text-sm font-bold text-blue-600">{link.progress}%</p>
                            </div>
                        </div>

                        {/* Contributors Table */}
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    Recent Payments ({link.contributors.length})
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Search size={16} /></button>
                                    <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Filter size={16} /></button>
                                    <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Download size={16} /></button>
                                    <button className="text-xs text-blue-600 font-medium hover:underline ml-1">View All</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                <div className="col-span-4">Contributor</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2 text-right">Amount</div>
                                <div className="col-span-1 text-center">Status</div>
                            </div>

                            {link.contributors.map((c, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-3.5 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0", c.bg)}>
                                            {c.avatar}
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-sm text-gray-500">{c.email}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">{c.time}</p>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <p className="text-sm font-bold text-gray-900">+{c.amount}</p>
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <Check size={16} className="text-green-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Collected Data (Custom Field Responses) */}
                        {link.customFields && link.customFields.length > 0 && (
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                        <ClipboardList className="h-4 w-4 text-purple-600" />
                                        Collected Data
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Search size={16} /></button>
                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                                            <Download size={12} /> Export CSV
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                                <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Contributor</th>
                                                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                                                {link.customFields.map((field, i) => (
                                                    <th key={i} className="text-left px-4 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{field}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {link.contributors.map((c, i) => (
                                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0", c.bg)}>
                                                                {c.avatar}
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{c.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500">{c.email}</td>
                                                    {link.customFields.map((field, fi) => (
                                                        <td key={fi} className="px-4 py-3 text-sm text-gray-700 font-medium whitespace-nowrap">
                                                            {(c as any).customData?.[field] || "—"}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Sidebar (1/3) */}
                    <div className="space-y-6">

                        {/* About */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{link.description}</p>
                        </div>

                        {/* Share Link */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Link</h3>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl mb-3 border border-gray-100">
                                <p className="text-xs text-gray-700 flex-1 truncate font-mono">{link.url}</p>
                                <button onClick={copyLink} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition shrink-0">
                                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={shareWhatsApp} className="flex-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                                    <Share2 size={14} /> WhatsApp
                                </button>
                                <button className="flex-1 text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                                    <QrCode size={14} /> QR Code
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
                            <div className="space-y-3 text-sm">
                                {[
                                    { label: "Type", value: "Fixed Amount" },
                                    { label: "Created", value: link.created },
                                    { label: "Deadline", value: link.deadline },
                                    { label: "Remaining", value: "₦150,000" },
                                ].map((d, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-gray-500">{d.label}</span>
                                        <span className="font-medium text-gray-900">{d.value}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 capitalize">{link.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ MOBILE VIEW ═══ */}
                <div className="lg:hidden space-y-5 pb-32">

                    {/* About & Share Link */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                        <div>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{link.description}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Payment Link</h3>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs text-blue-600 flex-1 truncate font-mono font-medium">{link.url}</p>
                                <button onClick={copyLink} className="p-1.5 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 transition shrink-0 active:scale-95">
                                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="p-2 w-fit rounded-lg bg-blue-50 text-blue-600 mb-3"><Wallet size={16} /></div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Raised</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{link.amount_raised}</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="p-2 w-fit rounded-lg bg-purple-50 text-purple-600 mb-3"><Target size={16} /></div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Goal</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{link.goal}</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="p-2 w-fit rounded-lg bg-indigo-50 text-indigo-600 mb-3"><Users size={16} /></div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contributors</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{link.contributors.length}/{link.totalExpected}</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 mb-3"><TrendingUp size={16} /></div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Per Person</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{link.perPerson}</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-sm font-bold text-gray-900">Progress</span>
                            <span className="text-sm font-bold text-blue-600">{link.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${link.progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between mt-3 text-xs">
                            <span className="text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100">₦150,000 remaining</span>
                            <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                <Calendar size={12} className="text-gray-400" /> Due {link.deadline}
                            </span>
                        </div>
                    </div>

                    {/* Collected Data (Mobile) */}
                    {link.customFields && link.customFields.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <ClipboardList className="h-4 w-4 text-purple-600" />
                                    Responses
                                </h3>
                                <button className="p-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 shadow-sm"><Download size={14} /></button>
                            </div>

                            <div className="space-y-3">
                                {link.contributors.slice(0, 3).map((c, i) => (
                                    <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                        <p className="text-xs font-bold text-gray-900 mb-2">{c.name}</p>
                                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                                            {link.customFields.map((field, fi) => (
                                                <div key={fi}>
                                                    <span className="text-gray-400 block mb-0.5">{field}</span>
                                                    <span className="font-medium text-gray-800">{(c as any).customData?.[field] || "—"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50/50 rounded-lg">View All Responses</button>
                        </div>
                    )}

                    {/* Contributors List */}
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                Recent Payments
                            </h3>
                            <button className="text-xs font-bold text-blue-600">View All</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {link.contributors.map((c, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm", c.bg)}>
                                            {c.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{c.name}</p>
                                            <p className="text-[11px] font-medium text-gray-400 mt-0.5">{c.time} • {c.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-emerald-600 text-sm block">+{c.amount}</span>
                                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase mt-0.5 inline-block border border-emerald-100">Paid</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Actions */}
                <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 flex gap-3 lg:hidden">
                    <button
                        onClick={copyLink}
                        className="flex-1 bg-white border border-gray-200 text-gray-900 py-3 rounded-full font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy Link"}
                    </button>
                    <button
                        onClick={shareWhatsApp}
                        className="flex-[2] bg-blue-600 text-white py-3 rounded-full font-semibold text-sm shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-700"
                    >
                        <Share2 size={16} /> Share Link
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
