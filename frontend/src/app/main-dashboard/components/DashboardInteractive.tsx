'use client';

import { useState, useEffect } from 'react';

import YieldPredictionForm from './YieldPredictionForm';
import YieldResults from './YieldResults';
import FileUploadZone from './FileUploadZone';
import YieldComparisonChart from './YieldComparisonChart';
import FraudDistributionChart from './FraudDistributionChart';
import FarmLocationMap from './FarmLocationMap';

interface FormData {
  cropType: string;
  landArea: string;
  sowingDate: string;
  soilType: string;
  irrigationType: string;
  fertilizerUsage: number;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictionResults, setPredictionResults] = useState({
    predictedYield: 0,
    confidence: 0,
    riskLevel: 'low\' as \'low\' | \'medium\' | \'high',
    recommendations: [] as string[],
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const quickStats = [
    {
      title: 'Total Land Area',
      value: '25.5',
      unit: 'acres',
      trend: 'up' as const,
      trendValue: '+2.5%',
      trendLabel: 'Increased land usage', // 🆕
      icon: 'MapIcon',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Active Claims',
      value: '3',
      unit: 'claims',
      trend: 'neutral' as const,
      trendValue: '0%',
      trendLabel: 'No change in claims', // 🆕
      icon: 'DocumentTextIcon',
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      title: 'Predicted Yield',
      value: '42.8',
      unit: 'quintals',
      trend: 'up' as const,
      trendValue: '+8.2%',
      trendLabel: 'Production increasing', // 🆕
      icon: 'ChartBarIcon',
      bgColor: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Risk Score',
      value: '18',
      unit: '/100',
      trend: 'down' as const,
      trendValue: '-5.3%',
      trendLabel: 'Lower risk now', // 🆕
      icon: 'ShieldCheckIcon',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
    },
  ];

  const yieldComparisonData = [
    { season: 'Kharif 2023', predicted: 38, actual: 35 },
    { season: 'Rabi 2023-24', predicted: 42, actual: 44 },
    { season: 'Kharif 2024', predicted: 45, actual: 43 },
    { season: 'Current', predicted: 48, actual: 0 },
  ];

  const fraudDistributionData = [
    { category: 'Genuine Claims', value: 82, color: '#10B981' },
    { category: 'Suspicious', value: 12, color: '#F59E0B' },
    { category: 'Fraudulent', value: 6, color: '#DC2626' },
  ];

  const farmLocations = [
    {
      id: '1',
      name: 'Main Farm - Sector A',
      lat: 20.5937,
      lng: 78.9629,
      area: 15.5,
      crop: 'Rice',
    },
    {
      id: '2',
      name: 'Secondary Farm - Sector B',
      lat: 20.6037,
      lng: 78.9729,
      area: 10.0,
      crop: 'Wheat',
    },
  ];

  const handlePredictionSubmit = (formData: FormData) => {
    setIsLoading(true);
    setShowResults(false);

    // Simulate AI prediction
    setTimeout(() => {
      const mockYield = Math.floor(Math.random() * 20) + 35;
      const mockConfidence = Math.floor(Math.random() * 15) + 80;
      const riskLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
      const mockRisk = riskLevels[Math.floor(Math.random() * 3)];

      setPredictionResults({
        predictedYield: mockYield,
        confidence: mockConfidence,
        riskLevel: mockRisk,
        recommendations: [
          'Consider increasing organic fertilizer usage by 15% for better soil health',
          'Monitor irrigation levels closely during flowering stage',
          'Weather forecast suggests optimal conditions for next 2 weeks',
          'Pest control measures recommended in 10-15 days',
        ],
      });

      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFilesUploaded = (files: File[]) => {
    console.log('Files uploaded:', files.length);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
       
        {/* Prediction Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <YieldPredictionForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />
          {showResults && <YieldResults {...predictionResults} />}
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <FileUploadZone onFilesUploaded={handleFilesUploaded} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <YieldComparisonChart data={yieldComparisonData} />
          <FraudDistributionChart data={fraudDistributionData} />
        </div>

        {/* Map */}
        <FarmLocationMap locations={farmLocations} />
      </div>
    </div>
  );
};

export default DashboardInteractive;
