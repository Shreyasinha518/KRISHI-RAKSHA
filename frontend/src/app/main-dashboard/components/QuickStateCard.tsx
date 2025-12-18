import Icon from '@/components/ui/AppIcon';

interface QuickStatsCardProps {
  title: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const QuickStatsCard = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  icon,
  bgColor,
  iconColor,
}: QuickStatsCardProps) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'ArrowTrendingUpIcon';
    if (trend === 'down') return 'ArrowTrendingDownIcon';
    return 'MinusIcon';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon name={icon as any} size={24} className={iconColor} />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon() as any} size={16} />
          <span className="text-sm font-body font-medium">{trendValue}</span>
        </div>
      </div>
      <h3 className="text-text-secondary text-sm font-body mb-1">{title}</h3>
      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-heading font-bold text-foreground">{value}</span>
        <span className="text-text-secondary text-sm font-body">{unit}</span>
      </div>
    </div>
  );
};

export default QuickStatsCard;
