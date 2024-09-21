import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todos from "./component/Todos";
import CreateTodo from "./component/CreateTodo";

function App() {
  const [todos, setTodos] = useState([]);

  fetch("http://localhost:3000/todos").then(async (res) => {
    const json = await res.json();
    setTodos(json.todos);
  });

  const arr = [
    {
      title: "todos",
      description: "hello from the outside",
      completed: false,
    },
  ];

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
