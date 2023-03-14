import ContactHeroImg from "../assets/hero/contact-hero.jpg";
import ShopWorkTime from "../components/ShopWorkTime";
import FormData from "../components/FormData";
import LocationMap from "../components/LocationMap";

export default function Contact() {
  return (
    <div id="contact" className="contact-page">
      <div className="page-content">
        <img src={ContactHeroImg} alt="owner standing pose" />
        <ShopWorkTime />
        <FormData />
        <LocationMap />
      </div>
    </div>
  );
}
