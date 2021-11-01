import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

import "./NewExpense.css";

const NewExpense = ({ onAddExpense }) => {
  const [isFormShowed, setIsFormShowed] = useState(false);

  const handleSaveExpenseData = (newExpense) => {
    const expenseData = {
      ...newExpense,
      id: Math.random().toString(),
    };

    onAddExpense(expenseData);
  };

  const handleToggleFormVisibility = () => {
    setIsFormShowed((prevIsFormShowed) => !prevIsFormShowed);
  };

  return (
    <div className="new-expense">
      {!isFormShowed && (
        <button type="button" onClick={handleToggleFormVisibility}>
          Add New Expense
        </button>
      )}

      {isFormShowed && (
        <ExpenseForm
          onSaveExpenseData={handleSaveExpenseData}
          handleToggleFormVisibility={handleToggleFormVisibility}
        />
      )}
    </div>
  );
};

export default NewExpense;
