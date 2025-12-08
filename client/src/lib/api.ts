export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        console.error('Unauthorized:', errorData);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error(errorData.message || 'Unauthorized');
      }
      
      // Create error object with all data from the response
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      // Attach additional error details to the error object
      (error as any).errors = errorData.errors;
      (error as any).details = errorData.details;
      (error as any).statusCode = response.status;
      
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};


