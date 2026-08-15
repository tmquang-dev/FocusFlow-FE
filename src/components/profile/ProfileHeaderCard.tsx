import { useState, useRef, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { uploadAvatarThunk, updateProfileThunk } from "./profileThunks";
import Button from "@/components/common/Button";
import { UserIcon } from "@/components/common/Icons";
import { toast } from "sonner";

export function ProfileHeaderCard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error(
          "Vui lòng chọn file hình ảnh hợp lệ (JPEG, PNG, WEBP, GIF)",
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return;
      }

      try {
        setImageError(false);
        await dispatch(uploadAvatarThunk(file)).unwrap();
        toast.success("Tải ảnh đại diện mới thành công!");
      } catch (err: unknown) {
        const errorObj = err as { message?: string };
        toast.error(errorObj.message ?? "Lỗi khi tải ảnh đại diện");
      }
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setImageError(false);
      await dispatch(updateProfileThunk({ avatar_url: null })).unwrap();
      toast.info("Đã xóa ảnh đại diện");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      toast.error(errorObj.message ?? "Không thể xóa ảnh đại diện");
    }
  };

  const avatarUrl = user?.avatar_url ?? user?.avatar;
  const initial = user?.full_name.trim().charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full py-2">
      {/* Large Centered Avatar Box */}
      <div className="relative group shrink-0">
        {avatarUrl && !imageError ? (
          <img
            src={avatarUrl}
            alt={user?.full_name ?? "User Avatar"}
            onError={() => {
              setImageError(true);
            }}
            className="w-28 h-28 rounded-2xl object-cover border-2 border-primary-400 p-0.5 shadow-sm"
          />
        ) : user?.full_name ? (
          <div className="w-28 h-28 rounded-2xl bg-primary-600 text-white font-bold text-4xl flex items-center justify-center border-2 border-primary-400 shadow-sm select-none">
            {initial}
          </div>
        ) : (
          <div className="w-28 h-28 rounded-2xl bg-primary-100 border-2 border-border flex items-center justify-center text-text-main shadow-sm">
            <UserIcon className="w-12 h-12" />
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            void handleFileChange(e);
          }}
          className="hidden"
        />
      </div>

      {/* Action Buttons: Change & Remove */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="text-xs px-5 py-2 rounded-lg font-medium shadow-sm"
        >
          Change
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            void handleRemovePhoto();
          }}
          className="text-xs px-5 py-2 rounded-lg font-medium border-border text-text-main"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ProfileHeaderCard;
