const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/User';

// Helper for standardized API requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    let res;
    try {
      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (networkError) {
      throw new Error(
        `Cannot connect to backend server (${BASE_URL}). Please verify that your backend is running on port 5000 (node server.js).`
      );
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Authentication
  login: (email, password) =>
    request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  // User Management
  getAllUsers: () => request('/allUser'),

  getUserById: (id) => request(`/${id}`),

  updateUser: (id, userData) =>
    request(`/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  deleteUser: (id) =>
    request(`/delete/${id}`, {
      method: 'DELETE',
    }),

  // Google OAuth URL helper
  getGoogleAuthUrl: () => `${BASE_URL}/auth/google`,
};
