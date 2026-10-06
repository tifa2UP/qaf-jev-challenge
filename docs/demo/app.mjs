import { PASSAGES, EXAMPLES, TOPIC_LABELS } from "./data.mjs";
import { evaluateQuestion, auditClaim } from "./engine.mjs";

const byId = (id) => document.getElementById(id);
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const arabic = new Intl.NumberFormat("ar");

function evidenceCard(passage, prefix = "evidence") {
  return `<article class="evidence-card" tabindex="-1" id="${prefix}-${esc(passage.id)}"><header><span>${esc(passage.title)}</span><code dir="ltr">${esc(passage.id)}</code></header><p>${esc(passage.text)}</p><small>${esc(passage.label)} · الوحدة ${esc(passage.section)} · تأليف خاص بهذا العرض</small></article>`;
}

byId("examples").innerHTML = EXAMPLES.map((example, index) => `<button type="button" data-example="${index}">${esc(example.label)}</button>`).join("");
byId("library").innerHTML = PASSAGES.map((passage) => evidenceCard(passage, "library")).join("");

function render(result) {
  const names = { supported: "موضوعات مغطاة", partial: "تغطية جزئية", abstain: "امتناع عن الإجابة" };
  const claims = result.claims.map((claim) => {
    const audit = auditClaim(claim, result.evidence);
    if (!audit.publishable) return "";
    return `<p class="answer-claim">${esc(claim.text)} ${audit.accepted.map((passage) => `<button class="cite" type="button" data-citation="${esc(passage.id)}" aria-label="افتح النص ${esc(passage.id)}">${esc(passage.id)}</button>`).join(" ")}</p>`;
  }).join("");
  byId("results").innerHTML = `
    <div class="result-heading"><h2>مسار الدليل</h2><span class="badge ${result.status}">${names[result.status]}</span></div>
    <div class="result-grid"><article class="panel answer-panel"><div class="panel-head"><span class="step-number">02</span><h2>${result.status === "abstain" ? "عندما لا يكفي الدليل" : "ما تقوله النصوص"}</h2></div>
      <p class="explanation">${esc(result.message)}</p>${claims || '<div class="answer-empty">لا إحالات مختلقة. لا جواب خارج النصوص المتاحة.</div>'}
      <p class="small-note">هذه مقتطفات تعليمية اصطناعية، وليست إجابة مولّدة بالذكاء الاصطناعي أو توثيقًا لمعلومة شرعية.</p>
      <div class="evidence-list">${result.evidence.map((passage) => evidenceCard(passage)).join("")}</div></article>
    <aside><div class="panel coverage"><h3>هل غطّت المجموعة السؤال؟</h3><div class="coverage-top"><span>الموضوعات المتعرّف إليها</span><span dir="ltr">${arabic.format(result.covered.length)} / ${arabic.format(result.topics.length)}</span></div><div class="meter" aria-label="عدد الموضوعات المغطاة"><span style="width:${result.coverage * 100}%"></span></div>${result.topics.map((topic) => `<div class="topic-row ${result.missing.includes(topic) ? "missing" : ""}"><span>${esc(TOPIC_LABELS[topic])}</span><b>${result.missing.includes(topic) ? "غير مغطى" : "مغطى"}</b></div>`).join("")}<p class="small-note">نسبة تغطية موضوعية تحددها قواعد هذا العرض، وليست احتمال صحة أو درجة ثقة من نموذج.</p></div>
    <details class="panel candidate-panel" open><summary>درجات النصوص (${arabic.format(result.ranked.length)})</summary>${result.ranked.map((passage) => `<div class="candidate-row"><code dir="ltr">${esc(passage.id)}</code><span>${esc(passage.title)}</span><span class="candidate-score">${passage.score} / 3</span></div>`).join("")}<p class="small-note">الدرجة ٣ تعني تطابق موضوع؛ والدرجة ٠ تعني عدم التطابق. هذا ترتيب بالقواعد، وليس تقييم Jev.</p></details></aside></div>`;
}

function run(reveal = false) {
  byId("error").hidden = true;
  try {
    render(evaluateQuestion(byId("question").value));
    if (reveal) {
      byId("results").focus({ preventScroll: true });
      byId("results").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    }
  }
  catch (error) { byId("error").textContent = error.message; byId("error").hidden = false; }
}
byId("question-form").addEventListener("submit", (event) => { event.preventDefault(); run(true); });
byId("examples").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-example]");
  if (!button) return;
  byId("question").value = EXAMPLES[Number(button.dataset.example)].question;
  run(true);
});
byId("results").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-citation]");
  if (!button) return;
  const card = byId(`evidence-${button.dataset.citation}`);
  document.querySelectorAll(".evidence-card.highlight").forEach((item) => item.classList.remove("highlight"));
  card?.classList.add("highlight");
  card?.focus({ preventScroll: true });
  card?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
});
byId("test-citation").addEventListener("click", () => {
  const result = auditClaim({ citationIds: ["DEMO-01", "DEMO-999"] });
  byId("citation-test").innerHTML = `<div class="pass">✓ معرّف معروف: <code>DEMO-01</code></div><div class="fail">✕ رُفض المعرّف: <code>${esc(result.rejected[0])}</code></div><div>قرار النشر: ${result.publishable ? "مسموح" : "محجوب حتى تصحيح الإحالة"}</div><div class="muted">${esc(result.note)}</div>`;
});
run();
