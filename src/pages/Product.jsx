// Node modules
import { Link, useParams, useLocation } from 'react-router-dom';
import { useItems } from '../state/ContextItems';

export default function Product() {
    const { category } = useParams();
    const location = useLocation();
    const { data, categoryId } = location.state;
    const { adminStatus } = useItems();
    const { name, description, imageURL, price, ingredients } = data;
    const IngredientsList = ingredients.map((recs, index) => (
        <li key={index}>{recs}</li>
    ));
    console.log(categoryId);
    return (
        <div className="product-page" id="product">
            <h1>Item</h1>
            <h2>{name}</h2>
            <p>{description}</p>
            <img src={imageURL} alt={name} />
            <p>{price}</p>
            <h3>Ingredients</h3>
            <span>{IngredientsList}</span>
            {adminStatus === 1 && <Link to={`/admin/menu/${category}`} state={{ categoryId}}>Go back</Link>}
            {adminStatus === 0 && <Link to={`/menu/${category}`} state={{ categoryId }}>Go back</Link>}
        </div>
    );
}