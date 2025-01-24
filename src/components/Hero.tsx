import { AlertCircle, ShoppingBag, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black">
      <SEO />
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Model wearing TOXIC streetwear collection against urban backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/40"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <AlertCircle className="h-16 w-16 text-[#FFD513] mb-8 animate-pulse" />
            <div className="absolute inset-0 h-16 w-16 bg-[#FFD513] blur-xl opacity-20 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-label="TOXIC Streetwear - Premium Urban Fashion">
            TOXIC STREETWEAR
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl font-medium">
            Break the norms. Wear the revolution. Our latest collection drops now.
          </p>
          <div className="mt-10 flex gap-4">
            <button 
              className="bg-[#FFD513] text-black px-8 py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors"
              onClick={() => navigate('/collections')}
              aria-label="Shop now - Browse our latest collection"
            >
              <span className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                SHOP NOW
              </span>
            </button>
            <button 
              className="border-2 border-[#FFD513] text-[#FFD513] px-8 py-3 rounded-md font-bold hover:bg-[#FFD513] hover:text-black transition-colors"
              onClick={() => navigate('/new')}
              aria-label="View lookbook - See our style guide"
            >
              <span className="flex items-center">
                <Book className="w-5 h-5 mr-2" />
                VIEW LOOKBOOK
              </span>
            </button>
          </div>
          <div className="mt-16 flex items-center space-x-8">
            <div className="text-center">
              <p className="text-[#FFD513] font-bold text-2xl">24H</p>
              <p className="text-gray-400 text-sm">Flash Sale</p>
            </div>
            <div className="text-center">
              <p className="text-[#FFD513] font-bold text-2xl">50%</p>
              <p className="text-gray-400 text-sm">Member Discount</p>
            </div>
            <div className="text-center">
              <p className="text-[#FFD513] font-bold text-2xl">100+</p>
              <p className="text-gray-400 text-sm">New Styles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;