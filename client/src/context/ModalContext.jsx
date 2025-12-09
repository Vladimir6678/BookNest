import { createContext, useContext, useState } from "react";

const BookModalContext = createContext();

export function BookModalProvider({ children }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const openBookModal = (book) => setSelectedBook(book);
  const closeBookModal = () => setSelectedBook(null);

  return (
    <BookModalContext.Provider value={{ selectedBook, openBookModal, closeBookModal }}>
      {children}
    </BookModalContext.Provider>
  );
}

export function useBookModal() {
  return useContext(BookModalContext);
}




