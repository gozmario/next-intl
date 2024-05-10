"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChangeEvent } from "react";

export default function LanguageChanger() {
  const router = useRouter();
  const currentLocale = useLocale();
  const currentPathname = usePathname();

  const t = useTranslations("components");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));

    router.refresh();
  };

  return (
    <>
      <label>{t("lng-changer")}</label>
      <select onChange={handleChange} value={currentLocale}>
        <option value="en">English</option>
        <option value="hu">Magyar</option>
      </select>
    </>
  );
}
