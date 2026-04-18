"use client";

import { t, type Locale } from "@/lib/i18n";

export function Disclaimer({ locale }: { locale: Locale }) {
  return (
    <div
      role="alert"
      className="border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm print:hidden"
    >
      <div className="font-semibold">⚠ {t(locale, "warningTitle")}</div>
      <div className="mt-1 leading-relaxed">{t(locale, "warningBody")}</div>
    </div>
  );
}
