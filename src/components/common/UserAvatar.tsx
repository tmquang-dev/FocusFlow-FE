import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { UserIcon } from "./Icons";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  className?: string;
}

function UserAvatar({ className }: UserAvatarProps) {
  const user = useAppSelector((state) => state.profile.user);
  const [imageError, setImageError] = useState(false);

  const avatarUrl = user?.avatar_url ?? user?.avatar;

  if (avatarUrl && !imageError) {
    return (
      <img
        src={avatarUrl}
        alt={user?.full_name ?? "User avatar"}
        onError={() => {
          setImageError(true);
        }}
        className={cn(
          "w-8 h-8 rounded-full object-cover border border-border shadow-sm shrink-0 cursor-pointer",
          className,
        )}
      />
    );
  }

  if (user?.full_name) {
    const initial = user.full_name.trim().charAt(0).toUpperCase();
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-full bg-primary-600 text-white font-semibold text-xs flex items-center justify-center border border-primary-600 shadow-sm shrink-0 cursor-pointer select-none",
          className,
        )}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-1.5 rounded-full cursor-pointer bg-primary-200 border border-border flex items-center justify-center shrink-0",
        className,
      )}
    >
      <UserIcon className="w-4 h-4 text-text-main" />
    </div>
  );
}

export default UserAvatar;
