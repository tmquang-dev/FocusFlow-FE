import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { fetchProfileThunk } from "@/components/profile/profileThunks";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";

function ProfilePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchProfileThunk());
  }, [dispatch]);
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
      {/* Page Header Title & Subtitle */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-text-h1">
          Personal profile
        </h1>
        <p className="text-sm text-text-secondary">
          Manage profile and link account
        </p>
      </div>

      {/* Main Outer Card Container */}
      <div className="flex flex-col gap-6 p-6 sm:p-8 bg-background-secondary-0 border border-border rounded-2xl shadow-sm w-full">
        <ProfileHeaderCard />
        <ProfileInfoForm />
      </div>
    </div>
  );
}

export default ProfilePage;
