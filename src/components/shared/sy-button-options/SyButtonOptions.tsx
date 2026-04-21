import styles from "./SyButtonOptions.module.scss"
import SyButton from "@/components/shared/sy-button/SyButton"

type HoverButton = { texts: { label: string; value: string }; onClick: () => void }

export default function AddButton({
  buttons,
  children,
  label,
}: {
  buttons: [HoverButton, HoverButton]
  children: React.ReactNode
  label: string
}) {
  return (
    <div className={styles["buttons-menu__add-button-group"]}>
      <SyButton
        className={styles["buttons-menu__add-button"]}
        aria-label={label}
        title={label}
      >
        {children}
      </SyButton>
      <div className={styles["buttons-menu__add-buttons-sub"]}>
        <SyButton
          className={styles["buttons-menu__add-buttons-sub--1"]}
          aria-label={buttons[0].texts.label}
          title={buttons[0].texts.label}
          onClick={() => buttons[0].onClick}
        >
          {buttons[0].texts.value}
        </SyButton>
        <SyButton
          className={styles["buttons-menu__add-buttons-sub--2"]}
          aria-label={buttons[1].texts.label}
          title={buttons[1].texts.label}
          onClick={() => buttons[1].onClick}
        >
          {buttons[1].texts.value}
        </SyButton>
      </div>
    </div>
  )
}
