import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "../src/styles/global/style.css";

//scripts
import ScrollTop from "./scripts/ScrollTop";

//Projects
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Modal from "./components/Modal";
import Category from "./pages/Category";
import { useItems } from "./state/ContextItems";
import Product from "./pages/Product";


export default function App() {
  const { modal, setModal } = useItems();
  return (
    <BrowserRouter>
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Category />} />
        <Route path="/menu/:category/:product" element={<Product />} />
        
        <Route path="/admin" element={<Admin />} />      
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/menu/:category" element={<Category setModal={setModal} />} />
        <Route path="/admin/menu/:category/:product" element={<Product />} />
      </Routes>
      <Modal modalState={[modal, setModal]} />
    </BrowserRouter>
  );
}


