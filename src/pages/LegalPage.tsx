import { useParams } from 'react-router-dom';
import { Shield, FileText, Copyright } from 'lucide-react';

const LegalPage = () => {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'privacy':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
            </div>
            {/* Privacy policy content here */}
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
            </div>
            {/* Terms content here */}
          </div>
        );
      case 'copyright':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Copyright className="w-8 h-8 text-[#FFD513]" />
              <h2 className="text-2xl font-bold text-white">Copyright Notice</h2>
            </div>
            {/* Copyright content here */}
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

export default LegalPage;