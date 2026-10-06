import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Explicit static allowlist: provider code, tests and environment files are not served.
const files = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/style.css", ["style.css", "text/css; charset=utf-8"]],
  ["/app.mjs", ["app.mjs", "text/javascript; charset=utf-8"]],
  ["/engine.mjs", ["engine.mjs", "text/javascript; charset=utf-8"]],
  ["/data.mjs", ["data.mjs", "text/javascript; charset=utf-8"]],
  ["/assets/ReadexPro.ttf", ["assets/ReadexPro.ttf", "font/ttf"]],
  ["/assets/ReadexPro-OFL.txt", ["assets/ReadexPro-OFL.txt", "text/plain; charset=utf-8"]],
  ["/README.md", ["README.md", "text/plain; charset=utf-8"]],
  ["/SOURCES.md", ["SOURCES.md", "text/plain; charset=utf-8"]],
  ["/LICENSE", ["LICENSE", "text/plain; charset=utf-8"]]
]);
const server = createServer(async (request, response) => {
  const path = new URL(request.url, "http://localhost").pathname;
  const file = files.get(path);
  if (!file || !["GET", "HEAD"].includes(request.method)) { response.writeHead(404); response.end("Not found"); return; }
  try {
    const data = await readFile(fileURLToPath(new URL(file[0], import.meta.url)));
    response.writeHead(200, { "Content-Type": file[1], "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch { response.writeHead(500); response.end("Could not read static file"); }
});
const port = Number(process.env.DEMO_PORT ?? 4178);
server.listen(port, "127.0.0.1", () => console.log(`Educational demo: http://127.0.0.1:${port}`));
