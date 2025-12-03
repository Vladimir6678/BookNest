import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import InputField from "../input/InputField.jsx";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";
import "./login.css";


export default function Login() {
    const navigate = useNavigate();
    const { loginHandler, error } = useContext(UserContext);

    const submitHandler = async ({ email, password }) => {
        if (!email || !password) {
            return alert("All fields are required!");
        }

        console.log("heyyyyyy");

        try {
            await loginHandler(email, password);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    };

    const { register, formSubmit } = useForm(submitHandler, { email: "", password: "" });

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
         <p className="auth-text"> Don't have an account? Go to <Link to="/register" className="auth-link">Register</Link>    </p>
            </form>
        </div>
    );
}
