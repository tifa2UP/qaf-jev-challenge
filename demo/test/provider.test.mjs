import test from "node:test";
import assert from "node:assert/strict";
import { PASSAGES } from "../data.mjs";
import { createEvaluationRequest, interpretEvaluationResponse, evaluateWithJev } from "../provider/jev.mjs";

function fixture(support = 0.95) {
  return { model: "test-fixture-not-live", answers: {
    coverage: { type: "noul", noul: support },
    ...Object.fromEntries(PASSAGES.map(({ id }) => [`grade_${id}`, { type: "score", score: id === "DEMO-02" ? 3 : 0 }]))
  } };
}
test("API request uses verified typed questions and only original synthetic passages", () => {
  const request = createEvaluationRequest("كيف أتحقق من الاقتباس؟");
  assert.equal(request.model, "jev-latest");
  assert.equal(request.questions.coverage.type, "noul");
  assert.equal(request.questions["grade_DEMO-02"].criteria.length, 4);
  assert.equal(request.state.passages.length, 6);
});
test("valid provider decision yields only known selected evidence", () => {
  const result = interpretEvaluationResponse(fixture());
  assert.equal(result.answerable, true);
  assert.deepEqual(result.evidence.map(({ id }) => id), ["DEMO-02"]);
});
test("provider low coverage abstains even with high passage grades", () => {
  const result = interpretEvaluationResponse(fixture(0.2));
  assert.equal(result.answerable, false);
  assert.deepEqual(result.evidence, []);
});
test("unknown decision identifiers and invalid scores fail closed", () => {
  const unknown = fixture();
  unknown.answers.grade_FABRICATED = { type: "score", score: 3 };
  assert.throws(() => interpretEvaluationResponse(unknown), /Unexpected/);
  const invalid = fixture();
  invalid.answers["grade_DEMO-02"].score = 9;
  assert.throws(() => interpretEvaluationResponse(invalid), /Invalid/);
});
test("missing key fails before fetch; mock confirms endpoint and server auth", async () => {
  let calls = 0;
  const fakeFetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://api.typesafe.ai/v1/systemone");
    assert.equal(options.headers.Authorization, "Bearer test-only-value");
    return { ok: true, json: async () => fixture() };
  };
  await assert.rejects(() => evaluateWithJev("test", { fetchImpl: fakeFetch }), /TYPESAFE_API_KEY/);
  assert.equal(calls, 0);
  const result = await evaluateWithJev("test", { apiKey: "test-only-value", fetchImpl: fakeFetch });
  assert.equal(result.answerable, true);
  assert.equal(calls, 1);
});
