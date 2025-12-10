import { useState, useMemo } from 'react';

export const useSearchFilter = (books) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

   
    const filteredBooks = useMemo(() => {
        if (!books || searchTerm.length === 0) return books;

        const term = searchTerm.trim();
        
        if (term === '') {
            return books; 
        }

        return books.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            (book.genre && book.genre.toLowerCase().includes(term))
        );
    }, [books, searchTerm]);


    return {
        searchTerm,
        handleSearchChange,
        filteredBooks, 
    };
};