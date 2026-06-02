import "./InfoButton.scss"
import SyButton from "@/components/shared/sy-button/SyButton"
import InfoSvg from "@/assets/svg/common/info.svg?react"
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
        <InfoSvg />
      </SyButton>
      <InformationPopover />
    </>
  )
}
