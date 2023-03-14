import DesktopHeroImage from "../assets/hero/bbq-desktop.jpg";
import MobileHeroImage from "../assets/hero/bbq-mobile.jpg";
import TabHeroImage from "../assets/hero/bbq-tab.jpg";

export default function Admin() {
  return (
    <div id="home" className="home-page">
      <picture>
        <source media="(min-width:960px)" srcSet={DesktopHeroImage} />
        <source media="(min-width:650px) " srcSet={TabHeroImage} />
        <img src={MobileHeroImage} alt="Meat and steak food" />
      </picture>
      <div className="hero-content">
        <h1>Welcome to Admin Page</h1>
      </div>
    </div>
  );
}
