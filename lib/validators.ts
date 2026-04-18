// Lightweight validators. Strict checksums kept simple; the goal is to
// catch obvious wrong digit counts, not to gate submission.

export function isJmbgFormat(value: string): boolean {
  return /^\d{13}$/.test(value.trim());
}

export function isPibFormat(value: string): boolean {
  return /^\d{9}$/.test(value.trim());
}

// Strict JMBG checksum (Serbian national ID).
// Algorithm: weights 7,6,5,4,3,2,7,6,5,4,3,2 over first 12 digits;
// check = 11 - (sum mod 11); if check is 10 or 11 → invalid.
export function isJmbgValid(value: string): boolean {
  const v = value.trim();
  if (!isJmbgFormat(v)) return false;
  const w = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(v[i], 10) * w[i];
  let check = 11 - (sum % 11);
  if (check === 11) check = 0;
  if (check === 10) return false;
  return check === parseInt(v[12], 10);
}

// PIB has a mod-11 checksum but variants exist; for MVP we only check
// the digit-count format.
export function isPibValid(value: string): boolean {
  return isPibFormat(value);
}

export function normalizePassport(value: string): string {
  return value.toUpperCase().replace(/\s+/g, "");
}
