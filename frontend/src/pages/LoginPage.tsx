import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authService } from "../main";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import {FcGoogle} from 'react-icons/fc'

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const responseGoogle = async (authResult: { access_token?: string }) => {
    setLoading(true);
    if (!authResult?.access_token) {
      toast.error("Google login did not return access token");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post(`${authService}/api/auth/login`, {
        accessToken: authResult.access_token,
      });
      localStorage.setItem("token", result.data.token);
      toast.success(result.data.message);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "login failed";
      console.log("Google login failed:", error?.response?.data || error);
      toast.error(message);
      setLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: () => {
      toast.error("Google sign-in popup was cancelled or failed");
    },
    flow: "implicit",
    scope: "openid profile email",
  });

  return(
  <div className="flex min-h-screen items-center justify-center bg-white px-4">
    <div className="w-full max-w-sm space-y-6">
      <h1 className="text-center text-3xl front-bold text-[#E23]">DineFlow</h1>
      <p className="text-center text-sm text-gray-500">
        Log In or Sing up to continue
      </p>
      <button
        onClick={() => googleLogin()}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3  rounded-x1 border border-gray-300 bg-white px-4 py-3"
      >
        <FcGoogle size={20} />
        {loading ? "Signing in..." : "Login with Google"}
      </button>
      <p className="text-center text-xs text-gray-400">
  By continuing, you agree with our{" "}
  <span className="text-[#E23774]">Terms of Service</span> &{" "}
  <span className="text-[#E23774]">Privacy Policy</span>
</p>
    </div>
  </div>
  )
};

export default LoginPage;
