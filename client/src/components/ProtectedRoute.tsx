import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  if (!user) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;