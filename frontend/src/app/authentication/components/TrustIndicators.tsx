import React from 'react';
import AppIcon from '@/components/ui/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    { icon: 'ShieldCheckIcon', text: 'Secure & Private' },
    { icon: 'LockClosedIcon', text: '256-bit Encryption' },
    { icon: 'GlobeAltIcon', text: 'Global Coverage' },
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="text-gray-400">Trusted by farmers worldwide</span>
      </div>
      <div className="flex flex-wrap gap-4">
        {indicators.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
            <AppIcon name={item.icon as any} className="h-4 w-4 text-green-500" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;
