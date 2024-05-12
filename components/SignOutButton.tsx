"use client";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
  const router = useRouter();

  const t = useTranslations("SignOut");

  async function signOut() {
    await fetch("/api/signOut", {
      method: "POST",
    });

    router.push("/login");
  }

  return <button onClick={signOut}>{t("signout-button")}</button>;
}
