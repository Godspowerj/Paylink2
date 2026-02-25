import { Link } from "react-router";
import { Plus, Search, FolderOpen } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import AppLayout from "~/components/layouts/app-layout";

const collections = [
  { id: "1", name: "Class Dues — 400L", description: "Final year class dues collection", collected: "₦85,000", target: "₦150,000", contributors: 17, status: "active", date: "Dec 15, 2025" },
  { id: "2", name: "Birthday Gift for Tola", description: "Surprise birthday gift fund", collected: "₦42,000", target: "₦50,000", contributors: 14, status: "active", date: "Dec 10, 2025" },
  { id: "3", name: "Office Lunch Fund", description: "Weekly office lunch collection", collected: "₦18,500", target: "₦30,000", contributors: 7, status: "active", date: "Dec 8, 2025" },
  { id: "4", name: "Charity Drive 2025", description: "End of year charity collection", collected: "₦250,000", target: "₦250,000", contributors: 50, status: "closed", date: "Nov 30, 2025" },
  { id: "5", name: "Team Jersey Fund", description: "Football team jersey contributions", collected: "₦120,000", target: "₦120,000", contributors: 24, status: "closed", date: "Nov 15, 2025" },
];

export default function Collections() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");

  const filtered = collections.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout className="bg-[#f4f5f6]">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
          <Link
            to="/collections/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-full text-xs font-medium capitalize transition-colors ${filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Collection List */}
        <div className="space-y-3">
          {filtered.map((col) => (
            <Link key={col.id} to={`/collections/${col.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-colors cursor-pointer mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{col.name}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${col.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
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
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${Math.min(
                        (parseInt(col.collected.replace(/[₦,]/g, "")) /
                          parseInt(col.target.replace(/[₦,]/g, ""))) *
                        100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No collections found</p>
            </div>
          )}
        </div>
      </div >
    </AppLayout >
  );
}
