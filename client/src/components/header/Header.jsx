import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {
    const { isAuthenticated } = useUserContext();

    return (
        <header>
            {/* <!-- Navigation --> */}
            <nav>
                <Link className="home" to="/"> <img src="./images/logo.png" alt="logo" /> </Link>
                <Link to="/games">Catalog</Link>
                {/* <!-- Logged-in users --> */}
                {isAuthenticated
                    ? (
                        <div id="user">
                            <Link to="/games/create">Add Game</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )
                    : (
                        <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )
                }
            </nav>
        </header>
    );
}
