import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, PlusCircle, Settings, LogOut, Link2, X, Menu, BellIcon, Layers, Users, FolderOpen, Plus, User, LinkIcon } from "lucide-react";
import { useState } from "react";
import Logo from "../logo";
import { ChevronDownIcon, DashboardIcon, Layers01Icon, LayersIcon, LogoutIcon, MenuIcon, NotificationIcon, SettingsIcon, UserIcon, UserMultipleIcon } from "../svgs";
import { cn, getGreeting } from "~/lib/utils";
import { useAuth } from "~/contexts/auth";


import { MobileBottomNav } from "./mobile-bottom-nav";


const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Create Collection", to: "/create", icon: PlusCircle },
  { label: "Settings", to: "/settings", icon: Settings },
];

const AppLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {

  const { user } = useAuth();
  const location = useLocation();
  const [open, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => setMobileOpen(false);

  return (
    <div className={cn("w-full min-h-screen bg-background", className)}>
      {/* Top Navbar */}
      <header className="lg:sticky lg:top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="flex h-18 items-center justify-between px-5">
          <div className="hidden lg:block">
            <Logo />
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="cursor-pointer p-[10px] rounded-[32px] -bg-[#f4f5f6] flex lg:hidden items-center text-[#141517] gap-2"
          >
            <div
              className="h-[40px] w-[40px] bg-blue-600 rounded-full flex items-center justify-center text-white -shadow-sm -shadow-blue-200"
            >
              <Link2 size={20} className="-rotate-45" />
            </div>
            <div
              className="text-[14px] max-w-[90px] truncate text-left"
            >
              <p className="text-[12px] leading-[12px] mb-[4px] text-gray-500">
                {getGreeting()},
              </p>
              <h2 className="text-[17px] leading-[17px] font-medium">
                {user.firstName}
              </h2>
            </div>
          </button>
          <nav className="items-center gap-2 flex">
            <Link to="/notifications" className="cursor-pointer h-[50px] w-[50px] rounded-full bg-[#f4f5f6] grid place-items-center">
              <NotificationIcon />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="cursor-pointer p-[10px] rounded-[32px] bg-[#f4f5f6] hidden lg:flex items-center text-[#141517] gap-2"
            >
              <figure className="rounded-full h-[30px] w-[30px] shrink-0">
                <img
                  src="/avatar.jpg"
                  alt="Profile"
                  className="rounded-full h-[30px] w-[30px] object-cover"
                />
              </figure>
              <div
                className="text-[14px] min-w-[40px] max-w-[90px] truncate text-left hidden md:block">
                {user.firstName}
              </div>
              <ChevronDownIcon className="hidden md:block" />
              <MenuIcon
                className="md:hidden"
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile nav (Drawer) */}
      <div className={cn("fixed inset-0 z-[7788]", open ? "visible" : "invisible")}>
        <div
          onClick={onClose}
          className={`fixed w-full h-screen inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 touch-none z-[8888] ${open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        />
        <div
          className={`fixed top-0 h-screen w-[260px] bg-white shadow-xl z-[9999] transform transition-all duration-300 ease-in-out ${open ? "left-0" : "left-[-260px]"
            }`}
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
              { label: "Profile", icon: <UserIcon />, link: "/profile" },
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

      <div className="w-full px-5 pt-6 pb-24 lg:pb-10">
        {children}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default AppLayout;
