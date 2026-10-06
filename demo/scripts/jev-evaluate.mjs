import { evaluateWithJev } from "../provider/jev.mjs";

const question = process.argv.slice(2).join(" ");
if (!question) {
  console.error('Usage: node scripts/jev-evaluate.mjs "كيف أتحقق من الاقتباس؟"');
  process.exitCode = 1;
} else {
  try {
    const result = await evaluateWithJev(question, { apiKey: process.env.TYPESAFE_API_KEY });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
