import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="welcome-section">
          <h1>Welcome, {user?.fullName}!</h1>
          <p className="user-info">
            <span className="badge">{user?.role}</span>
            <span className={`badge status-${user?.status}`}>{user?.status}</span>
          </p>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/profile" className="action-card">
              <div className="action-icon icon-profile"></div>
              <h3>My Profile</h3>
              <p>View and edit your profile</p>
            </Link>

            {user?.role === 'admin' && (
              <Link to="/users" className="action-card">
                <div className="action-icon icon-users"></div>
                <h3>Manage Users</h3>
                <p>View and manage all users</p>
              </Link>
            )}

            <Link to="/profile" className="action-card">
              <div className="action-icon icon-lock"></div>
              <h3>Change Password</h3>
              <p>Update your password</p>
            </Link>
          </div>
        </div>

        <div className="info-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Role</label>
              <p>{user?.role}</p>
            </div>
            <div className="info-item">
              <label>Status</label>
              <p>{user?.status}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
