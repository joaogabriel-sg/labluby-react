import React, { createContext, useState } from "react";

export const ProductsContext = createContext({
  products: [],
  toggleFav: (productId) => {},
});

export default (props) => {
  const [productList, setProductList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (productId) => {
    setProductList((prevProductList) => {
      const prodIndex = prevProductList.findIndex((p) => p.id === productId);
      const newFavStatus = !prevProductList[prodIndex].isFavorite;
      const updatedProducts = [...prevProductList];
      updatedProducts[prodIndex] = {
        ...prevProductList[prodIndex],
        isFavorite: newFavStatus,
      };

      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
