export type Locale = "zh" | "sr" | "en";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "sr", label: "Srpski" },
  { code: "en", label: "English" },
];

export type MessageKey =
  | "appTitle"
  | "appSubtitle"
  | "sectionPersonal"
  | "sectionTravelDoc"
  | "sectionEntry"
  | "sectionAddress"
  | "sectionHost"
  | "sectionStay"
  | "fieldSurname"
  | "fieldGivenName"
  | "fieldDateOfBirth"
  | "fieldSex"
  | "sexMale"
  | "sexFemale"
  | "fieldPlaceOfBirth"
  | "fieldNationality"
  | "fieldPassportNumber"
  | "fieldVisaInfo"
  | "fieldEntryDate"
  | "fieldEntryCrossing"
  | "entryCrossingOther"
  | "fieldCity"
  | "fieldPostalCode"
  | "fieldStreet"
  | "postalHint"
  | "fieldHostType"
  | "hostIndividualSr"
  | "hostIndividualForeign"
  | "hostCompany"
  | "fieldHostName"
  | "fieldHostJmbg"
  | "fieldHostDob"
  | "fieldHostPib"
  | "fieldRegistrationDate"
  | "fieldNote"
  | "btnPrint"
  | "btnDownloadPdf"
  | "btnSave"
  | "btnClear"
  | "btnLoadDemo"
  | "btnExportImage"
  | "btnLogin"
  | "btnLogout"
  | "btnConfirmClear"
  | "btnCancel"
  | "btnEmail"
  | "emailSubject"
  | "legalTitle"
  | "legalLaw"
  | "legalStayLimit"
  | "legalRegDeadline"
  | "legalChannels"
  | "legalForms"
  | "legalFine"
  | "legalOfficial"
  | "previewTitle"
  | "warningTitle"
  | "warningBody"
  | "loginRequired"
  | "loginExplain"
  | "ctaTitle"
  | "ctaBody"
  | "ctaButton"
  | "footerMaintained"
  | "footerNotOfficial"
  | "footerDisclaimerLink"
  | "savedMoment"
  | "savedTtl"
  | "watermark"
  | "validateJmbg"
  | "validatePib"
  | "validateRequired"
  | "nearestCityLabel"
  | "viewOnMap"
  | "groupAirport"
  | "groupHU"
  | "groupHR"
  | "groupBA"
  | "groupRO"
  | "groupBG"
  | "groupMK"
  | "groupME"
  | "popularCrossings";

type MessageMap = Record<MessageKey, string>;

const zh: MessageMap = {
  appTitle: "白卡填写助手 (塞尔维亚)",
  appSubtitle: "Foreigner Residence Registration Helper",
  sectionPersonal: "个人信息",
  sectionTravelDoc: "证件 / 签证",
  sectionEntry: "入境信息",
  sectionAddress: "在塞地址",
  sectionHost: "房东 / 接待方",
  sectionStay: "登记信息",
  fieldSurname: "姓 (Презиме / Surname)",
  fieldGivenName: "名 (Име / Name)",
  fieldDateOfBirth: "出生日期",
  fieldSex: "性别",
  sexMale: "男 / M",
  sexFemale: "女 / F",
  fieldPlaceOfBirth: "出生地与出生国 (例: BEIJING, KINA)",
  fieldNationality: "国籍 (例: KINA)",
  fieldPassportNumber: "护照号",
  fieldVisaInfo: "签证类型与号码 (中国免签可空)",
  fieldEntryDate: "入境日期",
  fieldEntryCrossing: "入境口岸",
  entryCrossingOther: "其他 (手动输入)",
  fieldCity: "城市 / 市辖区 (Општина)",
  fieldPostalCode: "邮编",
  fieldStreet: "街道 + 门牌号",
  postalHint: "已识别区域",
  fieldHostType: "房东类型",
  hostIndividualSr: "塞籍个人 (JMBG)",
  hostIndividualForeign: "外籍个人 (出生日期)",
  hostCompany: "公司 / 法人 (PIB)",
  fieldHostName: "房东姓名 / 公司名",
  fieldHostJmbg: "房东 JMBG (13 位身份号)",
  fieldHostDob: "房东出生日期 (无 JMBG 时填这个)",
  fieldHostPib: "公司 PIB (9 位税号)",
  fieldRegistrationDate: "登记日期 (Датум пријаве)",
  fieldNote: "备注 (可空)",
  btnPrint: "打印",
  btnDownloadPdf: "下载 PDF",
  btnSave: "保存到本机",
  btnClear: "清空表单",
  btnLoadDemo: "填入示例数据",
  btnExportImage: "导出为图片",
  btnLogin: "模拟登录",
  btnLogout: "退出登录",
  btnConfirmClear: "确认清空",
  btnCancel: "取消",
  btnEmail: "发到邮箱 / 分享",
  emailSubject: "白卡填写数据 (Obrazac 1)",
  legalTitle: "📖 法规依据 / Legal Basis",
  legalLaw: "《外国人法》(Sl. glasnik RS 24/2018, 31/2019, 62/2023)",
  legalStayLimit: "短期居留：180 天内最多停留 90 天（含入境当日）",
  legalRegDeadline: "登记义务：抵达塞尔维亚 24 小时内必须登记居住地址",
  legalChannels: "登记渠道：当地警察局 / 地区外国人事务部 / eUprava 在线系统",
  legalForms: "Obrazac 1 = 短期住址登记（本工具适用）；Obrazac 2 = 临时变更；Obrazac 3 = 永久变更",
  legalFine: "未登记罚款：5,000–10,000 RSD",
  legalOfficial: "MUP 官方说明 ↗",
  previewTitle: "预览 (打印效果)",
  warningTitle: "重要提醒",
  warningBody:
    "该工具仅用于填写辅助，不代表已完成白卡登记，请务必通过酒店或房东向警方 (МУП) 登记。",
  loginRequired: "需要登录才能下载 PDF",
  loginExplain: "演示用 mock 登录 — 未来接入真实账户系统",
  ctaTitle: "需要协助登记？",
  ctaBody: "AdriaMart 团队为在塞华人社区提供免费白卡填写支持。",
  ctaButton: "联系我们",
  footerMaintained: "由 AdriaMart 团队为社区维护 · 完全免费",
  footerNotOfficial: "本工具不是官方文件，不替代向 MUP 的正式登记",
  footerDisclaimerLink: "查看完整免责声明",
  savedMoment: "已保存 (本机仅存 30 分钟)",
  savedTtl: "本地保存 30 分钟后自动清除",
  watermark: "ОВО НИЈЕ ЗВАНИЧНИ ДОКУМЕНТ · NOT OFFICIAL DOCUMENT",
  validateJmbg: "JMBG 应为 13 位数字",
  validatePib: "PIB 应为 9 位数字",
  validateRequired: "必填",
  nearestCityLabel: "邻近城市",
  viewOnMap: "在 Google Maps 查看位置",
  groupAirport: "✈ 国际机场",
  groupHU: "🇭🇺 匈牙利方向",
  groupHR: "🇭🇷 克罗地亚方向",
  groupBA: "🇧🇦 波黑方向",
  groupRO: "🇷🇴 罗马尼亚方向",
  groupBG: "🇧🇬 保加利亚方向",
  groupMK: "🇲🇰 北马其顿方向",
  groupME: "🇲🇪 黑山方向",
  popularCrossings: "★ 常用",
};

const sr: MessageMap = {
  appTitle: "Pomoćnik za prijavu boravišta stranca",
  appSubtitle: "White Card Assistant (Srbija)",
  sectionPersonal: "Lični podaci",
  sectionTravelDoc: "Putna isprava / viza",
  sectionEntry: "Ulazak u Srbiju",
  sectionAddress: "Adresa boravišta u Srbiji",
  sectionHost: "Stanodavac / domaćin",
  sectionStay: "Podaci o prijavi",
  fieldSurname: "Prezime",
  fieldGivenName: "Ime",
  fieldDateOfBirth: "Datum rođenja",
  fieldSex: "Pol",
  sexMale: "M",
  sexFemale: "Ž",
  fieldPlaceOfBirth: "Mesto i država rođenja (npr. BEIJING, KINA)",
  fieldNationality: "Državljanstvo (npr. KINA)",
  fieldPassportNumber: "Broj pasoša",
  fieldVisaInfo: "Vrsta i broj vize (može biti prazno)",
  fieldEntryDate: "Datum ulaska",
  fieldEntryCrossing: "Granični prelaz",
  entryCrossingOther: "Drugo (ručni unos)",
  fieldCity: "Opština",
  fieldPostalCode: "Poštanski broj",
  fieldStreet: "Ulica i broj",
  postalHint: "Prepoznata opština",
  fieldHostType: "Tip stanodavca",
  hostIndividualSr: "Domaće lice (JMBG)",
  hostIndividualForeign: "Strano lice (datum rođ.)",
  hostCompany: "Pravno lice (PIB)",
  fieldHostName: "Ime / naziv firme",
  fieldHostJmbg: "JMBG (13 cifara)",
  fieldHostDob: "Datum rođenja stanodavca (kada nema JMBG)",
  fieldHostPib: "PIB (9 cifara)",
  fieldRegistrationDate: "Datum prijave",
  fieldNote: "Napomena",
  btnPrint: "Štampaj",
  btnDownloadPdf: "Preuzmi PDF",
  btnSave: "Sačuvaj lokalno",
  btnClear: "Obriši formu",
  btnLoadDemo: "Učitaj primer",
  btnExportImage: "Izvezi kao sliku",
  btnLogin: "Prijava (demo)",
  btnLogout: "Odjava",
  btnConfirmClear: "Potvrdi brisanje",
  btnCancel: "Otkaži",
  btnEmail: "Pošalji / Podeli",
  emailSubject: "Podaci za prijavu boravišta (Obrazac 1)",
  legalTitle: "📖 Pravni osnov",
  legalLaw: "Zakon o strancima (Sl. glasnik RS 24/2018, 31/2019, 62/2023)",
  legalStayLimit: "Kratkoročni boravak: do 90 dana u periodu od 180 dana",
  legalRegDeadline: "Obaveza prijave: u roku od 24 sata od ulaska u Srbiju",
  legalChannels: "Kanali: lokalna policijska uprava / Odsek za strance / portal eUprava",
  legalForms: "Obrazac 1 = prijava boravišta (predmet ovog alata); Obrazac 2 = privremena promena; Obrazac 3 = trajna promena adrese",
  legalFine: "Kazna za neprijavljivanje: 5.000–10.000 RSD",
  legalOfficial: "Zvanične informacije MUP-a ↗",
  previewTitle: "Pregled (kako će biti štampano)",
  warningTitle: "Važno",
  warningBody:
    "Ovaj alat služi samo za pomoć pri popunjavanju. Obavezna je prijava boravka kod MUP-a.",
  loginRequired: "Potrebna je prijava za PDF",
  loginExplain: "Demo prijava — kasnije će biti pravi nalog",
  ctaTitle: "Potrebna pomoć oko prijave?",
  ctaBody: "AdriaMart tim besplatno pomaže oko popunjavanja prijave boravišta.",
  ctaButton: "Kontaktirajte nas",
  footerMaintained: "Održava AdriaMart tim za zajednicu · Besplatno",
  footerNotOfficial: "Ovo nije zvanični dokument i ne zamenjuje prijavu kod MUP-a",
  footerDisclaimerLink: "Potpuna izjava o odricanju",
  savedMoment: "Sačuvano (samo 30 min lokalno)",
  savedTtl: "Lokalna kopija se briše posle 30 minuta",
  watermark: "ОВО НИЈЕ ЗВАНИЧНИ ДОКУМЕНТ · NOT OFFICIAL DOCUMENT",
  validateJmbg: "JMBG mora imati 13 cifara",
  validatePib: "PIB mora imati 9 cifara",
  validateRequired: "Obavezno",
  nearestCityLabel: "Najbliži grad",
  viewOnMap: "Pogledaj na Google mapama",
  groupAirport: "✈ Aerodromi",
  groupHU: "🇭🇺 Mađarska",
  groupHR: "🇭🇷 Hrvatska",
  groupBA: "🇧🇦 BiH",
  groupRO: "🇷🇴 Rumunija",
  groupBG: "🇧🇬 Bugarska",
  groupMK: "🇲🇰 Sev. Makedonija",
  groupME: "🇲🇪 Crna Gora",
  popularCrossings: "★ Najčešći",
};

const en: MessageMap = {
  appTitle: "White Card Assistant (Serbia)",
  appSubtitle: "Foreigner Residence Registration Helper",
  sectionPersonal: "Personal Info",
  sectionTravelDoc: "Travel Document / Visa",
  sectionEntry: "Entry into Serbia",
  sectionAddress: "Address in Serbia",
  sectionHost: "Landlord / Host",
  sectionStay: "Registration Info",
  fieldSurname: "Surname",
  fieldGivenName: "Name (Given)",
  fieldDateOfBirth: "Date of Birth",
  fieldSex: "Sex",
  sexMale: "M",
  sexFemale: "F",
  fieldPlaceOfBirth: "Place and Country of Birth (e.g. BEIJING, KINA)",
  fieldNationality: "Nationality (e.g. KINA)",
  fieldPassportNumber: "Passport Number",
  fieldVisaInfo: "Visa Type & Number (may be blank)",
  fieldEntryDate: "Date of Entry",
  fieldEntryCrossing: "Border Crossing",
  entryCrossingOther: "Other (manual entry)",
  fieldCity: "Municipality (Opština)",
  fieldPostalCode: "Postal Code",
  fieldStreet: "Street + Number",
  postalHint: "Detected municipality",
  fieldHostType: "Host Type",
  hostIndividualSr: "Serbian (JMBG)",
  hostIndividualForeign: "Foreign (DOB)",
  hostCompany: "Company (PIB)",
  fieldHostName: "Host Name / Company Name",
  fieldHostJmbg: "Host JMBG (13 digits)",
  fieldHostDob: "Host Date of Birth (when no JMBG)",
  fieldHostPib: "Company PIB (9 digits)",
  fieldRegistrationDate: "Date of Registration",
  fieldNote: "Note",
  btnPrint: "Print",
  btnDownloadPdf: "Download PDF",
  btnSave: "Save Locally",
  btnClear: "Clear Form",
  btnLoadDemo: "Load Demo Data",
  btnExportImage: "Export as Image",
  btnLogin: "Login (mock)",
  btnLogout: "Logout",
  btnConfirmClear: "Confirm Clear",
  btnCancel: "Cancel",
  btnEmail: "Email / Share",
  emailSubject: "White Card Data (Obrazac 1)",
  legalTitle: "📖 Legal Basis",
  legalLaw: "Law on Foreign Nationals (Sl. glasnik RS 24/2018, 31/2019, 62/2023)",
  legalStayLimit: "Short-term stay: max 90 days within any 180-day period",
  legalRegDeadline: "Registration: required within 24 hours of arrival in Serbia",
  legalChannels: "Channels: local police station / Foreigner Affairs Department / eUprava online portal",
  legalForms: "Form 1 = residence registration (this tool); Form 2 = temporary address change; Form 3 = permanent address change",
  legalFine: "Fine for non-registration: RSD 5,000–10,000",
  legalOfficial: "Official MUP information ↗",
  previewTitle: "Preview (Print Layout)",
  warningTitle: "Important",
  warningBody:
    "This tool is for assistance only and does not replace official registration with the Ministry of Interior of Serbia.",
  loginRequired: "Login required to download PDF",
  loginExplain: "Mock login for demo — real auth coming later",
  ctaTitle: "Need help registering?",
  ctaBody: "AdriaMart team helps the Chinese-speaking community in Serbia with white card filing for free.",
  ctaButton: "Contact us",
  footerMaintained: "Maintained by AdriaMart team for the community · Free",
  footerNotOfficial: "This is not an official document and does not replace MUP registration",
  footerDisclaimerLink: "Full disclaimer",
  savedMoment: "Saved (local only, 30 min)",
  savedTtl: "Local copy auto-cleared after 30 minutes",
  watermark: "ОВО НИЈЕ ЗВАНИЧНИ ДОКУМЕНТ · NOT OFFICIAL DOCUMENT",
  validateJmbg: "JMBG must be 13 digits",
  validatePib: "PIB must be 9 digits",
  validateRequired: "Required",
  nearestCityLabel: "Nearest city",
  viewOnMap: "View on Google Maps",
  groupAirport: "✈ Airports",
  groupHU: "🇭🇺 Hungary",
  groupHR: "🇭🇷 Croatia",
  groupBA: "🇧🇦 Bosnia & Herzegovina",
  groupRO: "🇷🇴 Romania",
  groupBG: "🇧🇬 Bulgaria",
  groupMK: "🇲🇰 North Macedonia",
  groupME: "🇲🇪 Montenegro",
  popularCrossings: "★ Popular",
};

export const messages: Record<Locale, MessageMap> = { zh, sr, en };

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}
