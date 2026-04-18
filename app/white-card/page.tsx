"use client";

import { useEffect, useState } from "react";
import { WhiteCardForm } from "@/components/WhiteCardForm";
import { WhiteCardPreview } from "@/components/WhiteCardPreview";
import { Disclaimer } from "@/components/Disclaimer";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Glossary } from "@/components/Glossary";
import { t, type Locale } from "@/lib/i18n";
import { EMPTY_FORM, DEMO_FORM, type WhiteCardData } from "@/lib/types";
import { todayIso } from "@/lib/format";
import {
  saveForm,
  loadForm,
  clearForm,
  getStoredLocale,
  setStoredLocale,
} from "@/lib/storage";
import { shareOrEmail } from "@/lib/email";

function isLocale(v: string | null): v is Locale {
  return v === "zh" || v === "sr" || v === "en";
}

export default function WhiteCardPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [data, setData] = useState<WhiteCardData>(EMPTY_FORM);
  const [savedFlash, setSavedFlash] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const sl = getStoredLocale();
    if (isLocale(sl)) setLocale(sl);
    const saved = loadForm();
    if (saved) setData(saved);
    else
      setData((d) => ({
        ...d,
        registrationDate: d.registrationDate || todayIso(),
      }));
  }, []);

  const updateLocale = (l: Locale) => {
    setLocale(l);
    setStoredLocale(l);
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };
  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      await shareOrEmail(data, locale);
    } finally {
      setSharing(false);
    }
  };
  const handleSave = () => {
    saveForm(data);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 3000);
  };
  const handleClear = () => {
    setData(EMPTY_FORM);
    clearForm();
    setConfirmClear(false);
  };
  const handleDemo = () => setData(DEMO_FORM);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Minimal top row — just lang switch, no styled header */}
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-4 pt-3 sm:px-6 print:hidden">
        <LanguageSwitch value={locale} onChange={updateLocale} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:py-6">
        <Disclaimer locale={locale} />

        {/* Collapsible legal-basis panel — uses native <details> so no JS needed */}
        <details className="group rounded-md border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm print:hidden">
          <summary className="cursor-pointer select-none list-none font-medium text-slate-700 marker:hidden">
            <span className="inline-block transition-transform group-open:rotate-90">▸</span>{" "}
            {t(locale, "legalTitle")}
          </summary>
          <ul className="mt-3 space-y-1.5 pl-5 text-xs text-slate-600 [list-style:disc]">
            <li>{t(locale, "legalLaw")}</li>
            <li>{t(locale, "legalStayLimit")}</li>
            <li>{t(locale, "legalRegDeadline")}</li>
            <li>{t(locale, "legalChannels")}</li>
            <li>{t(locale, "legalForms")}</li>
            <li>{t(locale, "legalFine")}</li>
          </ul>
          <a
            href="http://www.mup.gov.rs/wps/portal/en/information"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-blue-600 hover:underline"
          >
            {t(locale, "legalOfficial")}
          </a>
        </details>

        <Glossary locale={locale} />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Left: form + actions (hidden in print) ──────────────── */}
          <section className="flex flex-col gap-4 print:hidden">
            <WhiteCardForm locale={locale} data={data} onChange={setData} />

            {/* Action toolbar — sticky bottom; safe-area inset for iPhone */}
            <div
              className="sticky z-10 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur"
              style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
            >
              <button
                type="button"
                onClick={handleShare}
                disabled={sharing}
                className={
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white sm:py-1.5 " +
                  (sharing
                    ? "cursor-wait bg-emerald-400"
                    : "bg-emerald-600 hover:bg-emerald-700")
                }
              >
                {sharing ? "⏳ 生成 PDF..." : `📧 ${t(locale, "btnEmail")}`}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 sm:py-1.5"
              >
                🖨 {t(locale, "btnPrint")}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:py-1.5"
              >
                ⤓ {t(locale, "btnDownloadPdf")}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:py-1.5"
              >
                💾 {t(locale, "btnSave")}
                {savedFlash && (
                  <span className="ml-1 text-xs text-emerald-600">
                    ✓ {t(locale, "savedMoment")}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={handleDemo}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:py-1.5"
              >
                📋 {t(locale, "btnLoadDemo")}
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-rose-300 bg-white px-3 py-2 text-sm text-rose-700 hover:bg-rose-50 sm:py-1.5"
              >
                ✕ {t(locale, "btnClear")}
              </button>
            </div>
          </section>

          {/* ── Right: live preview ─────────────────────────────────── */}
          <section className="lg:sticky lg:top-4 lg:self-start">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 print:hidden">
              {t(locale, "previewTitle")}
            </h2>
            <WhiteCardPreview data={data} />
          </section>
        </div>
      </div>

      {/* Clear-confirm modal */}
      {confirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 print:hidden">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <div className="font-semibold">{t(locale, "btnClear")}?</div>
            <div className="mt-2 text-sm text-slate-600">
              {t(locale, "savedTtl")}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                {t(locale, "btnCancel")}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
              >
                {t(locale, "btnConfirmClear")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
