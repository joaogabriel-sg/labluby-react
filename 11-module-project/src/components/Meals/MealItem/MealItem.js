import { useContext } from "react";

import MealItemForm from "./MealItemForm";

import CartContext from "../../../store/cart-context";

import styles from "./MealItem.module.css";

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);
  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({ id, name, price, amount });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
