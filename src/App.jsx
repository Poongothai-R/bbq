import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/global/style.css";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ScrollTop from "./scripts/ScrollTop";
import Menu from "./pages/Menu";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import Modal from "./components/Modal";
import { useState } from "react";



export default function App() {
    const [modal, setModal] = useState(null);

    // console.log(modal);
    return (
        <BrowserRouter>
            <ScrollTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:categoryID" element={<Category />} />
                <Route path="/menu/:categoryID/Products/:productID" element={<Product />} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/menu" element={<Menu setModal={setModal}/>} />
                <Route path="/admin/menu/:categoryID" element={<Category setModal={setModal} />} />
                <Route path="/admin/menu/:categoryID/Products/:productID" element={<Product />} />
            </Routes>
            <Modal modalState={[modal, setModal]}/>
        </BrowserRouter>
    );
}


