import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          User Management
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          {user?.role === 'admin' && (
            <Link to="/users" className="nav-link">
              Manage Users
            </Link>
          )}
        </div>

        <div className="navbar-user">
          <span className="user-name">{user?.fullName}</span>
          <span className="user-role">{user?.role}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
