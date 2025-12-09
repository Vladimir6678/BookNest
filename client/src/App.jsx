import { Routes, Route } from "react-router";
import Header from "./components/navigation/Header.jsx";
import Home from "./components/home/Home.jsx";
import Books from "./components/books-page/dashboard/Dashboard.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import CreateBook from "./components/createBook/CreateBook.jsx";
import WishList from "./components/wishlist/WishList.jsx";
import EditBook from "./components/edit-book/EditBook.jsx";

import useWishlist from "./hooks/useWishList.js";
import { BookModalProvider } from "./context/Modal.Context.jsx";

export default function App() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <>
      <BookModalProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/books/:bookId/details" element={<Books wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/wishlist" element={<WishList wishlist={wishlist} onRemove={toggleWishlist} />} />
          <Route path="/books/:bookId/edit" element={<EditBook wishlist={wishlist} onRemove={toggleWishlist} />} />
        </Routes>
      </BookModalProvider>

    </>
  );
}
