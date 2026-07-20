import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="sticky top-0 z-40 bg-ink px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-medium text-white tracking-tight">
          Social<span className="text-violet-400">App</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <Link
              to="/dashboard/posts"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to={`/profile/${currentUser.id}`}
              className="ring-2 ring-transparent hover:ring-violet-400 rounded-full transition-all"
            >
              <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-white/70 hover:text-coral transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors px-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 transition-colors px-4 py-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}