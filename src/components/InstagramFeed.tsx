import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    likes: '2.4K',
    comments: '124'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    likes: '3.1K',
    comments: '156'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    likes: '1.8K',
    comments: '98'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    likes: '2.7K',
    comments: '143'
  }
];

const InstagramFeed = () => {
  return (
    <section className="bg-black py-16" aria-label="Instagram feed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">@TOXICSTREETWEAR</h2>
          <a
            href="https://instagram.com/toxicstreetwear"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#FFD513] hover:text-[#FAFF34] transition-colors"
          >
            <Instagram className="w-5 h-5 mr-2" />
            <span>Follow Us</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map(post => (
            <div key={post.id} className="group relative aspect-square">
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-medium">{post.likes} likes</p>
                  <p className="text-sm">{post.comments} comments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;