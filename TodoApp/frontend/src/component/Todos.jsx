import React from "react";

export default function Todos({ todos }) {
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div key={index}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button>
              {todo.completed == true ? "Completed" : "Mark as completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
