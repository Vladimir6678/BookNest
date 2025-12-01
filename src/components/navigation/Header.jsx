import { Link } from "react-router";
import "./header-style.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div>
          <h2 className="logo">BookNest</h2>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}
