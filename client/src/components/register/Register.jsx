import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../../Input.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.username || !values.email || !values.password || !values.repeatPassword) {
      setError("All fields are required.");
      return;
    }

    if (values.password !== values.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    // MOCK REGISTER ACTION
    localStorage.setItem("auth", "true");
    navigate("/");
  }

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        {error && <p className="error">{error}</p>}

        <InputField
          label="Username"
          type="text"
          name="username"
          placeholder="Your username"
          value={values.username}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
        />

        <InputField
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          placeholder="Repeat your password"
          value={values.repeatPassword}
          onChange={handleChange}
        />

        <button className="auth-btn" type="submit">Register</button>
      </form>
    </div>
  );
}
