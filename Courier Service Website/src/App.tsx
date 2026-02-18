import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { BookCourier } from './components/BookCourier';
import { TrackCourier } from './components/TrackCourier';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData, admin = false) => {
    setUser(userData);
    setIsAdmin(admin);
    navigateTo(admin ? 'admin-dashboard' : 'user-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    navigateTo('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} user={user} />;
      case 'register':
        return <RegisterPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'admin-login':
        return <AdminLoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'user-dashboard':
        return <UserDashboard navigateTo={navigateTo} user={user} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard navigateTo={navigateTo} user={user} onLogout={handleLogout} />;
      case 'book-courier':
        return <BookCourier navigateTo={navigateTo} user={user} />;
      case 'track-courier':
        return <TrackCourier navigateTo={navigateTo} user={user} />;
      default:
        return <HomePage navigateTo={navigateTo} user={user} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}
