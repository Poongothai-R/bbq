import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "../src/styles/global/style.css";

//scripts
import ScrollTop from "./scripts/ScrollTop";

//Projects
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Product from "./pages/Product";
import Modal from "./components/Modal";
import Category from "./pages/Category";
import { useItems } from "./state/ContextItems";

export default function App() {
  const {modal, setModal} = useItems();
  return (
    <BrowserRouter>
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Category />} />
          <Route path="/menu/:category/:productID" element={<Product />} />

          <Route path="/admin/menu" element={<Menu />} />
          <Route path="/admin/menu/:category" element={<Category setModal={setModal} />} />
          <Route path="/admin/menu/:category/:productID" element={<Product />} />
        </Route>
      </Routes>
      <Modal modalState={[modal, setModal]}/>
    </BrowserRouter>
  );
}


