import { Link } from "react-router";
import "./header-style.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";

export default function Header() {
    const { isAuthenticated, user, logoutHandler } = useContext(UserContext);

    return (
        <header className="header">
            <nav className="nav container">
                <div className="left-section">
                    <h2 className="logo"><Link to="/">BookNest</Link></h2>

                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/books">Books</Link>
                        {isAuthenticated ? (<><Link to="/wishlist">Wishlist</Link>  <Link to="/create">Create</Link></>): ""}
                    </div>
                </div>

                <div className="right-section">
                    {isAuthenticated ? (
                        <>
                            <span className="welcome">Hi, {user?.username}</span>
                            <button className="logout-btn" onClick={logoutHandler}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
