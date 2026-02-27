import { Link, useNavigate } from "react-router";
import { Plus, Search, FolderOpen, Filter, MoreHorizontal, Copy, ExternalLink, Eye, Calendar, Users, TrendingUp, Layers } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};


const collections = [
  { id: "1", name: "Final Year Project Dues", description: "Final year class dues collection", collected: "₦300,000", target: "₦500,000", contributors: 32, status: "active", date: "Dec 15, 2025", deadline: "Mar 20, 2026", progress: 60 },
  { id: "2", name: "Class Dues — 400L", description: "Semester class dues for all activities", collected: "₦85,000", target: "₦150,000", contributors: 17, status: "active", date: "Dec 10, 2025", deadline: "Apr 1, 2026", progress: 57 },
  { id: "3", name: "Birthday Gift for Tola", description: "Surprise birthday gift fund", collected: "₦42,000", target: "₦50,000", contributors: 14, status: "active", date: "Dec 8, 2025", deadline: "Feb 28, 2026", progress: 84 },
  { id: "4", name: "Office Lunch Fund", description: "Weekly office lunch collection", collected: "₦18,500", target: "₦30,000", contributors: 7, status: "active", date: "Dec 5, 2025", deadline: "Mar 5, 2026", progress: 62 },
  { id: "5", name: "Charity Drive 2025", description: "End of year charity collection", collected: "₦250,000", target: "₦250,000", contributors: 50, status: "closed", date: "Nov 30, 2025", deadline: "Dec 31, 2025", progress: 100 },
  { id: "6", name: "Team Jersey Fund", description: "Football team jersey contributions", collected: "₦120,000", target: "₦120,000", contributors: 24, status: "closed", date: "Nov 15, 2025", deadline: "Dec 15, 2025", progress: 100 },
];

export default function Collections() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");
  const navigate = useNavigate();

  const filtered = collections.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: collections.length,
    active: collections.filter(c => c.status === "active").length,
    closed: collections.filter(c => c.status === "closed").length,
    totalCollected: "₦815,500",
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Collections</h1>
            <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Manage and track all your payment collections</p>
          </div>
          <Link
            to="/collections/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </Link>
        </div>

        {/* ═══ DESKTOP: Stats Row ═══ */}
        <motion.div variants={container} initial="hidden" animate="show" className="hidden lg:grid grid-cols-4 gap-4">
          {[
            { label: "Total Collections", value: stats.total, icon: Layers, bg: "bg-blue-50", color: "text-blue-600" },
            { label: "Active", value: stats.active, icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-600" },
            { label: "Completed", value: stats.closed, icon: FolderOpen, bg: "bg-gray-50", color: "text-gray-600" },
            { label: "Total Collected", value: stats.totalCollected, icon: Users, bg: "bg-purple-50", color: "text-purple-600" },
          ].map((s, i) => (
            <motion.div variants={itemAnim} key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:border-gray-200 transition-colors">
              <div className={cn("p-2.5 rounded-xl", s.bg)}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <h3 className="text-xl font-bold text-gray-900 leading-none tracking-tight">{s.value}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                )}
              >
                {f === "all" ? `All (${stats.total})` : f === "active" ? `Active (${stats.active})` : `Closed (${stats.closed})`}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ DESKTOP TABLE VIEW ═══ */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <div className="col-span-4">Collection</div>
            <div className="col-span-2 text-right">Collected / Target</div>
            <div className="col-span-2 text-center">Progress</div>
            <div className="col-span-1 text-center">Contributors</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <FolderOpen className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">No collections</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div variants={container} initial="hidden" animate="show">
              {filtered.map((col) => (
                <motion.div
                  variants={itemAnim}
                  key={col.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/collections/${col.id}`)}
                >
                  <div className="col-span-4">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{col.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{col.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar size={10} /> Created {col.date} · Due {col.deadline}
                    </p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-bold text-gray-900">{col.collected}</p>
                    <p className="text-[11px] text-gray-400">of {col.target}</p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", col.progress >= 100 ? "bg-emerald-500" : col.progress >= 80 ? "bg-green-500" : "bg-blue-600")}
                          style={{ width: `${col.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-10 text-right">{col.progress}%</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-sm font-semibold text-gray-700">{col.contributors}</span>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize border",
                      col.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    )}>
                      {col.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="View">
                      <Eye size={15} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Copy Link">
                      <Copy size={15} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Share">
                      <ExternalLink size={15} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="More Options"><MoreHorizontal size={14} /></button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ═══ MOBILE CARD VIEW ═══ */}
        <div className="lg:hidden space-y-3">
          {filtered.map((col) => (
            <Link key={col.id} to={`/collections/${col.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-colors cursor-pointer mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{col.name}</p>
                      <span className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full capitalize",
                        col.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {col.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{col.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                  <span>{col.contributors} contributors</span>
                  <span className="font-semibold text-gray-900">{col.collected} / {col.target}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    className={cn("h-full rounded-full", col.progress >= 100 ? "bg-emerald-500" : "bg-blue-600")}
                    style={{ width: `${col.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No collections found</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
