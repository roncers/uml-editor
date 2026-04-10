import AddButton from "./buttons/add-button/AddButton"
import DeleteButton from "./buttons/delete-button/DeleteButton"
import "./ButtonsMenu.scss"

function ButtonsMenu() {
  return (
    <nav className="buttons-menu">
      <ul className="buttons-menu__buttons-list">
        <li>
          <AddButton />
        </li>
        <li>
          <DeleteButton />
        </li>
      </ul>
    </nav>
  )
}

export default ButtonsMenu
