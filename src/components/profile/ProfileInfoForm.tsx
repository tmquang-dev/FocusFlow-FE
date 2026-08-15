import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateProfileThunk } from "./profileThunks";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { LockIcon } from "@/components/common/Icons";
import ConnectedAccounts from "./ConnectedAccounts";
import { toast } from "sonner";

const profileSchema = z.object({
    full_name: z.string().trim().min(1, "Họ và tên là bắt buộc"),
    email: z.email("Địa chỉ email không hợp lệ"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileInfoForm() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.profile.user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: user?.full_name ?? "Lam dev",
            email: user?.email ?? "lam.dev@focusflow.com",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                full_name: user.full_name,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            await dispatch(
                updateProfileThunk({
                    full_name: data.full_name,
                    avatar_url: user?.avatar_url,
                })
            ).unwrap();
            toast.success("Cập nhật thông tin tài khoản thành công!");
        } catch (err: unknown) {
            const errorObj = err as { message?: string };
            toast.error(errorObj.message ?? "Cập nhật hồ sơ thất bại");
        }
    };

    return (
        <form
            onSubmit={(e) => {
                void handleSubmit(onSubmit)(e);
            }}
            className="flex flex-col gap-6 w-full"
        >
            {/* FULLNAME Field */}
            <InputField
                label="FULLNAME"
                placeholder="Lam dev"
                error={errors.full_name?.message}
                {...register("full_name")}
            />

            {/* EMAIL Field with Lock Icon */}
            <InputField
                label="EMAIL"
                placeholder="lam.dev@focusflow.com"
                leftIcon={<LockIcon className="w-4 h-4 text-text-secondary" />}
                error={errors.email?.message}
                disabled
                {...register("email")}
            />

            {/* Connected Accounts Section */}
            <ConnectedAccounts />

            {/* Save Changes Full Width Primary Button */}
            <Button
                type="submit"
                variant="primary"
                disabled={!isDirty || isSubmitting}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm shadow-md transition-all mt-2"
            >
                Save changes
            </Button>
        </form>
    );
}

export default ProfileInfoForm;
