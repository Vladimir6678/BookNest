import "./genre-dropdown.css";

export default function GenreDropdown({ value, onChange }) {
  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Mystery",
    "Thriller",
    "Horror",
    "Non-fiction",
  ];

  return (
    <div className="genre-dropdown">
      <label>Genre</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Genre</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
