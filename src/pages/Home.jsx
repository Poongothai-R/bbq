import HeroImage from "../assets/hero/bbq_hero.jpg";


export default function Home(){
    return(
        <div id="home">
            <img src={HeroImage} alt="Meat and steak food" />
        </div>
    );
}