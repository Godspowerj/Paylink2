import { useState } from "react";
import { Save, Download, LogOut, Edit, Edit2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { useToast } from "~/hooks/use-toast";
import { useFormik } from "formik"
import * as Yup from "yup";
import { cn } from "~/lib/utils";
import { useAuth } from "~/contexts/auth";
import { useMutation } from "@tanstack/react-query";
import { request } from "~/services/request";
import type { BusinessProfileValues } from "~/@types";
import { ErrorFeedback, SuccessFeedback } from "~/components/toast";

const businessProfileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  businessEmail: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Business email is required"),

  phone: Yup.string()
    .trim()
    .min(7, "Phone number is too short")
    .required("Phone number is required"),

  address: Yup.string()
    .trim()
    .min(2, "Address is too short")
    .required("Address is required"),

  logo: Yup.string()
    .trim()
    .url("Enter a valid URL")
    .nullable()
    .notRequired(),
})

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
})

const Profile = () => {

  const { user } = useAuth();

  const { mutate, isPending, isError, error, data, isSuccess } = useMutation({
    mutationFn: async (data: BusinessProfileValues) => {
      // Updated Business Profile
      // if (user.business) {
      //   const response = await request.put("/businesses/me", data);
      //   return response.data;
      // }
      // Create Business Profile
      const response = await request.post("/businesses", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Business created!", data);

      console.log(data.message);
    },
  });

  const areFormFieldsDisabled = !!user.business

  const formik = useFormik({
    initialValues: {
      name: user.business?.name ?? "",
      businessEmail: user.business?.businessEmail ?? "",
      phone: user.business?.phone ?? "",
      address: user.business?.address ?? "",
      logo: user.business?.logo ?? "",
    },
    validationSchema: businessProfileSchema,
    onSubmit: (values) => {
      // handleSave(values)
      mutate(values)
    },
    validateOnMount: true,
  })

  const payoutFormik = useFormik({
    initialValues: {
      accountNumber: "",
      bankName: "",
      accountName: "",
    },
    validationSchema: bankDetailsSchema,
    onSubmit: (values) => {
      // handleSave(values)
    },
    validateOnMount: true,
  })

  console.log(isError, error)
  const errorMessage =
    (error as any)?.response?.data?.message;
  console.log(errorMessage)

  console.log("IS Success", isSuccess)
  console.log("Success", data)
  const successMessage = data?.message;

  return (
    <AppLayout className="bg-[#f4f5f6]">
      <h1 className="mb-1 text-2xl font-bold text-foreground">Business Profile</h1>
      <p className="mb-6 text-sm text-muted-foreground">Manage your business profile and payout details</p>

      <div className="space-y-8 bg-white p-5 lg:p-6 rounded-[12px] mb-[24px]">
        {/* Profile */}
        <section>
          {/* <div className="mb-4 flex justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
            {
              user.business ? (
                <button className="cursor-pointer border border-[#DAE0E6] hover:border-primary px-3 rounded-sm text-[14px] leading-[100%] h-[32px] inline-flex gap-2 items-center bg-white text-gray-500 hover:text-white hover:bg-primary transition">
                  <Edit2 size={14} />
                  Edit
                </button>
              ) : (
                <div>{" "}</div>
              )
            }
          </div> */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="orgName">Business/Group Name</Label>
              <Input
                id="name"
                placeholder="Enter business or group name"
                disabled={areFormFieldsDisabled}
                {...formik.getFieldProps("name")}
                className={cn(
                  "mt-1",
                  formik.touched.name &&
                  formik.errors.name &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                placeholder="you@example.com"
                disabled={areFormFieldsDisabled}
                {...formik.getFieldProps("businessEmail")}
                className={cn(
                  "mt-1",
                  formik.touched.businessEmail &&
                  formik.errors.businessEmail &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {formik.touched.businessEmail && formik.errors.businessEmail && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.businessEmail}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                disabled={areFormFieldsDisabled}
                {...formik.getFieldProps("phone")}
                className={cn(
                  "mt-1",
                  formik.touched.phone &&
                  formik.errors.phone &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                placeholder="Enter business address"
                disabled={areFormFieldsDisabled}
                {...formik.getFieldProps("address")}
                className={cn(
                  "mt-1",
                  formik.touched.address &&
                  formik.errors.address &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>
            {isError && (
              <ErrorFeedback message={errorMessage} />
            )}
            {isSuccess && (
              <SuccessFeedback message={successMessage} />
            )}
            <Button
              className="w-full rounded-[24px] gap-2"
              disabled={isPending || !formik.isValid}
              isLoading={isPending}
            >
              Create Business Profile
            </Button>
          </form>
        </section>
      </div>

      <div className="space-y-8 bg-white p-5 lg:p-6 rounded-[12px]">
        {/* Payout */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Banking Information
          </h2>
          <form className="space-y-6">
            <div>
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="012345678"
                {...payoutFormik.getFieldProps("accountNumber")}
                className={cn(
                  "mt-1",
                  payoutFormik.touched.accountNumber &&
                  payoutFormik.errors.accountNumber &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {payoutFormik.touched.accountNumber && payoutFormik.errors.accountNumber && (
                <p className="text-xs text-destructive mt-1">
                  {payoutFormik.errors.accountNumber}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="bank">Select Bank</Label>
              <Input
                id="bankName"
                placeholder="Select Bank"
                {...payoutFormik.getFieldProps("bankName")}
                className={cn(
                  "mt-1",
                  payoutFormik.touched.bankName &&
                  payoutFormik.errors.bankName &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {payoutFormik.touched.bankName && payoutFormik.errors.bankName && (
                <p className="text-xs text-destructive mt-1">
                  {payoutFormik.errors.bankName}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="bank">Account Name</Label>
              <Input
                id="accountName"
                placeholder="Account Name"
                {...payoutFormik.getFieldProps("accountName")}
                className={cn(
                  "mt-1",
                  payoutFormik.touched.accountName &&
                  payoutFormik.errors.accountName &&
                  "border-destructive focus-visible:ring-destructive"
                )}
              />
              {payoutFormik.touched.accountName && payoutFormik.errors.accountName && (
                <p className="text-xs text-destructive mt-1">
                  {payoutFormik.errors.accountName}
                </p>
              )}
            </div>
            <Button
              // onClick={handleSave}
              className="w-full gap-2 rounded-[24px]"
            >
              Save Changes
            </Button>
          </form>
        </section>


        {/* Export & Logout */}
        {/* <section className="space-y-3">
          <Button variant="outline" className="w-full gap-2">
            <Download size={16} /> Export Payment History
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => navigate("/")}
          >
            <LogOut size={16} /> Logout
          </Button>
        </section> */}
      </div>
    </AppLayout>
  );
};

export default Profile;
