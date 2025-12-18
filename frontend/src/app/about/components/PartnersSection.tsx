import AppImage from '@/components/ui/AppImage';

interface Partner {
  id: number;
  name: string;
  category: string;
  logo: string;
  alt: string;
}

export default function PartnersSection() {
  const partners: Partner[] = [
  {
    id: 1,
    name: 'Ministry of Agriculture',
    category: 'Government',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10a43761d-1764679852301.png",
    alt: 'Indian government emblem with Ashoka Chakra on official blue background representing Ministry of Agriculture partnership'
  },
  {
    id: 2,
    name: 'ICAR - Indian Council of Agricultural Research',
    category: 'Research Institution',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11c39dc79-1764920380649.png",
    alt: 'Scientific research laboratory equipment and microscope representing ICAR agricultural research collaboration'
  },
  {
    id: 3,
    name: 'NABARD',
    category: 'Financial Institution',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1056b9d1e-1764794620412.png",
    alt: 'Modern banking building with glass facade representing NABARD financial partnership for rural development'
  },
  {
    id: 4,
    name: 'IBM India',
    category: 'Technology Partner',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1c57163-1765389098596.png",
    alt: 'Modern data center with server racks and blue lighting representing IBM technology infrastructure partnership'
  },
  {
    id: 5,
    name: 'Microsoft Azure',
    category: 'Cloud Provider',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1da214e06-1764660286810.png",
    alt: 'Cloud computing visualization with interconnected nodes on dark background representing Microsoft Azure cloud services'
  },
  {
    id: 6,
    name: 'ISRO - Satellite Imagery',
    category: 'Space Technology',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_120cd1011-1765896186415.png",
    alt: 'Satellite in orbit above Earth with solar panels extended representing ISRO satellite imagery partnership'
  }];


  return (
    <section className="mb-16 lg:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Collaborating with leading organizations to serve Indian farmers better
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
        {partners.map((partner) =>
        <div
          key={partner.id}
          className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-border flex flex-col items-center justify-center group">

            <div className="relative w-full h-24 mb-4 overflow-hidden rounded-md">
              <AppImage
              src={partner.logo}
              alt={partner.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300" />

            </div>
            <h3 className="text-sm font-heading font-bold text-foreground text-center mb-1">
              {partner.name}
            </h3>
            <p className="text-xs text-text-secondary text-center">
              {partner.category}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-primary/5 rounded-lg p-6 lg:p-8 border border-primary/20">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Certified & Recognized
            </h3>
            <p className="text-text-secondary">
              ISO 27001 certified for data security | IRDAI approved insurance platform
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-card rounded-lg shadow-card flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-primary">ISO</span>
            </div>
            <div className="w-16 h-16 bg-card rounded-lg shadow-card flex items-center justify-center">
              <span className="text-xs font-heading font-bold text-secondary text-center">IRDAI</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}