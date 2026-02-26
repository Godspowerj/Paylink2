import { Link, useLocation, useNavigate } from "react-router";
import { X, LayoutDashboard, Layers, Users, Settings, CreditCard, Bell, BarChart3, FileText, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import Logo from "../logo";
import { ChevronDownIcon, DashboardIcon, Layers01Icon, LogoutIcon, MenuIcon, NotificationIcon, SettingsIcon, UserIcon } from "../svgs";
import { cn, getGreeting } from "~/lib/utils";
import { useAuth } from "~/contexts/auth";
import { MobileBottomNav } from "./mobile-bottom-nav";


// Desktop sidebar nav items
const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Collections", icon: Layers, path: "/collections" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Contributors", icon: Users, path: "/contributors" },
  { label: "Invoices", icon: FileText, path: "/invoices" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const AppLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {

  const { user } = useAuth();
  const location = useLocation();
  const [open, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => setMobileOpen(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={cn("w-full min-h-screen bg-background overflow-x-hidden", className)}>

      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[240px] lg:flex-col bg-white border-r border-gray-100 z-40">
        {/* Logo */}
        <div className="px-6 h-[72px] flex items-center border-b border-gray-100">
          <Logo />
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section — Profile */}
        <div className="px-3 py-4 border-t border-gray-100">
          <Link to="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <img
              src={user.avatar || "/avatar.jpg"}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-gray-400 truncate">{user.email || "View Profile"}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="lg:pl-[240px]">

        {/* ═══ TOP NAVBAR ═══ */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
          <div className="flex h-[64px] items-center justify-between px-5 lg:px-8">
            {/* Mobile: Avatar + Greeting */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden items-center gap-3 text-left"
            >
              <img
                src={user.avatar || "/avatar.jpg"}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <p className="text-[13px] text-gray-500 leading-tight">
                  {getGreeting()},
                </p>
                <h2 className="text-[17px] font-semibold text-gray-900 leading-tight mt-0.5">
                  {user.firstName}
                </h2>
              </div>
            </button>

            {/* Desktop: Breadcrumb / page context (empty for now, acts as spacer) */}
            <div className="hidden lg:block" />

            {/* Right side nav */}
            <nav className="items-center gap-2 flex">
              <Link to="/notifications" className="cursor-pointer h-[44px] w-[44px] rounded-full bg-[#f4f5f6] grid place-items-center hover:bg-gray-200 transition-colors relative">
                <NotificationIcon />
                {/* Notification dot */}
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              </Link>
              {/* Desktop: Mini profile (in header) */}
              <button
                onClick={() => navigate("/profile")}
                className="cursor-pointer p-[10px] rounded-[32px] bg-[#f4f5f6] hover:bg-gray-200 transition-colors hidden lg:flex items-center text-[#141517] gap-2"
              >
                <figure className="rounded-full h-[30px] w-[30px] shrink-0">
                  <img
                    src={user.avatar || "/avatar.jpg"}
                    alt="Profile"
                    className="rounded-full h-[30px] w-[30px] object-cover"
                  />
                </figure>
                <div
                  className="text-[14px] min-w-[40px] max-w-[90px] truncate text-left hidden md:block">
                  {user.firstName}
                </div>
                <ChevronDownIcon className="hidden md:block" />
              </button>
            </nav>
          </div>
        </header>

        {/* ═══ MOBILE DRAWER ═══ */}
        <div className={cn("fixed inset-0 z-[7788]", open ? "visible" : "invisible")}>
          <div
            onClick={onClose}
            className={`fixed w-full h-screen inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 touch-none z-[8888] ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
          />
          <div
            className={`fixed top-0 h-screen w-[260px] bg-white shadow-xl z-[9999] transform transition-all duration-300 ease-in-out ${open ? "left-0" : "left-[-260px]"}`}
          >
            <div className="flex items-center justify-between px-5 py-[24px]">
              <div />
              <button
                onClick={onClose}
                className="h-[44px] w-[44px] rounded-full border border-[#e2e2e2] transition grid place-items-center"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {[
                { label: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
                { label: "Collections", icon: <Layers01Icon />, link: "/collections" },
                { label: "Payments", icon: <DashboardIcon />, link: "/payments" },
                { label: "Contributors", icon: <UserIcon />, link: "/contributors" },
                { label: "Business Profile", icon: <UserIcon />, link: "/profile" },
                { label: "Settings", icon: <SettingsIcon />, link: "/settings" },
                { label: "Logout", icon: <LogoutIcon />, link: "/logout" },
              ].map((item, i) => (
                <button
                  onClick={() => {
                    onClose();
                    navigate(item.link);
                  }}
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <div className="w-[26px] h-[26px] grid place-items-center">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ═══ PAGE CONTENT ═══ */}
        <div className="w-full max-w-full overflow-x-hidden px-5 lg:px-8 pt-2 lg:pt-6 pb-24 lg:pb-10">
          {children}
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
