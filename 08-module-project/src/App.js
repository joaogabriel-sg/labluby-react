import { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const addUserIntoUsers = (name, age) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { name, age, id: Math.random().toString() },
    ]);
  };

  return (
    <>
      <AddUser onAddUser={addUserIntoUsers} />
      <UsersList users={users} />
    </>
  );
}

export default App;
