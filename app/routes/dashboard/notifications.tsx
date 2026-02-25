import { useState } from "react";
import {
    Check,
    Bell,
    MoreHorizontal,
    CreditCard,
    Megaphone,
    AlertTriangle,
    Clock,
    ArrowLeft
} from "lucide-react";
import AppLayout from "~/components/layouts/app-layout";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { cn } from "~/lib/utils";

// Mock Data
const initialNotifications = [
    {
        id: "1",
        type: "payment_received",
        title: "Payment Received",
        message: "David Musa paid ₦20,000 for 'Final Year Project Dues'.",
        time: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
        read: false,
    },
    {
        id: "2",
        type: "system_alert",
        title: "Maintenance Scheduled",
        message: "Paylink will be undergoing maintenance on Feb 20th from 2AM to 4AM.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
    },
    {
        id: "3",
        type: "payment_failed",
        title: "Payment Failed",
        message: "A payment attempt of ₦5,000 failed for 'Departmental Dinner'.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: true,
    },
    {
        id: "4",
        type: "general",
        title: "Welcome to Paylink!",
        message: "Get started by creating your first collection.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case "payment_received":
            return <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100"><CreditCard size={18} /></div>;
        case "payment_failed":
            return <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 border border-red-100"><AlertTriangle size={18} /></div>;
        case "system_alert":
            return <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><Megaphone size={18} /></div>;
        default:
            return <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100"><Bell size={18} /></div>;
    }
};

export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState("all"); // all, unread
    const navigate = useNavigate();

    const filteredNotifications = notifications.filter(n => {
        if (filter === "unread") return !n.read;
        return true;
    });

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="max-w-3xl mx-auto pb-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
                            <p className="text-sm text-gray-500">Stay updated on payments and activity</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1 rounded-xl border border-gray-100 flex gap-1 shadow-sm">
                            <button
                                onClick={() => setFilter("all")}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
                                    filter === "all" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("unread")}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
                                    filter === "unread" ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                Unread
                            </button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white hover:bg-gray-50 text-gray-600 text-xs h-9 rounded-xl border-gray-100 shadow-sm"
                            onClick={markAllAsRead}
                        >
                            <Check size={14} className="mr-1.5" strokeWidth={3} /> Mark all read
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                    {filteredNotifications.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-5 flex gap-4 group transition-colors hover:bg-gray-50/50",
                                        !notification.read ? "bg-blue-50/20" : ""
                                    )}
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        {getIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={cn(
                                                "text-sm font-bold truncate",
                                                !notification.read ? "text-gray-900" : "text-gray-600"
                                            )}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-full">
                                                <Clock size={10} strokeWidth={2.5} />
                                                {formatDistanceToNow(notification.time, { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className={cn(
                                            "text-sm leading-relaxed",
                                            !notification.read ? "text-gray-700 font-medium" : "text-gray-500"
                                        )}>
                                            {notification.message}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col items-end gap-3">
                                        {!notification.read && (
                                            <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" title="Unread" />
                                        )}

                                        <div className="lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-100 rounded-full">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-xl">
                                                    {!notification.read && (
                                                        <DropdownMenuItem onClick={() => markAsRead(notification.id)} className="text-xs font-semibold">
                                                            Mark as read
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="text-xs font-semibold text-red-600 focus:text-red-700 focus:bg-red-50"
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                                <Bell className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications</h3>
                            <p className="text-gray-500 text-sm max-w-xs font-medium">
                                {filter === "unread" ? "You're all caught up! No unread notifications." : "You don't have any notifications yet."}
                            </p>
                            {filter === "unread" && (
                                <Button variant="link" onClick={() => setFilter("all")} className="mt-4 text-blue-600 font-bold">
                                    View all notifications
                                </Button>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}
