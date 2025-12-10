
import ScrollableSection from "../books-page/scrollable-component/ScrollableSection.jsx";

export default function BooksContent({
    allBooks, 
    latest, 
    popular, 
    authors, 
    selectedView, 
    handleBookClick, 
    searchTerm, 
    filteredBooks 
}) {
    const isSearchActive = searchTerm.length > 0;
    
    if (isSearchActive) {
        return (
            <section className="search-results-grid">
                <h2>Search Results for "{searchTerm}"</h2>
                
                {filteredBooks.length > 0 ? (
                    <ScrollableSection
                        sectionTitle="" 
                        data={filteredBooks}
                        component="BookCard"
                        onItemClick={handleBookClick}
                    />
                ) : (
                    <p className="no-books-message">No books match your search criteria.</p>
                )}
            </section>
        );
    }
    
    if (selectedView === "all") {
        return (
            <ScrollableSection
                sectionTitle="All Books"
                data={allBooks}
                component="BookCard"
                onItemClick={handleBookClick}
            />
        );
    }

    return (
        <>
            <ScrollableSection
                sectionTitle="Most Popular Books"
                data={popular}
                component="BookCard"
                onItemClick={handleBookClick}
            />
            <ScrollableSection
                sectionTitle="New Book Arrivals"
                data={latest}
                component="BookCard"
                onItemClick={handleBookClick}
            />
            <ScrollableSection
                sectionTitle="Authors"
                data={authors}
                component="AuthorCard"
            />
        </>
    );
}