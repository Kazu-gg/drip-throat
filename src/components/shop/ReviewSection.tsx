"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type ProductReview = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  body: string;
  imageUrl?: string;
  createdAt: string;
};

const STORAGE_KEY = "dripthroat-product-reviews";

function loadReviews(slug: string): ProductReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as ProductReview[];
    return all.filter((r) => r.productSlug === slug);
  } catch {
    return [];
  }
}

function saveReview(review: ProductReview) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const all: ProductReview[] = raw ? (JSON.parse(raw) as ProductReview[]) : [];
  all.unshift(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

type ReviewSectionProps = {
  product: Product;
};

export function ReviewSection({ product }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      setReviews(loadReviews(product.slug));
    } catch {
      setError("Could not load reviews.");
    } finally {
      setLoading(false);
    }
  }, [product.slug]);

  const average = useMemo(() => {
    if (!reviews.length) return null;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  }, [reviews]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !body.trim()) {
      setError("Name and review are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const review: ProductReview = {
        id: `${Date.now()}`,
        productSlug: product.slug,
        author: author.trim(),
        rating,
        body: body.trim(),
        imageUrl: imageUrl.trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      saveReview(review);
      setReviews((prev) => [review, ...prev]);
      setAuthor("");
      setBody("");
      setImageUrl("");
      setRating(5);
    } catch {
      setError("Could not save your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10 border-t border-[var(--border-subtle)] pt-8" data-testid="product_reviews_section">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-body text-[11px] tracking-[0.28em] text-gold uppercase">
          Reviews
        </h2>
        {average !== null ? (
          <p className="font-body text-xs text-[var(--campaign-text)]/55" data-testid="product_reviews_average">
            {average.toFixed(1)} ★ · {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </p>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-4 font-body text-sm text-[var(--campaign-text)]/40" data-testid="product_reviews_loading">
          Loading reviews…
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 font-body text-sm text-red-400" role="alert" data-testid="product_reviews_error">
          {error}
        </p>
      ) : null}

      {!loading && !reviews.length ? (
        <p className="mt-4 font-body text-sm text-[var(--campaign-text)]/45" data-testid="product_reviews_empty">
          No reviews yet. Be the first to share your fit and fabric notes.
        </p>
      ) : null}

      <ul className="mt-6 space-y-5">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="border-b border-[var(--border-subtle)] pb-5"
            data-testid={`product_review_${review.id}`}
          >
            <p className="font-body text-xs tracking-[0.2em] text-[var(--campaign-text)] uppercase">
              {review.author}
            </p>
            <p className="mt-1 text-gold" aria-label={`${review.rating} out of 5 stars`}>
              {"★".repeat(review.rating)}
              <span className="text-[var(--campaign-text)]/20">
                {"★".repeat(5 - review.rating)}
              </span>
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--campaign-text)]/65">
              {review.body}
            </p>
            {review.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.imageUrl}
                alt={`Review photo from ${review.author}`}
                className="mt-3 max-h-40 w-auto object-cover"
              />
            ) : null}
          </li>
        ))}
      </ul>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 border border-[var(--border-subtle)] p-4 sm:p-5"
        data-testid="product_review_form"
      >
        <p className="font-body text-[11px] tracking-[0.24em] text-[var(--campaign-text)]/50 uppercase">
          Write a review
        </p>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            data-testid="product_review_name_input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="w-full border border-[var(--border-subtle)] bg-transparent px-3 py-3 font-body text-sm text-[var(--campaign-text)] placeholder:text-[var(--campaign-text)]/30 focus:border-gold/40 focus:outline-none"
          />
        </label>
        <fieldset>
          <legend className="sr-only">Star rating</legend>
          <div className="flex gap-1" data-testid="product_review_rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                data-testid={`product_review_star_${star}_button`}
                className={`min-h-10 min-w-10 text-lg ${
                  star <= rating ? "text-gold" : "text-[var(--campaign-text)]/25"
                }`}
                aria-label={`${star} stars`}
                aria-pressed={star === rating}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="sr-only">Review</span>
          <textarea
            data-testid="product_review_body_input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="How was the fit, fabric, and quality?"
            className="w-full border border-[var(--border-subtle)] bg-transparent px-3 py-3 font-body text-sm text-[var(--campaign-text)] placeholder:text-[var(--campaign-text)]/30 focus:border-gold/40 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">Image URL (optional)</span>
          <input
            data-testid="product_review_image_input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full border border-[var(--border-subtle)] bg-transparent px-3 py-3 font-body text-sm text-[var(--campaign-text)] placeholder:text-[var(--campaign-text)]/30 focus:border-gold/40 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          data-testid="product_review_submit_button"
          className="shop-btn-outline w-full py-3 sm:w-auto sm:px-8"
        >
          {submitting ? "Saving…" : "Submit review"}
        </button>
      </form>
    </section>
  );
}
