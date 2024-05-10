import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/">{t("home-button")}</Link>
    </div>
  );
}
