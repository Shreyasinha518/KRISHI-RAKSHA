import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  name: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-muted rounded-lg p-4 space-y-3">
      <div className="flex items-center space-x-3">
        <AppImage
          src={testimonial.image}
          alt={testimonial.alt}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-body font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-xs font-body text-text-secondary">{testimonial.location}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={16}
            variant={index < testimonial.rating ? 'solid' : 'outline'}
            className={index < testimonial.rating ? 'text-accent' : 'text-muted-foreground'}
          />
        ))}
      </div>
      <p className="text-sm font-body text-text-secondary italic">&quot;{testimonial.text}&quot;</p>
    </div>
  );
};

export default TestimonialCard;
