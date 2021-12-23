import React from "react";
import InputUpdate from "./InputUpdate";

export default function Shoes(props) {
  const displayData = () => {
    return props.shoes.map((shoe) => {
      return (
        <li key={shoe.id}>
          {shoe.name}
          <button onClick={() => props.deleteFn(shoe.id)}>Delete</button>
          <br />
          <InputUpdate id={shoe.id} updateFn={props.updateFn} />
        </li>
      );
    });
  };
  return (
    <div>
      <ul>{displayData()}</ul>
    </div>
  );
}
