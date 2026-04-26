import AddButton from "./buttons/add-button/AddButton"
import DeleteButton from "./buttons/delete-button/DeleteButton"
import InterchangeButton from "./buttons/interchange-button/InterchangeButton"
import InformationButton from "./buttons/info-button/InfoButton"
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
        <li className="buttons-menu__export-button">
          <InterchangeButton />
        </li>
        <li>
          <InformationButton />
        </li>
      </ul>
    </nav>
  )
}

export default ButtonsMenu
