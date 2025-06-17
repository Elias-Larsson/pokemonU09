import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ShieldProps {
  children: React.ReactNode;
}

export const Shield = ({ children }: ShieldProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/googleUser`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
          },
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthenticated(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return null;

  return <>{children}</>;
};
