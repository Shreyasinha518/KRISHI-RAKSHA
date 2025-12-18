'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onMetaMaskConnect?: () => void;
  isMetaMaskConnected?: boolean;
  walletAddress?: string;
}

const Header = ({
  isAuthenticated = false,
  userName = 'User',
  userAvatar,
  onLogout,
  onMetaMaskConnect,
  isMetaMaskConnected = false,
  walletAddress,
}: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'ChartBarIcon' },
    { label: 'Claims', path: '/claims-management', icon: 'DocumentTextIcon' },
    { label: 'Profile', path: '/user-profile', icon: 'UserIcon' },
    { label: 'About', path: '/about', icon: 'InformationCircleIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onLogout?.();
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-[100] bg-card border-b border-border shadow-card">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/landing-page" className="flex items-center space-x-2 flex-shrink-0">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 hover:scale-105"
            >
              <rect width="40" height="40" rx="8" fill="currentColor" className="text-primary" />
              <path
                d="M20 10L12 18H16V28H24V18H28L20 10Z"
                fill="currentColor"
                className="text-primary-foreground"
              />
              <circle cx="20" cy="32" r="2" fill="currentColor" className="text-accent" />
            </svg>
            <span className="text-xl font-heading font-bold text-foreground hidden sm:block">
              KRISHI RAKSHA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md text-base font-body font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-primary'
                    : 'text-foreground hover:bg-muted hover:scale-[1.02]'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* MetaMask Connection */}
            {isAuthenticated && (
              <button
                onClick={onMetaMaskConnect}
                className={`hidden lg:flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-200 ${
                  isMetaMaskConnected
                    ? 'bg-success text-success-foreground'
                    : 'bg-secondary text-secondary-foreground hover:scale-[1.02] hover:shadow-primary'
                }`}
              >
                <Icon name="WalletIcon" size={20} />
                <span className="hidden xl:inline">
                  {isMetaMaskConnected && walletAddress
                    ? formatWalletAddress(walletAddress)
                    : 'Connect Wallet'}
                </span>
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated && (
              <div className="hidden lg:block relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-all duration-200"
                >
                  {userAvatar ? (
                    <AppImage
                      src={userAvatar}
                      alt={userName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-body font-medium text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[150]"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-card-hover z-[200]">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-body font-medium text-foreground">{userName}</p>
                      </div>
                      <Link
                        href="/user-profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-body text-foreground hover:bg-muted transition-colors duration-150"
                      >
                        <Icon name="UserIcon" size={16} />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-body text-error hover:bg-muted transition-colors duration-150"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-150"
              aria-label="Toggle mobile menu"
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
            className="fixed inset-0 bg-foreground/50 z-[150] lg:hidden"
            onClick={handleMobileMenuToggle}
          />
          <div className="fixed top-16 right-0 bottom-0 w-64 bg-card border-l border-border shadow-card-hover z-[200] lg:hidden overflow-y-auto">
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleMobileMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-body font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="pt-4 mt-4 border-t border-border">
                    <button
                      onClick={() => {
                        onMetaMaskConnect?.();
                        handleMobileMenuToggle();
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-base font-body font-medium transition-all duration-200 ${
                        isMetaMaskConnected
                          ? 'bg-success text-success-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <Icon name="WalletIcon" size={20} />
                      <span>
                        {isMetaMaskConnected && walletAddress
                          ? formatWalletAddress(walletAddress)
                          : 'Connect Wallet'}
                      </span>
                    </button>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      {userAvatar ? (
                        <AppImage
                          src={userAvatar}
                          alt={userName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-body font-medium">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-base font-body font-medium text-foreground">
                        {userName}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleMobileMenuToggle();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 mt-2 rounded-md text-base font-body font-medium text-error hover:bg-muted transition-colors duration-150"
                    >
                      <Icon name="ArrowRightOnRectangleIcon" size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
