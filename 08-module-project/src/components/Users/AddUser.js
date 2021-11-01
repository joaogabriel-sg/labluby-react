import { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = ({ onAddUser }) => {
  const usernameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleAddUser = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const age = ageInputRef.current.value;

    if (!username.trim().length || !age.trim().length) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+age <= 0) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }

    onAddUser(username, age);
    usernameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={handleAddUser}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
