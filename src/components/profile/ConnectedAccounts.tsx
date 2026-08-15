import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { unlinkOAuthThunk } from "./profileThunks";
import Button from "@/components/common/Button";
import { GithubIcon, GoogleIcon } from "@/components/common/Icons";
import { toast } from "sonner";

export function ConnectedAccounts() {
  const dispatch = useAppDispatch();
  const socialLinks = useAppSelector(
    (state) => state.profile.user?.social_links,
  );

  const githubLinked = socialLinks?.github?.is_linked ?? true;
  const githubUsername = socialLinks?.github?.username ?? "@lam_dev";

  const googleLinked = socialLinks?.google?.is_linked ?? false;
  const googleUsername = socialLinks?.google?.username;

  const handleUnlink = async (provider: "github" | "google") => {
    try {
      await dispatch(unlinkOAuthThunk({ provider })).unwrap();
      toast.success(
        `Đã hủy liên kết tài khoản ${provider === "github" ? "GitHub" : "Google"} thành công.`,
      );
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      toast.error(errorObj.message ?? "Hủy liên kết tài khoản thất bại");
    }
  };

  const handleLink = (provider: "github" | "google") => {
    toast.info(
      `Vui lòng đăng nhập qua ${provider === "github" ? "GitHub" : "Google"} để hoàn tất liên kết.`,
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="font-text-h3medium text-text-main text-base font-semibold">
        Connected accounts
      </h3>

      <div className="flex flex-col w-full border border-border rounded-xl bg-background-secondary-0 divide-y divide-border overflow-hidden">
        {/* GitHub Account Row */}
        <div className="flex items-center justify-between p-4 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white shrink-0 shadow-sm">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-text-main text-sm leading-tight truncate">
                GitHub
              </span>
              <span className="text-xs text-text-secondary leading-tight truncate mt-0.5">
                {githubLinked ? githubUsername : "Not linked"}
              </span>
            </div>
          </div>

          {githubLinked ? (
            <Button
              type="button"
              variant="text"
              onClick={() => {
                void handleUnlink("github");
              }}
              className="text-xs font-medium text-text-main hover:text-red-500 px-3 py-1.5"
            >
              Unlink
            </Button>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                handleLink("github");
              }}
              className="text-xs font-medium text-text-main px-4 py-1.5 rounded-lg border-border"
            >
              Link
            </Button>
          )}
        </div>

        {/* Google Account Row */}
        <div className="flex items-center justify-between p-4 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 border border-border flex items-center justify-center shrink-0 shadow-sm">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-text-main text-sm leading-tight truncate">
                Google
              </span>
              <span className="text-xs text-text-secondary leading-tight truncate mt-0.5">
                {googleLinked ? (googleUsername ?? "Linked") : "Not linked"}
              </span>
            </div>
          </div>

          {googleLinked ? (
            <Button
              type="button"
              variant="text"
              onClick={() => {
                void handleUnlink("google");
              }}
              className="text-xs font-medium text-text-main hover:text-red-500 px-3 py-1.5"
            >
              Unlink
            </Button>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                handleLink("google");
              }}
              className="text-xs font-medium text-text-main px-4 py-1.5 rounded-lg border-border"
            >
              Link
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectedAccounts;
