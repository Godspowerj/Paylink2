import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Calendar, Link2, Check, ChevronDown, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAuth } from "~/contexts/auth";
import { DatePicker } from "~/components/ui/date-picker";
import { motion } from "framer-motion";

export default function CreateCollection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [amountType, setAmountType] = useState<"fixed" | "itemized">("fixed");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([{ desc: "", qty: 1, price: "" }]);
  const [description, setDescription] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date | undefined>();
  const [paymentLimit, setPaymentLimit] = useState("");
  const [customFields, setCustomFields] = useState<{ label: string; type: string }[]>([]);
  const [showOptional, setShowOptional] = useState(false);

  // Mobile Drawer State
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const addItem = () => setItems([...items, { desc: "", qty: 1, price: "" }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    // @ts-ignore
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addCustomField = () => setCustomFields([...customFields, { label: "", type: "text" }]);
  const removeCustomField = (index: number) => setCustomFields(customFields.filter((_, i) => i !== index));
  const updateCustomField = (index: number, field: string, value: string) => {
    const newFields = [...customFields];
    // @ts-ignore
    newFields[index][field] = value;
    setCustomFields(newFields);
  };

  const calculateTotal = () => {
    if (amountType === "fixed") return Number(amount || 0);
    return items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price || 0)), 0);
  };

  const sym = currency === "NGN" ? "₦" : currency === "USD" ? "$" : "₵";
  const totalDisplay = `${sym}${calculateTotal().toLocaleString()}`;

  return (
    <AppLayout>
      <motion.div
        className="space-y-6 pb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/collections")} className="w-10 h-10 rounded-full bg-white lg:bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Create Collection</h1>
              <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Set up a new payment link</p>
            </div>
          </div>

          {/* Mobile Preview Button (Header) */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setShowMobilePreview(true)} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 transition-colors">
              <Eye size={18} />
            </button>
          </div>

          {/* Desktop submit */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => navigate("/collections")} className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
              Cancel
            </button>
            <button onClick={() => navigate("/collections")} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
              <Check size={16} /> Create Link
            </button>
          </div>
        </div>

        {/* ═══ DESKTOP: Two-Column Layout ═══ */}
        <div className="hidden lg:grid grid-cols-5 gap-6">

          {/* Left: Form (3/5) */}
          <div className="col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">

            {/* Title & Currency */}
            <div className="p-6 space-y-5 border-b border-gray-100">
              <div className="space-y-2">
                <Label htmlFor="title-d" className="text-sm font-medium text-gray-700">Title <span className="text-red-400">*</span></Label>
                <Input id="title-d" autoFocus placeholder="e.g. Project Dues, Event Ticket" className="h-11 bg-white" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="h-11 bg-white"><SelectValue placeholder="Select currency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN — Nigerian Naira</SelectItem>
                      <SelectItem value="USD">USD — US Dollar</SelectItem>
                      <SelectItem value="GHS">GHS — Ghanaian Cedi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Deadline</Label>
                  <DatePicker date={expirationDate} setDate={setExpirationDate} placeholder="Select date" className="mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <textarea
                  placeholder="Brief description of this collection..."
                  className="flex min-h-[80px] w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="p-6 space-y-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Amount</p>
                <div className="bg-gray-100 p-0.5 rounded-full flex">
                  <button onClick={() => setAmountType("fixed")} className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-all", amountType === "fixed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}>Fixed</button>
                  <button onClick={() => setAmountType("itemized")} className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-all", amountType === "itemized" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}>Itemized</button>
                </div>
              </div>

              {amountType === "fixed" ? (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">{sym}</span>
                  <Input type="number" placeholder="0.00" className="pl-10 h-14 text-2xl font-bold bg-white" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Item header */}
                  <div className="grid grid-cols-12 gap-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider px-1">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-3 text-right">Price</div>
                    <div className="col-span-1" />
                  </div>
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6">
                        <Input placeholder="Item name" value={item.desc} onChange={(e) => updateItem(index, "desc", e.target.value)} className="bg-white h-10" />
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
                    <button onClick={addItem} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus size={14} /> Add Item</button>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total</p>
                      <p className="text-lg font-bold text-gray-900">{totalDisplay}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Optional */}
            <div>
              <button onClick={() => setShowOptional(!showOptional)} className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Additional Options</p>
                <ChevronDown size={16} className={cn("text-gray-400 transition-transform", showOptional && "rotate-180")} />
              </button>
              {showOptional && (
                <div className="px-6 pb-6 pt-4 space-y-5 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Redirect URL</Label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <Input type="url" placeholder="https://example.com/thanks" className="pl-8 bg-white h-10" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Payment Limit</Label>
                      <Input type="number" placeholder="Unlimited" className="bg-white h-10" value={paymentLimit} onChange={(e) => setPaymentLimit(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">Custom Fields</p>
                      <button onClick={addCustomField} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus size={14} /> Add</button>
                    </div>
                    {customFields.length === 0 ? (
                      <p className="text-xs text-gray-400 py-1">Collect extra info from contributors (e.g. T-Shirt Size)</p>
                    ) : (
                      customFields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input placeholder="Field label" className="flex-1 bg-white h-10" value={field.label} onChange={(e) => updateCustomField(index, "label", e.target.value)} />
                          <Select value={field.type} onValueChange={(val) => updateCustomField(index, "type", val)}>
                            <SelectTrigger className="h-10 w-24 bg-white text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                          <button onClick={() => removeCustomField(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                        </div>
                      ))
                    )}
                  </div>
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

                  {/* Title & Amount */}
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-base font-semibold text-gray-900">{title || "Untitled Collection"}</p>
                    {description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>}
                    <p className="text-2xl font-bold text-gray-900 mt-3">{totalDisplay}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{currency} · {amountType === "fixed" ? "Fixed amount" : `${items.filter(i => i.desc).length} item(s)`}</p>
                  </div>

                  {/* Itemized breakdown */}
                  {amountType === "itemized" && items.some(i => i.desc) && (
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      {items.filter(i => i.desc).map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-500">{item.desc} × {item.qty}</span>
                          <span className="font-semibold text-gray-900">{sym}{(Number(item.qty) * Number(item.price || 0)).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Details */}
                  {(expirationDate || paymentLimit || customFields.some(f => f.label)) && (
                    <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                      {expirationDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deadline</span>
                          <span className="font-medium text-gray-900">{expirationDate.toLocaleDateString()}</span>
                        </div>
                      )}
                      {paymentLimit && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Limit</span>
                          <span className="font-medium text-gray-900">{paymentLimit} payments</span>
                        </div>
                      )}
                      {customFields.filter(f => f.label).length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Custom fields</span>
                          <span className="font-medium text-gray-900">{customFields.filter(f => f.label).length}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Button */}
                  <button className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold pointer-events-none">
                    Pay {totalDisplay}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">Secured by PayLink</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE: Single Column ═══ */}
        <div className="lg:hidden bg-white rounded-2xl border border-gray-100 overflow-hidden mb-24">

          {/* Title & Currency */}
          <div className="p-5 space-y-5 border-b border-gray-100">
            <div className="space-y-2">
              <Label htmlFor="title-m" className="text-sm font-medium text-gray-700">Title <span className="text-red-400">*</span></Label>
              <Input id="title-m" placeholder="e.g. Project Dues, Event Ticket" className="h-11 bg-white" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-11 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GHS">GHS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <Input placeholder="Optional" className="h-11 bg-white" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="p-5 space-y-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Amount</p>
              <div className="bg-gray-100 p-0.5 rounded-full flex">
                <button onClick={() => setAmountType("fixed")} className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all", amountType === "fixed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}>Fixed</button>
                <button onClick={() => setAmountType("itemized")} className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all", amountType === "itemized" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}>Itemized</button>
              </div>
            </div>
            {amountType === "fixed" ? (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">{sym}</span>
                <Input type="number" placeholder="0.00" className="pl-10 h-14 text-2xl font-bold bg-white" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            ) : (
              <div className="space-y-3">
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
            )}
          </div>

          {/* Optional */}
          <div>
            <button onClick={() => setShowOptional(!showOptional)} className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50/50 transition-colors border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Additional Options</p>
              <ChevronDown size={16} className={cn("text-gray-400 transition-transform", showOptional && "rotate-180")} />
            </button>
            {showOptional && (
              <div className="px-5 pb-5 pt-4 space-y-4 border-b border-gray-100">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Deadline</Label>
                  <DatePicker date={expirationDate} setDate={setExpirationDate} placeholder="Select date" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Payment Limit</Label>
                  <Input type="number" placeholder="Unlimited" className="bg-white h-10" value={paymentLimit} onChange={(e) => setPaymentLimit(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          {/* Sticky Submit Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 flex gap-3 z-[60] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-8 pointer-events-auto">
            <button onClick={() => navigate("/collections")} className="flex-1 py-3 md:py-3.5 rounded-xl text-[15px] font-medium text-gray-600 border border-gray-200 transition-colors">Cancel</button>
            <button onClick={() => navigate("/collections")} className="flex-[2] py-3 md:py-3.5 rounded-xl text-[15px] font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2">
              <Check size={18} /> Create Link
            </button>
          </div>
        </div>

        {/* ═══ MOBILE: Live Preview Modal/Drawer ═══ */}
        {showMobilePreview && (
          <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm lg:hidden flex flex-col justify-end" onClick={() => setShowMobilePreview(false)}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-50 w-full h-[85vh] rounded-t-[32px] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
              {/* Drawer Handle & Header */}
              <div className="bg-white px-6 pt-4 pb-4 border-b border-gray-100 flex-shrink-0">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Live Preview</h2>
                  <button onClick={() => setShowMobilePreview(false)} className="text-gray-400 hover:text-gray-900 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-gray-900" />
                  </button>
                </div>
              </div>

              {/* Drawer Content (The Preview itself) */}
              <div className="flex-1 overflow-y-auto p-5 pb-10">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mx-auto max-w-sm">
                  {/* Preview Content Re-used */}
                  <div className="text-center pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold mb-4 shadow-sm border border-blue-100/50">
                      {(user.business?.name || user.firstName || "P")[0]}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title || "Your Link Title"}</h3>
                    <p className="text-sm text-gray-500 mt-1">by {user.business?.name || `${user.firstName} ${user.lastName}`}</p>
                  </div>

                  <div className="py-6 space-y-5">
                    {description && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Amount</p>
                      {amountType === "fixed" ? (
                        <p className="text-2xl font-bold text-gray-900">{sym}{(amount || "0.00")}</p>
                      ) : (
                        <div className="space-y-2.5">
                          {items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 font-medium flex-1 truncate pr-4">{item.desc || `Item ${i + 1}`} <span className="text-gray-400 font-normal ml-1">×{item.qty}</span></span>
                              <span className="font-semibold text-gray-900 text-right">{sym}{(Number(item.qty) * Number(item.price || 0)).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-2 px-2 py-2 rounded-lg">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-blue-600 text-lg">{totalDisplay}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button disabled className="w-full h-12 rounded-xl text-[15px] font-bold shadow-sm opacity-50 bg-gray-900 text-white flex items-center justify-center gap-2">
                    {"Pay Now"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
