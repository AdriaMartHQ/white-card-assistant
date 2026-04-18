import type { Locale } from "./i18n";
import { t } from "./i18n";
import type { WhiteCardData } from "./types";
import { findCrossingById } from "./border-crossings";
import { isoToDisplay } from "./format";
// PDF generator is dynamic-imported on click so the ~450KB jsPDF + html2canvas
// bundle is NOT shipped in the initial page load.

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function formatHost(data: WhiteCardData): string {
  if (data.hostType === "company") {
    return [data.hostName, data.hostPib && `PIB ${data.hostPib}`]
      .filter(Boolean)
      .join(", ");
  }
  if (data.hostType === "individual_sr") {
    return [data.hostName, data.hostJmbg].filter(Boolean).join(", ");
  }
  if (data.hostType === "individual_foreign") {
    return [data.hostName, isoToDisplay(data.hostDob)].filter(Boolean).join(", ");
  }
  return data.hostName;
}

/**
 * Plain-text fallback body — used when neither file-share nor PDF generation
 * is available (e.g. very old browsers).
 */
export function formatEmailBody(data: WhiteCardData): string {
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

  return [
    "ПРИЈАВА БОРАВИШТА СТРАНЦА / REGISTRATION OF PLACE OF STAY",
    "",
    `Презиме / Surname:                ${data.surname}`,
    `Име / Name:                       ${data.givenName}`,
    `Датум рођења / Date of birth:     ${isoToDisplay(data.dateOfBirth)}`,
    `Пол / Sex:                        ${data.sex}`,
    `Место рођења / Place of birth:    ${data.placeOfBirth}`,
    `Држављанство / Citizenship:       ${data.nationality}`,
    `Пасош / Passport:                 ${data.passportNumber}`,
    `Виза / Visa:                      ${data.visaInfo}`,
    `Улазак / Entry:                   ${entryStr}`,
    `Адреса / Address:                 ${addressStr}`,
    `Станодавац / Host:                ${formatHost(data)}`,
    `Датум пријаве / Reg. date:        ${isoToDisplay(data.registrationDate)}`,
    `Напомена / Note:                  ${data.note}`,
    "",
    "── Draft only · Does NOT replace MUP filing ──",
  ].join("\n");
}

/**
 * Generate a real PDF of the form and either:
 * - share via Web Share API (mobile native sheet → Mail / WeChat / Files / etc.)
 * - or download to disk (desktop fallback)
 *
 * The OS handles routing — no PII passes through any server we control.
 */
export async function shareOrEmail(
  data: WhiteCardData,
  locale: Locale,
): Promise<void> {
  const subject = `${t(locale, "emailSubject")}${
    data.surname ? ` — ${data.surname}` : ""
  }`;
  const filename = `white-card-${data.surname || "draft"}-${
    data.registrationDate || ""
  }.pdf`;

  let pdfBlob: Blob;
  try {
    const { generateWhiteCardPdf } = await import("./pdf");
    pdfBlob = await generateWhiteCardPdf();
  } catch (e) {
    // PDF generation failed — last-resort text-only mailto
    // eslint-disable-next-line no-console
    console.warn("[shareOrEmail] PDF generation failed", e);
    const body = formatEmailBody(data);
    if (typeof window !== "undefined") {
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    return;
  }

  const file = new File([pdfBlob], filename, { type: "application/pdf" });

  // Web Share API with file support (mobile)
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({
        title: subject,
        text: "Obrazac 1 — White Card draft",
        files: [file],
      });
      return;
    } catch (e) {
      // User cancelled — silent
      if ((e as DOMException)?.name === "AbortError") return;
      // Other failure — fall through to download
    }
  }

  // Desktop fallback: download the PDF
  downloadBlob(pdfBlob, filename);
}
