import React from "react";

export default function CreateTodo() {
  return (
    <div>
      <input type="text" placeholder="Title" />
      <br />
      <input type="text" placeholder="description" />
      <br />
      <button style={{ marginTop: "5px" }}>Create</button>
    </div>
  );
}
