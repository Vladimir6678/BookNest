import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../../Input.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      setError("All fields are required.");
      return;
    }

    // MOCK LOGIN (replace later with backend)
    if (values.email === "test@test.com" && values.password === "123456") {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
        />

        <button className="auth-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
