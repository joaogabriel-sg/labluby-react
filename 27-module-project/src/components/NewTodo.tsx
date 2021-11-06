import { useRef, FormEvent, useContext } from "react";

import { TodosContext } from "../store/todo-context";

import classes from "./NewTodo.module.css";

const NewTodo: React.FC = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const todoCtx = useContext(TodosContext);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current?.value;

    if (!enteredText || enteredText.trim().length === 0) return;

    todoCtx.addTodo(enteredText);
    todoTextInputRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input ref={todoTextInputRef} type="text" id="text" />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
