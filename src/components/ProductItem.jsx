


export default function ProductItem({ data }) {
    console.log(data);
    const { name, description, imageURL, "Ingredients ": Ingredients} = data;
    const IngredientsList = Ingredients.map((data, index) => (
        <span key={index}>{data}</span>
    ));



    return (

        <div className="menu-item">
            <h2> {name}</h2>
            <img src={imageURL} alt={"BBQ - " + name} />
            <p>{description}</p>
            <p>{IngredientsList}</p>
        </div>
    )
}