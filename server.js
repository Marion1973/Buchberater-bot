import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { BOOK_KNOWLEDGE } from "./book-knowledge.js";

dotenv.config();

const requiredEnvironment = [
  "OPENAI_API_KEY",
  "KLAVIYO_API_KEY",
  "KLAVIYO_LIST_ID"
];
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);

if (missingEnvironment.length > 0) {
  throw new Error(`Fehlende Umgebungsvariablen: ${missingEnvironment.join(", ")}`);
}

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const allowedOrigins = new Set([
  "https://marionbender.com",
  "https://www.marionbender.com",
  "https://kopfhoch-verlag.de",
  "https://www.kopfhoch-verlag.de",
  "https://buchberater-bot.onrender.com",
  process.env.APP_ORIGIN
].filter(Boolean));

app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://marionbender.com https://www.marionbender.com https://kopfhoch-verlag.de https://www.kopfhoch-verlag.de"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Nicht erlaubte Herkunft"));
  }
}));
app.use(express.json({ limit: "20kb" }));

function rateLimit({ windowMs, max }) {
  const requests = new Map();

  return (req, res, next) => {
    const now = Date.now();

    if (requests.size > 5000) {
      for (const [ip, entry] of requests) {
        if (entry.resetAt <= now) requests.delete(ip);
      }
    }

    const current = requests.get(req.ip);

    if (!current || current.resetAt <= now) {
      requests.set(req.ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    current.count += 1;
    if (current.count > max) {
      return res.status(429).json({
        reply: "Bitte warte einen Moment, bevor du es erneut versuchst.",
        success: false,
        message: "Bitte warte einen Moment, bevor du es erneut versuchst."
      });
    }

    return next();
  };
}

const chatRateLimit = rateLimit({ windowMs: 10 * 60 * 1000, max: 25 });
const emailRateLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 15000,
  maxRetries: 2
});

const SYSTEM_PROMPT = `
Du bist der offizielle Buchberater für das Buch
"Aufstehen beginnt im Kopf – Nichts hindert dich"
von Marion Bender.

DEINE AUFGABE
Du hilfst Menschen herauszufinden, ob dieses Buch gerade zu ihnen passt.
Du beantwortest Fragen zum Buch, zur Autorin und zu den Themen.
Du führst empathisch, klar und freundlich durch das Gespräch.

STIL
- menschlich
- warm
- klar
- empathisch
- direkt
- ohne Druck
- ohne Marketingfloskeln

VERMEIDE
- kitschige Motivation
- aggressives Verkaufen
- unnötig lange Antworten
- medizinische oder therapeutische Beratung
- erfundene Fakten

ÜBER DIE AUTORIN
Marion Bender ist Autorin, Rednerin im Rollstuhl und Mutmacherin.
Sie steht für mentale Stärke, Klarheit und die Botschaft,
dass Aufstehen zuerst im Kopf beginnt.

ÜBER DAS BUCH
"Aufstehen beginnt im Kopf – Nichts hindert dich"
ist kein klassisches Motivationsbuch.
Es ist eine ehrliche Lebensgeschichte über Rückschläge,
Mut, Entscheidungen und innere Stärke.

ZENTRALE BOTSCHAFT
Menschen scheitern oft nicht an ihren Umständen,
sondern daran, dass sie sich innerlich aufgeben.

ZIELGRUPPE
Das Buch hilft Menschen:
- die gerade feststecken
- die an sich zweifeln
- die Mut für Veränderungen brauchen
- die ein ehrliches Mutmacher-Buch suchen
- die einer anderen Person ein sinnvolles Geschenk machen möchten

GESPRÄCHSLOGIK
1. Begrüße freundlich.
2. Antworte konkret auf die Frage.
3. Stelle wenn passend eine kurze Rückfrage.
4. Verbinde die Situation des Nutzers mit dem Buch.
5. Wenn passend, weise auf die Leseprobe hin.

WICHTIG
Die bereitgestellte Wissensbasis ist deine einzige Quelle für konkrete Fakten
über das Buch und die Autorin. Erfinde niemals Kapitelnummern, Seitenzahlen,
Zitate, Ereignisse, Preise, Lieferzeiten oder biografische Details.
Wenn eine konkrete Information nicht in der Wissensbasis steht, sage offen:
"Das kann ich anhand meiner geprüften Informationen nicht sicher beantworten."

Behaupte niemals, dass Daten nicht an Dritte übermittelt werden. Bei Fragen
zum Datenschutz erkläre sachlich, dass Chatnachrichten über OpenAI und die
E-Mail-Adresse über Klaviyo verarbeitet werden. Verweise auf die
Datenschutzerklärung.

Wenn jemand Suizidgedanken, unmittelbare Selbstgefährdung oder eine akute Krise
äußert, führe kein Verkaufsgespräch und empfehle nicht das Buch als Lösung.
Antworte kurz, zugewandt und ermutige zu sofortiger menschlicher Hilfe. Bei
unmittelbarer Gefahr nenne den Notruf 112. Nenne außerdem die TelefonSeelsorge:
0800 1110111, 0800 1110222 oder 116 123 (kostenfrei und rund um die Uhr).

Wenn jemand nach einer Leseprobe fragt oder erst einmal reinlesen möchte,
weise freundlich auf die Möglichkeit hin, das erste Kapitel per E-Mail anzufordern.

Antworte immer auf Deutsch.
`;

app.post("/chat", chatRateLimit, async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();
    const history = Array.isArray(req.body.history) ? req.body.history : [];

    if (!message) {
      return res.status(400).json({
        reply: "Bitte gib zuerst eine Frage ein."
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        reply: "Bitte kürze deine Frage auf höchstens 1.000 Zeichen."
      });
    }

    const safeHistory = history
      .slice(-10)
      .filter((item) => item && ["user", "assistant"].includes(item.role))
      .map((item) => ({
        role: item.role,
        content: String(item.content || "").trim().slice(0, 1000)
      }))
      .filter((item) => item.content);

    const historyLength = safeHistory.reduce(
      (total, item) => total + item.content.length,
      0
    );

    if (historyLength > 6000) {
      return res.status(400).json({
        reply: "Der Chatverlauf ist zu lang. Bitte lösche den Chat und versuche es erneut."
      });
    }

    const input = [
      {
        role: "system",
        content: SYSTEM_PROMPT + "\n\n" + BOOK_KNOWLEDGE
      },
      ...safeHistory,
      {
        role: "user",
        content: message
      }
    ];

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input,
      max_output_tokens: 350
    });

    return res.json({
      reply: response.output_text || "Ich konnte gerade keine Antwort erzeugen."
    });
  } catch (error) {
    console.error("Fehler bei /chat:", error);
    return res.status(500).json({
      reply: "Es gab gerade ein technisches Problem beim Antworten."
    });
  }
});

app.post("/save-email", emailRateLimit, async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const consent = req.body.consent === true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Bitte gib eine gültige E-Mail-Adresse ein."
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: "Bitte bestätige zuerst deine Einwilligung."
      });
    }

    const subscribeResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          "revision": "2024-10-15"
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email: email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: "SUBSCRIBED"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: process.env.KLAVIYO_LIST_ID
                }
              }
            }
          }
        })
      }
    );

    if (!subscribeResponse.ok) {
      console.error("E-Mail-Anmeldung fehlgeschlagen", {
        status: subscribeResponse.status
      });
      return res.status(500).json({
        success: false,
        message: "Die Anmeldung konnte gerade nicht abgeschlossen werden."
      });
    }

    return res.json({
      success: true,
      message: "Danke! Bitte prüfe jetzt dein E-Mail-Postfach."
    });
  } catch (error) {
    console.error("Fehler bei /save-email:", error);
    return res.status(500).json({
      success: false,
      message: "Gerade gab es ein technisches Problem."
    });
  }
});

app.use((error, req, res, next) => {
  if (error?.message === "Nicht erlaubte Herkunft") {
    return res.status(403).json({
      success: false,
      message: "Diese Anfrage ist nicht erlaubt."
    });
  }

  return next(error);
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

