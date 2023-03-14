import { createContext, useContext, useState } from "react";

//initialize
const Context = createContext(null);

//For index.js
export function ItemsProvider({ children }) {
  const [adminStatus, setAdminStatus] = useState(0); // 0: Guest (default), 1: Admin
  const [modal, setModal] = useState(null);
  const [status, setStatus] = useState(0); // 0: loading, 1: ready, 2: error

  /**
   * The reason that you need to add comments to explain these 2 variables
   * was the clue that this needs to be 2 separate ContextAPI.
   */
  const [menuData, setMenuData] = useState([]); // using for menu collection
  const [productData, setProductData] = useState([]); // using for product collection

  // too long
  const value = {
    adminStatus,
    setAdminStatus,
    modal,
    setModal,
    status,
    setStatus,
    menuData,
    setMenuData,
    productData,
    setProductData,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

//For every .jsx
export function useItems() {
  const context = useContext(Context);
  const errMessage = "please import context ItemsProvider in index.js file.";
  if (!context) throw new Error(errMessage);
  return context;
}
