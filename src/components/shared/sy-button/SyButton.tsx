import styles from "./SyButton.module.scss"

interface SyButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  className?: string
}

const SyButton = ({ children, className, ...props }: SyButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className || ""}`}>
      {children}
    </button>
  )
}

export default SyButton
