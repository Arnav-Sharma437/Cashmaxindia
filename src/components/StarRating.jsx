import { Star } from "lucide-react";

export default function StarRating({ rating = 5 }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= rating;
        return (
          <Star
            key={i}
            className={`w-4 h-4 sm:w-5 h-5 ${
              isFilled 
                ? "text-brand-accent fill-brand-accent" 
                : "text-gray-200 fill-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}
