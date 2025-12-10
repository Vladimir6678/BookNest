import { Routes, Route } from "react-router";
import Header from "./components/navigation/Header.jsx";
import Home from "./components/home/Home.jsx";
import Books from "./components/books-page/dashboard/Dashboard.jsx"; // Renamed from Dashboard to Books
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import CreateBook from "./components/createBook/CreateBook.jsx";
import WishList from "./components/wishlist/WishList.jsx";
import EditBook from "./components/edit-book/EditBook.jsx";
import GuestGuard from "./guards/GuestGuard.jsx";
import PrivateGuard from "./guards/PrivateGuard.jsx";

import { WishlistProvider } from "./context/WishlistContext.jsx";
import { BookModalProvider } from "./context/ModalContext.jsx";
import NotFound from "./components/notFound/NotFound.jsx";

export default function App() {


  return (
    <>
      <BookModalProvider>
        <WishlistProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId/details" element={<Books />} />

            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateGuard />}>
              <Route path="/create" element={<CreateBook />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/books/:bookId/edit" element={<EditBook />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </WishlistProvider>

      </BookModalProvider>
    </>
  );
}