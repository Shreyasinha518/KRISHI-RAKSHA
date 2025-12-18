'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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

interface DocumentUploadProps {
  documents: Document[];
  onUpload: (files: FileList) => void;
  onDelete: (id: string) => void;
}

const DocumentUpload = ({ documents, onUpload, onDelete }: DocumentUploadProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    if (!isHydrated) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (!isHydrated) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isHydrated) return;
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isHydrated) return;
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      verified: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircleIcon', label: 'Verified' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'ClockIcon', label: 'Pending' },
      rejected: { color: 'bg-error/10 text-error border-error/20', icon: 'XCircleIcon', label: 'Rejected' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-medium border ${config.color}`}>
        <Icon name={config.icon as any} size={14} />
        {config.label}
      </span>
    );
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-card p-6 mb-6">
        <div className="h-8 bg-muted rounded animate-pulse w-48 mb-4" />
        <div className="h-32 bg-muted rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2 mb-6">
        <Icon name="DocumentIcon" size={28} className="text-primary" />
        Documents
      </h2>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-150 mb-6 ${
          isDragging
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
      >
        <Icon name="CloudArrowUpIcon" size={48} className="mx-auto mb-4 text-primary" />
        <p className="font-body text-foreground mb-2">
          Drag and drop files here, or click to browse
        </p>
        <p className="font-body text-sm text-text-secondary mb-4">
          Supported formats: PDF, JPG, PNG (Max 5MB)
        </p>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-150 font-body font-medium cursor-pointer">
          <Icon name="FolderOpenIcon" size={20} />
          Browse Files
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="DocumentIcon" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-body">No documents uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-background border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-150"
              >
                <div className="flex gap-3">
                  {/* Document Preview/Icon */}
                  <div className="flex-shrink-0">
                    {doc.preview ? (
                      <div className="w-16 h-16 rounded overflow-hidden">
                        <AppImage
                          src={doc.preview}
                          alt={doc.previewAlt || `Preview of ${doc.name}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                        <Icon name="DocumentIcon" size={32} className="text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-foreground truncate mb-1">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-body text-text-secondary mb-2">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(doc.status)}
                      <button
                        onClick={() => onDelete(doc.id)}
                        className="text-error hover:text-error/80 transition-colors duration-150"
                      >
                        <Icon name="TrashIcon" size={18} />
                      </button>
                    </div>
                    <p className="text-xs font-body text-text-secondary mt-2">
                      Uploaded: {doc.uploadDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;