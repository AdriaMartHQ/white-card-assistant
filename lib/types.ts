export type Sex = "M" | "F" | "";
// individual_sr   = Serbian citizen / EBS holder → has JMBG
// individual_foreign = foreign individual (no JMBG) → uses DOB instead
// company        = legal entity → has PIB
export type HostType = "individual_sr" | "individual_foreign" | "company" | "";

export interface WhiteCardData {
  surname: string;
  givenName: string;
  dateOfBirth: string; // ISO YYYY-MM-DD
  sex: Sex;
  placeOfBirth: string;
  nationality: string;

  passportNumber: string;
  visaInfo: string;

  entryDate: string; // ISO
  entryCrossingId: string; // border-crossings.ts id, or "other"
  entryCrossingOther: string; // free text when id === "other"

  city: string;
  postalCode: string;
  street: string;

  hostType: HostType;
  hostName: string;
  hostJmbg: string; // when hostType === "individual_sr"
  hostDob: string; // ISO YYYY-MM-DD; when hostType === "individual_foreign"
  hostPib: string; // when hostType === "company"

  registrationDate: string; // ISO
  note: string;
}

export const EMPTY_FORM: WhiteCardData = {
  surname: "",
  givenName: "",
  dateOfBirth: "",
  sex: "",
  placeOfBirth: "",
  nationality: "",
  passportNumber: "",
  visaInfo: "",
  entryDate: "",
  entryCrossingId: "",
  entryCrossingOther: "",
  city: "",
  postalCode: "",
  street: "",
  hostType: "",
  hostName: "",
  hostJmbg: "",
  hostDob: "",
  hostPib: "",
  registrationDate: "",
  note: "",
};

// Anonymous placeholder data — ZHANG SAN / LI SI are Chinese-equivalent
// "John Doe" names; passport, address and dates are obvious placeholders.
export const DEMO_FORM: WhiteCardData = {
  surname: "ZHANG",
  givenName: "SAN",
  dateOfBirth: "1990-06-15",
  sex: "M",
  placeOfBirth: "BEIJING, KINA",
  nationality: "KINA",
  passportNumber: "AB1234567",
  visaInfo: "",
  entryDate: "2026-04-15",
  entryCrossingId: "trbusnica",
  entryCrossingOther: "",
  city: "Novi Beograd",
  postalCode: "11070",
  street: "PRIMER ULICA 1",
  hostType: "individual_foreign",
  hostName: "LI SI",
  hostJmbg: "",
  hostDob: "1970-01-01",
  hostPib: "",
  registrationDate: "2026-04-16",
  note: "",
};
