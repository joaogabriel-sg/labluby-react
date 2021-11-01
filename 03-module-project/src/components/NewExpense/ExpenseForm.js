import { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpenseData, handleToggleFormVisibility }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleTitleChange = ({ target }) => setTitle(target.value);

  const handleAmountChange = ({ target }) => setAmount(target.value);

  const handleDateChange = ({ target }) => setDate(target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const expenseData = {
      title,
      amount: +amount,
      date: new Date(date),
    };
    onSaveExpenseData(expenseData);

    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={handleToggleFormVisibility}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
