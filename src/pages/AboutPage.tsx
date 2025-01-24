import { AlertTriangle, Atom, Flame, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="About TOXIC"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-16 h-16 text-[#FFD513] mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-white mb-6">OUR STORY</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Born from the underground, TOXIC represents a rebellion against conventional fashion.
            We create streetwear that challenges norms and empowers self-expression.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <Atom className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
            <p className="text-gray-400">
              Pushing boundaries in design and sustainability, creating streetwear that's
              ahead of its time.
            </p>
          </div>
          <div className="text-center">
            <Flame className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Rebellion</h3>
            <p className="text-gray-400">
              Challenging fashion norms and creating pieces that make a bold statement
              about individuality.
            </p>
          </div>
          <div className="text-center">
            <Shield className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Quality</h3>
            <p className="text-gray-400">
              Premium materials and expert craftsmanship ensure each piece meets our
              high standards.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">THE TOXIC REVOLUTION</h2>
              <div className="space-y-6 text-gray-400">
                <p>
                  Founded in 2020, TOXIC emerged from the underground streetwear scene
                  with a mission to challenge the status quo of fashion.
                </p>
                <p>
                  Our designs draw inspiration from urban culture, industrial aesthetics,
                  and post-apocalyptic themes, creating a unique style that's instantly
                  recognizable.
                </p>
                <p>
                  Every piece is crafted in our Los Angeles studio, where our team of
                  designers and artists push the boundaries of conventional streetwear.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="TOXIC workshop"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-[#FFD513]/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">JOIN THE MOVEMENT</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Be part of the TOXIC revolution. Follow us on social media and join our
          community of rebels and innovators.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-[#FFD513] text-black px-8 py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
            FOLLOW US
          </button>
          <button className="border-2 border-[#FFD513] text-[#FFD513] px-8 py-3 rounded-md font-bold hover:bg-[#FFD513] hover:text-black transition-colors">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;