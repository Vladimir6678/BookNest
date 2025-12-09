import "./footer-style.css";

export default function Footer() {
  return (
    <>
      <footer id="foot-section">
        <h1 id="foot-title">BookNest</h1>
        <div className="foot-invoices">
          <h2>About</h2>
          <hgroup className="links-section">
            <h3>
              <a href="#">Careers</a>
            </h3>
            <h3>
              <a href="#">Privacy and Policy</a>
            </h3>
            <h3>
              <a href="#">Verification application</a>
            </h3>
          </hgroup>
        </div>
        <div className="foot-invoices">
          <h2>Support</h2>
          <hgroup className="links-section">
            <h3>
              <a href="#">Contact Us - (415) 802-7394</a>
            </h3>
            <h3>
              <a href="#">Customer Support</a>
            </h3>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} BookNest — All rights reserved.</p>
            </div>
          </hgroup>
        </div>
      </footer>
    </>
  );
}
