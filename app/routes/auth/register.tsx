import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import { useAuth } from '@/hooks/useAuth';
import { Check, Eye, EyeOff } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import Logo from '~/components/logo';
import * as Yup from "yup";
import { useFormik } from "formik";
import { PasswordInput } from '~/components/ui/password-input';
import { cn } from '~/lib/utils';
import { useRegister } from '~/hooks/use-register';
import { ErrorFeedback } from '~/components/toast';
import { useMutation } from '@tanstack/react-query';
import { request } from '~/services/request';

const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name is too long")
    .matches(/^[A-Za-z]+$/, "First name can only contain letters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name is too long")
    .matches(/^[A-Za-z]+$/, "Last name can only contain letters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10–15 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const Signup = () => {

  const navigate = useNavigate();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const response = await request.post("/auth/register", data);
      return response.data;
    },
    onSuccess: (data, variables, onMutateResult) => {
      console.log("Registration successful:", data);
      navigate('/dashboard');
    },
    onError: (error) => {
    },
  });


  const errorMessage =
    (error as any)?.response?.data?.message ||
    "An error occurred during registration. Please try again.";

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: registerSchema,
    isInitialValid: false,
    onSubmit: (values) => {

      const { confirmPassword, ...payload } = values;

      mutate(payload);
    },
  });


  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-10 px-6">
      <div className="w-full max-w-xl sm:border sm:border-grey-500 sm:rounded-md sm:px-6 sm:py-10">
        <div className='grid place-items-center'>
          <div className="block text-center text-2xl font-bold text-primary mb-8">
            <Logo size="large" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-center">Create your account</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Start collecting payments in minutes</p>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
          <div className='flex gap-4 flex-col sm:flex-row'>
            <fieldset className='flex-1'>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...formik.getFieldProps("firstName")}
                placeholder="Adewale"
                className="mt-1"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.firstName}
                </p>
              )}
            </fieldset>
            <fieldset className='flex-1'>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...formik.getFieldProps("lastName")}
                placeholder="Johnson"
                className="mt-1"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.lastName}
                </p>
              )}
            </fieldset>
          </div>
          <fieldset>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              {...formik.getFieldProps("email")}
              placeholder="you@example.com"
              className={cn(
                "pr-10",
                formik.touched.email &&
                formik.errors.email &&
                "border-destructive focus-visible:ring-destructive",
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.email}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="Enter phone number"
              {...formik.getFieldProps("phoneNumber")}
              className={cn(
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber &&
                "border-destructive focus-visible:ring-destructive",
              )}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.phoneNumber}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Enter Password"
              {...formik.getFieldProps("password")}
              className={cn(
                formik.touched.password &&
                formik.errors.password &&
                "border-destructive focus-visible:ring-destructive",
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.password}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className={cn(
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "border-destructive focus-visible:ring-destructive",
              )}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </fieldset>
          {isError && (
            <div>
              <ErrorFeedback
                message={errorMessage}
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isPending || !formik.isValid}
            isLoading={isPending}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
