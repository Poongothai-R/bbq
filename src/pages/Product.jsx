import {Link, useParams,useLocation} from "react-router-dom";


export default function Product() {
    const {categoryID}=useParams();
    const location=useLocation();
    const {data} = location.state;
    const { name, description, imageURL,ingredients} = data;
    const IngredientsList = ingredients.map((recs, index) => (
        <li key={index}>{recs}</li>
    ));



    return (

        <div className="menu-item">
            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            <p>{IngredientsList}</p>
            <Link to={`/menu/${categoryID}`} >Go back</Link>
        </div>
    )
}