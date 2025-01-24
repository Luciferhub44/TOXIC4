import { Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Behind the Design: TOXIC HAZARD HOODIE V2',
    excerpt: 'Discover the creative process and inspiration behind our latest flagship piece.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    author: 'Alex Rivera',
    date: 'March 15, 2024',
    category: 'Design'
  },
  {
    id: 2,
    title: 'Streetwear Culture: Past, Present, and Future',
    excerpt: 'Exploring the evolution of streetwear and its impact on modern fashion.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    author: 'Sarah Chen',
    date: 'March 10, 2024',
    category: 'Culture'
  },
  {
    id: 3,
    title: 'Sustainability in Streetwear',
    excerpt: 'How we are making our products more environmentally conscious.',
    image: 'https://images.unsplash.com/photo-1532649842991-60f6a04df35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    author: 'Marcus Johnson',
    date: 'March 5, 2024',
    category: 'Sustainability'
  }
];

const BlogPage = () => {
  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Post */}
        <div className="relative rounded-lg overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Featured post"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-[#FFD513] text-black px-3 py-1 text-sm font-bold rounded-full mb-4">
                FEATURED
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">
                The Future of Streetwear: TOXIC's Vision
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                Our founder shares his vision for the future of streetwear and how TOXIC
                is leading the revolution in urban fashion.
              </p>
              <div className="flex items-center text-gray-400">
                <User className="w-4 h-4 mr-2" />
                <span className="mr-4">David Kim</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>March 20, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="group">
              <div className="relative aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg object-cover w-full h-full group-hover:opacity-75 transition-opacity"
                />
                <span className="absolute top-2 left-2 bg-[#FFD513] text-black px-3 py-1 text-xs font-bold rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD513] transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with TOXIC
          </h3>
          <p className="text-gray-400 mb-8">
            Subscribe to our blog and never miss the latest news, releases, and insights.
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            />
            <button className="bg-[#FFD513] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;