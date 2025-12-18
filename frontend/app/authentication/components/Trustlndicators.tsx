import Icon from '@/components/ui/AppIcon';

interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

const TrustIndicators = () => {
  const indicators: TrustIndicator[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level encryption',
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Government Approved',
      description: 'Certified by Ministry of Agriculture',
    },
    {
      icon: 'UserGroupIcon',
      title: '50,000+ Farmers',
      description: 'Trusted by farmers across India',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground">Why Choose Us?</h3>
      <div className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={indicator.icon as any} size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-foreground">
                {indicator.title}
              </h4>
              <p className="text-xs font-body text-text-secondary mt-1">
                {indicator.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;