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
        const res = await fetch("https://pokemonu09.onrender.com/api/googleUser", {
          credentials: "include",
        });
 
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to login!", error);
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