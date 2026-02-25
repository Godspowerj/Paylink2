import { useState } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AppLayout from "~/components/layouts/app-layout";
import { useToast } from "~/hooks/use-toast";
import { useAuth } from "~/contexts/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "~/services/request";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "~/lib/utils";
import { ErrorFeedback, SuccessFeedback } from "~/components/toast";

const profileSchema = Yup.object({
    firstName: Yup.string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
    phone: Yup.string()
        .trim()
        .min(7, "Phone number is too short")
        .notRequired(),
});

const SettingsProfile = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [avatar, setAvatar] = useState(user.avatar || "/avatar.jpg");

    const { mutate, isPending, isError, error, data, isSuccess } = useMutation({
        mutationFn: async (values: { firstName: string; lastName: string; phone?: string }) => {
            const response = await request.put("/users/profile", values);
            return response.data;
        },
        onSuccess: (data) => {
            // Refresh the user data so the whole app updates
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            toast({ title: "Profile Updated", description: "Your personal information has been saved." });
        },
    });

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            mutate(values);
        },
        validateOnMount: true,
    });

    const errorMessage = (error as any)?.response?.data?.message;
    const successMessage = data?.message;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
            // TODO: Upload avatar file to API
        }
    };

    // Check if form values have changed from the original user data
    const hasChanges =
        formik.values.firstName !== (user.firstName || "") ||
        formik.values.lastName !== (user.lastName || "") ||
        formik.values.phone !== (user.phone || "");

    return (
        <AppLayout className="bg-[#f4f5f6]">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link to="/settings" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 border border-gray-200">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-sm text-gray-500">Manage your personal information</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-100">
                        <div className="relative group">
                            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                                <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition shadow-md border-2 border-white">
                                <Camera size={14} />
                            </label>
                            <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </div>

                        <div className="text-center sm:text-left flex-1">
                            <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                            <p className="text-sm text-gray-500 mb-3">Upload a new photo to update your profile.</p>
                            <label htmlFor="avatar-upload" className="inline-flex h-9 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition">
                                Upload New Photo
                            </label>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    {...formik.getFieldProps("firstName")}
                                    className={cn(
                                        "bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11",
                                        formik.touched.firstName && formik.errors.firstName && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="text-xs text-destructive">{formik.errors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    {...formik.getFieldProps("lastName")}
                                    className={cn(
                                        "bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11",
                                        formik.touched.lastName && formik.errors.lastName && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="text-xs text-destructive">{formik.errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="08012345678"
                                {...formik.getFieldProps("phone")}
                                className={cn(
                                    "bg-gray-50/50 border-gray-200 focus:bg-white transition-all h-11",
                                    formik.touched.phone && formik.errors.phone && "border-destructive focus-visible:ring-destructive"
                                )}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-xs text-destructive">{formik.errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                value={user.email}
                                disabled
                                className="bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed h-11"
                            />
                            <p className="text-[11px] text-gray-400">Email address cannot be changed.</p>
                        </div>

                        {/* Feedback */}
                        {isError && <ErrorFeedback message={errorMessage} />}
                        {isSuccess && <SuccessFeedback message={successMessage} />}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full md:w-auto min-w-[160px] h-11 rounded-full gap-2 font-medium"
                                disabled={isPending || !formik.isValid || !hasChanges}
                                isLoading={isPending}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default SettingsProfile;
