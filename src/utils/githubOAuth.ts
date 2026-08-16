export function openGithubOAuthPopup(): Promise<string> {
  return new Promise((resolve, reject) => {
    const env = (import.meta as unknown as { env?: { VITE_GITHUB_CLIENT_ID?: string } }).env;
    const clientId = env?.VITE_GITHUB_CLIENT_ID;

    if (!clientId) {
      reject(new Error("Thiếu cấu hình VITE_GITHUB_CLIENT_ID trong môi trường"));
      return;
    }

    const width = 500;
    const height = 600;
    const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - height) / 2);

    const redirectUri = `${window.location.origin}/oauth/github/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;

    const popup = window.open(
      githubAuthUrl,
      "GitHubOAuthPopup",
      `width=${width.toString()},height=${height.toString()},left=${left.toString()},top=${top.toString()},scrollbars=yes,status=yes`,
    );

    if (!popup) {
      reject(new Error("Popup đăng nhập GitHub đã bị trình duyệt chặn. Vui lòng bỏ chặn popup và thử lại."));
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data as { type?: string; code?: string; error?: string } | null;
      if (data?.type === "GITHUB_AUTH_SUCCESS" && data.code) {
        cleanup();
        resolve(data.code);
      } else if (data?.type === "GITHUB_AUTH_ERROR") {
        cleanup();
        reject(new Error(data.error ?? "Đăng nhập GitHub thất bại"));
      }
    };

    const checkClosedInterval = setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error("Cửa sổ đăng nhập GitHub đã bị đóng trước khi hoàn tất"));
      }
    }, 500);

    const cleanup = () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(checkClosedInterval);
    };

    window.addEventListener("message", handleMessage);
  });
}
