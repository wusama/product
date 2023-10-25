import React, { useState } from "react";
import Menus from "../components/Menus";
export default function Home() {
  const [todos, setTodos] = useState([{ id: 1, name: "todo1", checked: false }]);
  return (
    <div>
      <Menus />
      <div
        onClick={() => {
          setTodos((old) => {
            return [
              ...old,
              {
                id: old.length + 1,
                name: Math.random().toString(36).substring(2),
                checked: false,
              },
            ];
          });
        }}
      >
        <h1>Home</h1>
        <ul>
          {todos.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
