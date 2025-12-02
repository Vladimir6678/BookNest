import { Link, NavLink } from "react-router";
import "./header-style.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";

export default function Header() {
        const { isAuthenticated, user, logoutHandler } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await logoutHandler();
        } catch (err) {
            alert(err.message);
        }
    };



  
  return (
    <header className="header">
      <nav className="nav">
        <div>
          <h2 className="logo">BookNest</h2>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
     
     {isAuthenticated ? (

               <div>
                <span className="welcome">Welcome, {user.username}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
               </div>


     ) : (
             <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>

             </div>
     )};
        
      </nav>
    </header>
  );
}
