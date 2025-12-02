import { Routes, Route } from "react-router";
import Header from "./components/navigation/Header.jsx";
import Home from "./components/home/Home.jsx";
import Books from "./components/books-page/dashboard/Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./components/Register.jsx";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
