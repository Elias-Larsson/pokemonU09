import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/googleUser`, {
          withCredentials: true,
        });

      } catch (error: unknown) {
        console.error("Couldnt get user");
      }
    };
    checkLogin();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm border border-gray-300 rounded-xl shadow-lg p-8 text-center">
        <h1>Log in</h1>

        <Button
          name="Log in with Google"
          color="red"
          buttonType="click"
          onClick={handleGoogleLogin}
        />
      </div>
    </div>
  );
};
