import { useParams } from 'react-router-dom';
import { HelpCircle, Truck, RotateCcw, Phone } from 'lucide-react';

const SupportPage = () => {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'faq':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <HelpCircle className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            {/* FAQ content here */}
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
            </div>
            {/* Shipping content here */}
          </div>
        );
      case 'returns':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <RotateCcw className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Returns & Exchanges</h2>
            </div>
            {/* Returns content here */}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            {/* Contact form here */}
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default SupportPage;