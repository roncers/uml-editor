import "./AddButton.scss";
import { useContext } from "react";
import { EntityContext } from "../EntityContext";

export default function AddButton() {
  const context = useContext(EntityContext);

  return <button className="add-button" onClick={context?.createEntity}>+</button>;
}
