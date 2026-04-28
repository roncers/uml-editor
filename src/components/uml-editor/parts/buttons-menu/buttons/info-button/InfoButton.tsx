import "./InfoButton.scss"
import SyButton from "@/components/shared/sy-button/SyButton"
import infoSvg from "@/assets/svg/common/info.svg"
import { useTranslation } from "react-i18next"
import InformationPopover from "@/components/overlays/information-popover/InformationPopover"

export default function InfoButton() {
  const { t } = useTranslation()
  return (  
    <>
      <SyButton
        popoverTarget="information-popover"
        className="buttons-menu__info-button"
        aria-label="Info"
        title={t("information")}
      >
        <img src={infoSvg} alt="Info" />
      </SyButton>
      <InformationPopover />
    </>
  )
}
