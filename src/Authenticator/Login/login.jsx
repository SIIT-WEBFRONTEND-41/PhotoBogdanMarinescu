import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import { UserContext } from "../../user-context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("access_token", JSON.stringify(response));
        setUser(response);
        navigate('/');
      });
  }

  useEffect(() => {
    function validatePassword(password) {
      const specialCharacters = ["*", "#", "@", "&", "%", "$", "!", "?"];
      if (password <= 8) {
        setPasswordError("Password must be at least 8 characters long.");
        return;
      }

      let hasSpecialCharacter = false;

      for (let character of password) {
        const hasCharacter = specialCharacters.includes(character);
        if (hasCharacter) {
          hasSpecialCharacter = true;
        }
      }

      if (!hasSpecialCharacter) {
        setPasswordError(
          "Your password must have at least one special character.",
          specialCharacters
        );
      } else {
        setPasswordError(null);
      }
    }

    validatePassword(password);
  }, [password]);

  return (
    <Form style={{ maxWidth: "500px", margin: "0 auto" }} onSubmit={register}>
      
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Form.Text>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {passwordError && (
          <Form.Text className="text-red">{passwordError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
