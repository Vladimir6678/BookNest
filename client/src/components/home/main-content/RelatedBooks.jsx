import  { useRef } from "react";
import "./related-books-style.css";

export default function RelatedBooks() {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    const infoCards = [
        {
            id: 1,
            title: "Discover New Books",
            text: "Find trending reads and explore new worlds across genres.",
            icon: "📚",
        },
        {
            id: 2,
            title: "Smart Recommendations",
            text: "AI-powered suggestions personalized to your reading habits.",
            icon: "✨",
        },
        {
            id: 3,
            title: "Reading Progress Tracking",
            text: "Track pages, days, and your reading streak effortlessly.",
            icon: "📊",
        },
        {
            id: 4,
            title: "Organize Your Library",
            text: "Create custom shelves to keep your digital library tidy.",
            icon: "🗂️",
        },
        {
            id: 5,
            title: "Save Favorites",
            text: "Bookmark the books you love and revisit them anytime.",
            icon: "❤️",
        },
        {
            id: 6,
            title: "Beautiful Book Modal",
            text: "Click any book to open a polished, animated info modal.",
            icon: "🔍",
        },
        {
            id: 7,
            title: "Stay Motivated",
            text: "Daily reading reminders and goal setting to boost consistency.",
            icon: "🔥",
        },
    ];

    return (
        <>
            <main id="cards-container">
                <h1 className="section-title">Explore BookNest Features</h1>

                <div id="cards-wrapper" ref={scrollContainerRef}>
                    {infoCards.map((card) => (
                        <div className="info-card fade-in" key={card.id}>
                            <div className="icon">{card.icon}</div>
                            <h2>{card.title}</h2>
                            <p>{card.text}</p>
                        </div>
                    ))}
                </div>

                <div className="cards-navigation">
                    <button onClick={scrollLeft}>← Previous</button>
                    <button onClick={scrollRight}>Next →</button>
                </div>
            </main>
        </>
    );
}






