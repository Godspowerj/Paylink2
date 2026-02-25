import { useState } from "react";
import { Download, LucideLogOut, Building2, User, Shield, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const navigate = useNavigate();

  return (
    <AppLayout className="bg-[#f4f5f6]">
      <h1 className="mb-1 text-2xl font-bold text-foreground">Settings</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage your account, business, and security preferences
      </p>

      {/* ─── MY PROFILE (PERSON) ─── */}
      <div className="bg-white p-5 lg:p-6 rounded-[12px] mb-[24px]">
        <h2 className="mb-4 text-lg font-semibold text-foreground">My Profile</h2>
        <p className="text-xs text-muted-foreground mb-4">Your personal account details</p>

        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-14 text-left"
          onClick={() => navigate("/settings/profile")}
        >
          <div className="bg-blue-50 p-2 rounded-lg">
            <User size={18} className="text-blue-600" />
          </div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="font-medium text-gray-900">Personal Information</span>
            <span className="text-xs text-gray-500 font-normal">Name, email, phone, and avatar</span>
          </div>
        </Button>
      </div>

      {/* ─── MY BUSINESS ─── */}
      <div className="bg-white p-5 lg:p-6 rounded-[12px] mb-[24px]">
        <h2 className="mb-4 text-lg font-semibold text-foreground">My Business</h2>
        <p className="text-xs text-muted-foreground mb-4">Your business profile and payout settings</p>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-14 text-left"
            onClick={() => navigate("/profile")}
          >
            <div className="bg-purple-50 p-2 rounded-lg">
              <Building2 size={18} className="text-purple-600" />
            </div>
            <div className="flex flex-col items-start leading-none gap-1">
              <span className="font-medium text-gray-900">Business Profile & Payouts</span>
              <span className="text-xs text-gray-500 font-normal">Business name, category, bank account & withdrawals</span>
            </div>
          </Button>
        </div>
      </div>

      {/* ─── NOTIFICATIONS ─── */}
      <div className="bg-white p-5 lg:p-6 rounded-[12px] mb-[24px]">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Payment Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified for new payments</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email Receipts</p>
              <p className="text-xs text-muted-foreground">Send receipts to contributors</p>
            </div>
            <Switch checked={emailReceipts} onCheckedChange={setEmailReceipts} />
          </div>
        </div>
      </div>

      {/* ─── DATA & EXPORT ─── */}
      <div className="bg-white p-5 lg:p-6 rounded-[12px] mb-[24px]">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Data & Export</h2>
        <Button variant="outline" className="w-full gap-2">
          <Download size={16} /> Export Payment History
        </Button>
      </div>

      {/* ─── SECURITY ─── */}
      <div className="bg-white p-5 lg:p-6 rounded-[12px]">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Security</h2>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-14 text-left"
            onClick={() => navigate("/settings/security")}
          >
            <div className="bg-orange-50 p-2 rounded-lg">
              <Shield size={18} className="text-orange-600" />
            </div>
            <div className="flex flex-col items-start leading-none gap-1">
              <span className="font-medium text-gray-900">Password & Security</span>
              <span className="text-xs text-gray-500 font-normal">Change password, delete account</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => navigate("/")}
          >
            <LucideLogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
