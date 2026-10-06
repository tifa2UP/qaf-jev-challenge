import test from "node:test";
import assert from "node:assert/strict";
import { PASSAGES, EXAMPLES } from "../data.mjs";
import { evaluateQuestion, auditClaim, resolveCitations } from "../engine.mjs";

test("supported quotation question returns verbatim evidence with resolvable citations", () => {
  const result = evaluateQuestion(EXAMPLES[0].question);
  assert.equal(result.status, "supported");
  assert.deepEqual(result.evidence.map(({ id }) => id), ["DEMO-02"]);
  assert.equal(result.claims[0].text, PASSAGES[1].text);
  assert.equal(auditClaim(result.claims[0], result.evidence).publishable, true);
});
test("multipart question covers both requested topics", () => {
  const result = evaluateQuestion(EXAMPLES[1].question);
  assert.equal(result.status, "supported");
  assert.deepEqual(result.covered, ["citation", "disagreement"]);
  assert.equal(result.coverage, 1);
});
test("mixed in-scope and external request is partial, not falsely fully covered", () => {
  const result = evaluateQuestion(EXAMPLES[2].question);
  assert.equal(result.status, "partial");
  assert.deepEqual(result.missing, ["external"]);
  assert.equal(result.coverage, 0.5);
});
test("personal ruling and unknown question abstain with no claims or citations", () => {
  for (const question of [EXAMPLES[3].question, "ما موعد القطار القادم؟"]) {
    const result = evaluateQuestion(question);
    assert.equal(result.status, "abstain");
    assert.equal(result.evidence.length, 0);
    assert.equal(result.claims.length, 0);
  }
});
test("fabricated citation prevents publication; duplicate IDs are deduplicated", () => {
  const result = auditClaim({ citationIds: ["DEMO-01", "DEMO-999", "DEMO-01"] });
  assert.equal(result.publishable, false);
  assert.equal(result.accepted.length, 1);
  assert.deepEqual(result.rejected, ["DEMO-999"]);
});
test("citation to known corpus passage outside the selected evidence is rejected", () => {
  const result = resolveCitations(["DEMO-01"], [PASSAGES[1]]);
  assert.equal(result.accepted.length, 0);
  assert.deepEqual(result.rejected, ["DEMO-01"]);
});
test("empty and oversized requests are rejected", () => {
  assert.throws(() => evaluateQuestion("  "));
  assert.throws(() => evaluateQuestion("ا".repeat(601)));
});
