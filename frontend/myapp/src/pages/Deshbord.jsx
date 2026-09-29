import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Deshbord = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail') || 'User';

  // Fetch all users from Backend on component load
  useEffect(() => {
    fetch('http://localhost:5000/User/allUser')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .catch((err) => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500">Logged in as: <span className="font-semibold text-indigo-600">{userEmail}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            Logout
          </button>
        </div>

        {/* User List Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-base font-bold text-slate-800 mb-4">Registered Users</h2>

          {loading ? (
            <p className="text-sm text-slate-400 text-center py-6">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-800">{u.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-slate-600">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {u.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Deshbord;
