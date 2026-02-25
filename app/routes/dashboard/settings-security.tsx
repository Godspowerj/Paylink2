import { useState } from "react";
import { Shield, Eye, EyeOff, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { useToast } from "~/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

const SettingsSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleUpdatePassword = () => {
        if (newPassword.length < 8) {
            toast({ variant: "destructive", title: "Wait a sec!", description: "Password must be at least 8 characters long." });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast({ variant: "destructive", title: "Mismatch", description: "New passwords do not match." });
            return;
        }

        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast({ title: "Password Updated", description: "Your password has been changed successfully." });
        }, 800);
    };

    const handleDeleteAccount = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setShowDeleteModal(false);
            toast({ variant: "destructive", title: "Account Deleted", description: "Your account has been scheduled for deletion." });
            navigate("/login");
        }, 1500);
    };

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <Link to="/settings" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 border border-gray-200 transition md:hidden">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Security</h1>
                        <p className="text-sm text-gray-500">Manage your password and account security</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Change Password Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                                <p className="text-xs text-gray-500">Ensure your account is using a strong password.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="current">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="current"
                                        type={showCurrent ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11 pr-10"
                                    />
                                    <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="new">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="new"
                                            type={showNew ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11 pr-10"
                                        />
                                        <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirm"
                                            type={showConfirm ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11 pr-10"
                                        />
                                        <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <Button
                                    onClick={handleUpdatePassword}
                                    disabled={!currentPassword || !newPassword || saving}
                                    className="rounded-full h-11 px-6 min-w-[160px]"
                                >
                                    {saving ? "Updating..." : "Update Password"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 rounded-2xl p-6 md:p-8 border border-red-100">
                        <h2 className="text-lg font-bold text-red-700 mb-2">Delete Account</h2>
                        <p className="text-sm text-red-600/80 mb-6 max-w-lg">
                            Permanently delete your account and all of its data. This action cannot be undone.
                        </p>
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 hover:bg-red-700 text-white border-none rounded-full h-11 px-6"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>

                {/* Confirm Delete Modal */}
                <AnimatePresence>
                    {showDeleteModal && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-white rounded-2xl p-6 shadow-2xl z-[70]"
                            >
                                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4 mx-auto">
                                    <AlertTriangle size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Are you absolutely sure?</h3>
                                <p className="text-center text-gray-500 text-sm mb-6">
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </p>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 rounded-full h-11" onClick={() => setShowDeleteModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="flex-1 bg-red-600 hover:bg-red-700 rounded-full h-11"
                                        onClick={handleDeleteAccount}
                                        disabled={saving}
                                    >
                                        {saving ? "Deleting..." : "Delete Account"}
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </AppLayout>
    );
};

export default SettingsSecurity;
