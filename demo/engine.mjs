import { PASSAGES, TOPIC_LABELS } from "./data.mjs";

export function normalizeArabic(value) {
  return String(value).normalize("NFKC").replace(/[\u064B-\u065F\u0670]/gu, "")
    .replace(/[أإآٱ]/gu, "ا").replace(/ى/gu, "ي").replace(/ة/gu, "ه")
    .replace(/[ـ]/gu, "").trim().toLowerCase();
}

const INTENTS = [
  ["citation", /توثيق|اوثق|معرف|احاله|مرجع|المرجع/],
  ["quotation", /اقتباس|الاقتباس|انقل|نقله|سياق|حرفيا/],
  ["disagreement", /اختلاف|الاقوال|اتفاق|خلاف/],
  ["limits", /حدود|نقص|غياب|لا اجد|لم اجد|معلومات غير كافيه/],
  ["external", /طبعه|غير موجود|فتوي|حكم|شخصي|حديث|ايه|القران|علاج|دواء|سعر|سياسه/]
];

export function detectTopics(question) {
  const text = normalizeArabic(question);
  const topics = INTENTS.filter(([, pattern]) => pattern.test(text)).map(([topic]) => topic);
  return topics.length ? topics : ["external"];
}

// Both the UI and the optional provider adapter use this gate. Unknown IDs
// never become evidence, even when proposed by a model or supplied by a caller.
export function resolveCitations(ids, allowedPassages = PASSAGES) {
  const allowed = new Map(allowedPassages.map((passage) => [passage.id, passage]));
  const accepted = [];
  const rejected = [];
  for (const id of new Set(ids)) {
    if (typeof id === "string" && allowed.has(id)) accepted.push(allowed.get(id));
    else rejected.push(id);
  }
  return { accepted, rejected };
}

export function evaluateQuestion(question) {
  const value = String(question ?? "").trim();
  if (!value) throw new Error("اكتب سؤالًا أولًا.");
  if (value.length > 600) throw new Error("اكتب سؤالًا من ٦٠٠ حرف أو أقل.");
  const topics = detectTopics(value);
  const ranked = PASSAGES.map((passage) => ({
    ...passage,
    score: topics.includes(passage.topic) ? 3 : 0,
    reason: topics.includes(passage.topic) ? "تطابق مع قاعدة الموضوع التعليمية" : "لا يغطي موضوع السؤال"
  })).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const selected = ranked.filter((passage) => passage.score >= 2);
  const evidence = resolveCitations(selected.map((passage) => passage.id)).accepted;
  const covered = topics.filter((topic) => evidence.some((passage) => passage.topic === topic));
  const missing = topics.filter((topic) => !covered.includes(topic));
  const status = !evidence.length ? "abstain" : missing.length ? "partial" : "supported";
  return {
    question: value, mode: "deterministic-educational", status, topics, ranked, evidence,
    covered, missing, coverage: covered.length / topics.length,
    // The public demo is extractive. It does not generate factual claims.
    claims: evidence.map((passage) => ({ text: passage.text, citationIds: [passage.id] })),
    message: status === "abstain"
      ? "لا تتضمن النصوص التعليمية المتاحة جوابًا عن هذا السؤال. لن ننشئ إجابة بلا دليل. أضف مصدرًا مناسبًا، أو ارجع إلى مختص إذا تعلق الأمر بحالة شخصية."
      : status === "partial"
        ? "تغطي النصوص جزءًا من السؤال فقط. نعرض ما تدعمه المجموعة ونترك الجزء غير المغطى دون إجابة."
        : "تغطي النصوص التعليمية الموضوعات التي تعرّفت إليها القواعد. الإجابة أدناه مقتطفات من هذه النصوص فقط.",
    topicLabels: topics.map((topic) => TOPIC_LABELS[topic])
  };
}

export function auditClaim(claim, allowedPassages = PASSAGES) {
  const resolved = resolveCitations(claim.citationIds ?? [], allowedPassages);
  return {
    ...resolved,
    publishable: resolved.rejected.length === 0 && resolved.accepted.length > 0,
    note: "فحص المعرّفات لا يثبت صحة المعنى أو سلامة الاستدلال."
  };
}
