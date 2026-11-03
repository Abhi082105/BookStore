import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { useToast } from '../../context/ToastContext';

export const ReviewModal = ({ isOpen, onClose, book, onAddReview }) => {
  const { showToast } = useToast();
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !book) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please provide your review thoughts.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onAddReview(book.id, {
        author: author.trim() || 'Verified Reader',
        rating,
        comment: comment.trim()
      });
      setSubmitting(false);
      showToast('Your review has been posted! Thank you.', 'success');
      setAuthor('');
      setComment('');
      setRating(5);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900">Write a Review</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">For "{book.title}"</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Rating selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Overall Rating
              </label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={rating}
                  interactive={true}
                  onChange={(r) => setRating(r)}
                  size="w-6 h-6"
                />
                <span className="text-sm font-bold text-amber-500">{rating} out of 5</span>
              </div>
            </div>

            {/* Reviewer name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            {/* Review comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Review Details
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you love or learn from this book? Would you recommend it?"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
