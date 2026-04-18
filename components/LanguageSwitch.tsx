"use client";

import { LOCALES, type Locale } from "@/lib/i18n";

interface Props {
  value: Locale;
  onChange: (next: Locale) => void;
}

export function LanguageSwitch({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-md border border-slate-300 bg-white text-sm shadow-sm overflow-hidden">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onChange(l.code)}
          className={
            "px-3 py-1.5 transition-colors " +
            (value === l.code
              ? "bg-slate-900 text-white"
              : "text-slate-700 hover:bg-slate-100")
          }
          aria-pressed={value === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
