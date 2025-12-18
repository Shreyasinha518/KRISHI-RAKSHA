import Icon from '@/components/ui/AppIcon';

export default function ContactSection() {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 lg:p-12 text-center shadow-card-hover">
        <Icon name="SparklesIcon" size={48} className="text-white mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
          Ready to Protect Your Harvest?
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Join 2,50,000+ farmers across India who trust AgriInsure Predict for their crop insurance needs
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <a
            href="/authentication"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-md hover:bg-white/90 transition-all duration-200 shadow-card hover:scale-105 font-body font-medium"
          >
            <Icon name="UserPlusIcon" size={20} />
            <span>Register Now</span>
          </a>
          <a
            href="/main-dashboard"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 text-white border-2 border-white rounded-md hover:bg-white/20 transition-all duration-200 font-body font-medium"
          >
            <Icon name="ArrowRightIcon" size={20} />
            <span>View Dashboard</span>
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="PhoneIcon" size={24} className="text-white mx-auto mb-2" />
            <p className="text-sm text-white/90 font-body">Toll-Free Helpline</p>
            <p className="text-white font-body font-medium">1800-123-4567</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="EnvelopeIcon" size={24} className="text-white mx-auto mb-2" />
            <p className="text-sm text-white/90 font-body">Email Support</p>
            <p className="text-white font-body font-medium">support@agriinsure.in</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="MapPinIcon" size={24} className="text-white mx-auto mb-2" />
            <p className="text-sm text-white/90 font-body">Head Office</p>
            <p className="text-white font-body font-medium">New Delhi, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
