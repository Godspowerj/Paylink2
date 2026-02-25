import { useState } from "react";
import { Search, Plus, Filter, Link2, ChevronDown, Layers } from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";

export default function PaymentLinks() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("active");

    const links = [
        {
            id: "PL-8821",
            title: "Project Dues 2026",
            amount: "₦350,000",
            contributors: 24,
            date: "Mar 10",
            status: "Active",
            color: "text-green-600 bg-green-50"
        },
        {
            id: "PL-8822",
            title: "Department Dinner",
            amount: "₦120,000",
            contributors: 15,
            date: "Feb 28",
            status: "Active",
            color: "text-blue-600 bg-blue-50"
        },
        {
            id: "PL-8810",
            title: "Charity Drive",
            amount: "₦45,000",
            contributors: 42,
            date: "Paused",
            status: "Ended",
            color: "text-gray-600 bg-gray-100"
        }
    ];

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="space-y-6">

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={cn(
                            "pb-3 text-sm font-medium transition-all duration-200 relative",
                            activeTab === 'active' ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Active
                        {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('archived')}
                        className={cn(
                            "pb-3 text-sm font-medium transition-all duration-200 relative",
                            activeTab === 'archived' ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Archived
                        {activeTab === 'archived' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                </div>

                {/* Search */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search collections"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-blue-600 outline-none text-sm font-medium placeholder:text-gray-400 transition-all"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    <button className="px-4 py-2 bg-white rounded-lg text-xs font-medium text-gray-600 border border-gray-200 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50 transition-colors">
                        <Layers size={14} className="text-gray-500" /> Sort by date <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    <button className="px-4 py-2 bg-white rounded-lg text-xs font-medium text-gray-600 border border-gray-200 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50 transition-colors">
                        <Filter size={14} className="text-gray-500" /> All status <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {links.map((link, i) => (
                        <div key={i} onClick={() => navigate(`/collections/${link.id}`)} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer group">
                            {/* Top Row: Icon, Title, Amount */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Link2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-base tracking-tight">{link.title}</h3>
                                        <p className="text-sm text-gray-500 mt-0.5">{link.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 text-lg">{link.amount}</p>
                                    <p className="text-xs font-medium text-gray-500 mt-1">{link.date}</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 w-full mb-4"></div>

                            {/* Bottom Row: Contributors & Status */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                        {link.contributors}
                                    </div>
                                    <span className="text-sm text-gray-600">people paid</span>
                                </div>

                                <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", link.color)}>
                                    {link.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </AppLayout>
    );
}
