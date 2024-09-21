import React, { useState } from "react";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <button
        style={{ marginTop: "5px" }}
        onClick={() => {
          console.log({ title, desc });
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: desc,
            }),
            headers: { "Content-type": "application/json" },
          }).then(async (res) => {
            const json = await res.json();
            alert("Todo created");
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
