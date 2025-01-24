import { Newspaper, Download, ExternalLink, ArrowRightIcon } from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    title: 'TOXIC Announces Sustainable Streetwear Initiative',
    date: 'March 15, 2024',
    excerpt: 'Leading streetwear brand commits to sustainable practices and eco-friendly materials.',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'TOXIC Collaborates with Urban Artists',
    date: 'March 1, 2024',
    excerpt: 'New collection features designs from renowned street artists.',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

const mediaFeatures = [
  {
    id: 1,
    outlet: 'Fashion Forward',
    title: 'TOXIC: Redefining Streetwear for the Digital Age',
    date: 'February 28, 2024',
    link: '#'
  },
  {
    id: 2,
    outlet: 'Style Magazine',
    title: 'The Rise of TOXIC: From Underground to Mainstream',
    date: 'February 15, 2024',
    link: '#'
  },
  {
    id: 3,
    outlet: 'Urban Culture Weekly',
    title: 'How TOXIC is Changing the Fashion Game',
    date: 'February 1, 2024',
    link: '#'
  }
];

const PressPage = () => {
  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Press Kit Section */}
        <div className="text-center mb-16">
          <Newspaper className="w-16 h-16 text-[#FFD513] mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-6">TOXIC PRESS ROOM</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Access the latest news, press releases, and media resources about TOXIC.
            For press inquiries, please contact press@toxicstreetwear.com
          </p>
          <button className="bg-[#FFD513] text-black px-8 py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors inline-flex items-center">
            <Download className="w-5 h-5 mr-2" />
            DOWNLOAD PRESS KIT
          </button>
        </div>

        {/* Latest Press Releases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Press Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressReleases.map(release => (
              <div key={release.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-gray-400">{release.date}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-4 group-hover:text-[#FFD513] transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{release.excerpt}</p>
                  <button className="text-[#FFD513] font-medium hover:text-[#FAFF34] transition-colors inline-flex items-center">
                    READ MORE
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Media Coverage</h2>
          <div className="space-y-6">
            {mediaFeatures.map(feature => (
              <div
                key={feature.id}
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#FFD513] font-medium">{feature.outlet}</span>
                    <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#FFD513] transition-colors">
                      {feature.title}
                    </h3>
                    <span className="text-sm text-gray-400 mt-2 block">
                      {feature.date}
                    </span>
                  </div>
                  <a
                    href={feature.link}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Media Inquiries</h2>
          <p className="text-gray-400 mb-6">
            For interview requests, high-resolution images, or other press-related
            inquiries, please contact our press team.
          </p>
          <button className="bg-[#FFD513] text-black px-8 py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
            CONTACT PRESS TEAM
          </button>
        </div>
      </div>
    </div>
  );
};

export default PressPage;