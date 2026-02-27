import "./Header.scss";
import { useTranslation } from "react-i18next";

export default function Title() {
  const { t } = useTranslation();
  return (
    <h1 className="header">
      <span className="header__prefix">&gt;&nbsp;</span>
      {t("header-title")}
    </h1>
  );
}
