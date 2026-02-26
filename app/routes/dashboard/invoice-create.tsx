import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Calendar, Check, ChevronDown, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAuth } from "~/contexts/auth";

export default function CreateInvoice() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [client, setClient] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [items, setItems] = useState([{ desc: "", qty: 1, price: "" }]);
    const [notes, setNotes] = useState("");
    const [showNotes, setShowNotes] = useState(false);

    const addItem = () => setItems([...items, { desc: "", qty: 1, price: "" }]);
    const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items];
        // @ts-ignore
        newItems[index][field] = value;
        setItems(newItems);
    };

    const subtotal = items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price || 0)), 0);
    const totalDisplay = `₦${subtotal.toLocaleString()}`;

    return (
        <AppLayout>
            <div className="space-y-6 pb-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white lg:bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Create Invoice</h1>
                            <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Send a professional invoice to your client</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => navigate("/invoices")} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
                            <Check size={16} /> Create Invoice
                        </button>
                    </div>
                </div>

                {/* ═══ DESKTOP: Two-Column Layout ═══ */}
                <div className="hidden lg:grid grid-cols-5 gap-6">

                    {/* Left: Form (3/5) */}
                    <div className="col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">

                        {/* Client Details */}
                        <div className="p-6 space-y-5 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">Client Details</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Client Name <span className="text-red-400">*</span></Label>
                                    <Input placeholder="e.g. Artem Lebedev" className="h-11 bg-white" value={client} onChange={(e) => setClient(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Client Email</Label>
                                    <Input type="email" placeholder="client@email.com" className="h-11 bg-white" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Invoice Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <Input type="date" className="pl-8 bg-white h-11" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <Input type="date" className="pl-8 bg-white h-11" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="p-6 space-y-4 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">Line Items</p>

                            {/* Column headers */}
                            <div className="grid grid-cols-12 gap-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider px-1">
                                <div className="col-span-6">Description</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-3 text-right">Price (₦)</div>
                                <div className="col-span-1" />
                            </div>

                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-6">
                                        <Input placeholder="Item description" value={item.desc} onChange={(e) => updateItem(index, "desc", e.target.value)} className="bg-white h-10" />
                                    </div>
                                    <div className="col-span-2">
                                        <Input type="number" placeholder="1" className="text-center bg-white h-10" value={item.qty} onChange={(e) => updateItem(index, "qty", e.target.value)} />
                                    </div>
                                    <div className="col-span-3">
                                        <Input type="number" placeholder="0.00" className="text-right bg-white h-10" value={item.price} onChange={(e) => updateItem(index, "price", e.target.value)} />
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        {items.length > 1 && (
                                            <button onClick={() => removeItem(index)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <button onClick={addItem} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <Plus size={14} /> Add Item
                                </button>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Subtotal</p>
                                    <p className="text-lg font-bold text-gray-900">{totalDisplay}</p>
                                </div>
                            </div>
                        </div>

                        {/* Notes (collapsible) */}
                        <div>
                            <button onClick={() => setShowNotes(!showNotes)} className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50/50 transition-colors">
                                <p className="text-sm font-semibold text-gray-900">Notes & Terms</p>
                                <ChevronDown size={16} className={cn("text-gray-400 transition-transform", showNotes && "rotate-180")} />
                            </button>
                            {showNotes && (
                                <div className="px-6 pb-6 space-y-4">
                                    <textarea
                                        placeholder="Payment is due within 20 days. Please make payment to the specified bank account..."
                                        className="flex min-h-[100px] w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Preview (2/5) */}
                    <div className="col-span-2">
                        <div className="sticky top-24">
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <p className="text-xs font-medium text-gray-400">Preview</p>
                                </div>

                                <div className="p-5 space-y-5">

                                    {/* From */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold shrink-0">
                                            {(user.business?.name || user.firstName || "P")[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">From</p>
                                            <p className="text-sm font-semibold text-gray-900">{user.business?.name || `${user.firstName} ${user.lastName}`}</p>
                                        </div>
                                    </div>

                                    {/* Bill To */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-xs text-gray-400 mb-1">Bill To</p>
                                        <p className="text-sm font-semibold text-gray-900">{client || "Client Name"}</p>
                                        {clientEmail && <p className="text-xs text-gray-500 mt-0.5">{clientEmail}</p>}
                                    </div>

                                    {/* Items */}
                                    {items.some(i => i.desc) && (
                                        <div className="border-t border-gray-100 pt-4 space-y-2">
                                            {items.filter(i => i.desc).map((item, i) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span className="text-gray-500">{item.desc} × {item.qty}</span>
                                                    <span className="font-semibold text-gray-900">₦{(Number(item.qty) * Number(item.price || 0)).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between text-sm">
                                                <span className="font-medium text-gray-700">Total</span>
                                                <span className="font-bold text-gray-900">{totalDisplay}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dates */}
                                    {(invoiceDate || dueDate) && (
                                        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                                            {invoiceDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Date</span>
                                                    <span className="font-medium text-gray-900">{invoiceDate}</span>
                                                </div>
                                            )}
                                            {dueDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Due</span>
                                                    <span className="font-medium text-gray-900">{dueDate}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-[10px] text-gray-400 text-center pt-2">Powered by PayLink</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ MOBILE: Single Column ═══ */}
                <div className="lg:hidden bg-white rounded-2xl border border-gray-100 overflow-hidden">

                    {/* Client */}
                    <div className="p-5 space-y-4 border-b border-gray-100">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Client Name <span className="text-red-400">*</span></Label>
                            <Input placeholder="e.g. Artem Lebedev" className="h-11 bg-white" value={client} onChange={(e) => setClient(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Client Email</Label>
                            <Input type="email" placeholder="client@email.com" className="h-11 bg-white" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Date</Label>
                                <Input type="date" className="bg-white h-10" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Due</Label>
                                <Input type="date" className="bg-white h-10" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="p-5 space-y-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">Items</p>
                        {items.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input placeholder="Item" value={item.desc} onChange={(e) => updateItem(index, "desc", e.target.value)} className="flex-1 bg-white h-10" />
                                <Input type="number" placeholder="Qty" className="w-14 text-center bg-white h-10" value={item.qty} onChange={(e) => updateItem(index, "qty", e.target.value)} />
                                <Input type="number" placeholder="Price" className="w-20 text-right bg-white h-10" value={item.price} onChange={(e) => updateItem(index, "price", e.target.value)} />
                                {items.length > 1 && <button onClick={() => removeItem(index)} className="p-1.5 text-red-400"><Trash2 size={14} /></button>}
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <button onClick={addItem} className="text-xs font-semibold text-blue-600 flex items-center gap-1"><Plus size={14} /> Add</button>
                            <p className="text-lg font-bold text-gray-900">{totalDisplay}</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="p-5 flex gap-3">
                        <button onClick={() => navigate(-1)} className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 transition-colors">Cancel</button>
                        <button onClick={() => navigate("/invoices")} className="flex-[2] py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2">
                            <Check size={16} /> Create Invoice
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
