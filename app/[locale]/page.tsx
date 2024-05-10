import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Index() {
  const t = useTranslations("Index");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about-button")}</Link>
    </div>
  );
}
