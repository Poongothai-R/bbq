// Node modules
import { Link, useParams, useLocation } from "react-router-dom";
import { useItems } from "../state/ContextItems";

export default function Product() {
  const { category } = useParams();
  const location = useLocation();
  const { data, categoryId } = location.state;
  const { adminStatus } = useItems();
  const { name, description, imageURL, price, ingredients } = data;

  const link =
    adminStatus === 0 ? `/menu/${category}` : `/admin/menu/${category}`;

  const IngredientsList = ingredients.map((recs, index) => (
    <li key={index}>{recs}</li>
  ));

  return (
    <div className="product-page" id="product">
      <div className="container">
        <div className="item-container">
          <h1>{name}</h1>
          <span>Price : {price}</span>
          <img src={imageURL} alt={name} />
          <p>{description}</p>
        </div>
        <h3>Ingredients</h3>
        <list>{IngredientsList}</list>
      </div>
      <Link to={link} state={{ categoryId }}>
        Go back
      </Link>
    </div>
  );
}
