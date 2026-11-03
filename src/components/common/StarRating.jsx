import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({
  rating = 0,
  maxStars = 5,
  size = 'w-4 h-4',
  interactive = false,
  onChange = () => {},
  showValue = false,
  reviewCount = null
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" onMouseLeave={() => interactive && setHoverRating(0)}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = displayRating >= starValue;
          const isHalf = !isFilled && displayRating >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
              aria-label={interactive ? `Rate ${starValue} stars` : `${rating} stars`}
            >
              <Star
                className={`${size} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-300'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-xs font-semibold text-slate-700 ml-1">
          {Number(rating).toFixed(1)}
        </span>
      )}

      {reviewCount !== null && (
        <span className="text-xs text-slate-500 font-normal">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
