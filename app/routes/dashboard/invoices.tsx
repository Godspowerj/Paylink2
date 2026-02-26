import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Download,
    Send,
    ChevronRight,
    FileText,
    Clock,
    CheckCircle2,
    XCircle,
    Calendar,
} from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { useAuth } from "~/contexts/auth";
import { PageSkeleton } from "~/components/ui/skeleton";

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

interface Invoice {
    id: string;
    number: string;
    client: string;
    email: string;
    amount: string;
    date: string;
    dueDate: string;
    status: InvoiceStatus;
    items: { desc: string; qty: number; price: string }[];
}

const statusConfig: Record<InvoiceStatus, { label: string; color: string; bg: string; icon: any }> = {
    paid: { label: "Paid", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100", icon: CheckCircle2 },
    pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50 border-amber-100", icon: Clock },
    overdue: { label: "Overdue", color: "text-red-700", bg: "bg-red-50 border-red-100", icon: XCircle },
    draft: { label: "Draft", color: "text-gray-600", bg: "bg-gray-50 border-gray-200", icon: FileText },
};

const demoInvoices: Invoice[] = [
    {
        id: "1", number: "INV-001", client: "Artem Lebedev", email: "artem@company.com",
        amount: "₦150,000", date: "Feb 20, 2026", dueDate: "Mar 20, 2026", status: "paid",
        items: [
            { desc: "Web Design", qty: 1, price: "₦80,000" },
            { desc: "Logo Design", qty: 1, price: "₦40,000" },
            { desc: "Development", qty: 1, price: "₦30,000" },
        ],
    },
    {
        id: "2", number: "INV-002", client: "Grace Johnson", email: "grace@startup.co",
        amount: "₦135,000", date: "Feb 15, 2026", dueDate: "Mar 15, 2026", status: "pending",
        items: [
            { desc: "Consultation (2hrs)", qty: 2, price: "₦25,000" },
            { desc: "Report Writing", qty: 1, price: "₦35,000" },
            { desc: "Data Analysis", qty: 1, price: "₦30,000" },
            { desc: "Presentation Deck", qty: 1, price: "₦20,000" },
        ],
    },
    {
        id: "3", number: "INV-003", client: "Tola Adeniyi", email: "tola@corp.ng",
        amount: "₦350,000", date: "Jan 30, 2026", dueDate: "Feb 28, 2026", status: "overdue",
        items: [
            { desc: "Full Brand Package", qty: 1, price: "₦200,000" },
            { desc: "Social Media Kit", qty: 1, price: "₦50,000" },
            { desc: "Brand Guidelines PDF", qty: 1, price: "₦30,000" },
            { desc: "Business Card Design", qty: 2, price: "₦15,000" },
            { desc: "Letterhead Design", qty: 1, price: "₦20,000" },
        ],
    },
    {
        id: "4", number: "INV-004", client: "Chioma Okeke", email: "chioma@mail.com",
        amount: "₦95,000", date: "Feb 25, 2026", dueDate: "Mar 25, 2026", status: "draft",
        items: [
            { desc: "Photography (4hrs)", qty: 1, price: "₦45,000" },
            { desc: "Photo Editing", qty: 20, price: "₦1,500" },
            { desc: "Album Design", qty: 1, price: "₦20,000" },
        ],
    },
];

export default function Invoices() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [filter, setFilter] = useState<"all" | InvoiceStatus>("all");
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const filtered = filter === "all" ? demoInvoices : demoInvoices.filter(inv => inv.status === filter);

    const stats = {
        total: demoInvoices.length,
        paid: demoInvoices.filter(i => i.status === "paid").length,
        pending: demoInvoices.filter(i => i.status === "pending").length,
        overdue: demoInvoices.filter(i => i.status === "overdue").length,
    };

    // If an invoice is selected, show the detail/preview view
    if (selectedInvoice) {
        return (
            <AppLayout>
                <InvoicePreview
                    invoice={selectedInvoice}
                    user={user}
                    onBack={() => setSelectedInvoice(null)}
                />
            </AppLayout>
        );
    }

    if (loading) {
        return <AppLayout><PageSkeleton /></AppLayout>;
    }

    return (
        <AppLayout>
            <div className="space-y-6 lg:space-y-8 pt-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Invoices</h1>
                        <p className="text-sm text-gray-500 mt-1">Create, manage and track your invoices</p>
                    </div>
                    <button
                        onClick={() => navigate("/invoices/create")}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        <span className="hidden sm:inline">New Invoice</span>
                        <span className="sm:hidden">New</span>
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                    {[
                        { label: "Total", value: stats.total, color: "bg-blue-50", iconColor: "text-blue-600", icon: FileText },
                        { label: "Paid", value: stats.paid, color: "bg-emerald-50", iconColor: "text-emerald-600", icon: CheckCircle2 },
                        { label: "Pending", value: stats.pending, color: "bg-amber-50", iconColor: "text-amber-600", icon: Clock },
                        { label: "Overdue", value: stats.overdue, color: "bg-red-50", iconColor: "text-red-600", icon: XCircle },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-5">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${stat.color}`}>
                                    <stat.icon className={stat.iconColor} size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-100 rounded-full p-1 overflow-x-auto scrollbar-none">
                        {(["all", "paid", "pending", "overdue", "draft"] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap capitalize",
                                    filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                            <Search size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                {/* Invoice List */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50/80 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <div className="col-span-1">No.</div>
                        <div className="col-span-3">Client</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-2 text-right">Amount</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="py-16 text-center">
                            <FileText size={40} className="text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 font-medium">No invoices found</p>
                            <p className="text-xs text-gray-400 mt-1">Try changing your filter</p>
                        </div>
                    ) : (
                        filtered.map((inv, i) => {
                            const status = statusConfig[inv.status];
                            const StatusIcon = status.icon;
                            return (
                                <div key={inv.id}>
                                    {/* Desktop Row */}
                                    <div
                                        className="hidden md:grid grid-cols-12 gap-4 px-5 py-4 items-center border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedInvoice(inv)}
                                    >
                                        <div className="col-span-1">
                                            <span className="text-xs font-mono text-gray-500">{inv.number}</span>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{inv.client}</p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{inv.email}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-600">{inv.date}</p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">Due: {inv.dueDate}</p>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <p className="text-sm font-bold text-gray-900">{inv.amount}</p>
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border", status.bg, status.color)}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-end gap-1">
                                            <button onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="View">
                                                <Eye size={14} />
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition" title="Download">
                                                <Download size={14} />
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Row */}
                                    <div
                                        className="md:hidden flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedInvoice(inv)}
                                    >
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", status.bg)}>
                                            <StatusIcon size={18} className={status.color} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{inv.client}</p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{inv.number} · {inv.date}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-gray-900">{inv.amount}</p>
                                            <span className={cn("text-[10px] font-semibold", status.color)}>{status.label}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

/* ═══════════════════════════════════════
   INVOICE PREVIEW / DETAIL VIEW
   ═══════════════════════════════════════ */
function InvoicePreview({
    invoice,
    user,
    onBack,
}: {
    invoice: Invoice;
    user: any;
    onBack: () => void;
}) {
    const status = statusConfig[invoice.status];
    const StatusIcon = status.icon;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="w-10 h-10 rounded-full bg-white lg:bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">{invoice.number}</h1>
                            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border", status.bg, status.color)}>
                                <StatusIcon size={12} />
                                {status.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">{invoice.client} · {invoice.amount}</p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download size={14} /> Download
                    </button>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        <Send size={14} /> Send Invoice
                    </button>
                </div>
            </div>

            {/* ═══ DESKTOP: Two-Column ═══ */}
            <div className="hidden lg:grid grid-cols-3 gap-6">

                {/* Left: Invoice Document (2/3) */}
                <div className="col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="p-8">

                        {/* From / Invoice Number */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {user.business?.name || `${user.firstName} ${user.lastName}`}
                                </h2>
                                <div className="mt-2 space-y-0.5 text-sm text-gray-500">
                                    {user.email && <p>{user.email}</p>}
                                    {user.business?.phone && <p>{user.business.phone}</p>}
                                    {user.business?.address && <p>{user.business.address}</p>}
                                </div>
                            </div>
                            <div className="text-right">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Invoice</h1>
                                <p className="text-base font-mono text-gray-400 mt-1">#{invoice.number.replace("INV-", "")}</p>
                            </div>
                        </div>

                        {/* Bill To + Dates */}
                        <div className="flex justify-between gap-6 mb-10 pb-8 border-b border-gray-100">
                            <div>
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
                                <p className="text-base font-semibold text-gray-900">{invoice.client}</p>
                                <p className="text-sm text-gray-500 mt-0.5">{invoice.email}</p>
                            </div>
                            <div className="text-right space-y-3">
                                <div>
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Date</p>
                                    <p className="text-sm text-gray-700 font-medium">{invoice.date}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Due</p>
                                    <p className="text-sm text-gray-700 font-medium">{invoice.dueDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Line Items Table */}
                        <div className="mb-10">
                            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                <div className="col-span-7">Description</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-3 text-right">Amount</div>
                            </div>

                            {invoice.items.map((item, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 py-3.5 border-b border-gray-50 items-center">
                                    <div className="col-span-7">
                                        <p className="text-sm font-medium text-gray-800">{item.desc}</p>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <p className="text-sm text-gray-500">{item.qty}</p>
                                    </div>
                                    <div className="col-span-3 text-right">
                                        <p className="text-sm font-semibold text-gray-900">{item.price}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Totals */}
                            <div className="mt-6 flex flex-col items-end gap-2">
                                <div className="flex items-center gap-8 text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-semibold text-gray-900 w-28 text-right">{invoice.amount}</span>
                                </div>
                                <div className="flex items-center gap-8 text-sm">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="font-semibold text-gray-900 w-28 text-right">₦0.00</span>
                                </div>
                                <div className="flex items-center gap-8 text-base pt-3 border-t border-gray-200 mt-2">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-gray-900 w-28 text-right text-lg">{invoice.amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank + Terms */}
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Bank Details</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex gap-3">
                                        <span className="text-gray-400 w-16 shrink-0">Bank</span>
                                        <span className="text-gray-700 font-medium">First Bank</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-gray-400 w-16 shrink-0">Account</span>
                                        <span className="text-gray-700 font-medium">0123456789</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-gray-400 w-16 shrink-0">Name</span>
                                        <span className="text-gray-700 font-medium">{user.business?.name || `${user.firstName} ${user.lastName}`}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Terms</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Payment is due within 20 days from the date of the invoice.
                                    Please make payment to the specified bank account.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className={cn(
                        "px-8 py-4 border-t flex items-center justify-between",
                        invoice.status === "paid" ? "bg-emerald-50 border-emerald-100" :
                            invoice.status === "overdue" ? "bg-red-50 border-red-100" :
                                invoice.status === "pending" ? "bg-amber-50 border-amber-100" :
                                    "bg-gray-50 border-gray-100"
                    )}>
                        <div className="flex items-center gap-2">
                            <StatusIcon size={16} className={status.color} />
                            <span className={cn("text-sm font-semibold", status.color)}>{status.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">Generated by PayLink</p>
                    </div>
                </div>

                {/* Right: Sidebar (1/3) */}
                <div className="space-y-6">

                    {/* Status */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Status</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <StatusIcon size={16} className={status.color} />
                            <span className={cn("text-sm font-semibold", status.color)}>{status.label}</span>
                        </div>
                        <div className="space-y-2">
                            {invoice.status === "pending" && (
                                <button className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors">
                                    Mark as Paid
                                </button>
                            )}
                            {invoice.status === "draft" && (
                                <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors">
                                    Send Invoice
                                </button>
                            )}
                            {invoice.status === "overdue" && (
                                <button className="w-full py-2.5 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors">
                                    Send Reminder
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Client */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Client</h3>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold shrink-0">
                                {invoice.client.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{invoice.client}</p>
                                <p className="text-xs text-gray-500">{invoice.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
                        <div className="space-y-2.5 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Invoice No.</span>
                                <span className="font-medium text-gray-900">{invoice.number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Date</span>
                                <span className="font-medium text-gray-900">{invoice.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Due Date</span>
                                <span className="font-medium text-gray-900">{invoice.dueDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Items</span>
                                <span className="font-medium text-gray-900">{invoice.items.length}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-100">
                                <span className="font-semibold text-gray-700">Total</span>
                                <span className="font-bold text-gray-900">{invoice.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ MOBILE ═══ */}
            <div className="lg:hidden pb-8">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="p-5">
                        {/* From */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-base font-bold text-gray-900">{user.business?.name || `${user.firstName} ${user.lastName}`}</p>
                                {user.email && <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>}
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-gray-900 uppercase">Invoice</p>
                                <p className="text-xs font-mono text-gray-400">#{invoice.number.replace("INV-", "")}</p>
                            </div>
                        </div>

                        {/* Bill To */}
                        <div className="mb-6 pb-4 border-b border-gray-100">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
                            <p className="text-sm font-semibold text-gray-900">{invoice.client}</p>
                            <p className="text-xs text-gray-500">{invoice.email}</p>
                        </div>

                        {/* Items */}
                        <div className="space-y-3 mb-6">
                            {invoice.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.desc} × {item.qty}</span>
                                    <span className="font-semibold text-gray-900">{item.price}</span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="border-t border-gray-100 pt-4 flex justify-between text-base">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-gray-900">{invoice.amount}</span>
                        </div>
                    </div>

                    <div className={cn(
                        "px-5 py-3 border-t flex items-center justify-between",
                        invoice.status === "paid" ? "bg-emerald-50 border-emerald-100" :
                            invoice.status === "overdue" ? "bg-red-50 border-red-100" :
                                invoice.status === "pending" ? "bg-amber-50 border-amber-100" :
                                    "bg-gray-50 border-gray-100"
                    )}>
                        <div className="flex items-center gap-2">
                            <StatusIcon size={14} className={status.color} />
                            <span className={cn("text-xs font-semibold", status.color)}>{status.label}</span>
                        </div>
                        <p className="text-[10px] text-gray-400">PayLink</p>
                    </div>
                </div>

                {/* Mobile actions */}
                <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-3 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 flex items-center justify-center gap-2">
                        <Download size={16} /> Download
                    </button>
                    <button className="flex-[2] py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white flex items-center justify-center gap-2">
                        <Send size={16} /> Send
                    </button>
                </div>
            </div>
        </div>
    );
}
