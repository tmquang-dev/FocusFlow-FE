import { useEffect } from "react";

export default function GithubCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (window.opener) {
      const parentWindow = window.opener as Window;
      if (code) {
        parentWindow.postMessage(
          { type: "GITHUB_AUTH_SUCCESS", code },
          window.location.origin,
        );
      } else if (error) {
        parentWindow.postMessage(
          { type: "GITHUB_AUTH_ERROR", error },
          window.location.origin,
        );
      }
      window.close();
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-background-main flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-text-main">
          Đang hoàn tất kết nối với GitHub...
        </p>
      </div>
    </div>
  );
}
