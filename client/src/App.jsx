import { Routes, Route } from "react-router";
import Header from "./components/navigation/Header.jsx";
import Home from "./components/home/Home.jsx";
import Books from "./components/books-page/dashboard/Dashboard.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import CreateBook from "./components/createBook/CreateBook.jsx";
import WishList from "./components/wishlist/WishList.jsx";

export default function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
       <Route path="/books/:bookId/details" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateBook/>}/>
        <Route path="/wishlist" element={<WishList/>}></Route>
      
      </Routes>
     
    </>
  );
}
