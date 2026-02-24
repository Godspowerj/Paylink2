import { Link, useLocation } from "react-router";
import { LayoutDashboard, Layers, Plus, FileText, Settings } from "lucide-react";
import { cn } from "~/lib/utils";

export function MobileBottomNav() {
    const location = useLocation();

    const navItems = [
        { label: "Home", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Links", icon: Layers, path: "/dashboard/links" }, // Update these if routes change
        { label: "Add", icon: Plus, path: "/collections/create", isAction: true },
        { label: "Invoices", icon: FileText, path: "/dashboard/invoices" },
        { label: "Settings", icon: Settings, path: "/settings" },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-50 px-4 py-2 pb-6 safe-area-bottom z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = item.path === "/dashboard"
                        ? location.pathname === "/dashboard"
                        : location.pathname.startsWith(item.path);

                    if (item.isAction) {
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className="flex flex-col items-center -mt-8 relative"
                            >
                                <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 border-4 border-white active:scale-95 transition-transform">
                                    <Plus size={28} strokeWidth={3} />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="flex flex-col items-center gap-1.5 min-w-[60px] group py-1"
                        >
                            <div className={cn(
                                "transition-all duration-300",
                                isActive ? "text-blue-600 scale-110" : "text-gray-400 group-hover:text-gray-600"
                            )}>
                                <item.icon
                                    size={22}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={cn(
                                "text-[10px] font-semibold transition-colors",
                                isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
