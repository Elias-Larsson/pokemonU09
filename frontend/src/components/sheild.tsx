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
    const checkAuth = async (retries = 3, delay = 1000) => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch("https://pokemonu09.onrender.com/api/googleUser", {
            method: "GET",
            credentials: "include",
            headers: {
              "Accept": "application/json",
            },
          });

          if (response.ok) {
            setAuthenticated(true);
            setLoading(false);
            return;
          } else {
            console.warn(`Auth check failed (attempt ${attempt}): ${response.status} ${response.statusText}`);
            if (attempt === retries) {
              setAuthenticated(false);
              navigate("/login");
            }
          }
        } catch (error) {
          console.error(`Auth check error (attempt ${attempt}):`, error);
          if (attempt === retries) {
            setAuthenticated(false);
            navigate("/login");
          }
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return null;
  return <>{children}</>;
};