/**
 * Reviews shown on the page, newest first.
 *
 * These are copied across by hand from the Tally submissions, so that only
 * reviews whose author ticked "Yes — on my website and social media" are ever
 * published, and only with the name they asked for. Set `name` to null for a
 * reviewer who chose to stay anonymous.
 */

export type ReviewKind = 'performance' | 'song';

export type Review = {
  /** Stable id, used as the list key. */
  id: string;
  kind: ReviewKind;
  /** Whole stars, 1 to 5. */
  rating: number;
  body: string;
  /** null when the reviewer asked to stay anonymous. */
  name: string | null;
  /** What the song or performance was for. null when they left it blank. */
  occasion: string | null;
};

export const REVIEWS: readonly Review[] = [
  // Add each approved review as an entry like this one, newest first:
  //
  // {
  //   id: 'jess-wedding',
  //   kind: 'performance',
  //   rating: 5,
  //   body: 'Emma played for our wedding ceremony and the room went still.',
  //   name: 'Jess R.',
  //   occasion: 'Wedding ceremony',
  // },
];

export const KIND_LABELS: Record<ReviewKind, string> = {
  performance: 'Performance',
  song: 'Song',
};

export const kindsPresent = (reviews: readonly Review[]): ReviewKind[] =>
  (['performance', 'song'] as const).filter((kind) =>
    reviews.some((review) => review.kind === kind),
  );

/** "Jess R." stays as written; an anonymous review is credited generically. */
export const creditOf = (review: Review): string => review.name ?? 'Anonymous';
