import { useState, useEffect } from "react";
import { ArrowLeft, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/hooks/use-toast";

const bankList = [
    { id: "044", name: "Access Bank" },
    { id: "058", name: "Guaranty Trust Bank" },
    { id: "057", name: "Zenith Bank" },
    { id: "033", name: "United Bank for Africa (UBA)" },
    { id: "214", name: "First City Monument Bank (FCMB)" },
    { id: "232", name: "Sterling Bank" },
    { id: "032", name: "Union Bank of Nigeria" },
    { id: "035", name: "Wema Bank" },
    { id: "050", name: "Ecobank Nigeria" },
    { id: "301", name: "Jaiz Bank" },
    { id: "011", name: "First Bank of Nigeria" },
];

export default function SettingsBank() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [selectedBank, setSelectedBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // Auto-verify when account number reaches 10 digits and bank is selected
    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            handleVerifyAccount();
        } else {
            setAccountName("");
        }
    }, [accountNumber, selectedBank]);

    const handleVerifyAccount = () => {
        setVerifying(true);
        setAccountName("");

        setTimeout(() => {
            if (accountNumber === "0123456789") {
                toast({ variant: "destructive", title: "Verification Failed", description: "Invalid Account Number. Please check and try again." });
                setAccountName("");
            } else {
                setAccountName("JONAH GODSPOWER");
                toast({ title: "Account Verified", description: "Account name fetched successfully." });
            }
            setVerifying(false);
        }, 1500);
    };

    const handleSave = () => {
        if (!accountName) return;

        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setIsConnected(true);
            toast({ title: "Bank Details Saved", description: "Payouts will now be sent to this account." });
        }, 1500);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setAccountNumber("");
        setAccountName("");
        setSelectedBank("");
        toast({ title: "Account Disconnected", description: "You have removed your payout account." });
    };

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="max-w-2xl mx-auto">

                <div className="flex items-center gap-2 mb-6">
                    <Link to="/settings" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 border border-gray-200 transition md:hidden">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Payout Settings</h1>
                        <p className="text-sm text-gray-500">Manage where you receive your funds</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">

                    {isConnected ? (
                        /* CONNECTED STATE */
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-900">Bank Account Connected</h3>
                                    <p className="text-sm text-green-700">Your payouts are active and ready.</p>
                                </div>
                            </div>

                            <div className="space-y-4 border rounded-xl p-5 border-gray-200 bg-gray-50/50">
                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</span>
                                    <span className="text-lg font-bold text-gray-900">{accountName || "JONAH GODSPOWER"}</span>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</span>
                                    <span className="text-base text-gray-900">{bankList.find(b => b.id === selectedBank)?.name || "Access Bank"}</span>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</span>
                                    <span className="text-base font-mono text-gray-900">{accountNumber || "0035781245"}</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    variant="outline"
                                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                                    onClick={handleDisconnect}
                                >
                                    Disconnect Account
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* NOT CONNECTED STATE (FORM) */
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                <Building2 className="text-blue-600 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-blue-900">Connect Bank Account</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Enter your bank details to receive payments. Usually settles within 24 hours.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Select Bank</Label>
                                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                                            <SelectValue placeholder="Select your bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bankList.map((bank) => (
                                                <SelectItem key={bank.id} value={bank.id}>
                                                    {bank.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Account Number</Label>
                                    <div className="relative">
                                        <Input
                                            placeholder="0123456789"
                                            maxLength={10}
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                                            className="h-12 bg-gray-50 border-gray-200 font-mono tracking-widest text-lg"
                                        />
                                        {verifying && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="animate-spin text-blue-600" size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Enter your 10-digit NUBAN account number.</p>
                                </div>

                                {/* Verified Account Name Display */}
                                {accountName && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                                        <div>
                                            <p className="text-xs text-green-600 font-medium uppercase">Account Name</p>
                                            <p className="text-lg font-bold text-green-900">{accountName}</p>
                                        </div>
                                        <CheckCircle2 className="text-green-600" size={24} />
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <Button
                                    className="w-full h-12 rounded-full text-base font-semibold"
                                    disabled={!accountName || saving || verifying}
                                    onClick={handleSave}
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                        </>
                                    ) : (
                                        "Save Bank Details"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}
