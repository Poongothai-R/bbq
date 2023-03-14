import { useItems } from "../state/ContextItems";
import { Link, useParams } from "react-router-dom";
import Actions from "./Actions";

export default function ProductCard({ data, path, categoryId }) {
  const { name, description, imageURL, price } = data;
  const { adminStatus } = useItems();
  const { category } = useParams();

  // This is the "if/else" statement that I was telling you from this video: https://www.youtube.com/watch?v=rQlMtztiAoA
  // With 2 items to upload to the database this is ok, but with more it becomes too complex to have a if/else if/else or switch statement
  const link =
    adminStatus === 0
      ? `/menu/${category}/${name}`
      : `/admin/menu/${category}/${name}`;

  return (
    <div className="product-item">
      <h1> {name}</h1>
      <span>Price : {price}</span>
      <img src={imageURL} alt={"BBQ - " + name} />
      <p>{description}</p>
      {adminStatus === 1 && <Actions data={data} path={path} />}
      <Link to={link} state={{ data, categoryId }}>
        View More
      </Link>
    </div>
  );
}
