import { spawn } from "node:child_process";

const port = 34567;
const server = spawn(process.execPath, ["server.js"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: String(port),
    OPENAI_API_KEY: "test-key",
    KLAVIYO_API_KEY: "test-key",
    KLAVIYO_LIST_ID: "test-list"
  },
  stdio: ["ignore", "pipe", "pipe"]
});

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Server wurde nicht rechtzeitig bereit.");
}

async function expectStatus(path, options, expectedStatus) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, options);
  if (response.status !== expectedStatus) {
    throw new Error(`${path}: erwartet ${expectedStatus}, erhalten ${response.status}`);
  }
}

try {
  await waitForServer();

  const healthResponse = await fetch(`http://127.0.0.1:${port}/health`);
  const framePolicy = healthResponse.headers.get("content-security-policy") || "";
  if (!framePolicy.includes("https://kopfhoch-verlag.de")) {
    throw new Error("KopfHoch Verlag fehlt in der frame-ancestors-Richtlinie.");
  }

  await expectStatus("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "" })
  }, 400);

  await expectStatus("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "x".repeat(1001) })
  }, 400);

  await expectStatus("/save-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "ungueltig", consent: true })
  }, 400);

  await expectStatus("/save-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", consent: false })
  }, 400);

  await expectStatus("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://example.com"
    },
    body: JSON.stringify({ message: "Test" })
  }, 403);

  console.log("Smoke-Test OK");
} finally {
  server.kill();
}
