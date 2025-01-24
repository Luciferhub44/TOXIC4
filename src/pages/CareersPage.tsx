import { Briefcase, Users, Zap, Heart } from 'lucide-react';

const positions = [
  {
    id: 1,
    title: 'Senior Fashion Designer',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Production Coordinator',
    department: 'Operations',
    location: 'Los Angeles, CA',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'E-commerce Developer',
    department: 'Technology',
    location: 'Remote',
    type: 'Full-time'
  }
];

const CareersPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">JOIN THE REBELLION</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're looking for passionate individuals who want to push the boundaries
            of streetwear and make their mark in the fashion industry.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-16">
          Why Join TOXIC?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center">
            <Users className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Amazing Team</h3>
            <p className="text-gray-400">
              Work with talented individuals who share your passion for innovation.
            </p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Fast Growth</h3>
            <p className="text-gray-400">
              Be part of a rapidly expanding brand with endless opportunities.
            </p>
          </div>
          <div className="text-center">
            <Heart className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Great Benefits</h3>
            <p className="text-gray-400">
              Competitive salary, health insurance, and product discounts.
            </p>
          </div>
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-[#FFD513] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Creative Freedom</h3>
            <p className="text-gray-400">
              Express yourself and bring your unique vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-white mb-12">Open Positions</h2>
          <div className="space-y-6">
            {positions.map(position => (
              <div
                key={position.id}
                className="bg-black p-6 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FFD513] transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-gray-400">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <button className="bg-[#FFD513] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
                    APPLY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Don't See Your Role?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          We're always looking for talented individuals. Send us your resume and let
          us know how you can contribute to the TOXIC revolution.
        </p>
        <button className="bg-[#FFD513] text-black px-8 py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
          CONTACT US
        </button>
      </div>
    </div>
  );
};

export default CareersPage;