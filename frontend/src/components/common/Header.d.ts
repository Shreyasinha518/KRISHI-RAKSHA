import { FC } from 'react';

declare module '@/components/common/Header' {
  interface HeaderProps {
    isAuthenticated?: boolean;
    userName?: string;
    userAvatar?: string;
    onLogout?: () => void;
    onMetaMaskConnect?: () => void;
    isMetaMaskConnected?: boolean;
    walletAddress?: string;
  }

  const Header: FC<HeaderProps>;
  export default Header;
}
