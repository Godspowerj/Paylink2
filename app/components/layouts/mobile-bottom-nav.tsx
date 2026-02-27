import { Link, useLocation } from "react-router";
import { LayoutDashboard, Layers, CreditCard, FileText, Settings } from "lucide-react";
import { cn } from "~/lib/utils";

export function MobileBottomNav() {
    const location = useLocation();

    const navItems = [
        { label: "Home", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Collections", icon: Layers, path: "/collections" },
        { label: "Payments", icon: CreditCard, path: "/payments" },
        { label: "Invoices", icon: FileText, path: "/invoices" },
        { label: "Settings", icon: Settings, path: "/settings" },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-50 px-4 py-2 pb-6 safe-area-bottom z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pointer-events-auto">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = item.path === "/dashboard"
                        ? location.pathname === "/dashboard"
                        : location.pathname.startsWith(item.path);

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
