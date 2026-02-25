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
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";

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
  { name: "Adebayo James", amount: "₦5,000", date: "Dec 20, 2025", status: "paid" },
  { name: "Fatima Bello", amount: "₦5,000", date: "Dec 19, 2025", status: "paid" },
  { name: "Chidi Okafor", amount: "₦5,000", date: "Dec 18, 2025", status: "paid" },
  { name: "Ngozi Eze", amount: "₦5,000", date: "Dec 17, 2025", status: "paid" },
  { name: "Samuel Tunde", amount: "₦5,000", date: "Dec 16, 2025", status: "paid" },
  { name: "Aisha Mohammed", amount: "₦5,000", date: "Dec 16, 2025", status: "paid" },
  { name: "Emeka Nwosu", amount: "₦5,000", date: "Dec 15, 2025", status: "paid" },
];

export default function CollectionDetails() {
  const { id } = useParams();
  const progress = 57;

  const copyLink = () => {
    navigator.clipboard.writeText(collectionData.link);
    toast.success("Link copied to clipboard!");
  };

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hey! Please contribute to "${collectionData.name}". Pay here: ${collectionData.link}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <AppLayout className="bg-[#f4f5f6]">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/collections" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{collectionData.name}</h1>
            <p className="text-xs text-gray-500">Created {collectionData.created}</p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded-full capitalize">{collectionData.status}</span>
        </div>

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
              <Copy className="h-3 w-3 mr-1.5" />
              Copy Link
            </Button>
            <Button onClick={shareWhatsApp} size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              <Share2 className="h-3 w-3 mr-1.5" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs rounded-full h-10">
            <Pause className="h-3 w-3 mr-1.5" />
            Pause
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600 border-red-200 hover:bg-red-50 rounded-full h-10">
            <XCircle className="h-3 w-3 mr-1.5" />
            Close
          </Button>
        </div>

        {/* Contributors */}
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
    </AppLayout>
  );
}
