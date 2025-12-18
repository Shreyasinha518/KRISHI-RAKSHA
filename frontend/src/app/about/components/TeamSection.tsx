import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  expertise: string;
  image: string;
  alt: string;
  linkedin: string;
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    role: 'Chief Agricultural Scientist',
    expertise: 'PhD in Agricultural Sciences, 20+ years experience in crop yield optimization and sustainable farming practices across Indian regions.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_151733562-1763296873017.png",
    alt: 'Middle-aged Indian man with gray beard wearing white lab coat and glasses in agricultural research facility',
    linkedin: '#'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Head of AI & Machine Learning',
    expertise: 'IIT Delhi graduate, former Google AI researcher specializing in predictive analytics and computer vision for agricultural applications.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1983d2d8c-1763300562409.png",
    alt: 'Young Indian woman with long black hair in professional blue blazer smiling confidently in modern tech office',
    linkedin: '#'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'Blockchain Technology Lead',
    expertise: 'Blockchain architect with expertise in smart contracts, decentralized systems, and secure transaction protocols for agricultural insurance.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b4775a2-1763293690409.png",
    alt: 'Young Indian man in casual gray shirt with short black hair working on laptop in bright office space',
    linkedin: '#'
  },
  {
    id: 4,
    name: 'Lakshmi Reddy',
    role: 'Farmer Advocate & Community Lead',
    expertise: 'Third-generation farmer from Andhra Pradesh, bridging technology and traditional farming knowledge to ensure platform meets real farmer needs.',
    image: "https://images.unsplash.com/photo-1709207516801-c8cd368ca089",
    alt: 'Indian woman in traditional green saree with warm smile standing in agricultural field with crops in background',
    linkedin: '#'
  }];


  return (
    <section className="mb-16 lg:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
          Meet Our Expert Team
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Agricultural scientists, technology leaders, and farmer advocates working together
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {teamMembers.map((member) =>
        <div
          key={member.id}
          className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-border group">

            <div className="relative h-64 overflow-hidden">
              <AppImage
              src={member.image}
              alt={member.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500" />

            </div>
            <div className="p-6">
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-body font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {member.expertise}
              </p>
              <a
              href={member.linkedin}
              className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors duration-200">

                <Icon name="UserCircleIcon" size={20} />
                <span className="text-sm font-body font-medium">View Profile</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>);

}