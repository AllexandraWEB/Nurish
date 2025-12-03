import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await apiFetch("/api/auth/logout", { method: "POST" });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear both token and user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Trigger storage event for other tabs/windows
      window.dispatchEvent(new Event("storage"));
      
      navigate("/");
    }
  };

  return { handleLogout };
};