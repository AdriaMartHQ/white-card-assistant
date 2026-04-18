"use client";

import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

interface GlossaryRow {
  cyr: string;
  en: string;
  zh: string;
  ex: string;
}

const ROWS: GlossaryRow[] = [
  { cyr: "Презиме", en: "Surname", zh: "姓氏（不是名字）", ex: "ZHANG" },
  { cyr: "Име", en: "Name", zh: "名字", ex: "SAN" },
  { cyr: "Датум рођења", en: "Date of birth", zh: "出生日期", ex: "15.06.1990." },
  { cyr: "Пол", en: "Sex", zh: "性别 (M=男, F=女)", ex: "M" },
  {
    cyr: "Место и држава рођења",
    en: "Place and country of birth",
    zh: "出生地 + 出生国",
    ex: "BEIJING, KINA",
  },
  { cyr: "Држављанство", en: "Nationality", zh: "国籍（塞文）", ex: "KINA" },
  {
    cyr: "Врста и број путне или друге исправе о идентитету",
    en: "Type and number of travel document or other ID",
    zh: "护照类型 + 号码",
    ex: "PASOŠ AB1234567",
  },
  {
    cyr: "Врста и број визе и место издавања",
    en: "Type and number of visa and place of issuance",
    zh: "签证类型+号码+签发地（中国免签可空）",
    ex: "—",
  },
  {
    cyr: "Датум и место уласка у Републику Србију",
    en: "Date and place of entry into the Republic of Serbia",
    zh: "入境日期, 入境口岸名",
    ex: "15.04.2026., TRBUŠNICA",
  },
  {
    cyr: "Адреса боравишта у Републици Србији",
    en: "Address of place of stay in the Republic of Serbia",
    zh: "在塞住址（市辖区 + 街道 + 门牌）",
    ex: "PRIMER ULICA 1, NOVI BEOGRAD",
  },
  {
    cyr: "Податак о станодавцу (име и ЈМБГ / PIB)",
    en: "Landlord info (name + JMBG / PIB)",
    zh: "房东信息（按类型填，见下方速查）",
    ex: "LI SI, 01.01.1970.",
  },
  {
    cyr: "Датум пријаве",
    en: "Date of registration",
    zh: "登记日期（去 MUP 那天）",
    ex: "16.04.2026.",
  },
  { cyr: "Напомена", en: "Note", zh: "备注（可空）", ex: "—" },
  {
    cyr: "Потпис подносиоца пријаве",
    en: "Signature of the person who registers",
    zh: "登记人签字（通常是房东；独自办理时是本人）— 用笔亲笔签",
    ex: "[亲笔签名]",
  },
  {
    cyr: "(потпис овлашћеног лица)",
    en: "Signature of the authorized person + MUP stamp",
    zh: "MUP 警察签字 + 警局圆章 — 你不填，交窗口时警官当场办理",
    ex: "[警察现场盖章]",
  },
];

const TIPS: { title: string; body: string }[] = [
  { title: "🇷🇸 国名用塞文", body: "中国 = KINA（不是 CHINA）；其他国家也用塞语写法" },
  { title: "📅 日期格式", body: "DD.MM.YYYY. — 带末尾点号，例如 15.04.2026." },
  { title: "📍 地址全大写", body: "街道 + 门牌 + 市辖区，逗号分隔，全大写拉丁字母" },
  {
    title: "👤 房东信息看类型",
    body: "塞籍房东 → JMBG（13 位身份号）｜外籍房东 → 出生日期 DD.MM.YYYY｜公司/法人 → PIB（9 位税号）",
  },
  {
    title: "✈ 入境口岸",
    body: "写边境检查站名称（如 TRBUŠNICA / HORGOŠ / AERODROM BEOGRAD），不是城市名",
  },
  {
    title: "✍ 最后两行",
    body: "倒数第二行是登记人签字（自己亲笔签）；最底下的警察签章位留空，交窗口时 MUP 警官当场盖章 + 签字",
  },
];

export function Glossary({ locale }: Props) {
  // Glossary is Chinese-targeted help; only render in zh locale.
  if (locale !== "zh") return null;

  return (
    <details className="group rounded-md border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm print:hidden">
      <summary className="cursor-pointer select-none list-none font-medium text-slate-700 marker:hidden">
        <span className="inline-block transition-transform group-open:rotate-90">▸</span>{" "}
        📋 字段对照表 / Field Glossary
      </summary>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-300 text-left text-slate-600">
              <th className="px-2 py-1.5 font-semibold">Cyrillic 字段</th>
              <th className="px-2 py-1.5 font-semibold">English</th>
              <th className="px-2 py-1.5 font-semibold">中文说明</th>
              <th className="px-2 py-1.5 font-semibold">示例</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.cyr} className="border-b border-slate-100 align-top">
                <td className="px-2 py-1.5 text-slate-800">{r.cyr}</td>
                <td className="px-2 py-1.5 italic text-slate-600">{r.en}</td>
                <td className="px-2 py-1.5 text-slate-900">{r.zh}</td>
                <td className="px-2 py-1.5 font-mono text-[11px] text-slate-700">
                  {r.ex}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 px-3 py-2.5 text-xs">
        <div className="mb-1.5 font-semibold text-amber-900">🔔 填写要点</div>
        <ul className="space-y-1 text-amber-900">
          {TIPS.map((t) => (
            <li key={t.title} className="leading-relaxed">
              <span className="font-medium">{t.title}：</span>
              <span className="text-amber-800">{t.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
