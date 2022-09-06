import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function Ingredients(props) {
  const name = props.itemName.name;
  const amount = props.itemName.amount;
  const id = props.itemName._id;

  return (
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td class="delete-icon">
        <AiOutlineDelete
          onClick={() => {
            return props.deleteItem(id);
          }}
        />
      </td>
    </tr>
  );
}

export default Ingredients;
