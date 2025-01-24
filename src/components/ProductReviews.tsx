import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

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

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleHelpful = async (reviewId: number) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to mark review as helpful');
      const updatedReview = await response.json();
      
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { ...review, helpful: updatedReview.helpful }
            : review
        )
      );
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  if (isLoading) {
    return <div className="mt-16">Loading reviews...</div>;
  }

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
              <button 
                onClick={() => handleHelpful(review.id)}
                className="flex items-center hover:text-white transition-colors"
              >
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