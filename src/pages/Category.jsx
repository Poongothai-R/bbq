import { Link, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { readDocuments } from "../scripts/fireStore";
import { useItems } from "../state/ContextItems";
import ModalAddForm from "../components/ModalAddForm";
import ProductCard from '../components/ProductCard';

export default function Category() {
    const { adminStatus, setModal, productData, setProductData, status, setStatus } = useItems();
    const location = useLocation();
    const category = location.state.categoryId;
    const ProductcollectionPath = "menu/" + category + "/products";


    useEffect(() => {

        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData(ProductcollectionPath);
    }, []);

    function onSuccess(data) {
        setProductData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const ProductList = productData.map((recs) => (
        <ProductCard key={recs.id} data={recs} categoryId={category} path={ProductcollectionPath} />
    ));

    return (
        <div className="category-page" id="category">
            {status === 0 && <p>Loading... </p>}
            {status === 1 && <>{(productData.length > 0) ? ProductList : <h1>Products are yet to add.</h1>}
                {adminStatus === 1 &&
                    <button onClick={() => setModal(<ModalAddForm path={ProductcollectionPath} />)} > Add Product</button>}
            </>}
            {status === 2 && <p>Error</p>}
            {adminStatus === 1 && <Link to="/admin/menu">Go back</Link>}
            {adminStatus === 0 && <Link to="/menu">Go back</Link>}
        </div >
    );
}