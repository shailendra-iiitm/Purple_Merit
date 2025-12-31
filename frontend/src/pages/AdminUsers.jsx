import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalUsers: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, []);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching users with token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
      const response = await userAPI.getAllUsers(page, 10);
      console.log('API Response:', response.data);
      console.log('Users:', response.data.data.users);
      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error status:', err.response?.status);
      console.error('Error message:', err.response?.data?.message);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (userId) => {
    if (!window.confirm('Are you sure you want to activate this user?')) return;

    try {
      await userAPI.activateUser(userId);
      setMessage('User activated successfully');
      fetchUsers(pagination.currentPage);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to activate user');
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;

    try {
      await userAPI.deactivateUser(userId);
      setMessage('User deactivated successfully');
      fetchUsers(pagination.currentPage);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to deactivate user');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>User Management</h1>
        <p>Total Users: {pagination.totalUsers}</p>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge role-${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`badge status-${user.status}`}>{user.status}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    {user.status === 'active' ? (
                      <button
                        onClick={() => handleDeactivate(user._id)}
                        className="btn btn-danger"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(user._id)}
                        className="btn btn-success"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
