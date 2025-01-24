import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Streetwear Enthusiast',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    quote: 'TOXIC isn\'t just clothing, it\'s a statement. The quality and design are unmatched.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    quote: 'Every piece tells a story. The attention to detail and unique designs set TOXIC apart.',
    rating: 5
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    role: 'Urban Artist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    quote: 'Finally, a brand that understands street culture and delivers authentic designs.',
    rating: 5
  }
];

const Testimonials = (): JSX.Element => {
  return (
    <section className="bg-gray-900 py-16" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">TOXIC COMMUNITY</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have embraced the TOXIC lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-black p-6 rounded-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FFD513] opacity-20" />
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-white font-medium">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#FFD513] fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-300">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;