import { useContext } from "react";
import "./hero-style.css";
import UserContext from "../../../context/UserContext.jsx";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
   const {isAuthenticated} = useContext(UserContext);

  const clickHandle = () =>{
        if(isAuthenticated){
             navigate("/books");
        } else{
             navigate("/login")
        }

        
  }
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Next Favorite Book</h1>
        <p>
          Dive into a world of endless literary possibilities where every page
          turns into an adventure. Discover captivating stories that transport
          you to distant lands, introduce unforgettable characters, and spark
          your imagination. Whether you're seeking thrilling mysteries,
          heartwarming romances, or epic fantasies—your next favorite book is
          waiting.
        </p>

        <button  onClick={clickHandle} className="explore">Browse Books</button>
      </div>
    </section>
  );
}
