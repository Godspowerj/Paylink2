import { useState } from "react";
import { ArrowLeft, Edit2, Building2, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { useToast } from "~/hooks/use-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "~/lib/utils";
import { useAuth } from "~/contexts/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "~/services/request";
import type { BusinessProfileValues } from "~/@types";
import { ErrorFeedback, SuccessFeedback } from "~/components/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// ─── CATEGORIES ───
const categories = [
  { value: "RETAIL", label: "Retail" },
  { value: "SERVICES", label: "Services" },
  { value: "FOOD_BEVERAGE", label: "Food & Beverage" },
  { value: "EDUCATION", label: "Education" },
  { value: "HEALTH", label: "Health" },
  { value: "EVENTS", label: "Events" },
  { value: "OTHER", label: "Other" },
];

// ─── NIGERIAN STATES ───
const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

// ─── VALIDATION ───
const businessProfileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .required("Business name is required"),

  description: Yup.string()
    .trim()
    .max(500, "Description must be under 500 characters")
    .notRequired(),

  category: Yup.string()
    .oneOf(categories.map(c => c.value), "Invalid category")
    .notRequired(),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .notRequired(),

  phone: Yup.string()
    .trim()
    .min(7, "Phone number is too short")
    .notRequired(),

  address: Yup.string()
    .trim()
    .max(200, "Address must be under 200 characters")
    .notRequired(),

  city: Yup.string()
    .trim()
    .max(50, "City must be under 50 characters")
    .notRequired(),

  state: Yup.string()
    .trim()
    .notRequired(),
});

const bankDetailsSchema = Yup.object({
  accountNumber: Yup.string()
    .trim()
    .matches(/^\d+$/, "Account number must contain only digits")
    .min(9, "Account number must be at least 9 digits")
    .max(12, "Account number is too long")
    .required("Account number is required"),

  bankName: Yup.string()
    .trim()
    .required("Please select a bank"),

  accountName: Yup.string()
    .trim()
    .min(2, "Account name is too short")
    .required("Account name is required"),
});

// ─── MAIN PAGE ───
export default function Profile() {
  return (
    <AppLayout className="bg-[#f4f5f6]">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/settings" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Business Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your business details and payouts</p>
          </div>
        </div>

        <BusinessProfile />
        <BankingInformation />
      </div>
    </AppLayout>
  );
}

// ─── BUSINESS PROFILE FORM ───
const BusinessProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data, isSuccess } = useMutation({
    mutationFn: async (data: BusinessProfileValues) => {
      if (user.business) {
        const response = await request.put("/businesses/me", data);
        return response.data;
      }
      const response = await request.post("/businesses", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setIsLocked(true);
    },
  });

  const isEditing = !!user.business;
  const [isLocked, setIsLocked] = useState(isEditing); // locked when existing biz, open when new

  const formik = useFormik({
    initialValues: {
      name: user.business?.name ?? "",
      description: user.business?.description ?? "",
      category: user.business?.category ?? "",
      email: user.business?.email ?? "",
      phone: user.business?.phone ?? "",
      address: user.business?.address ?? "",
      city: user.business?.city ?? "",
      state: user.business?.state ?? "",
    },
    validationSchema: businessProfileSchema,
    onSubmit: (values) => {
      mutate(values);
    },
    validateOnMount: true,
  });

  const errorMessage = (error as any)?.response?.data?.message;
  const successMessage = data?.message;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <Building2 size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEditing ? "Business Details" : "Create Your Business"}
            </h2>
            <p className="text-xs text-gray-500">
              {isEditing ? "Update your business information" : "Only the business name is required to get started"}
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            onClick={() => setIsLocked(prev => !prev)}
            className="cursor-pointer border border-gray-200 hover:border-blue-600 px-3 rounded-full text-sm h-8 inline-flex gap-2 items-center bg-white text-gray-500 hover:text-blue-600 transition"
          >
            <Edit2 size={14} />
            {isLocked ? "Edit" : "Lock"}
          </button>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Business Name (Required) */}
        <div className="space-y-2">
          <Label htmlFor="name">Business Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            placeholder="e.g. GP Clothing, EduPay Group"
            disabled={isEditing && isLocked}
            {...formik.getFieldProps("name")}
            className={cn(
              "h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all",
              formik.touched.name && formik.errors.name && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-destructive">{formik.errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formik.values.category}
            onValueChange={(val) => formik.setFieldValue("category", val)}
            disabled={isEditing && isLocked}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            placeholder="Tell customers about your business..."
            disabled={isEditing && isLocked}
            {...formik.getFieldProps("description")}
            className={cn(
              "flex min-h-[100px] w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y focus:bg-white transition-all",
              formik.touched.description && formik.errors.description && "border-destructive focus-visible:ring-destructive"
            )}
          />
          <p className="text-xs text-right text-gray-400">{formik.values.description.length}/500</p>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="info@yourbusiness.com"
              disabled={isEditing && isLocked}
              {...formik.getFieldProps("email")}
              className={cn(
                "h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all",
                formik.touched.email && formik.errors.email && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-destructive">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Business Phone</Label>
            <Input
              id="phone"
              placeholder="08012345678"
              disabled={isEditing && isLocked}
              {...formik.getFieldProps("phone")}
              className={cn(
                "h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all",
                formik.touched.phone && formik.errors.phone && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-xs text-destructive">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="12 Allen Avenue"
            disabled={isEditing && isLocked}
            {...formik.getFieldProps("address")}
            className={cn(
              "h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all",
              formik.touched.address && formik.errors.address && "border-destructive focus-visible:ring-destructive"
            )}
          />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="e.g. Ikeja"
              disabled={isEditing && isLocked}
              {...formik.getFieldProps("city")}
              className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={formik.values.state}
              onValueChange={(val) => formik.setFieldValue("state", val)}
              disabled={isEditing && isLocked}
            >
              <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feedback */}
        {isError && <ErrorFeedback message={errorMessage} />}
        {isSuccess && <SuccessFeedback message={successMessage} />}

        {/* Submit */}
        <div className="pt-2">
          <Button
            className="w-full md:w-auto min-w-[200px] h-11 rounded-full gap-2 font-medium"
            disabled={isPending || !formik.isValid}
            isLoading={isPending}
          >
            {isEditing ? "Save Changes" : "Create Business Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

// ─── BANKING INFORMATION ───
const BankingInformation = () => {
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bankName: "",
      accountName: "",
    },
    validationSchema: bankDetailsSchema,
    onSubmit: (values) => {
      toast({ title: "Bank Details Saved", description: "Payouts will now be sent to this account." });
    },
    validateOnMount: true,
  });

  // Simulate account verification
  const handleVerify = () => {
    if (formik.values.accountNumber.length >= 10 && formik.values.bankName) {
      setVerifying(true);
      setTimeout(() => {
        formik.setFieldValue("accountName", "JONAH GODSPOWER");
        setAccountVerified(true);
        setVerifying(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
          <Building2 size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Banking Information</h2>
          <p className="text-xs text-gray-500">Set up your payout account to receive funds</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Bank Select */}
        <div className="space-y-2">
          <Label>Select Bank</Label>
          <Select
            value={formik.values.bankName}
            onValueChange={(val) => {
              formik.setFieldValue("bankName", val);
              setAccountVerified(false);
              formik.setFieldValue("accountName", "");
            }}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200">
              <SelectValue placeholder="Choose your bank" />
            </SelectTrigger>
            <SelectContent>
              {bankList.map((bank) => (
                <SelectItem key={bank.id} value={bank.name}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.bankName && formik.errors.bankName && (
            <p className="text-xs text-destructive">{formik.errors.bankName}</p>
          )}
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <div className="relative">
            <Input
              id="accountNumber"
              placeholder="0123456789"
              maxLength={10}
              {...formik.getFieldProps("accountNumber")}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                formik.setFieldValue("accountNumber", val);
                setAccountVerified(false);
                formik.setFieldValue("accountName", "");
              }}
              className={cn(
                "h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all font-mono tracking-wider",
                formik.touched.accountNumber && formik.errors.accountNumber && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {verifying && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-blue-600" size={18} />
              </div>
            )}
          </div>
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <p className="text-xs text-destructive">{formik.errors.accountNumber}</p>
          )}
          <p className="text-xs text-gray-500">Enter your 10-digit NUBAN account number.</p>
        </div>

        {/* Verify Button */}
        {formik.values.accountNumber.length >= 10 && formik.values.bankName && !accountVerified && (
          <Button
            type="button"
            variant="outline"
            onClick={handleVerify}
            disabled={verifying}
            className="rounded-full h-9 text-sm"
          >
            {verifying ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
            ) : (
              "Verify Account"
            )}
          </Button>
        )}

        {/* Verified Account Name */}
        {accountVerified && formik.values.accountName && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div>
              <p className="text-xs text-green-600 font-medium uppercase">Account Name</p>
              <p className="text-lg font-bold text-green-900">{formik.values.accountName}</p>
            </div>
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <Button
            className="w-full md:w-auto min-w-[200px] h-11 rounded-full gap-2 font-medium"
            disabled={!formik.isValid || !accountVerified}
          >
            Save Bank Details
          </Button>
        </div>
      </form>
    </div>
  );
};