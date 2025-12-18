'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ClaimFilters from './ClaimFilters';
import ClaimsTable from './ClaimsTable';
import ClaimDetailsModal from './ClaimDetailsModal';
import NewClaimModal from './NewClaimModal';

interface Claim {
  id: string;
  submissionDate: string;
  cropType: string;
  claimedAmount: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'paid';
  affectedArea: number;
  incidentDate: string;
  incidentDescription: string;
  assessorNotes?: string;
  documents: Array<{name: string;url: string;type: string;}>;
  photos: Array<{url: string;alt: string;}>;
  paymentTimeline?: Array<{date: string;event: string;}>;
  blockchainTxHash?: string;
}

const ClaimsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockClaims: Claim[] = [
  {
    id: 'CLM-2025-001',
    submissionDate: '15/12/2025',
    cropType: 'rice',
    claimedAmount: 125000,
    status: 'under_review',
    affectedArea: 5.5,
    incidentDate: '10/12/2025',
    incidentDescription:
    'Heavy rainfall caused flooding in the paddy fields, resulting in complete submersion of crops for 48 hours. Water level reached 3 feet above ground level, causing severe damage to rice plants in the flowering stage.',
    assessorNotes:
    'Field inspection completed on 14/12/2025. Damage assessment confirms 85% crop loss due to prolonged waterlogging. Recommended for approval.',
    documents: [
    { name: 'Land_Records.pdf', url: '#', type: 'pdf' },
    { name: 'Weather_Report.pdf', url: '#', type: 'pdf' }],

    photos: [
    {
      url: "https://images.unsplash.com/photo-1633862825341-9c5e11507498",
      alt: 'Flooded rice paddy field with water covering green rice plants up to stem level'
    },
    {
      url: "https://images.unsplash.com/photo-1695712325265-628a2a136304",
      alt: 'Close-up view of damaged rice crops with brown wilted leaves after flood'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a65325c7-1764668080742.png",
      alt: 'Wide angle shot of waterlogged agricultural land with standing water'
    }],

    paymentTimeline: [
    { date: '15/12/2025', event: 'Claim submitted successfully' },
    { date: '16/12/2025', event: 'Initial review completed' },
    { date: '17/12/2025', event: 'Field inspection scheduled' }],

    blockchainTxHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8'
  },
  {
    id: 'CLM-2025-002',
    submissionDate: '10/12/2025',
    cropType: 'wheat',
    claimedAmount: 85000,
    status: 'approved',
    affectedArea: 3.2,
    incidentDate: '05/12/2025',
    incidentDescription:
    'Unexpected hailstorm damaged wheat crops during the grain filling stage. Hailstones of 2-3 cm diameter caused physical damage to wheat heads and stems, resulting in significant yield loss.',
    assessorNotes:
    'Damage verified through satellite imagery and field visit. Estimated 70% crop loss. Claim approved for payment processing.',
    documents: [
    { name: 'Insurance_Policy.pdf', url: '#', type: 'pdf' },
    { name: 'Damage_Assessment.pdf', url: '#', type: 'pdf' }],

    photos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_12389043b-1765079593229.png",
      alt: 'Wheat field with damaged golden wheat stalks bent and broken after hailstorm'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1107cec2e-1765122906379.png",
      alt: 'Close-up of wheat heads showing physical damage and broken grains'
    }],

    paymentTimeline: [
    { date: '10/12/2025', event: 'Claim submitted' },
    { date: '11/12/2025', event: 'Under review' },
    { date: '13/12/2025', event: 'Approved for payment' },
    { date: '16/12/2025', event: 'Payment initiated' }],

    blockchainTxHash: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
  },
  {
    id: 'CLM-2025-003',
    submissionDate: '08/12/2025',
    cropType: 'cotton',
    claimedAmount: 95000,
    status: 'paid',
    affectedArea: 4.0,
    incidentDate: '01/12/2025',
    incidentDescription:
    'Severe pest infestation by pink bollworm affected cotton bolls during the flowering and boll formation stage. Despite pesticide application, the infestation spread rapidly causing extensive damage.',
    assessorNotes:
    'Entomological assessment confirms severe pink bollworm infestation. Damage exceeds 75% of expected yield. Payment processed successfully.',
    documents: [
    { name: 'Pest_Report.pdf', url: '#', type: 'pdf' },
    { name: 'Treatment_Records.pdf', url: '#', type: 'pdf' }],

    photos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1774df24e-1764926829870.png",
      alt: 'Cotton plant with damaged white cotton bolls showing pest infestation'
    }],

    paymentTimeline: [
    { date: '08/12/2025', event: 'Claim submitted' },
    { date: '09/12/2025', event: 'Fast-track review initiated' },
    { date: '11/12/2025', event: 'Approved' },
    { date: '13/12/2025', event: 'Payment completed' }],

    blockchainTxHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
  },
  {
    id: 'CLM-2025-004',
    submissionDate: '05/12/2025',
    cropType: 'sugarcane',
    claimedAmount: 150000,
    status: 'pending',
    affectedArea: 6.0,
    incidentDate: '28/11/2025',
    incidentDescription:
    'Prolonged drought conditions and water scarcity affected sugarcane growth during the critical tillering stage. Inadequate irrigation due to depleted groundwater levels resulted in stunted growth and reduced cane thickness.',
    documents: [
    { name: 'Water_Scarcity_Certificate.pdf', url: '#', type: 'pdf' }],

    photos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1810860c6-1765265624444.png",
      alt: 'Sugarcane field with dry brown leaves and stunted growth due to drought'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1810860c6-1765265624444.png",
      alt: 'Close-up of wilted sugarcane plants with yellowing leaves in dry soil'
    }]

  },
  {
    id: 'CLM-2025-005',
    submissionDate: '02/12/2025',
    cropType: 'maize',
    claimedAmount: 65000,
    status: 'rejected',
    affectedArea: 2.5,
    incidentDate: '25/11/2025',
    incidentDescription:
    'Crop damage reported due to alleged pest attack. However, upon inspection, damage appears to be due to improper agricultural practices rather than insured perils.',
    assessorNotes:
    'Field inspection reveals damage is primarily due to inadequate fertilization and poor crop management practices. Does not meet claim criteria. Claim rejected.',
    documents: [{ name: 'Initial_Report.pdf', url: '#', type: 'pdf' }],
    photos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_12142121b-1764926833357.png",
      alt: 'Maize field with yellowing corn plants showing signs of nutrient deficiency'
    }]

  }];


  const filteredClaims = mockClaims.filter((claim) => {
    const statusMatch = selectedStatus === 'all' || claim.status === selectedStatus;
    const cropMatch = selectedCrop === 'all' || claim.cropType === selectedCrop;

    let dateMatch = true;
    if (dateRange.start && dateRange.end) {
      const claimDate = new Date(claim.submissionDate.split('/').reverse().join('-'));
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      dateMatch = claimDate >= startDate && claimDate <= endDate;
    }

    return statusMatch && cropMatch && dateMatch;
  });

  const handleResetFilters = () => {
    setSelectedStatus('all');
    setSelectedCrop('all');
    setDateRange({ start: '', end: '' });
  };

  const handleViewDetails = (claim: Claim) => {
    setSelectedClaim(claim);
  };

  const handleCloseDetails = () => {
    setSelectedClaim(null);
  };

  const handleNewClaim = () => {
    setIsNewClaimModalOpen(true);
  };

  const handleCloseNewClaim = () => {
    setIsNewClaimModalOpen(false);
  };

  const handleSubmitClaim = (claimData: any) => {
    console.log('New claim submitted:', claimData);
    setIsNewClaimModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-6 p-6">
          <div className="h-12 bg-muted rounded-lg w-1/3" />
          <div className="h-64 bg-muted rounded-lg" />
          <div className="h-96 bg-muted rounded-lg" />
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Claims Management
            </h1>
            <p className="text-base text-text-secondary">
              Track and manage your insurance claims
            </p>
          </div>
          <button
            onClick={handleNewClaim}
            className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-all duration-200 shadow-primary hover:shadow-primary-hover">

            <Icon name="PlusIcon" size={20} />
            <span>Submit New Claim</span>
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage &&
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
            <Icon name="CheckCircleIcon" size={24} className="text-success" />
            <div>
              <p className="text-sm font-body font-medium text-foreground">
                Claim submitted successfully!
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Your claim is being processed and you will receive updates via SMS and email.
              </p>
            </div>
          </div>
        }

        {/* Filters */}
        <ClaimFilters
          selectedStatus={selectedStatus}
          selectedCrop={selectedCrop}
          dateRange={dateRange}
          onStatusChange={setSelectedStatus}
          onCropChange={setSelectedCrop}
          onDateRangeChange={setDateRange}
          onReset={handleResetFilters} />


        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Total Claims</p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {mockClaims.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="DocumentTextIcon" size={24} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Pending</p>
                <p className="text-2xl font-heading font-bold text-warning">
                  {mockClaims.filter((c) => c.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="ClockIcon" size={24} className="text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Approved</p>
                <p className="text-2xl font-heading font-bold text-success">
                  {mockClaims.filter((c) => c.status === 'approved' || c.status === 'paid').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircleIcon" size={24} className="text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Total Amount</p>
                <p className="text-2xl font-heading font-bold text-primary">
                  ₹
                  {mockClaims.
                  reduce((sum, claim) => sum + claim.claimedAmount, 0).
                  toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BanknotesIcon" size={24} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <ClaimsTable claims={filteredClaims} onViewDetails={handleViewDetails} />

        {/* Export Button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center space-x-2 px-6 py-2 border border-border rounded-lg text-sm font-body font-medium text-foreground hover:bg-muted transition-colors duration-200">
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>Export Claims Report</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedClaim &&
      <ClaimDetailsModal claim={selectedClaim} onClose={handleCloseDetails} />
      }

      {isNewClaimModalOpen &&
      <NewClaimModal onClose={handleCloseNewClaim} onSubmit={handleSubmitClaim} />
      }
    </div>);

};

export default ClaimsInteractive;