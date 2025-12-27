'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface Story {
  id: number;
  name: string;
  location: string;
  state: string;
  crop: string;
  testimonial: string;
  testimonialHindi: string;
  improvement: string;
  image: string;
  alt: string;
}

export default function SuccessStoriesSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHindi, setShowHindi] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stories: Story[] = [
  {
    id: 1,
    name: 'Ramesh Yadav',
    location: 'Vidarbha',
    state: 'Maharashtra',
    crop: 'Cotton',
    testimonial: 'KRISHI RAKSHA helped me increase my cotton yield by 40%. The AI predictions warned me about pest attacks early, and the instant payout during drought saved my family.',
    testimonialHindi: 'एग्रीइंश्योर प्रेडिक्ट ने मेरी कपास की उपज 40% बढ़ाने में मदद की। AI भविष्यवाणियों ने मुझे कीट हमलों के बारे में जल्दी चेतावनी दी, और सूखे के दौरान तत्काल भुगतान ने मेरे परिवार को बचाया।',
    improvement: '40% yield increase',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_127142f62-1763299279133.png",
    alt: 'Indian farmer in orange turban and white kurta standing proudly in cotton field with white cotton bolls ready for harvest'
  },
  {
    id: 2,
    name: 'Lakshmi Devi',
    location: 'Guntur',
    state: 'Andhra Pradesh',
    crop: 'Rice',
    testimonial: 'The platform is available in Telugu, making it easy for me to use. Real-time monitoring helped me optimize irrigation, saving water and increasing my rice production significantly.',
    testimonialHindi: 'ప్లాట్‌ఫారమ్ తెలుగులో అందుబాటులో ఉంది, నాకు ఉపయోగించడం సులభం చేస్తుంది। రియల్ టైమ్ మానిటరింగ్ నాకు నీటిపారుదల ఆప్టిమైజ్ చేయడంలో సహాయపడింది.',
    improvement: '35% water savings',
    image: "https://images.unsplash.com/photo-1727079582189-c5819c5e4b5c",
    alt: 'Indian woman farmer in colorful red and yellow saree with nose ring smiling while standing in lush green rice paddy field'
  },
  {
    id: 3,
    name: 'Suresh Patel',
    location: 'Kheda',
    state: 'Gujarat',
    crop: 'Wheat',
    testimonial: 'Blockchain-backed insurance gave me confidence. When my wheat crop was damaged by unseasonal rain, I received compensation within 48 hours without any paperwork hassle.',
    testimonialHindi: 'બ્લોકચેન-આધારિત વીમાએ મને વિશ્વાસ આપ્યો. જ્યારે મારા ઘઉંના પાકને અસામાન્ય વરસાદથી નુકસાન થયું, ત્યારે મને 48 કલાકમાં કોઈ કાગળી કામ વિના વળતર મળ્યું.',
    improvement: '₹2.5L claim settled',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f53b3441-1764686061227.png",
    alt: 'Middle-aged Indian farmer in white shirt and traditional turban examining golden wheat stalks in vast wheat field'
  }];


  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? stories.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === stories.length - 1 ? 0 : prev + 1);
  };

  if (!isHydrated) {
    return (
      <section className="mb-16 lg:mb-24">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-12" />
          <div className="bg-card rounded-lg p-8 h-96" />
        </div>
      </section>);

  }

  const currentStory = stories[currentIndex];

  return (
    <section className="mb-16 lg:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
          Success Stories from Across India
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Real farmers, real results, real impact
        </p>
      </div>

      <div className="bg-card rounded-lg shadow-card-hover overflow-hidden border border-border">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-64 lg:h-full overflow-hidden">
            <AppImage
              src={currentStory.image}
              alt={currentStory.alt}
              fill
              className="object-cover" />

            <div className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-body font-medium shadow-card">
              {currentStory.improvement}
            </div>
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                    {currentStory.name}
                  </h3>
                  <p className="text-text-secondary font-body">
                    {currentStory.location}, {currentStory.state} • {currentStory.crop} Farmer
                  </p>
                </div>
                <button
                  onClick={() => setShowHindi(!showHindi)}
                  className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-md hover:bg-muted/80 transition-colors duration-200">

                  <Icon name="LanguageIcon" size={16} />
                  <span className="text-sm font-body font-medium text-foreground">
                    {showHindi ? 'English' : 'हिंदी'}
                  </span>
                </button>
              </div>

              <div className="mb-6">
               <ChatBubbleLeftIcon className="h-8 w-8 text-primary/20 mb-2" />
                <p className="text-lg text-foreground leading-relaxed italic">
                  "{showHindi ? currentStory.testimonialHindi : currentStory.testimonial}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex space-x-2">
                {stories.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted'}`
                  }
                  aria-label={`Go to story ${index + 1}`} />

                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Previous story">

                  <Icon name="ChevronLeftIcon" size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Next story">

                  <Icon name="ChevronRightIcon" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
