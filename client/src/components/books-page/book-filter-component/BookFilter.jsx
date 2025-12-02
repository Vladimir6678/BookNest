import "./book-filter-styles.css";
import { useState } from "react";

export default function BookFilter({ onFilterChange }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    { id: "fiction", name: "Fiction", count: 125 },
    { id: "non-fiction", name: "Non-Fiction", count: 89 },
    { id: "fantasy", name: "Fantasy", count: 67 },
    { id: "sci-fi", name: "Science Fiction", count: 54 },
    { id: "mystery", name: "Mystery", count: 43 },
    { id: "romance", name: "Romance", count: 38 },
    { id: "biography", name: "Biography", count: 32 },
    { id: "history", name: "History", count: 28 },
  ];

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) => {
      const newSelection = prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId];

      onFilterChange?.(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="book-filter">
      <h2 className="filter-title">Filter by Genre</h2>

      <div className="filter-search">
        <input
          type="text"
          placeholder="Search genres..."
          className="search-input"
        />
      </div>

      <ul className="filter-list">
        {genres.map((genre) => (
          <li key={genre.id} className="filter-item">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreToggle(genre.id)}
                className="checkbox-input"
              />
              <label htmlFor={`genre-${genre.id}`} className="checkbox-label">
                <div className="filter-label">
                  <span className="filter-link">
                    {genre.name}
                    <span className="genre-count">({genre.count})</span>
                  </span>
                </div>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
