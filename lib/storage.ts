// Local persistence with a 30-min TTL — passport + JMBG are sensitive
// PII; we don't want them sitting in localStorage forever on a shared
// machine. Manual save only, no auto-save.

import type { WhiteCardData } from "./types";

// Bumped to v2 when host schema split JMBG into JMBG/DOB/PIB three-way.
const KEY = "wca-form-v2";
const TTL_MS = 30 * 60 * 1000;

interface StoredEnvelope {
  data: WhiteCardData;
  ts: number;
}

export function saveForm(data: WhiteCardData): void {
  if (typeof window === "undefined") return;
  const env: StoredEnvelope = { data, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(env));
  } catch {
    // quota or privacy mode — ignore
  }
}

export function loadForm(): WhiteCardData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const env = JSON.parse(raw) as StoredEnvelope;
    if (Date.now() - env.ts > TTL_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return env.data;
  } catch {
    return null;
  }
}

export function clearForm(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

const LOCALE_KEY = "wca-locale";
export function getStoredLocale(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOCALE_KEY);
}
export function setStoredLocale(locale: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_KEY, locale);
}
