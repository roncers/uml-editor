
import { useTranslation } from "react-i18next"

export default function ThemeInfo() {
    const { t } = useTranslation()

    return (
        <div popover="auto" id="theme-popover">
            {"<-- " + t("info-toggle-theme")}
        </div>
    )
}
