import type { Metadata } from 'next';
import AboutContent from './components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us - AgriInsure Predict',
  description: 'Learn about AgriInsure Predict\'s mission to empower Indian farmers with AI-driven crop yield predictions, smart fraud detection, and transparent blockchain-backed insurance claims processing.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutContent />
    </main>
  );
}
