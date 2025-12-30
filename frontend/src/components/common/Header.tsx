'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
  onMetaMaskConnect?: () => void;
  isMetaMaskConnected?: boolean;
  walletAddress?: string;
}

const Header = ({
  isAuthenticated = false,
  userName: propUserName = '',
  onLogout,
  onMetaMaskConnect,
  isMetaMaskConnected = false,
  walletAddress,
}: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userName, setUserName] = useState(propUserName || 'User');

  // Get userName from localStorage if not provided
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated) {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName && !propUserName) {
        setUserName(storedUserName);
      } else if (propUserName) {
        setUserName(propUserName);
      }
    }
  }, [isAuthenticated, propUserName]);

  // Default logout handler
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      // Clear all authentication data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
      }
      
      // Call custom logout handler if provided
      if (onLogout) {
        onLogout();
      }
      
      // Redirect to authentication page
      router.push('/authentication');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'ChartBarIcon' },
    { label: 'Claims', path: '/claims-management', icon: 'DocumentTextIcon' },
    { label: 'Profile', path: '/user-profile', icon: 'UserIcon' },
    { label: 'About', path: '/about', icon: 'InformationCircleIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const formatWalletAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <header className="sticky top-0 z-[100] bg-card border-b border-border shadow-card">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/landing-page" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="HomeIcon" size={22} className="text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-xl font-heading font-bold">
              KRISHI RAKSHA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">

            {/* Wallet */}
            {isAuthenticated && (
              <button
                onClick={onMetaMaskConnect}
                className={`hidden lg:flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
                  isMetaMaskConnected
                    ? 'bg-success text-success-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <Icon name="WalletIcon" size={18} />
                <span>
                  {isMetaMaskConnected && walletAddress
                    ? formatWalletAddress(walletAddress)
                    : 'Connect Wallet'}
                </span>
              </button>
            )}

            {/* User Name Display (Desktop) */}
            {isAuthenticated && userName && (
              <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-md bg-muted/50">
                <Icon name="UserIcon" size={16} className="text-primary" />
                <span className="text-sm font-body font-medium text-foreground">
                  {userName || 'User'}
                </span>
              </div>
            )}

            {/* Logout (Desktop) */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg bg-error/10 hover:bg-error/20 text-error border border-error/20 hover:border-error/40 transition-all duration-200 font-body font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <Icon name="ArrowRightOnRectangleIcon" size={18} />
                    <span>Logout</span>
                  </>
                )}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[150]"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-16 right-0 bottom-0 w-64 bg-card border-l border-border z-[200] p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-md hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="border-t border-border my-3" />

                {/* User Name (Mobile) */}
                {userName && (
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-muted/50 mb-2">
                    <Icon name="UserIcon" size={16} className="text-primary" />
                    <span className="text-sm font-body font-medium text-foreground">
                      {userName || 'User'}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => {
                    onMetaMaskConnect?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-200 font-body font-medium"
                >
                  <Icon name="WalletIcon" size={18} />
                  <span>
                    {isMetaMaskConnected && walletAddress
                      ? formatWalletAddress(walletAddress)
                      : 'Connect Wallet'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-error/10 hover:bg-error/20 text-error border border-error/20 hover:border-error/40 transition-all duration-200 font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="ArrowRightOnRectangleIcon" size={18} />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
