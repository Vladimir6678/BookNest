import "./hero-style.css";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <section className="hero-description">
          <h1>Find Your Next Favorite Book</h1>
          <p>
            Dive into a world of endless literary possibilities where every page
            turns into an adventure. Discover captivating stories that will
            transport you to distant lands, introduce you to unforgettable
            characters, and spark your imagination like never before. Whether
            you're seeking thrilling mysteries, heartwarming romances,
            thought-provoking non-fiction, or epic fantasies, our carefully
            curated collection connects you with books that don't just tell
            stories—they transform perspectives.
          </p>
        </section>
        <button className="explore">Browse Books</button>
      </section>
    </>
  );
}
