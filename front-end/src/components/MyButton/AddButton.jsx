import { useEffect } from "react";
import "./addButtons.css";

const AddButton = (props) => {
  return (
    <>
      <button onClick={props.onClick} className={props.isActive ? 'button active' : 'button'}>
        {props.isActive ? "remove" : "add"}
      </button>
    </>
  );
};

export default AddButton;
