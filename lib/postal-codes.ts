// Serbian postal-code → opština/grad mapping.
// Covers the most-used postal areas; lookup returns null for unknown codes
// so the form falls back to whatever the user typed.
const MAP: Record<string, string> = {
  // Beograd opštine
  "11000": "Stari Grad, Beograd",
  "11050": "Zvezdara, Beograd",
  "11060": "Palilula, Beograd",
  "11070": "Novi Beograd",
  "11080": "Zemun, Beograd",
  "11090": "Rakovica, Beograd",
  "11160": "Voždovac, Beograd",
  "11210": "Krnjača / Borča, Beograd",
  "11271": "Surčin, Beograd",
  "11272": "Dobanovci, Beograd",
  "11300": "Smederevo",
  "11500": "Obrenovac",

  // Vojvodina
  "21000": "Novi Sad",
  "21100": "Novi Sad",
  "21101": "Novi Sad",
  "21102": "Novi Sad",
  "21205": "Sremski Karlovci",
  "22000": "Sremska Mitrovica",
  "22300": "Stara Pazova",
  "22310": "Šimanovci",
  "22400": "Ruma",
  "23000": "Zrenjanin",
  "24000": "Subotica",
  "25000": "Sombor",
  "26000": "Pančevo",

  // Centralna Srbija
  "31000": "Užice",
  "32000": "Čačak",
  "34000": "Kragujevac",
  "35000": "Jagodina",
  "36000": "Kraljevo",
  "37000": "Kruševac",

  // Jug
  "18000": "Niš",
  "16000": "Leskovac",
  "17000": "Vranje",
  "19000": "Zaječar",
};

export function lookupPostal(code: string): string | null {
  if (!code) return null;
  const trimmed = code.trim();
  return MAP[trimmed] ?? null;
}
