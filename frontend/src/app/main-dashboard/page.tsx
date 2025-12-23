import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import NavigationBreadcrumb from '@/components/common/NavigationBreadcrumb';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Main Dashboard - KRISHI RAKSHA',
  description: 'Comprehensive agricultural insurance dashboard with AI-powered yield predictions, fraud detection analytics, and real-time farm monitoring for Indian farmers.',
};

export default function MainDashboardPage() {
  return (
    <>
      <Header
        isAuthenticated={true}
        userName="Rajesh Kumar"
        userAvatar="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
        isMetaMaskConnected={false}
      />
      <NavigationBreadcrumb />
      <DashboardInteractive />
    </>
  );
}
