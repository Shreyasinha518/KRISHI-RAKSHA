'use client';

import { useState, useEffect } from 'react';
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
  userName = 'User',
  onLogout,
  onMetaMaskConnect,
  isMetaMaskConnected = false,
  walletAddress,
}: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

            {/* Logout (Desktop) */}
            {isAuthenticated && (
              <button
                onClick={onLogout}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-md text-error hover:bg-muted"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={18} />
                <span>Logout</span>
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

                <button
                  onClick={() => {
                    onMetaMaskConnect?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-md bg-secondary"
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
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-md text-error hover:bg-muted"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={18} />
                  <span>Logout</span>
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
