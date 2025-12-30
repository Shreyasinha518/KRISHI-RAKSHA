'use client';

import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import FarmInformation from './FarmInformation';
import ActivityTimeline from './ActivityTimeline';

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

const UserProfileInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState({
  name: '',
  email: '',
  phone: '',
  avatar: '',
  avatarAlt: '',
  language: 'en',
  joinedDate: ''
});

  const [parcels, setParcels] = useState<LandParcel[]>([
  {
    id: '1',
    area: 5.5,
    unit: 'acres',
    cropType: 'Rice',
    soilType: 'Alluvial',
    irrigationType: 'Canal',
    location: 'Thanjavur, Tamil Nadu'
  },
  {
    id: '2',
    area: 3.2,
    unit: 'acres',
    cropType: 'Cotton',
    soilType: 'Black',
    irrigationType: 'Drip',
    location: 'Nagpur, Maharashtra'
  }]
  );

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
  }, []);

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

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="h-48 bg-muted rounded-lg animate-pulse" />
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>);

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
