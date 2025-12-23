'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  name: string;
  location: string;
  farmSize: string;
  image: string;
  alt: string;
  rating: number;
  quote: string;
  cropType: string;
}

const TestimonialCarousel = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    name: 'Ramesh Kumar',
    location: 'Nashik, Maharashtra',
    farmSize: '15 acres',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f60bb51a-1765227581862.png",
    alt: 'Middle-aged Indian farmer in white shirt standing in green wheat field with blue sky',
    rating: 5,
    quote: 'KRISHI RAKSHA helped me get insurance payout within 2 days when unexpected rains damaged my cotton crop. The AI prediction was accurate and the blockchain verification made the process transparent.',
    cropType: 'Cotton'
  },
  {
    name: 'Lakshmi Devi',
    location: 'Guntur, Andhra Pradesh',
    farmSize: '8 acres',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf3907dc-1764749519318.png",
    alt: 'Indian woman farmer in traditional saree with red border smiling in rice paddy field',
    rating: 5,
    quote: 'The regional language support in Telugu made it easy for me to understand everything. I received ₹3.5 lakhs claim amount directly to my account. Best insurance platform for farmers!',
    cropType: 'Rice'
  },
  {
    name: 'Suresh Patel',
    location: 'Kheda, Gujarat',
    farmSize: '25 acres',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f53b3441-1764686061227.png",
    alt: 'Senior Indian farmer in orange turban and white kurta standing in golden wheat field',
    rating: 5,
    quote: 'Real-time satellite monitoring alerted me about pest attack early. The 24/7 WhatsApp support guided me through the claim process. Received full coverage for my wheat crop loss.',
    cropType: 'Wheat'
  },
  {
    name: 'Murugan Selvam',
    location: 'Coimbatore, Tamil Nadu',
    farmSize: '12 acres',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_194ad82d6-1764650746007.png",
    alt: 'Young Indian farmer in blue shirt holding tablet device in green sugarcane field',
    rating: 5,
    quote: 'The AI yield prediction was 95% accurate for my sugarcane crop. Smart fraud detection ensured my genuine claim was processed quickly. Highly recommend to all farmers!',
    cropType: 'Sugarcane'
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated, testimonials.length]);

  const handlePrevious = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    if (!isHydrated) return;
    setCurrentIndex(index);
  };

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded-lg animate-pulse mb-4 max-w-md mx-auto" />
            <div className="h-12 bg-muted rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="h-96 bg-muted rounded-2xl animate-pulse" />
        </div>
      </section>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-4">
            <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-success" />
            <span className="text-sm font-body font-medium text-success">Farmer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              12,000+ Farmers
            </span>
          </h2>
          <p className="text-lg text-text-secondary font-body max-w-3xl mx-auto">
            Real success stories from farmers across India who secured their harvest with KRISHI RAKSHA
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-card rounded-2xl border border-border shadow-card-hover overflow-hidden">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    fill
                    className="object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) =>
                      <Icon key={i} name="StarIcon" size={16} className="text-accent fill-current" />
                      )}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-1">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-sm text-white/90 font-body">
                      {currentTestimonial.location}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <Icon name="ChatBubbleLeftEllipsisIcon" size={48} className="text-primary/20" />
                  </div>
                  <blockquote className="text-lg lg:text-xl text-foreground font-body leading-relaxed mb-6">
                    "{currentTestimonial.quote}"
                  </blockquote>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-4 py-2 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="HomeModernIcon" size={16} className="text-primary" />
                        <span className="text-sm font-body text-text-secondary">
                          {currentTestimonial.farmSize}
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="SparklesIcon" size={16} className="text-secondary" />
                        <span className="text-sm font-body text-text-secondary">
                          {currentTestimonial.cropType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-card hover:shadow-card-hover hover:scale-110 transition-all duration-200 flex items-center justify-center"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeftIcon" size={24} className="text-foreground" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-card hover:shadow-card-hover hover:scale-110 transition-all duration-200 flex items-center justify-center"
              aria-label="Next testimonial">

              <Icon name="ChevronRightIcon" size={24} className="text-foreground" />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-8">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
              index === currentIndex ?
              'w-8 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-primary/50'}`
              }
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialCarousel;
