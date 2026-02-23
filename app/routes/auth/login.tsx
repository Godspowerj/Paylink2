import { useState } from 'react';
import { Link, redirect, useFetcher, useNavigate } from 'react-router';
// import { useAuth } from '@/hooks/useAuth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import Logo from '~/components/logo';
import { useFormik } from "formik";
import * as Yup from "yup";
import { request } from '~/services/request';
import { useMutation } from '@tanstack/react-query';
import { cn } from '~/lib/utils';
import { PasswordInput } from '~/components/ui/password-input';
import { ErrorFeedback } from '~/components/toast';
import { tokenStore } from '~/services/token-store';

interface LoginPayload {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login = () => {

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await request.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful!", data);
      // Store the access token in localStorage
      tokenStore.setAccessToken(data.data.accessToken);
      
      setTimeout(() => {
        console.log("Running timeout")
        // Redirect to dashboard
        navigate("/dashboard"); 
      }, 500);
      console.log(data.message);
    },
  });

  const errorMessage =
    (error as any)?.response?.data?.message ||
    "An error occurred during login. Please try again.";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      mutate(values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl sm:border sm:border-grey-500 sm:rounded-md sm:px-6 sm:py-10">
        <div className='grid place-items-center'>
          <div className="block text-center text-2xl font-bold text-primary mb-8">
            <Logo size="large" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-center">Welcome back</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Log in to manage your collections</p>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...formik.getFieldProps("email")}
              className={cn(
                "mt-1",
                formik.touched.email &&
                formik.errors.email &&
                "border-destructive focus-visible:ring-destructive"
              )}

            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              className={cn(
                formik.touched.password &&
                formik.errors.password &&
                "border-destructive focus-visible:ring-destructive"
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-destructive mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {isError && (
            <ErrorFeedback message={errorMessage} />
          )}
          <Button
            type="submit"
            disabled={isPending || !formik.isValid}
            isLoading={isPending}
            className="w-full mt-2"
          >
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
