import "./ThemeInfo.scss"
import { useTranslation } from "react-i18next"

export default function ThemeInfo() {
    const { t } = useTranslation()

    return (
        <div className="theme-info-popover">
            {"<-- " + t("info-toggle-theme")}
        </div>
    )
}