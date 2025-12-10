import { useState } from "react";
import "./genre-dropdown.css";

function GenreDropdown() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller'
  ];

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  
  };

  return (
    <div className="genre-dropdown-container">
      <label htmlFor="genre-select">Choose a genre:</label>
      <select 
        id="genre-select" 
        value={selectedGenre} 
        onChange={handleGenreChange}
      >
        <option value="">-- Select a genre --</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre.toLowerCase()}>
            {genre}
          </option>
        ))}
      </select>

      {selectedGenre && (
        <p>Selected genre: {selectedGenre}</p>
      )}
    </div>
  );
}

export default GenreDropdown;