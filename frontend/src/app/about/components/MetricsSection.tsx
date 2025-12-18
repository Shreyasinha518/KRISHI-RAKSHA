'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Metric {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

export default function MetricsSection() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const metrics: Metric[] = [
    {
      id: 1,
      value: 250000,
      suffix: '+',
      label: 'Farmers Served',
      icon: 'UsersIcon',
      color: 'primary',
    },
    {
      id: 2,
      value: 45000,
      suffix: '+',
      label: 'Claims Processed',
      icon: 'DocumentCheckIcon',
      color: 'secondary',
    },
    {
      id: 3,
      value: 92,
      suffix: '%',
      label: 'Prediction Accuracy',
      icon: 'ChartBarIcon',
      color: 'success',
    },
    {
      id: 4,
      value: 35,
      suffix: '%',
      label: 'Yield Improvement',
      icon: 'ArrowTrendingUpIcon',
      color: 'accent',
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
      success: { bg: 'bg-success/10', text: 'text-success' },
      accent: { bg: 'bg-accent/10', text: 'text-accent' },
    };
    return colorMap[color] || colorMap.primary;
  };

  if (!isHydrated) {
    return (
      <section className="mb-16 lg:mb-24">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 lg:p-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-12" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6">
                  <div className="h-12 bg-muted rounded mb-4" />
                  <div className="h-6 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16 lg:mb-24">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 lg:p-12 border border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real results that matter to Indian agriculture
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric) => {
            const colors = getColorClasses(metric.color);
            return (
              <div
                key={metric.id}
                className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-6 text-center border border-border group"
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={metric.icon as any} size={32} className={colors.text} />
                </div>
                <div className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  {formatNumber(metric.value)}
                  {metric.suffix}
                </div>
                <p className="text-text-secondary font-body font-medium">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}