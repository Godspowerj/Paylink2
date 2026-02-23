import {
    Plus,
    Wallet,
    Layers,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
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

// import required modules
import { data, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth";
import DashboardShimmer from "~/components/shimmers/dashboard-shimmer";
import { getGreeting } from "~/lib/utils";


export default function Dashboard() {

    const { user} = useAuth();

    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className="space-y-10">

                {/* HEADER */}
                <div className="hidden lg:flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            {getGreeting()}, {user.firstName}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Track collections and monitor payments in real-time
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/collections/create")}
                        className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-blue-700 transition text-white px-5 py-3 rounded-[24px] text-sm font-medium"
                    >
                        <Plus size={18} />
                        Create Collection
                    </button>
                </div>

                {/* STATS GRID */}
                <Swiper
                    slidesPerView={1.20}
                    spaceBetween={16}
                    pagination={{
                        clickable: true,
                    }}
                    className=""
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3.2,
                        },
                        1084: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    <SwiperSlide>
                        {/* TOTAL COLLECTED */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 transition">
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-xl bg-blue-50">
                                    <Wallet className="text-blue-600" size={20} />
                                </div>
                                <div className="flex items-center text-green-600 text-sm font-medium gap-1">
                                    <TrendingUp size={16} />
                                    +12.4%
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Total Collected</p>
                                <h2 className="text-2xl font-semibold mt-1 text-gray-900">
                                    ₦1,250,000
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        {/* ACTIVE COLLECTIONS */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 transition">
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-xl bg-purple-50">
                                    <Layers className="text-purple-600" size={20} />
                                </div>
                                <span className="text-sm text-gray-500">
                                    4 running
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Active Collections</p>
                                <h2 className="text-2xl font-semibold mt-1 text-gray-900">
                                    4
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        {/* CLOSED COLLECTIONS */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 transition">
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-xl bg-green-50">
                                    <CheckCircle2 className="text-green-600" size={20} />
                                </div>
                                <span className="text-sm text-gray-500">
                                    Lifetime
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Closed Collections</p>
                                <h2 className="text-2xl font-semibold mt-1 text-gray-900">
                                    12
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        {/* CONTRIBUTORS */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 transition">
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-xl bg-indigo-50">
                                    <Users className="text-indigo-600" size={22} />
                                </div>
                                <span className="text-sm text-gray-500">
                                    Contributors
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Total Contributors</p>
                                <h2 className="text-2xl font-semibold mt-1 text-gray-900">
                                    186
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* COLLECTIONS SECTION */}
                <div className="space-y-6 rounded-2xl">

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Active Collections
                        </h2>

                        <button className="text-sm font-medium text-blue-600 hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-5">

                        {[1, 2].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl p-6 transition"
                            >

                                {/* TOP ROW */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Final Year Project Dues
                                            </h3>

                                            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                                Active
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">

                                            <div className="flex items-center gap-1">
                                                <Users size={16} />
                                                32 contributors
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Calendar size={16} />
                                                Deadline: Mar 20, 2026
                                            </div>

                                        </div>
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                                            <Copy size={16} />
                                            Copy Link
                                        </button>

                                        <button className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
                                            <Eye size={16} />
                                            View
                                        </button>
                                    </div>
                                </div>

                                {/* PROGRESS SECTION */}
                                <div className="mt-6">

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Amount Collected
                                            </p>
                                            <p className="text-xl font-semibold text-gray-900 mt-1">
                                                ₦300,000
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                Target
                                            </p>
                                            <p className="text-lg font-medium text-gray-900 mt-1">
                                                ₦500,000
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: "60%" }}
                                            />
                                        </div>

                                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                                            <span>60% completed</span>
                                            <span>₦200,000 remaining</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>
                {/* RECENT PAYMENTS */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Payments
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">

                        {[
                            {
                                name: "David Musa",
                                collection: "Project Dues",
                                amount: "₦20,000",
                                date: "Feb 14, 2026",
                            },
                            {
                                name: "Grace John",
                                collection: "Birthday Fund",
                                amount: "₦15,000",
                                date: "Feb 13, 2026",
                            },
                        ].map((payment, index) => (
                            <div
                                key={index}
                                className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {payment.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {payment.collection}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="font-semibold text-gray-900">
                                        {payment.amount}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {payment.date}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
