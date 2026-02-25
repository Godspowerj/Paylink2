import { useState } from "react";
import { ArrowLeft, Share2, MoreHorizontal, QrCode, Copy, Check, Wallet, Calendar, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";

export default function LinkDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [copied, setCopied] = useState(false);

    // Mock Data
    const link = {
        title: "Final Year Project Dues",
        url: "paylink.app/pay/fyp-2026",
        amount_raised: "₦350,000",
        goal: "₦500,000",
        progress: 70,
        status: "Active",
        deadline: "Mar 20, 2026",
        contributors: [
            { name: "David Musa", amount: "₦20,000", time: "2m ago", avatar: "DM", bg: "bg-blue-600 text-white" },
            { name: "Sarah J.", amount: "₦15,000", time: "1h ago", avatar: "SJ", bg: "bg-purple-100 text-purple-700" },
            { name: "Anonymous", amount: "₦5,000", time: "3h ago", avatar: "AN", bg: "bg-gray-100 text-gray-500" },
            { name: "John Doe", amount: "₦50,000", time: "5h ago", avatar: "JD", bg: "bg-indigo-600 text-white" },
        ]
    };

    const copyLink = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="space-y-8 pb-40 lg:pb-8">

                {/* Header */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
                                <QrCode size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                            {link.title}
                        </h1>
                        <div className="flex items-center gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {link.status}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1.5">
                                <Calendar size={14} /> Due {link.deadline}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-blue-600 mb-4">
                            <Wallet size={20} />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Raised</p>
                        <p className="text-xl font-semibold text-gray-900 mt-1 tracking-tight">{link.amount_raised}</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <div className="p-2.5 w-fit rounded-lg bg-gray-100 text-gray-600 mb-4">
                            <TrendingUp size={20} />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Goal</p>
                        <p className="text-xl font-semibold text-gray-900 mt-1 tracking-tight">{link.goal}</p>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-sm font-semibold text-gray-900">Collection Progress</span>
                        <span className="text-sm font-medium text-blue-600">{link.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${link.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-right">₦200,000 remaining</p>
                </div>

                {/* Contributors List */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {link.contributors.map((c, i) => (
                            <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3.5">
                                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs", c.bg)}>
                                        {c.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{c.time}</p>
                                    </div>
                                </div>
                                <span className="font-semibold text-gray-900 text-sm">+{c.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 flex gap-3 lg:bottom-0 lg:left-[240px] lg:relative lg:border-0 lg:p-0 lg:mt-6">
                <button
                    onClick={copyLink}
                    className="flex-1 bg-white border border-gray-200 text-gray-900 py-3.5 rounded-full font-semibold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    {copied ? "Copied" : "Copy Link"}
                </button>
                <button className="flex-[2] bg-blue-600 text-white py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-700">
                    <Share2 size={18} /> Share Link
                </button>
            </div>
        </AppLayout>
    );
}
