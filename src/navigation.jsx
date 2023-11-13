import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./user-context";

export default function Navigation() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

    return (
        <nav>
        <ul>
          <li>
            <Link to="/">Cards</Link>
          </li>
          <li>
            <Link to="/about">Profile Page</Link>
          </li>
          <li>
            <Link to="/create-movie">Create Card</Link>
          </li>
          {
            !user?.user
            ? (
              <>
              <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </>
            )
            : (
              <li onClick={() => logout()}>
              <spam>Logout</spam>
            </li>
            )}
        </ul>
      </nav>
    );
}