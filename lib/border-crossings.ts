export type CrossingType = "air" | "road" | "rail" | "river";
export type Neighbor = "AIR" | "BA" | "HR" | "HU" | "RO" | "BG" | "MK" | "ME";

export interface BorderCrossing {
  id: string;
  nameLatin: string;
  nameUpper: string;
  neighbor: Neighbor;
  type: CrossingType;
  popular?: boolean;
  /** Nearest Serbian town/city (Latin spelling) — to orient newcomers. */
  nearestCity?: string;
  /** Best-effort Chinese transliteration of the nearest city. */
  nearestCityCn?: string;
}

export const BORDER_CROSSINGS: BorderCrossing[] = [
  { id: "beg", nameLatin: "Aerodrom Nikola Tesla (Beograd)", nameUpper: "AERODROM BEOGRAD",
    neighbor: "AIR", type: "air", popular: true,
    nearestCity: "Beograd", nearestCityCn: "贝尔格莱德" },
  { id: "ini", nameLatin: "Aerodrom Konstantin Veliki (Niš)", nameUpper: "AERODROM NIŠ",
    neighbor: "AIR", type: "air",
    nearestCity: "Niš", nearestCityCn: "尼什" },
  { id: "kvo", nameLatin: "Aerodrom Morava (Kraljevo)", nameUpper: "AERODROM KRALJEVO",
    neighbor: "AIR", type: "air",
    nearestCity: "Kraljevo", nearestCityCn: "克拉列沃" },

  { id: "horgos", nameLatin: "Horgoš", nameUpper: "HORGOŠ",
    neighbor: "HU", type: "road", popular: true,
    nearestCity: "Subotica", nearestCityCn: "苏博蒂察" },
  { id: "kelebija", nameLatin: "Kelebija", nameUpper: "KELEBIJA",
    neighbor: "HU", type: "road",
    nearestCity: "Subotica", nearestCityCn: "苏博蒂察" },
  { id: "backi-breg", nameLatin: "Bački Breg", nameUpper: "BAČKI BREG",
    neighbor: "HU", type: "road",
    nearestCity: "Sombor", nearestCityCn: "松博尔" },
  { id: "djala", nameLatin: "Đala", nameUpper: "ĐALA",
    neighbor: "HU", type: "road",
    nearestCity: "Kanjiža", nearestCityCn: "卡尼扎" },
  { id: "subotica-rail", nameLatin: "Subotica (železnica)", nameUpper: "SUBOTICA",
    neighbor: "HU", type: "rail",
    nearestCity: "Subotica", nearestCityCn: "苏博蒂察" },

  { id: "batrovci", nameLatin: "Batrovci", nameUpper: "BATROVCI",
    neighbor: "HR", type: "road", popular: true,
    nearestCity: "Šid", nearestCityCn: "希德" },
  { id: "bezdan", nameLatin: "Bezdan", nameUpper: "BEZDAN",
    neighbor: "HR", type: "road",
    nearestCity: "Sombor", nearestCityCn: "松博尔" },
  { id: "bogojevo", nameLatin: "Bogojevo", nameUpper: "BOGOJEVO",
    neighbor: "HR", type: "road",
    nearestCity: "Sombor", nearestCityCn: "松博尔" },
  { id: "backa-palanka", nameLatin: "Bačka Palanka", nameUpper: "BAČKA PALANKA",
    neighbor: "HR", type: "road",
    nearestCity: "Bačka Palanka", nearestCityCn: "巴奇卡帕兰卡" },
  { id: "nestin", nameLatin: "Neštin", nameUpper: "NEŠTIN",
    neighbor: "HR", type: "road",
    nearestCity: "Beočin" },
  { id: "ljuba", nameLatin: "Ljuba", nameUpper: "LJUBA",
    neighbor: "HR", type: "road",
    nearestCity: "Šid", nearestCityCn: "希德" },
  { id: "sid-rail", nameLatin: "Šid (železnica)", nameUpper: "ŠID",
    neighbor: "HR", type: "rail",
    nearestCity: "Šid", nearestCityCn: "希德" },

  { id: "trbusnica", nameLatin: "Trbušnica", nameUpper: "TRBUŠNICA",
    neighbor: "BA", type: "road", popular: true,
    nearestCity: "Loznica", nearestCityCn: "洛兹尼察" },
  { id: "sremska-raca", nameLatin: "Sremska Rača", nameUpper: "SREMSKA RAČA",
    neighbor: "BA", type: "road", popular: true,
    nearestCity: "Sremska Mitrovica", nearestCityCn: "斯雷姆斯卡·米特罗维察" },
  { id: "kotroman", nameLatin: "Kotroman", nameUpper: "KOTROMAN",
    neighbor: "BA", type: "road",
    nearestCity: "Užice", nearestCityCn: "乌日策" },
  { id: "mali-zvornik", nameLatin: "Mali Zvornik", nameUpper: "MALI ZVORNIK",
    neighbor: "BA", type: "road",
    nearestCity: "Mali Zvornik" },
  { id: "ljubovija", nameLatin: "Ljubovija / Bratunac", nameUpper: "LJUBOVIJA",
    neighbor: "BA", type: "road",
    nearestCity: "Ljubovija" },
  { id: "bajina-basta", nameLatin: "Bajina Bašta", nameUpper: "BAJINA BAŠTA",
    neighbor: "BA", type: "road",
    nearestCity: "Bajina Bašta" },
  { id: "uvac", nameLatin: "Uvac (Priboj)", nameUpper: "UVAC",
    neighbor: "BA", type: "road",
    nearestCity: "Priboj" },
  { id: "mokra-gora", nameLatin: "Mokra Gora / Vardište", nameUpper: "MOKRA GORA",
    neighbor: "BA", type: "road",
    nearestCity: "Užice", nearestCityCn: "乌日策" },
  { id: "badovinci", nameLatin: "Badovinci", nameUpper: "BADOVINCI",
    neighbor: "BA", type: "road",
    nearestCity: "Šabac", nearestCityCn: "沙巴茨" },
  { id: "karakaj-rail", nameLatin: "Karakaj (železnica)", nameUpper: "KARAKAJ",
    neighbor: "BA", type: "rail",
    nearestCity: "Mali Zvornik" },

  { id: "vatin", nameLatin: "Vatin", nameUpper: "VATIN",
    neighbor: "RO", type: "road", popular: true,
    nearestCity: "Vršac", nearestCityCn: "弗尔沙茨" },
  { id: "kaludjerovo", nameLatin: "Kaluđerovo", nameUpper: "KALUĐEROVO",
    neighbor: "RO", type: "road",
    nearestCity: "Bela Crkva" },
  { id: "srpska-crnja", nameLatin: "Srpska Crnja", nameUpper: "SRPSKA CRNJA",
    neighbor: "RO", type: "road",
    nearestCity: "Kikinda", nearestCityCn: "基金达" },
  { id: "djerdap-1", nameLatin: "Đerdap I", nameUpper: "ĐERDAP I",
    neighbor: "RO", type: "river",
    nearestCity: "Kladovo" },
  { id: "djerdap-2", nameLatin: "Đerdap II", nameUpper: "ĐERDAP II",
    neighbor: "RO", type: "river",
    nearestCity: "Negotin" },
  { id: "mokranje", nameLatin: "Mokranje", nameUpper: "MOKRANJE",
    neighbor: "RO", type: "road",
    nearestCity: "Negotin" },

  { id: "gradina", nameLatin: "Gradina (Dimitrovgrad)", nameUpper: "GRADINA",
    neighbor: "BG", type: "road", popular: true,
    nearestCity: "Dimitrovgrad", nearestCityCn: "季米特洛夫格勒" },
  { id: "vrska-cuka", nameLatin: "Vrška Čuka", nameUpper: "VRŠKA ČUKA",
    neighbor: "BG", type: "road",
    nearestCity: "Zaječar" },
  { id: "ribarci", nameLatin: "Ribarci / Strezimirovci", nameUpper: "RIBARCI",
    neighbor: "BG", type: "road",
    nearestCity: "Pirot", nearestCityCn: "皮罗特" },
  { id: "dimitrovgrad-rail", nameLatin: "Dimitrovgrad (železnica)", nameUpper: "DIMITROVGRAD",
    neighbor: "BG", type: "rail",
    nearestCity: "Dimitrovgrad", nearestCityCn: "季米特洛夫格勒" },

  { id: "presevo", nameLatin: "Preševo", nameUpper: "PREŠEVO",
    neighbor: "MK", type: "road", popular: true,
    nearestCity: "Preševo" },
  { id: "prohor-pcinjski", nameLatin: "Prohor Pčinjski", nameUpper: "PROHOR PČINJSKI",
    neighbor: "MK", type: "road",
    nearestCity: "Bujanovac" },
  { id: "miratovac", nameLatin: "Miratovac", nameUpper: "MIRATOVAC",
    neighbor: "MK", type: "road",
    nearestCity: "Preševo" },

  { id: "mehov-krs", nameLatin: "Mehov Krš", nameUpper: "MEHOV KRŠ",
    neighbor: "ME", type: "road",
    nearestCity: "Tutin" },
  { id: "gostun", nameLatin: "Gostun", nameUpper: "GOSTUN",
    neighbor: "ME", type: "road",
    nearestCity: "Prijepolje" },
  { id: "jabuka", nameLatin: "Jabuka", nameUpper: "JABUKA",
    neighbor: "ME", type: "road",
    nearestCity: "Prijepolje" },
  { id: "dracenovac", nameLatin: "Dračenovac", nameUpper: "DRAČENOVAC",
    neighbor: "ME", type: "road",
    nearestCity: "Tutin" },
  { id: "vrbnica-rail", nameLatin: "Vrbnica (železnica)", nameUpper: "VRBNICA",
    neighbor: "ME", type: "rail",
    nearestCity: "Prijepolje" },
];

export function findCrossingById(id: string): BorderCrossing | undefined {
  return BORDER_CROSSINGS.find((c) => c.id === id);
}

/**
 * Build a Google Maps search URL pointing at the crossing.
 * Uses Maps' generic search-by-query (no API key needed; works on
 * desktop + mobile, opens the native map app where available).
 */
export function getMapUrl(c: BorderCrossing): string {
  let query: string;
  if (c.type === "air") {
    query = `${c.nameLatin} airport Serbia`;
  } else if (c.nearestCity) {
    query = `${c.nameLatin} granični prelaz ${c.nearestCity} Serbia`;
  } else {
    query = `${c.nameLatin} granični prelaz Serbia`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
