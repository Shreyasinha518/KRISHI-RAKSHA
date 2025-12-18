import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface QuickStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: 'up' | 'down';
  trendValue: string;
  trendLabel: string;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendLabel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-50">
          <span className="text-blue-600">
            <AppIcon name={icon as any} className="h-6 w-6" />
          </span>
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? (
          <ArrowUpIcon className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 mr-1" />
        )}
        <span className="font-medium">{trendValue}</span>
        <span className="ml-1 text-gray-500">{trendLabel}</span>
      </div>
    </div>
  );
};

export default QuickStatsCard;
