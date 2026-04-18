"use client";

import { useMemo } from "react";
import { t, type Locale, type MessageKey } from "@/lib/i18n";
import type { WhiteCardData, HostType, Sex } from "@/lib/types";
import {
  BORDER_CROSSINGS,
  findCrossingById,
  getMapUrl,
  type Neighbor,
} from "@/lib/border-crossings";
import { lookupPostal } from "@/lib/postal-codes";
import { normalizePassport, isJmbgFormat, isPibFormat } from "@/lib/validators";

interface Props {
  locale: Locale;
  data: WhiteCardData;
  onChange: (next: WhiteCardData) => void;
}

const NEIGHBOR_GROUP_KEY: Record<Neighbor, MessageKey> = {
  AIR: "groupAirport",
  HU: "groupHU",
  HR: "groupHR",
  BA: "groupBA",
  RO: "groupRO",
  BG: "groupBG",
  MK: "groupMK",
  ME: "groupME",
};
const NEIGHBOR_ORDER: Neighbor[] = ["AIR", "HU", "HR", "BA", "RO", "BG", "MK", "ME"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  children,
  full,
  hint,
  error,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <label className={"flex flex-col gap-1 text-sm " + (full ? "sm:col-span-2" : "")}>
      <span className="text-slate-700">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-slate-500">{hint}</span>}
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </label>
  );
}

// text-base on mobile (≥16px prevents iOS Safari zoom on focus); text-sm on desktop
const inputCls =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition-colors focus:border-slate-900 focus:ring-1 focus:ring-slate-900 sm:py-1.5 sm:text-sm";

export function WhiteCardForm({ locale, data, onChange }: Props) {
  const set = <K extends keyof WhiteCardData>(key: K, value: WhiteCardData[K]) =>
    onChange({ ...data, [key]: value });

  const grouped = useMemo(() => {
    const popular = BORDER_CROSSINGS.filter((c) => c.popular);
    const byNeighbor = new Map<Neighbor, typeof BORDER_CROSSINGS>();
    for (const c of BORDER_CROSSINGS) {
      const arr = byNeighbor.get(c.neighbor) ?? [];
      arr.push(c);
      byNeighbor.set(c.neighbor, arr);
    }
    return { popular, byNeighbor };
  }, []);

  const postalHint = lookupPostal(data.postalCode);

  const jmbgError =
    data.hostType === "individual_sr" && data.hostJmbg && !isJmbgFormat(data.hostJmbg)
      ? t(locale, "validateJmbg")
      : "";
  const pibError =
    data.hostType === "company" && data.hostPib && !isPibFormat(data.hostPib)
      ? t(locale, "validatePib")
      : "";

  return (
    <div className="flex flex-col gap-4">
      <Section title={t(locale, "sectionPersonal")}>
        <Field label={t(locale, "fieldSurname")}>
          <input
            className={inputCls}
            value={data.surname}
            onChange={(e) => set("surname", e.target.value.toUpperCase())}
            placeholder="ZHANG"
          />
        </Field>
        <Field label={t(locale, "fieldGivenName")}>
          <input
            className={inputCls}
            value={data.givenName}
            onChange={(e) => set("givenName", e.target.value.toUpperCase())}
            placeholder="SAN"
          />
        </Field>
        <Field label={t(locale, "fieldDateOfBirth")}>
          <input
            type="date"
            className={inputCls}
            value={data.dateOfBirth}
            onChange={(e) => set("dateOfBirth", e.target.value)}
          />
        </Field>
        <Field label={t(locale, "fieldSex")}>
          <div className="flex gap-2">
            {(["M", "F"] as Sex[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("sex", s)}
                className={
                  "flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors " +
                  (data.sex === s
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100")
                }
              >
                {s === "M" ? t(locale, "sexMale") : t(locale, "sexFemale")}
              </button>
            ))}
          </div>
        </Field>
        <Field label={t(locale, "fieldPlaceOfBirth")} full>
          <input
            className={inputCls}
            value={data.placeOfBirth}
            onChange={(e) => set("placeOfBirth", e.target.value.toUpperCase())}
            placeholder="BEIJING, KINA"
          />
        </Field>
        <Field label={t(locale, "fieldNationality")} full>
          <input
            className={inputCls}
            value={data.nationality}
            onChange={(e) => set("nationality", e.target.value.toUpperCase())}
            placeholder="KINA"
          />
        </Field>
      </Section>

      <Section title={t(locale, "sectionTravelDoc")}>
        <Field label={t(locale, "fieldPassportNumber")}>
          <input
            className={inputCls + " font-mono tracking-wider"}
            value={data.passportNumber}
            onChange={(e) => set("passportNumber", normalizePassport(e.target.value))}
            placeholder="AB1234567"
          />
        </Field>
        <Field label={t(locale, "fieldVisaInfo")}>
          <input
            className={inputCls}
            value={data.visaInfo}
            onChange={(e) => set("visaInfo", e.target.value)}
            placeholder=""
          />
        </Field>
      </Section>

      <Section title={t(locale, "sectionEntry")}>
        <Field label={t(locale, "fieldEntryDate")}>
          <input
            type="date"
            className={inputCls}
            value={data.entryDate}
            onChange={(e) => set("entryDate", e.target.value)}
          />
        </Field>
        <Field label={t(locale, "fieldEntryCrossing")}>
          <select
            className={inputCls}
            value={data.entryCrossingId}
            onChange={(e) => set("entryCrossingId", e.target.value)}
          >
            <option value="">—</option>
            <optgroup label={t(locale, "popularCrossings")}>
              {grouped.popular.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameLatin}
                </option>
              ))}
            </optgroup>
            {NEIGHBOR_ORDER.map((n) => {
              const list = grouped.byNeighbor.get(n) ?? [];
              if (list.length === 0) return null;
              return (
                <optgroup key={n} label={t(locale, NEIGHBOR_GROUP_KEY[n])}>
                  {list.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameLatin}
                    </option>
                  ))}
                </optgroup>
              );
            })}
            <option value="other">— {t(locale, "entryCrossingOther")} —</option>
          </select>
        </Field>
        {data.entryCrossingId === "other" && (
          <Field label={t(locale, "entryCrossingOther")} full>
            <input
              className={inputCls}
              value={data.entryCrossingOther}
              onChange={(e) => set("entryCrossingOther", e.target.value.toUpperCase())}
              placeholder="..."
            />
          </Field>
        )}
        {(() => {
          const sel =
            data.entryCrossingId && data.entryCrossingId !== "other"
              ? findCrossingById(data.entryCrossingId)
              : null;
          if (!sel) return null;
          return (
            <div className="sm:col-span-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-700">
              {sel.nearestCity && (
                <div className="flex flex-wrap items-center gap-1">
                  <span>📍</span>
                  <span>
                    {t(locale, "nearestCityLabel")}:{" "}
                    <span className="font-medium text-slate-900">{sel.nearestCity}</span>
                    {sel.nearestCityCn && (
                      <span className="text-slate-600"> · {sel.nearestCityCn}</span>
                    )}
                  </span>
                </div>
              )}
              <a
                href={getMapUrl(sel)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-blue-700 hover:underline"
              >
                🗺 {t(locale, "viewOnMap")} ↗
              </a>
            </div>
          );
        })()}
      </Section>

      <Section title={t(locale, "sectionAddress")}>
        <Field label={t(locale, "fieldPostalCode")} hint={postalHint ? `${t(locale, "postalHint")}: ${postalHint}` : undefined}>
          <input
            className={inputCls}
            value={data.postalCode}
            onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="11070"
            inputMode="numeric"
          />
        </Field>
        <Field label={t(locale, "fieldCity")}>
          <input
            className={inputCls}
            value={data.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder={postalHint ?? "Novi Beograd"}
          />
        </Field>
        <Field label={t(locale, "fieldStreet")} full>
          <input
            className={inputCls}
            value={data.street}
            onChange={(e) => set("street", e.target.value.toUpperCase())}
            placeholder="PRIMER ULICA 1"
          />
        </Field>
      </Section>

      <Section title={t(locale, "sectionHost")}>
        <Field label={t(locale, "fieldHostType")} full>
          <div className="flex flex-col gap-2 sm:flex-row">
            {(["individual_foreign", "individual_sr", "company"] as HostType[]).map((tp) => {
              const labelKey =
                tp === "individual_sr"
                  ? "hostIndividualSr"
                  : tp === "individual_foreign"
                  ? "hostIndividualForeign"
                  : "hostCompany";
              return (
                <button
                  key={tp}
                  type="button"
                  onClick={() => set("hostType", tp)}
                  className={
                    "flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors " +
                    (data.hostType === tp
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100")
                  }
                >
                  {t(locale, labelKey)}
                </button>
              );
            })}
          </div>
        </Field>
        <Field label={t(locale, "fieldHostName")} full>
          <input
            className={inputCls}
            value={data.hostName}
            onChange={(e) => set("hostName", e.target.value.toUpperCase())}
            placeholder="LI SI"
          />
        </Field>
        {data.hostType === "individual_sr" && (
          <Field
            label={t(locale, "fieldHostJmbg")}
            full
            error={jmbgError || undefined}
          >
            <input
              className={inputCls + " font-mono"}
              value={data.hostJmbg}
              onChange={(e) =>
                set("hostJmbg", e.target.value.replace(/\D/g, "").slice(0, 13))
              }
              placeholder="1234567890123"
              inputMode="numeric"
            />
          </Field>
        )}
        {data.hostType === "individual_foreign" && (
          <Field label={t(locale, "fieldHostDob")} full>
            <input
              type="date"
              className={inputCls}
              value={data.hostDob}
              onChange={(e) => set("hostDob", e.target.value)}
            />
          </Field>
        )}
        {data.hostType === "company" && (
          <Field
            label={t(locale, "fieldHostPib")}
            full
            error={pibError || undefined}
          >
            <input
              className={inputCls + " font-mono"}
              value={data.hostPib}
              onChange={(e) =>
                set("hostPib", e.target.value.replace(/\D/g, "").slice(0, 9))
              }
              placeholder="9 cifara"
              inputMode="numeric"
            />
          </Field>
        )}
      </Section>

      <Section title={t(locale, "sectionStay")}>
        <Field label={t(locale, "fieldRegistrationDate")}>
          <input
            type="date"
            className={inputCls}
            value={data.registrationDate}
            onChange={(e) => set("registrationDate", e.target.value)}
          />
        </Field>
        <Field label={t(locale, "fieldNote")} full>
          <textarea
            className={inputCls + " min-h-[60px] resize-y"}
            value={data.note}
            onChange={(e) => set("note", e.target.value)}
          />
        </Field>
      </Section>
    </div>
  );
}
