import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
        <ul>
          <li>
            <Link to="/">Movies</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/create-movie">Create Movie</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    );
}