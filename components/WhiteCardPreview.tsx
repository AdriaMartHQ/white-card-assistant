"use client";

import type { WhiteCardData } from "@/lib/types";
import { findCrossingById } from "@/lib/border-crossings";
import { isoToDisplay } from "@/lib/format";

// Cell styling — bold labels, balanced padding so the form fills A4 properly
// (not too cramped, not overflowing 1 page)
const labelTd =
  "border border-black px-2 py-2.5 text-[10px] leading-tight text-black font-bold align-top";
const valueTd =
  "border border-black px-2 py-2.5 text-sm text-black align-top";

/** Surname / Name — single-line label "Cyr - Eng", inline */
function InlineRow({
  sr,
  en,
  value,
  emphasis,
}: {
  sr: string;
  en: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <tr>
      <td className={labelTd}>
        {sr} - {en}
      </td>
      <td
        className={
          valueTd + (emphasis ? " text-base font-bold tracking-wide" : "")
        }
      >
        {value || "\u00A0"}
      </td>
    </tr>
  );
}

/** Most rows — Cyrillic + line-break + English (tight spacing, matches `[BR]` in docx) */
function BrRow({
  sr,
  en,
  value,
  valueMinHeight,
}: {
  sr: string;
  en: string;
  value: string;
  /** Some MUP rows reserve extra height in the value cell (e.g. Visa, Address). */
  valueMinHeight?: string;
}) {
  return (
    <tr>
      <td className={labelTd}>
        <div>{sr}</div>
        <div>{en}</div>
      </td>
      <td className={valueTd} style={valueMinHeight ? { height: valueMinHeight } : undefined}>
        {value || "\u00A0"}
      </td>
    </tr>
  );
}

/** Sex / Host / Signature — Cyr + paragraph break + Eng (extra vertical space, matches MUP docx) */
function ParaRow({
  sr,
  en,
  value,
  valueMinHeight,
}: {
  sr: string;
  en: string;
  value: string;
  valueMinHeight?: string;
}) {
  return (
    <tr>
      <td className={labelTd}>
        <div>{sr}</div>
        <div className="mt-2">{en}</div>
      </td>
      <td className={valueTd} style={valueMinHeight ? { height: valueMinHeight } : undefined}>
        {value || "\u00A0"}
      </td>
    </tr>
  );
}

export function WhiteCardPreview({ data }: { data: WhiteCardData }) {
  const crossing = findCrossingById(data.entryCrossingId);
  const crossingName =
    data.entryCrossingId === "other"
      ? data.entryCrossingOther
      : crossing?.nameUpper ?? "";

  const entryStr = [isoToDisplay(data.entryDate), crossingName]
    .filter(Boolean)
    .join(", ");

  const addressStr = [data.city, data.street]
    .filter(Boolean)
    .join(", ")
    .toUpperCase();

  const hostStr =
    data.hostType === "company"
      ? [data.hostName, data.hostPib && `PIB ${data.hostPib}`]
          .filter(Boolean)
          .join(", ")
      : data.hostType === "individual_sr"
      ? [data.hostName, data.hostJmbg].filter(Boolean).join(", ")
      : data.hostType === "individual_foreign"
      ? [data.hostName, isoToDisplay(data.hostDob)].filter(Boolean).join(", ")
      : data.hostName;

  return (
    <div className="relative mx-auto bg-white shadow-md print:shadow-none paper-texture print-page">
      <div className="relative flex flex-col px-5 py-4 text-black print:h-full print:px-3 print:py-2">
        {/* "Образац 1." — top-right OUTSIDE the dotted form border */}
        <div className="mb-2 text-right text-sm font-bold italic">Образац 1.</div>

        {/* Outer dotted border encloses title + form table; flex-1 to fill page */}
        <div className="flex flex-1 flex-col border border-dashed border-black p-3">
          {/* Header: empty | centered title | right-aligned serial-number */}
          <div className="mb-3 grid grid-cols-[1fr_2fr_1fr] items-start gap-2">
            <div />
            <div className="text-center">
              <div className="text-sm font-bold">ПРИЈАВА БОРАВИШТА СТРАНЦА</div>
              <div className="mt-1 text-sm font-bold">
                REGISTRATION OF PLACE OF STAY
              </div>
            </div>
            <div className="text-right text-xs">
              <div className="font-bold">Серијски број:</div>
              <div className="mt-1 font-bold">Serial number:</div>
            </div>
          </div>

          {/* Form body — 2 cells per row, 50/50 split (matches MUP docx) */}
          <table className="w-full table-fixed border-collapse border border-black">
            <colgroup>
              <col style={{ width: "50%" }} />
              <col style={{ width: "50%" }} />
            </colgroup>
            <tbody>
              <InlineRow sr="Презиме" en="Surname" value={data.surname} emphasis />
              <InlineRow sr="Име" en="Name" value={data.givenName} emphasis />
              <BrRow
                sr="Датум рођења"
                en="Date of birth"
                value={isoToDisplay(data.dateOfBirth)}
              />
              {/* Sex uses paragraph break in MUP docx (not [BR]) */}
              <ParaRow sr="Пол" en="Sex" value={data.sex} />
              <BrRow
                sr="Место и држава рођења"
                en="Place and country of birth"
                value={data.placeOfBirth}
              />
              <BrRow
                sr="Држављанство"
                en="Nationality"
                value={data.nationality}
              />
              <BrRow
                sr="Врста и број путне или друге исправе о идентитету"
                en="Type and number of travel document or other ID"
                value={data.passportNumber ? `PASOŠ ${data.passportNumber}` : ""}
              />
              {/* Visa cell is intentionally taller in MUP docx (5 empty paragraphs reserved) */}
              <BrRow
                sr="Врста и број визе и место издавања"
                en="Type and number of visa and place of issuance"
                value={data.visaInfo}
                valueMinHeight="70px"
              />
              <BrRow
                sr="Датум и место уласка у Републику Србију"
                en="Date and place of entry into the Republic of Serbia"
                value={entryStr}
              />
              {/* Address cell is also intentionally taller in MUP docx */}
              <BrRow
                sr="Адреса боравишта у Републици Србији"
                en="Address of place of stay in the Republic of Serbia"
                value={addressStr}
                valueMinHeight="70px"
              />
              {/* Host info uses paragraph break in MUP docx (long bilingual block) */}
              <ParaRow
                sr="Податак о станодавцу (презиме и име и ЈМБГ, односно назив правног лица или предузетника и ПИБ)"
                en="Surname, given name and personal identification number of the landlord/host ie, name of legal entity or entrepreneur and tax ID number)."
                value={hostStr}
              />
              <BrRow
                sr="Датум пријаве"
                en="Date of registration"
                value={isoToDisplay(data.registrationDate)}
              />
              <BrRow sr="Напомена" en="Note" value={data.note} />
              {/* Signature uses paragraph break in MUP docx */}
              <ParaRow
                sr="Потпис подносиоца пријаве"
                en="Signature of the person who registers"
                value=""
                valueMinHeight="55px"
              />
              {/* Officer signature row — empty label cell + value cell with line + caption */}
              <tr>
                <td className={labelTd} style={{ height: "120px" }}>
                  &nbsp;
                </td>
                <td
                  className={valueTd + " align-bottom"}
                  style={{ height: "120px" }}
                >
                  <div className="mx-auto mb-3 mt-16 w-3/4 border-t border-black" />
                  <div className="text-center text-[10px] italic text-black">
                    (потпис овлашћеног лица - signature of the authorized person)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
