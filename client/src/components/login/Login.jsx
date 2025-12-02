import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import InputField from "../input/InputField.jsx";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { loginHandler, error } = useContext(UserContext);

  const submitHandler = async (formValues) => {
    if (!formValues.email || !formValues.password) {
      return alert("All fields are required!");
    }

    try {
      await loginHandler(formValues.email, formValues.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const { register, formSubmit } = useForm(submitHandler, {
    email: "",
    password: "",
  });

  return (
    <div className="form-container">
      <form className="auth-form" action={formSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <InputField
          label="Email"
          type="email"
          {...register("email")}
          placeholder="Email"
        />

        <InputField
          label="Password"
          type="password"
          {...register("password")}
          placeholder="Password"
        />

        <button className="auth-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
