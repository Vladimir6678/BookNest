import Hero from "./hero-section/Hero.jsx";
import RelatedBooks from "./main-content/RelatedBooks.jsx";
import Reviews from "./reviews-section/Reviews.jsx";
import Footer from "../footer/Footer.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <RelatedBooks />
      <Reviews />
      <Footer />
    </>
  );
}
