import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Copy,
  Share2,
  Pause,
  XCircle,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ExternalLink,
  Download,
  MoreHorizontal,
  Search,
  Filter,
  Wallet,
  Target,
} from "lucide-react";
import { pToast } from "~/lib/toast";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";

const collectionData = {
  id: "1",
  name: "Class Dues — 400L",
  description: "Final year class dues collection for graduation activities, excursion, and dinner.",
  amountType: "fixed",
  amount: "₦5,000",
  collected: "₦85,000",
  target: "₦150,000",
  contributors: 17,
  totalExpected: 30,
  status: "active",
  deadline: "Jan 31, 2026",
  created: "Dec 15, 2025",
  link: "https://paylink.app/pay/cls-400l",
};

const contributorsList = [
  { name: "Adebayo James", email: "adebayo@mail.com", amount: "₦5,000", date: "Dec 20, 2025", status: "paid" },
  { name: "Fatima Bello", email: "fatima@mail.com", amount: "₦5,000", date: "Dec 19, 2025", status: "paid" },
  { name: "Chidi Okafor", email: "chidi@mail.com", amount: "₦5,000", date: "Dec 18, 2025", status: "paid" },
  { name: "Ngozi Eze", email: "ngozi@mail.com", amount: "₦5,000", date: "Dec 17, 2025", status: "paid" },
  { name: "Samuel Tunde", email: "samuel@mail.com", amount: "₦5,000", date: "Dec 16, 2025", status: "paid" },
  { name: "Aisha Mohammed", email: "aisha@mail.com", amount: "₦5,000", date: "Dec 16, 2025", status: "paid" },
  { name: "Emeka Nwosu", email: "emeka@mail.com", amount: "₦5,000", date: "Dec 15, 2025", status: "paid" },
];

export default function CollectionDetails() {
  const { id } = useParams();
  const progress = 57;

  const copyLink = () => {
    navigator.clipboard.writeText(collectionData.link);
    pToast.success("Link copied!", "Payment link is in your clipboard");
  };

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hey! Please contribute to "${collectionData.name}". Pay here: ${collectionData.link}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/collections" className="w-10 h-10 rounded-full bg-white lg:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">{collectionData.name}</h1>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded-full capitalize shrink-0">{collectionData.status}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Created {collectionData.created}</p>
          </div>
          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button onClick={copyLink} variant="outline" size="sm" className="text-xs rounded-full h-9 px-4">
              <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Link
            </Button>
            <Button onClick={shareWhatsApp} size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full h-9 px-4">
              <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
            </Button>
            <Button variant="outline" size="sm" className="text-xs rounded-full h-9 px-4">
              <Pause className="h-3.5 w-3.5 mr-1.5" /> Pause
            </Button>
            <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50 rounded-full h-9 px-4">
              <XCircle className="h-3.5 w-3.5 mr-1.5" /> Close
            </Button>
          </div>
        </div>

        {/* ═══ DESKTOP: Two-Column Layout ═══ */}
        <div className="hidden lg:grid grid-cols-3 gap-6">

          {/* Left: Main content (2/3) */}
          <div className="col-span-2 space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Collected", value: collectionData.collected, icon: Wallet, bg: "bg-blue-50", color: "text-blue-600" },
                { label: "Target", value: collectionData.target, icon: Target, bg: "bg-purple-50", color: "text-purple-600" },
                { label: "Contributors", value: `${collectionData.contributors}/${collectionData.totalExpected}`, icon: Users, bg: "bg-indigo-50", color: "text-indigo-600" },
                { label: "Per Person", value: collectionData.amount, icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-600" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("p-2 rounded-xl", s.bg)}>
                      <s.icon size={16} className={s.color} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Collection Progress</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  Deadline: {collectionData.deadline}
                </div>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">{collectionData.collected} collected</p>
                <p className="text-sm font-bold text-blue-600">{progress}%</p>
              </div>
            </div>

            {/* Contributors Table */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Contributors ({contributorsList.length})
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Search size={16} /></button>
                  <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Filter size={16} /></button>
                  <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"><Download size={16} /></button>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-1 text-center">Status</div>
              </div>

              {contributorsList.map((c, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-3.5 items-center border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-gray-500">{c.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">{c.date}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-bold text-gray-900">{c.amount}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6">

            {/* Description */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{collectionData.description}</p>
            </div>

            {/* Share Link */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Link</h3>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl mb-3 border border-gray-100">
                <p className="text-xs text-gray-700 flex-1 truncate font-mono">{collectionData.link}</p>
                <button onClick={copyLink} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition shrink-0">
                  <Copy size={14} />
                </button>
              </div>
              <Button onClick={shareWhatsApp} size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10">
                <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share via WhatsApp
              </Button>
            </div>

            {/* Info */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">{collectionData.amountType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900">{collectionData.created}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Deadline</span>
                  <span className="font-medium text-gray-900">{collectionData.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 capitalize">{collectionData.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE VIEW ═══ */}
        <div className="lg:hidden space-y-4">

          <p className="text-sm text-gray-500">{collectionData.description}</p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{collectionData.collected}</p>
              <p className="text-xs text-gray-500">Collected</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{collectionData.target}</p>
              <p className="text-xs text-gray-500">Target</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{collectionData.contributors}/{collectionData.totalExpected}</p>
              <p className="text-xs text-gray-500">Contributors</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{collectionData.amount}</p>
              <p className="text-xs text-gray-500">Per Person</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="font-semibold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Deadline: {collectionData.deadline}</p>
          </div>

          {/* Share */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Share Collection Link</p>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg mb-3">
              <p className="text-xs text-gray-900 flex-1 truncate font-mono">{collectionData.link}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyLink} variant="outline" size="sm" className="flex-1 text-xs rounded-full">
                <Copy className="h-3 w-3 mr-1.5" /> Copy Link
              </Button>
              <Button onClick={shareWhatsApp} size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                <Share2 className="h-3 w-3 mr-1.5" /> WhatsApp
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs rounded-full h-10">
              <Pause className="h-3 w-3 mr-1.5" /> Pause
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600 border-red-200 hover:bg-red-50 rounded-full h-10">
              <XCircle className="h-3 w-3 mr-1.5" /> Close
            </Button>
          </div>

          {/* Contributors List */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Contributors
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {contributorsList.map((c, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                      <p className="text-[10px] text-gray-500">{c.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{c.amount}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
