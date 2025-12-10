


import './hero-banner.css'; 

export default function HeroBanner({ totalBooks }) {
    return (
        <div className="hero-banner">
            <h1>Welcome to the Library Hub</h1>
            <p className="subtitle">
                Discover {totalBooks} incredible titles. Ready for your next great read?
            </p>
            <div className="stats">
                <span>📚 {totalBooks} Total Books</span>
                <span>⭐ Trending Now</span>
            </div>
        </div>
    );
}