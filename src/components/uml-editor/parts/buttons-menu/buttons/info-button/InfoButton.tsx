import "./InfoButton.scss"
import SyButton from "@/components/shared/sy-button/SyButton"
import infoSvg from "@/assets/svg/common/info.svg"
// TODO: add the info and use translations

export default function InfoButton() {
  return (  
    <>
      <SyButton
        popoverTarget="information-popover"
        className="buttons-menu__info-button"
        aria-label="Info"
        title="Info"
      >
        <img src={infoSvg} alt="Info" />
      </SyButton>
    </>
  )
}
