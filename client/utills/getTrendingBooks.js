export function getTrendingBooks(books, minRatings = 5) {
  const today = new Date();

  const globalAvg =
    books.reduce((sum, b) => sum + (b.rating || 0), 0) / books.length;

  const scored = books.map((b) => {
    const v = b.ratingCount || 0;
    const R = b.rating || 0;
    const m = minRatings;

   
    const weightedRating = (v / (v + m)) * R + (m / (v + m)) * globalAvg;


    const createdAt = new Date(b.createdAt || Date.now());
    const diffDays = (today - createdAt) / (1000 * 60 * 60 * 24); 
    const recencyBoost = Math.exp(-diffDays / 30); 


    const trendingScore = weightedRating * (1 + recencyBoost);

    return { ...b, trendingScore };
  });


  return scored.sort((a, b) => b.trendingScore - a.trendingScore);
}
