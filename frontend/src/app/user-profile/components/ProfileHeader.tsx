'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    avatarAlt: string;
    language: string;
    joinedDate: string;
  };
  onAvatarUpload: (file: File) => void;
  onLanguageChange: (language: string) => void;
}

const ProfileHeader = ({ user, onAvatarUpload, onLanguageChange }: ProfileHeaderProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(user.language);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isHydrated) return;
    const file = e.target.files?.[0];
    if (file) {
      onAvatarUpload(file);
    }
  };

  const handleLanguageSave = () => {
    if (!isHydrated) return;
    onLanguageChange(selectedLanguage);
    setIsEditing(false);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-card p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-4 w-full">
            <div className="h-8 bg-muted rounded animate-pulse w-48" />
            <div className="h-4 bg-muted rounded animate-pulse w-64" />
            <div className="h-4 bg-muted rounded animate-pulse w-56" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-primary">
            <AppImage
              src={user.avatar}
              alt={user.avatarAlt}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center bg-foreground/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Icon name="CameraIcon" size={32} className="text-primary-foreground" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{user.name}</h1>
          <div className="space-y-2 text-text-secondary">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="EnvelopeIcon" size={18} />
              <span className="font-body">{user.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="PhoneIcon" size={18} />
              <span className="font-body">{user.phone}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="CalendarIcon" size={18} />
              <span className="font-body text-sm">Member since {user.joinedDate}</span>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
            <Icon name="LanguageIcon" size={20} className="text-primary" />
            {isEditing ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleLanguageSave}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-150 font-body text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedLanguage(user.language);
                  }}
                  className="px-3 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors duration-150 font-body text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-body text-foreground">
                  {languages.find((l) => l.code === user.language)?.name}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:text-primary/80 transition-colors duration-150"
                >
                  <Icon name="PencilIcon" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
