import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface TrustBadge {
  title: string;
  description: string;
  icon: string;
}

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

const TrustSignals = () => {
  const trustBadges: TrustBadge[] = [
  {
    title: 'Government Certified',
    description: 'Approved by Ministry of Agriculture',
    icon: 'ShieldCheckIcon'
  },
  {
    title: 'Blockchain Verified',
    description: 'Transparent claim processing',
    icon: 'CubeTransparentIcon'
  },
  {
    title: 'ISO Certified',
    description: 'International quality standards',
    icon: 'CheckBadgeIcon'
  },
  {
    title: 'Data Secure',
    description: 'Bank-grade encryption',
    icon: 'LockClosedIcon'
  }];


  const partners: Partner[] = [
  {
    name: 'NABARD',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12f92f7a4-1764926830563.png",
    alt: 'NABARD logo - National Bank for Agriculture and Rural Development'
  },
  {
    name: 'IRDAI',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1db94ff55-1765975838849.png",
    alt: 'IRDAI logo - Insurance Regulatory and Development Authority of India'
  },
  {
    name: 'Ministry of Agriculture',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1384b0cc1-1765975841888.png",
    alt: 'Ministry of Agriculture and Farmers Welfare Government of India logo'
  },
  {
    name: 'Digital India',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc2e88c7-1765975840863.png",
    alt: 'Digital India initiative logo with tricolor theme'
  }];


  return (
    <section className="py-16 lg:py-24 bg-background border-y border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
            Trusted & Certified Platform
          </h2>
          <p className="text-base text-text-secondary font-body max-w-2xl mx-auto">
            Backed by government partnerships and international certifications
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, index) =>
          <div
            key={index}
            className="p-6 bg-card rounded-xl border border-border text-center hover:shadow-card transition-shadow duration-300">

              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                <Icon name={badge.icon as any} size={28} className="text-primary" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {badge.description}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-12">
          <p className="text-center text-sm font-body font-medium text-text-secondary mb-8">
            PARTNERED WITH
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) =>
            <div
              key={index}
              className="relative h-20 bg-card rounded-lg border border-border overflow-hidden hover:shadow-card transition-shadow duration-300 group">

                <AppImage
                src={partner.logo}
                alt={partner.alt}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end justify-center p-3">
                  <span className="text-xs font-body font-medium text-white text-center">
                    {partner.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircleIcon" size={24} className="text-white" />
              </div>
              <div>
                <p className="text-base font-heading font-bold text-foreground">
                  12,450+ Farmers Protected
                </p>
                <p className="text-sm text-text-secondary font-body">
                  ₹45.2 Crores in claims processed successfully
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) =>
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary border-2 border-card flex items-center justify-center">

                    <Icon name="UserIcon" size={14} className="text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="text-sm font-body font-medium text-foreground">
                +12K farmers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TrustSignals;
