import "./not-found.css";

export default function NotFound() {
    return (
        <div className="notfound-page">

        
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>

           
            <div className="circles">
                <svg width="100%" height="100%">
                    <circle cx="18%" cy="35%" r="45" />
                    <circle cx="82%" cy="65%" r="35" />
                </svg>
            </div>

            
            <div className="notfound-card">
                <h1 className="nf-title">404</h1>

                <p className="nf-subtitle">Oops! Restricted Shelf Ahead</p>

                <p className="nf-text">
                    This page is only available for authenticated BookNest readers.
                    <br />
                    Please log in or return to the home page.
                </p>

                <div className="nf-buttons">
                    <a href="/login" className="btn btn-primary">Login</a>
                    <a href="/" className="btn btn-secondary">Home</a>
                </div>
            </div>
        </div>
    );
}
