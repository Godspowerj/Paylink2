import { Search, Users as UsersIcon, Download, Filter, MoreHorizontal, Mail, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { PageSkeleton } from "~/components/ui/skeleton";
import { toast } from "sonner";

const contributors = [
  { name: "Adebayo James", email: "adebayo@email.com", totalPaid: "₦25,000", collections: 5, lastPayment: "Dec 20, 2025", avatar: "AJ", bg: "bg-blue-600 text-white" },
  { name: "Fatima Bello", email: "fatima@email.com", totalPaid: "₦18,000", collections: 3, lastPayment: "Dec 19, 2025", avatar: "FB", bg: "bg-purple-100 text-purple-700" },
  { name: "Chidi Okafor", email: "chidi@email.com", totalPaid: "₦42,000", collections: 7, lastPayment: "Dec 18, 2025", avatar: "CO", bg: "bg-emerald-100 text-emerald-700" },
  { name: "Ngozi Eze", email: "ngozi@email.com", totalPaid: "₦15,000", collections: 3, lastPayment: "Dec 17, 2025", avatar: "NE", bg: "bg-amber-100 text-amber-700" },
  { name: "Samuel Tunde", email: "samuel@email.com", totalPaid: "₦8,500", collections: 2, lastPayment: "Dec 16, 2025", avatar: "ST", bg: "bg-indigo-600 text-white" },
  { name: "Aisha Mohammed", email: "aisha@email.com", totalPaid: "₦32,000", collections: 6, lastPayment: "Dec 16, 2025", avatar: "AM", bg: "bg-pink-100 text-pink-700" },
  { name: "Emeka Nwosu", email: "emeka@email.com", totalPaid: "₦10,000", collections: 2, lastPayment: "Dec 15, 2025", avatar: "EN", bg: "bg-gray-100 text-gray-600" },
  { name: "Blessing Adekunle", email: "blessing@email.com", totalPaid: "₦20,000", collections: 4, lastPayment: "Dec 14, 2025", avatar: "BA", bg: "bg-sky-100 text-sky-700" },
];

export default function Contributors() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = contributors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalContributions = "₦170,500";

  if (loading) {
    return <AppLayout><PageSkeleton /></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Contributors</h1>
            <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Everyone who has contributed to your collections</p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => toast.success("Exporting contributors...")} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {[
            { label: "Total Contributors", value: contributors.length, icon: UsersIcon, bg: "bg-blue-50", color: "text-blue-600" },
            { label: "Total Contributed", value: totalContributions, icon: Wallet, bg: "bg-emerald-50", color: "text-emerald-600" },
            { label: "Avg. per Person", value: "₦21,312", icon: TrendingUp, bg: "bg-purple-50", color: "text-purple-600" },
            { label: "Active This Month", value: "5", icon: ArrowUpRight, bg: "bg-indigo-50", color: "text-indigo-600" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl", s.bg)}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1 lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-600 outline-none text-sm placeholder:text-gray-400 transition-all"
            />
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <button className="px-4 py-2 bg-white rounded-xl text-xs font-medium text-gray-600 border border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <div className="col-span-3">Contributor</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2 text-right">Total Paid</div>
            <div className="col-span-1 text-center">Collections</div>
            <div className="col-span-2">Last Payment</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <UsersIcon className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">No contributors found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
            </div>
          ) : (
            filtered.map((c, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors group">
                <div className="col-span-3 flex items-center gap-3">
                  <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0", c.bg)}>
                    {c.avatar}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-sm font-bold text-gray-900">{c.totalPaid}</p>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-sm font-semibold text-gray-700">{c.collections}</span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">{c.lastPayment}</p>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Email">
                    <Mail size={15} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0", c.bg)}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate">{c.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{c.totalPaid}</p>
                  <p className="text-[10px] text-gray-500">{c.collections} collections</p>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No contributors found</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
