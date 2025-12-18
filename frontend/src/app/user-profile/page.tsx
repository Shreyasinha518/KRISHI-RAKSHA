import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import NavigationBreadcrumb from '@/components/common/NavigationBreadcrumb';
import UserProfileInteractive from './components/UserProfileInteractive';

export const metadata: Metadata = {
  title: 'User Profile - AgriInsure Predict',
  description: 'Manage your personal information, farm details, documents, and track your activity on AgriInsure Predict platform.',
};

export default function UserProfilePage() {
  return (
    <>
      <Header
        isAuthenticated={true}
        userName="Rajesh Kumar"
        userAvatar="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
        isMetaMaskConnected={true}
        walletAddress="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      />
      <NavigationBreadcrumb />
      <UserProfileInteractive />
    </>
  );
}
