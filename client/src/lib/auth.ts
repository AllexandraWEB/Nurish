import { NavigateFunction } from "react-router-dom";

export const logout = async (navigate: NavigateFunction) => {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Call backend logout endpoint
      await fetch('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    navigate("/login");
  }
};