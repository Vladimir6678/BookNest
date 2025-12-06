import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import  InputField from "../input/InputField.jsx";
import { Link } from "react-router";
import "./register.css";
import UserContext from "../../context/UserContext.jsx";
import useForm from "../../hooks/useForm.js";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useContext(UserContext);
  const [error, setError] = useState("");



  const handleSubmit = async (values) => {
    const { username, email, password, repeatPassword } = values;

    if (!username || !email || !password || !repeatPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await registerHandler(username, email, password);

      navigate("/")
    } catch (error) {
      setError(error.message);
    }

  }

  const { register, formSubmit} = useForm(handleSubmit, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <div className="form-container">
      <form className="auth-form" action={formSubmit}>
        <h2>Create an Account</h2>

        {error && <p className="error">{error}</p>}

        <InputField
          label="Username"
          type="text"
          placeholder="Username"
          {...register('username')}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          {...register('email')}
         
        />

        <InputField
          label="Password"
          type="password"         
          placeholder="Password"
          {...register('password')}
        
        />

        <InputField
          label="Repeat Password"
          type="password"
          placeholder="Repeat your password"
        {...register('repeatPassword')}
        />

        <button className="auth-btn" type="submit">Register</button>
        <p className="auth-text">
          Already registered? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </form>
    </div>
  );
}
