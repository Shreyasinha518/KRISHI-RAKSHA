'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from './ProfileHeader';
import FarmInformation from './FarmInformation';
import ActivityTimeline from './ActivityTimeline';
import { apiClient } from '@/lib/api';

interface LandParcel {
  id: string;
  area: number;
  unit: string;
  cropType: string;
  soilType: string;
  irrigationType: string;
  location: string;
}

interface Activity {
  id: string;
  type: 'claim' | 'prediction' | 'profile' | 'document' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'pending' | 'failed';
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  preview?: string;
  previewAlt?: string;
}

interface FarmerData {
  id: string;
  name: string;
  phone: string;
  email: string;
  village?: string;
  district?: string;
  state?: string;
  landSizeAcres?: number;
  cropType?: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

const UserProfileInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: 'https://ui-avatars.com/api/?name=Farmer&background=10b981&color=fff&size=128',
    avatarAlt: 'Farmer profile picture',
    language: 'en',
    joinedDate: ''
  });

  const [parcels, setParcels] = useState<LandParcel[]>([]);

  const [activities] = useState<Activity[]>([
  {
    id: '1',
    type: 'claim',
    title: 'Claim Submitted',
    description: 'Crop damage claim for Parcel #1 submitted successfully',
    timestamp: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    type: 'prediction',
    title: 'Yield Prediction Generated',
    description: 'AI prediction completed for Rice crop - Expected yield: 4.2 tons/acre',
    timestamp: '1 day ago',
    status: 'success'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    description: 'Insurance payout of ₹1,25,000 credited to your account',
    timestamp: '3 days ago',
    status: 'success'
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Verified',
    description: 'Land ownership certificate verified successfully',
    timestamp: '5 days ago',
    status: 'success'
  },
  {
    id: '5',
    type: 'profile',
    title: 'Profile Updated',
    description: 'Contact information and farm details updated',
    timestamp: '1 week ago',
    status: 'success'
  },
  {
    id: '6',
    type: 'prediction',
    title: 'Risk Assessment',
    description: 'Low risk detected for Cotton crop in Parcel #2',
    timestamp: '1 week ago',
    status: 'success'
  }]
  );

  const [documents, setDocuments] = useState<Document[]>([
  {
    id: '1',
    name: 'Land_Ownership_Certificate.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '15 Dec 2024',
    status: 'verified',
    preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1325dcaa7-1764671154592.png",
    previewAlt: 'Scanned document showing official land ownership certificate with government seal'
  },
  {
    id: '2',
    name: 'Aadhaar_Card.jpg',
    type: 'JPG',
    size: '1.8 MB',
    uploadDate: '15 Dec 2024',
    status: 'verified',
    preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff1a1fb0-1764678637382.png",
    previewAlt: 'Scanned copy of Aadhaar card identity document with masked details'
  },
  {
    id: '3',
    name: 'Farm_Photo_2024.jpg',
    type: 'JPG',
    size: '3.1 MB',
    uploadDate: '10 Dec 2024',
    status: 'pending',
    preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc1152c7-1764654292500.png",
    previewAlt: 'Aerial view of green agricultural farmland with irrigation channels and crop rows'
  }]
  );

  useEffect(() => {
    setIsHydrated(true);
    fetchFarmerData();
  }, []);

  const fetchFarmerData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Check if user is authenticated
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/authentication');
        return;
      }

      // Fetch farmer data from backend
      const response = await apiClient.getCurrentFarmer();
      
      if (response.success && response.farmer) {
        const farmer = response.farmer;
        setFarmerData(farmer);
        
        // Update user state with farmer data
        setUser({
          name: farmer.name || 'Farmer',
          email: farmer.email || '',
          phone: farmer.phone || '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name || 'Farmer')}&background=10b981&color=fff&size=128`,
          avatarAlt: `${farmer.name} profile picture`,
          language: 'en',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        });

        // Create initial parcel from registration data if available
        if (farmer.state && farmer.landSizeAcres && farmer.cropType) {
          const initialParcel: LandParcel = {
            id: '1',
            area: farmer.landSizeAcres,
            unit: 'acres',
            cropType: farmer.cropType,
            soilType: 'Alluvial', // Default, can be updated
            irrigationType: 'Canal', // Default, can be updated
            location: `${farmer.village || ''}${farmer.village && farmer.district ? ', ' : ''}${farmer.district || ''}${farmer.district && farmer.state ? ', ' : ''}${farmer.state || ''}`.trim() || farmer.state || 'Not specified'
          };
          setParcels([initialParcel]);
        }
      }
    } catch (error: any) {
      console.error('Failed to fetch farmer data:', error);
      setError(error.message || 'Failed to load profile data');
      
      // If unauthorized, redirect to login
      if (error.message?.includes('token') || error.message?.includes('Unauthorized')) {
        router.push('/authentication');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (file: File) => {
    if (!isHydrated) return;
    console.log('Avatar uploaded:', file.name);
  };

  const handleLanguageChange = (language: string) => {
    if (!isHydrated) return;
    setUser({ ...user, language });
    console.log('Language changed to:', language);
  };

  const handleAddParcel = (parcel: Omit<LandParcel, 'id'>) => {
    if (!isHydrated) return;
    const newParcel = {
      ...parcel,
      id: Date.now().toString()
    };
    setParcels([...parcels, newParcel]);
  };

  const handleEditParcel = (id: string, updates: Partial<LandParcel>) => {
    if (!isHydrated) return;
    setParcels(parcels.map((p) => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeleteParcel = (id: string) => {
    if (!isHydrated) return;
    setParcels(parcels.filter((p) => p.id !== id));
  };

  const handleDocumentUpload = (files: FileList) => {
    if (!isHydrated) return;
    console.log('Documents uploaded:', files.length);
  };

  const handleDocumentDelete = (id: string) => {
    if (!isHydrated) return;
    setDocuments(documents.filter((d) => d.id !== id));
  };

  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="h-48 bg-muted rounded-lg animate-pulse" />
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !farmerData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-error/10 border border-error rounded-lg p-6 text-center">
            <p className="text-error font-body">{error}</p>
            <button
              onClick={fetchFarmerData}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-body"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          user={user}
          onAvatarUpload={handleAvatarUpload}
          />


        <FarmInformation
          parcels={parcels}
          onAddParcel={handleAddParcel}
          onEditParcel={handleEditParcel}
          onDeleteParcel={handleDeleteParcel} />


       
        <ActivityTimeline activities={activities} />
      </div>
    </div>);

};

export default UserProfileInteractive;
