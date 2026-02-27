import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { useFormik } from "formik";
import * as Yup from "yup";
import { request } from '~/services/request';
import { useMutation } from '@tanstack/react-query';
import { cn } from '~/lib/utils';
import { PasswordInput } from '~/components/ui/password-input';
import { ErrorFeedback } from '~/components/toast';
import { ArrowLeft } from 'lucide-react';
import Logo from '~/components/logo';

const BLUE = "#0052FF";

const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().min(8, "Must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await request.post("/auth/register", data);
      return response.data;
    },
    onSuccess: () => navigate('/dashboard'),
  });

  const errorMessage = (error as any)?.response?.data?.message || "An error occurred during registration. Please try again.";

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phoneNumber: "" },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...payload } = values;
      mutate(payload);
    },
  });

  return (
    <div className="flex min-h-screen bg-background font-sans">

      {/* ─── LEFT: Form ─── */}
      <div className="w-full flex mt-6 flex-col items-center justify-center px-6 sm:px-12 py-12">

        {/* Back link */}
        <div className="absolute top-8 left-6 sm:left-12">
          <Link to="/login" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#0052FF] hover:border-[#0052FF]/30 transition-all">
            <ArrowLeft size={18} />
          </Link>
        </div>

        <div className="max-w-[440px] w-full mx-auto">
          {/* Logo */}
          <div className="mb-10 grid place-items-center sm:place-items-start">
            <Logo size="large" />
          </div>

          <div className="mb-10">
            <h1 className="text-[32px] sm:text-[40px] leading-tight font-extrabold text-gray-900 tracking-tight mb-2">
              Create account
            </h1>
            <p className="text-gray-500 font-medium">Start collecting payments in minutes</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-500 ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  {...formik.getFieldProps("firstName")}
                  className={cn(
                    "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all",
                    formik.touched.firstName && formik.errors.firstName ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-500 ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...formik.getFieldProps("lastName")}
                  className={cn(
                    "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all",
                    formik.touched.lastName && formik.errors.lastName ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-500 ml-1">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                {...formik.getFieldProps("email")}
                className={cn(
                  "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all",
                  formik.touched.email && formik.errors.email ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-500 ml-1">Phone Number</label>
              <input
                type="tel"
                placeholder="0800 000 0000"
                {...formik.getFieldProps("phoneNumber")}
                className={cn(
                  "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all",
                  formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-500 ml-1">Password</label>
                <PasswordInput
                  placeholder="••••••••"
                  {...formik.getFieldProps("password")}
                  className={cn(
                    "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 focus:outline-none focus:ring-4 transition-all",
                    formik.touched.password && formik.errors.password ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-500 ml-1">Confirm</label>
                <PasswordInput
                  placeholder="••••••••"
                  {...formik.getFieldProps("confirmPassword")}
                  className={cn(
                    "w-full px-5 py-4 rounded-[20px] bg-white border text-base font-medium text-gray-900 focus:outline-none focus:ring-4 transition-all",
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-[#0052FF]/10 focus:border-[#0052FF]"
                  )}
                />
              </div>
            </div>

            {isError && <ErrorFeedback message={errorMessage} />}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending || !formik.isValid}
                isLoading={isPending}
                className="w-full py-6 rounded-[20px] text-lg font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: formik.isValid ? BLUE : "#CBD5E1", boxShadow: formik.isValid ? `0 12px 24px -8px ${BLUE}60` : "none" }}
              >
                Sign Up
              </Button>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <button type="button" className="w-full py-4 rounded-[20px] bg-white border border-gray-200 text-gray-700 font-bold text-base flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.52 12.2727C23.52 11.4218 23.4436 10.6036 23.3018 9.81818H12V14.4545H18.4582C18.18 15.9491 17.34 17.2145 16.0364 18.0873V21.0873H19.9145C22.1836 19 23.52 15.9273 23.52 12.2727Z" fill="#4285F4" />
                <path d="M12.0001 24C15.2401 24 17.9564 22.9255 19.9146 21.0873L16.0365 18.0873C14.9783 18.8018 13.6037 19.2273 12.0001 19.2273C8.89645 19.2273 6.26191 17.1327 5.32373 14.3345H1.31464V17.4436C3.27827 21.3436 7.33645 24 12.0001 24Z" fill="#34A853" />
                <path d="M5.32364 14.3345C5.08364 13.6145 4.94727 12.8236 4.94727 12C4.94727 11.1764 5.08364 10.3855 5.32364 9.66545V6.55636H1.31455C0.507273 8.16545 0 9.99818 0 12C0 14.0018 0.507273 15.8345 1.31455 17.4436L5.32364 14.3345Z" fill="#FBBC05" />
                <path d="M12.0001 4.77273C13.7619 4.77273 15.3383 5.37818 16.5819 6.56182L20.0019 3.14182C17.951 1.23273 15.2346 0 12.0001 0C7.33645 0 3.27827 2.65636 1.31464 6.55636L5.32373 9.66545C6.26191 6.86727 8.89645 4.77273 12.0001 4.77273Z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>

            <p className="text-center font-medium text-gray-500 pt-2 pb-4">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0052FF] font-bold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}
