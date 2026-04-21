import AddButton from "./buttons/add-button/AddButton"
import DeleteButton from "./buttons/delete-button/DeleteButton"
import InterchangeButton from "./buttons/interchange-button/InterchangeButton"
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
        <li>
          <InterchangeButton />
        </li>
      </ul>
    </nav>
  )
}

export default ButtonsMenu
