import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Calendar, Link2, ListPlus, GripVertical, Check, Info } from "lucide-react";
import { useNavigate } from "react-router";
import AppLayout from "~/components/layouts/app-layout";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function CreateCollection() {
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [amountType, setAmountType] = useState<"fixed" | "itemized">("fixed");
  const [amount, setAmount] = useState("");

  // Itemized State
  const [items, setItems] = useState([{ desc: "", qty: 1, price: "" }]);

  // Optional Fields
  const [description, setDescription] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [paymentLimit, setPaymentLimit] = useState("");

  // Custom Fields
  const [customFields, setCustomFields] = useState<{ label: string; type: string }[]>([]);
  const [showOptional, setShowOptional] = useState(false);

  // Helpers
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
    return items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price || 0)), 0);
  };

  return (
    <AppLayout className="bg-[#f4f5f6]">
      <div className="max-w-2xl mx-auto space-y-8 pb-6 lg:pb-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Create Payment Link</h1>
            <p className="text-sm text-gray-500">Set up a new collection link</p>
          </div>
        </div>

        <div className="space-y-6">

          {/* 1. Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">1</span>
              Basic Details
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Link Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="e.g. Consultation Fee, Event Ticket"
                  className="h-12 bg-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="GHS">GHS - Ghanaian Cedi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 2. Payment Details */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">2</span>
              Payment Amount
            </h2>

            <div className="bg-gray-50 p-1 rounded-xl flex gap-1 border border-gray-200">
              <button
                onClick={() => setAmountType("fixed")}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                  amountType === "fixed" ? "bg-white text-blue-600 shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-900"
                )}
              >
                Fixed Amount
              </button>
              <button
                onClick={() => setAmountType("itemized")}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                  amountType === "itemized" ? "bg-white text-blue-600 shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-900"
                )}
              >
                Itemized Breakdown
              </button>
            </div>

            {amountType === "fixed" ? (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{currency === 'NGN' ? '₦' : '$'}</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-10 h-14 text-lg font-bold bg-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex flex-wrap sm:flex-nowrap gap-3 items-start animate-in slide-in-from-left-2 duration-300">
                      <div className="flex-1 min-w-0 space-y-1">
                        <Input
                          placeholder="Item name"
                          value={item.desc}
                          onChange={(e) => updateItem(index, "desc", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="w-20 shrink-0 space-y-1">
                        <Input
                          type="number"
                          placeholder="Qty"
                          className="text-center bg-white"
                          value={item.qty}
                          onChange={(e) => updateItem(index, "qty", e.target.value)}
                        />
                      </div>
                      <div className="w-28 shrink-0 space-y-1">
                        <Input
                          type="number"
                          placeholder="Price"
                          className="text-right bg-white"
                          value={item.price}
                          onChange={(e) => updateItem(index, "price", e.target.value)}
                        />
                      </div>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-[1px] shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <button
                    onClick={addItem}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                  >
                    <Plus size={16} /> Add Another Item
                  </button>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Amount</span>
                    <p className="text-xl font-bold text-gray-900">
                      {currency === 'NGN' ? '₦' : '$'}{calculateTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Optional Details Toggle */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">3</span>
                Optional Details
              </h2>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                {showOptional ? "Hide" : "Show"}
                <Info size={16} />
              </div>
            </button>


            {showOptional && (
              <div className="space-y-6 mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    placeholder="Tell your customers what they are paying for..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <p className="text-xs text-right text-gray-400">{description.length}/500</p>
                </div>

                {/* Redirect & Expiry */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Redirect URL</Label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        type="url"
                        placeholder="https://example.com/thanks"
                        className="pl-9 bg-white"
                        value={redirectUrl}
                        onChange={(e) => setRedirectUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Expiration Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        type="date"
                        className="pl-9 bg-white"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Limit */}
                <div className="space-y-2">
                  <Label>Payment Limit</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50 (Leave empty for unlimited)"
                    className="bg-white"
                    value={paymentLimit}
                    onChange={(e) => setPaymentLimit(e.target.value)}
                  />
                </div>

                {/* Custom Fields */}
                <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900">Custom Fields</h3>
                    <button onClick={addCustomField} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <ListPlus size={14} /> Add Field
                    </button>
                  </div>

                  {customFields.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-4 italic">No custom fields added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {customFields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <GripVertical size={16} className="text-gray-300 cursor-move" />
                          <Input
                            placeholder="Field Label (e.g. T-Shirt Size)"
                            className="flex-1 bg-white"
                            value={field.label}
                            onChange={(e) => updateCustomField(index, "label", e.target.value)}
                          />
                          <Select value={field.type} onValueChange={(val) => updateCustomField(index, "type", val)}>
                            <SelectTrigger className="h-10 w-[100px] bg-white text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                          <button onClick={() => removeCustomField(index)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>


          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => navigate('/collections')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold text-base shadow-lg shadow-blue-200 w-full md:w-auto"
            >
              <Check size={20} className="mr-2" /> Create Payment Link
            </Button>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
