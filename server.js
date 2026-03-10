import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("OPENAI vorhanden:", !!process.env.OPENAI_API_KEY);
console.log("KLAVIYO vorhanden:", !!process.env.KLAVIYO_API_KEY);
console.log("LIST ID:", process.env.KLAVIYO_LIST_ID);
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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
Wenn jemand nach einer Leseprobe fragt oder erst einmal reinlesen möchte,
weise freundlich auf die Möglichkeit hin, das erste Kapitel per E-Mail anzufordern.

Antworte immer auf Deutsch.
`;

const BOOK_KNOWLEDGE = `
BUCHINHALT

Das Buch erzählt die Geschichte von Marion Bender,
die trotz schwerer Herausforderungen gelernt hat,
dass das wichtigste Aufstehen im Kopf passiert.

THEMEN DES BUCHES
- mentale Stärke
- Verantwortung für das eigene Leben
- Mut trotz Rückschlägen
- Entscheidungen treffen
- Selbstvertrauen entwickeln
- innere Haltung verändern

KERNAUSSAGEN
- Veränderung beginnt im Denken.
- Mut entsteht durch kleine Entscheidungen.
- Jeder Mensch kann sein Leben neu ausrichten.
- Innere Stärke wächst oft mitten in schwierigen Zeiten.

WAS DAS BUCH ANDERS MACHT
Es ist kein oberflächliches Motivationsbuch.
Es verbindet eine echte Lebensgeschichte mit klaren Denkanstößen.

KAUFLINK
Das Buch kann hier angeschaut werden:
https://marionbender.com

LESEPROBE
Interessierte können das erste Kapitel als Leseprobe per E-Mail anfordern.
`;

app.post("/chat", async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();
    const history = Array.isArray(req.body.history) ? req.body.history : [];

    if (!message) {
      return res.status(400).json({
        reply: "Bitte gib zuerst eine Frage ein."
      });
    }

    const input = [
      {
        role: "system",
        content: SYSTEM_PROMPT + "\n\n" + BOOK_KNOWLEDGE
      },
      ...history.slice(-10).map((item) => ({
        role: item.role === "assistant" ? "assistant" : "user",
        content: String(item.content || "")
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input
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

app.post("/save-email", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim();

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Bitte gib eine gültige E-Mail-Adresse ein."
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

    const subscribeData = await subscribeResponse.json().catch(() => ({}));

console.log("Klaviyo Antwort:", subscribeData);

if (!subscribeResponse.ok) {
  console.error(
    "Klaviyo Subscribe Fehler:",
    JSON.stringify(subscribeData, null, 2)
  );
      return res.status(500).json({
        success: false,
        message: "Klaviyo konnte die E-Mail nicht speichern."
      });
    }

    return res.json({
      success: true,
      message: "Perfekt! Deine E-Mail wurde an Klaviyo übergeben."
    });
  } catch (error) {
    console.error("Fehler bei /save-email:", error);
    return res.status(500).json({
      success: false,
      message: "Gerade gab es ein technisches Problem."
    });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});