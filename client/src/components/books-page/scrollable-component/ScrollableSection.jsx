import BookCard from "../book-card/BookCard";
import "./scrollable-section-styles.css";
import { useRef, useState } from "react";

export default function ScrollableSection({
  sectionTitle,
  data,
  component = "BookCard",
  onItemClick,
 
}) {
  const scrollContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const renderItem = (item) => {
    switch (component) {
      case "BookCard":
        return (
          <BookCard
            key={item._id}
            book={item}
            onClick={() => onItemClick(item)}
           
          />
        );
      default:
        return <BookCard key={item._id} book={item} onClick={() => onItemClick(item)} />;
    }
  };

  return (
    <div
      className={sectionTitle.split(" ").join("-").toLowerCase()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="section-title">{sectionTitle}</h2>
      <div className="scrollable-section" ref={scrollContainerRef}>
        {data.map((item) => renderItem(item))}
      </div>

      <button
        className={`scroll-button scroll-left ${isHovering ? "visible" : ""}`}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        ←
      </button>

      <button
        className={`scroll-button scroll-right ${isHovering ? "visible" : ""}`}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}
