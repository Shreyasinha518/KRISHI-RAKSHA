import Icon from '@/components/ui/AppIcon';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/outline';

interface QuickStatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendLabel?: string;
  bgColor?: string;
  iconColor?: string;
}

const QuickStatsCard = ({
  title,
  value,
  unit = '',
  icon,
  trend = 'neutral',
  trendValue = '',
  trendLabel = '',
  bgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
}: QuickStatsCardProps) => {
  const TrendIcon = {
    up: ArrowUpIcon,
    down: ArrowDownIcon,
    neutral: MinusIcon,
  }[trend];

  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-500',
  }[trend];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon name={icon as any} size={24} className={iconColor} />
        </div>

        {(trendValue || trendLabel) && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{trendValue}</span>
            {trendLabel && (
              <span className="text-xs text-gray-400">{trendLabel}</span>
            )}
          </div>
        )}
      </div>

      <h3 className="text-gray-500 text-sm">{title}</h3>

      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-gray-500 text-sm">{unit}</span>}
      </div>
    </div>
  );
};

export default QuickStatsCard;
