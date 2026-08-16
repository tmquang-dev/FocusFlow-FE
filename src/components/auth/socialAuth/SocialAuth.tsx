import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/components/profile/profileSlice";
import { authServices } from "@/api/services/authServices";
import { openGithubOAuthPopup } from "@/utils/githubOAuth";
import Button from "@/components/common/Button";
import { GithubIcon, GoogleIcon } from "@/components/common/Icons";
import { toast } from "sonner";
import axios from "axios";

interface IAxiosErrorData {
  message?: string;
}

function SocialsAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      void (async () => {
        try {
          const response = await authServices.googleLogin({
            auth_code: codeResponse.code,
          });
          dispatch(setUser(response.data.user));
          toast.success("Đăng nhập bằng Google thành công!");
          void navigate("/");
        } catch (err: unknown) {
          if (axios.isAxiosError<IAxiosErrorData>(err) && err.response?.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Đăng nhập bằng Google thất bại");
          }
        }
      })();
    },
    onError: () => {
      toast.error("Không thể kết nối với Google OAuth");
    },
    flow: "auth-code",
  });

  const handleGithubLogin = async () => {
    try {
      const code = await openGithubOAuthPopup();
      const response = await authServices.githubLogin({ auth_code: code });
      dispatch(setUser(response.data.user));
      toast.success("Đăng nhập bằng GitHub thành công!");
      void navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError<IAxiosErrorData>(err) && err.response?.data.message) {
        toast.error(err.response.data.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Đăng nhập bằng GitHub thất bại");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* GitHub */}
      <Button
        variant="primary"
        onClick={() => {
          void handleGithubLogin();
        }}
        leftIcon={<GithubIcon className="text-white w-5 h-5" />}
        className="bg-[#24292f] hover:bg-[#1c2026] active:bg-[#14181c] text-white text-xs font-semibold leading-4 tracking-[0.6px] border"
      >
        Continue with GitHub
      </Button>

      {/* Google */}
      <Button
        variant="outlined"
        onClick={() => {
          handleGoogleLogin();
        }}
        leftIcon={<GoogleIcon className="w-5 h-5" />}
        className="bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 text-text-placeholder text-xs font-semibold leading-4 tracking-[0.6px]"
      >
        Continue with Google
      </Button>
    </div>
  );
}

export default SocialsAuth;
