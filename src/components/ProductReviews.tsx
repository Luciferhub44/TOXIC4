import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2024-03-15",
    title: "Perfect fit and amazing quality",
    content: "The attention to detail on this piece is incredible. The fabric quality is top-notch, and the fit is exactly as described. I've received numerous compliments wearing it.",
    helpful: 24,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 2,
    author: "Emily Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4,
    date: "2024-03-10",
    title: "Great design, slightly large",
    content: "Love the design and material quality. Just note that it runs slightly large, so consider sizing down if you're between sizes.",
    helpful: 15,
    verified: true
  }
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-8">Customer Reviews</h3>
      
      {/* Review Summary */}
      <div className="bg-gray-900 p-6 rounded-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? 'text-[#FFD513] fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-2xl font-bold text-white">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-400">Based on {totalReviews} reviews</p>
          </div>
          <button className="bg-[#FFD513] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
            WRITE A REVIEW
          </button>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className="font-medium text-white">{review.author}</h4>
                    {review.verified && (
                      <span className="ml-2 text-xs bg-[#FFD513] text-black px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-[#FFD513] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="text-lg font-medium text-white mb-2">{review.title}</h5>
            <p className="text-gray-300 mb-4">{review.content}</p>

            {review.images && (
              <div className="flex gap-4 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-400">
              <button className="flex items-center hover:text-white transition-colors">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpful})
              </button>
              <span className="mx-4">•</span>
              <button className="flex items-center hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 mr-1" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;