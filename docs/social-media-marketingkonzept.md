# Social-Media-Marketingkonzept KopfHochVerlag
### Facebook · Instagram · LinkedIn – Vermarktung der Bücher im eigenen Shop (marionbender.com)

Stand: 31.07.2026

---

## 0. Grundlage & Quellen dieses Konzepts

Dieses Konzept stützt sich auf zwei Quellen, die im Buchberater-Bot-Repository bereits verifiziert hinterlegt sind, sowie auf einen ersten Blick auf die vorhandene Social-Media-Präsenz:

1. **`book-knowledge.js`** – verifizierte Fakten zu Buch, Autorin, Zielgruppe, Datenschutz und Shop.
2. **`server.js` (SYSTEM_PROMPT)** – die von Ihnen an Claude gegebenen Anweisungen zu Stil, Tonalität, verbotenen Mustern und Krisen-Handling des Buchberaters. Diese Leitplanken sind die verbindliche Markenstimme und werden 1:1 auf Social Media übertragen, damit Chatbot, Website und Social-Kanäle konsistent klingen.
3. Eine erste Websuche zu bestehenden Profilen (Instagram, Facebook, LinkedIn) – Details dazu bitte in Abschnitt 1.3 gegenlesen, da die Reichweiten-Zahl aus einer Suchzusammenfassung stammt und nicht direkt aus den Accounts verifiziert wurde.

**Hinweis:** Der direkte Abruf von marionbender.com und kopfhoch-verlag.de war während der Erstellung durch ein temporäres Rate-Limit blockiert. Alles, was aus dem Shop selbst stammt (Buchtitel, Zielgruppe, Datenschutzangaben), ist über `book-knowledge.js` bereits geprüft und eingearbeitet. Layout, exakte Navigationsstruktur und eventuelle weitere Titel des Verlags sollten vor der Umsetzung noch mit einem frischen Website-Abgleich ergänzt werden (siehe Abschnitt 17).

---

## 1. Ausgangslage

### 1.1 Verlag, Shop und aktuelles Programm
- **KopfHochVerlag** vermarktet aktuell das Buch *„Aufstehen beginnt im Kopf – Nichts hindert dich"* von **Marion Bender**, autobiografisch, ehrlich, ohne Ratgeber-Anspruch.
- Verkauft wird direkt im eigenen Shop unter **marionbender.com**, zusätzlich existiert der Domainauftritt **kopfhoch-verlag.de** (beide sind laut Serverkonfiguration als Einbettungsorte für den Buchberater-Chatbot autorisiert).
- Bestehende Kundenbindung: E-Mail-Leseprobe (1. Kapitel) über Klaviyo, mit expliziter Einwilligung und Abmeldelink.
- Bestehendes Differenzierungsmerkmal: ein KI-Buchberater auf der Website, der Interessierte anhand ihrer Situation zum Buch berät.

### 1.2 Das Buch als Content-Fundament
- Autobiografische Geschichte von Marion Bender: Lippen-Gaumen-Fehlbildung seit Geburt (1973), 16 Operationen bis zum 18. Lebensjahr, Reitunfall mit 21 Jahren, seither Querschnittlähmung vom Hals abwärts.
- Zentrale Themen: Veränderung, innere Haltung, Mut, Selbstbestimmung, Hilfe annehmen, Familie, Arbeit, Tiere, Hoffnung, Umgang mit Querschnittlähmung.
- Struktur folgt einem wiederkehrenden Sprachmuster: „**… beginnt im Kopf**" (z. B. „Zuversicht beginnt im Kopf", „Heimat beginnt im Kopf") – das ist ein extrem starkes, wiederverwendbares Content-Raster für Social Media (siehe Abschnitt 4).
- Marion Bender ist zudem **Peer-Beraterin** für Menschen mit Querschnittlähmung und deren Angehörige – das öffnet die Tür zu Community- und Redner-Positionierung, insbesondere auf LinkedIn.

### 1.3 Bestehende Social-Media-Präsenz (zu verifizieren)
Eine erste Recherche deutet auf folgende bereits existierende Profile hin:
- Instagram: `@marion_bender_official`
- LinkedIn: „Marion Bender" (persönliches Profil, positioniert als Rednerin)
- Facebook: persönliches Profil unter dem Namen Marion Bender

**Wichtig:** Reichweiten- bzw. Follower-Zahlen aus automatisierten Suchzusammenfassungen sind nicht verlässlich. Bevor Budget oder Redaktionsplan final beschlossen werden, sollte der Verlag Zugriff auf die echten Account-Insights geben (Follower, Reichweite, Engagement-Rate der letzten 90 Tage), damit dieses Konzept in Abschnitt 15 (KPIs) mit echten Ist-Werten unterlegt werden kann. Außerdem sollte geklärt werden, ob es bereits **Unternehmensseiten** (Facebook-Seite, LinkedIn-Unternehmensseite für den KopfHochVerlag) gibt oder ob nur das Privatprofil der Autorin existiert – das ist eine strategische Weichenstellung (siehe 5.1 und 7.1).

---

## 2. Markenstimme (Brand Voice) – verbindlich für alle Kanäle

Übernommen direkt aus den Anweisungen für den Buchberater, damit Website, Chatbot und Social Media wie **eine Stimme** wirken:

| Dimension | Regel |
|---|---|
| Grundhaltung | menschlich, warm, klar, empathisch, direkt, ohne Druck |
| Verboten | kitschige Motivation, aggressives Verkaufen, medizinische/therapeutische Beratung, erfundene Fakten, Marketingfloskeln |
| Anrede | „du", nicht „Sie" – persönlich, auf Augenhöhe |
| Sprache | Deutsch |
| Kernbotschaft | „Menschen scheitern oft nicht an ihren Umständen, sondern daran, dass sie sich innerlich aufgeben." |
| Faktentreue | Keine erfundenen Kapitelnummern, Seitenzahlen, Zitate oder biografischen Details. Nur mit `book-knowledge.js` abgeglichene Aussagen posten. |
| Krisensensibilität | Bei Hinweisen auf Suizidgedanken/akute Krise in Kommentaren: kein Verkaufsgespräch, kein Buch als „Lösung" anbieten, stattdessen ruhig auf Notruf 112 und TelefonSeelsorge (0800 1110111 / 0800 1110222 / 116 123) verweisen. |
| Datenschutz | Nie behaupten, Daten würden „nicht an Dritte weitergegeben" – bei Rückfragen sachlich auf OpenAI (Chat) und Klaviyo (E-Mail) verweisen. |

**Konsequenz für Social Media:** Keine reißerischen Hooks à la „Dieses eine Geheimnis verändert dein Leben", keine Verkaufsdruck-Countdowns, keine Stock-Foto-Motivationssprüche. Stattdessen: echte Auszüge, ehrliche Fragen, Ich-Perspektive der Autorin, ruhige Bildsprache.

---

## 3. Zielgruppen & Personas

Aus `book-knowledge.js` abgeleitet, für Social Media in drei Personas geschärft:

**Persona A – „Der Rückschlag-Mensch"**
Steckt gerade in einer Veränderungsphase fest (Jobverlust, Trennung, Krankheit, Erschöpfung), zweifelt an sich, ist müde von oberflächlichen Motivationssprüchen. Sucht Ehrlichkeit statt Durchhalteparolen. Hauptplattform: **Instagram** (Reels, Stories), sekundär Facebook (ältere Zielgruppe, 35+).

**Persona B – „Die Schenkende"**
Kennt jemanden, der gerade eine schwere Zeit durchmacht, und sucht ein Buch als bedeutungsvolles, nicht kitschiges Geschenk. Reagiert auf Zitate, Leseproben, Rezensionen Dritter. Hauptplattform: **Facebook**, sekundär Instagram.

**Persona C – „Veranstalter/HR/Unternehmen"**
Sucht Rednerinnen für Firmenevents, Diversity- oder Gesundheitstage, Reha-Einrichtungen, Selbsthilfegruppen, Schulen. Interessiert an Resilienz, Peer-Beratung, Inklusion. Hauptplattform: **LinkedIn**. Das Buch ist hier eher Referenz/Visitenkarte als Direktverkauf – der eigentliche Hebel ist Vortragsbuchung, die wiederum Buchverkäufe im Shop nach sich zieht.

---

## 4. Content-Säulen

Fünf wiederkehrende Säulen, jede mit klarem Verhältnis zwischen Storytelling und Verkauf (Richtwert: 80 % Wert/Beziehung, 20 % Verkauf/CTA):

1. **„… beginnt im Kopf"-Reihe** – Kurzimpulse zu einem Gliederungsthema (z. B. Zuversicht, Heimat, Hoffnung) als Zitatkarte oder 30-Sekunden-Reel. Keine Kapitelnummern nennen, nur Themen.
2. **Ehrliche Lebensgeschichte** – Auszüge/Nacherzählungen einzelner Stationen (Unfall, Reha, Rückkehr ins Berufsleben, Pferde/Kutschfahren, Peer-Arbeit) – immer als „das ist ein Ausschnitt, nicht das ganze Buch" gekennzeichnet.
3. **Fragen statt Antworten** – Community-Posts, die zum Dialog einladen („Was hat dir geholfen, als du dich selbst aufgeben wolltest?"), ohne Druck, ohne Therapieanspruch.
4. **Hinter den Kulissen** – Autorin im Alltag, Tiere, Vorträge, Peer-Beratung – macht Marion Bender als Person greifbar (wichtig für Vertrauen und für LinkedIn-Redner-Positionierung).
5. **Shop & Leseprobe** – klar gekennzeichnete Verkaufs-/Aktionsposts: Leseprobe anfordern, Buch bestellen, Rezensionen zeigen. Bewusst dosiert, nie „aggressiv verkaufend" (siehe Abschnitt 2).

---

## 5. Plattformstrategie Facebook

### 5.1 Rolle im Mix
Facebook erreicht die reifste, kaufbereiteste Zielgruppe (35–65 Jahre), ist stark für **Community-Aufbau** (Gruppen für Angehörige/Peer-Austausch passt exakt zur Peer-Rolle der Autorin) und für **Shop-Traffic über Ads**. Empfehlung: eine **Facebook-Unternehmensseite „KopfHochVerlag"** (falls noch nicht vorhanden), verlinkt mit dem Autorinnen-Profil, plus mittelfristig eine **geschlossene Community-Gruppe** „Aufstehen beginnt im Kopf – Austausch" für Leser:innen und Angehörige.

### 5.2 Content-Mix (3–4 Posts/Woche)
- 1× Zitatkarte aus der „… beginnt im Kopf"-Reihe
- 1× persönliche Geschichte/Lebensstation (Text + Foto)
- 1× Community-Frage oder geteilter Leser-Kommentar (mit Einwilligung)
- 1× Shop-/Leseprobe-CTA oder Veranstaltungshinweis (Lesung, Vortrag)

### 5.3 Formate
- Karussell-Posts mit Zitatserien
- Native Video (kein reiner YouTube-Link – Facebook bevorzugt hochgeladenes Video)
- Facebook-Events für Lesungen/Vorträge
- Verlinkung des Buchberater-Chatbots als „Finde heraus, ob das Buch zu dir passt" – Soft-CTA statt Kaufbutton

### 5.4 Ads (siehe auch Abschnitt 12)
- Retargeting von Website-Besuchern (Shop, Leseprobe-Formular) mit Facebook Pixel
- Lookalike Audience auf Basis der Klaviyo-Leseprobe-Liste (datenschutzkonform, nur mit vorhandener Einwilligung/Custom-Audience-Prozess)
- Ziel: Traffic zur Leseprobe (günstiger Einstieg) statt Direktkauf-Ads

---

## 6. Plattformstrategie Instagram

### 6.1 Rolle im Mix
Instagram ist der **Reichweiten- und Emotionsmotor** – visuelles Storytelling, Reels für neue Reichweite, Stories für tägliche Nähe. Bestehendes Profil `@marion_bender_official` sollte als Basis genutzt und im Look an den Verlag/Buch-Look angepasst werden (Highlight „Das Buch", „Leseprobe", „Vorträge", „Peer-Beratung").

### 6.2 Content-Mix (5–6 Beiträge/Woche über Feed + Stories)
- **Reels (2–3×/Woche):** kurze, ruhige Talking-Head-Clips zu einem „… beginnt im Kopf"-Thema, 15–30 Sekunden, Untertitel eingebrannt (Barrierefreiheit + Sound-off-Nutzung)
- **Feed-Grafiken (2×/Woche):** Zitatkarten im einheitlichen Design (Schriftbild, Farben an Buchcover angelehnt)
- **Stories (täglich, wenn möglich):** Alltag, Fragen-Sticker, Umfragen, Countdown zu Aktionen, Repost von Leser-Feedback
- **Carousel (1×/Woche):** „5 Dinge, die mir in der Reha geholfen haben" – edukativer Mehrwert ohne Ratgeber-Ton

### 6.3 Hashtag- & Discovery-Strategie
Mischung aus Nischenbegriffen (z. B. Querschnittlähmung, Peer-Beratung, Rehabilitation) und Themen-Hashtags (Mutmacher, Veränderung, autobiografisch) – bewusst **keine** reißerischen Motivations-Hashtags, die im Widerspruch zur Markenstimme stünden.

### 6.4 Kooperationen
- Reha-Kliniken, Selbsthilfegruppen, Behindertensport-Verbände, andere Peer-Berater:innen
- Mikro-Influencer:innen aus dem Bereich Inklusion/mentale Stärke (Fokus auf Glaubwürdigkeit statt Reichweite)

---

## 7. Plattformstrategie LinkedIn

### 7.1 Rolle im Mix
LinkedIn ist **nicht primär Buchverkauf**, sondern **Redner:innen- und Expertinnen-Positionierung**. Marion Bender ist bereits als Rednerin im Rollstuhl und Mutmacherin positioniert (siehe Systemprompt: „Marion Bender ist Autorin, Rednerin im Rollstuhl und Mutmacherin"). Das bestehende persönliche Profil ist der richtige Ort – zusätzlich sinnvoll: eine **LinkedIn-Unternehmensseite „KopfHochVerlag"**, um Verlag und Person sauber zu trennen und Buch-Content professionell zu bündeln.

### 7.2 Zielgruppen auf LinkedIn
- HR-Verantwortliche, Event-/Tagungsorganisator:innen (Buchung von Vorträgen)
- Führungskräfte im Kontext Resilienz, Diversity, Gesundheitsmanagement
- Reha-Einrichtungen, Verbände, Bildungsträger

### 7.3 Content-Mix (2–3 Posts/Woche, textlastiger als Instagram)
- Persönliche Reflexionsposts zu Führungsthemen mit Bezug zu Resilienz/Veränderung (Ich-Perspektive, kein Ratgeberton)
- Kurze Ausschnitte aus Vorträgen (Video, professionell geschnitten)
- Referenzen/Feedback von Veranstaltern früherer Vorträge
- Buch als „Visitenkarte" – dezente Erwähnung, Link in Kommentaren statt reißerischem Post-CTA (LinkedIn-Algorithmus bevorzugt Posts ohne externen Link im Hauptbeitrag)

### 7.4 Funnel-Logik
LinkedIn → Vortragsanfrage/Kontakt → Vortrag hält zusätzliche Sichtbarkeit → Teilnehmende kaufen Buch im Shop. Buchverkauf ist hier Nebeneffekt, nicht Hauptziel – das unterscheidet die KPI-Logik deutlich von Facebook/Instagram (siehe Abschnitt 15).

---

## 8. Redaktionsplan – Beispielwoche

| Tag | Facebook | Instagram | LinkedIn |
|---|---|---|---|
| Mo | – | Story: Wochenimpuls | Reflexionspost |
| Di | Zitatkarte | Reel | – |
| Mi | Community-Frage | Story: Umfrage | – |
| Do | – | Carousel | Vortrags-/Referenz-Post |
| Fr | Lebensstation/Auszug | Reel | – |
| Sa | – | Story: Repost Leser-Feedback | – |
| So | Shop-/Leseprobe-CTA | Feed-Grafik | – |

Monatlich ergänzt um: 1 größere Aktion (z. B. Themenwoche „Hilfe annehmen"), 1 Live-Format (Instagram Live Q&A oder Facebook Live „Frag Marion"), 1 saisonaler Anlass (siehe Abschnitt 11).

---

## 9. Content-Format-Bibliothek (Kurzreferenz)

- Zitatkarte (Feed/Story)
- Talking-Head-Reel (15–30 Sek.)
- Karussell „X Dinge, die geholfen haben"
- Frage-Sticker / Umfrage (Story)
- Vortragsausschnitt (LinkedIn/Instagram)
- Leser-Feedback-Repost (mit Einwilligung)
- Leseprobe-CTA-Post
- Behind-the-Scenes (Alltag, Tiere, Peer-Beratung)
- Q&A-Live-Format
- Saisonale Grußkarte/Aktion

---

## 10. Funnel: Social Media → Shop

```
Social Media (Reichweite/Vertrauen)
        │
        ▼
Leseprobe-Formular (1. Kapitel, Klaviyo-Opt-in)
        │
        ▼
E-Mail-Nurturing (Klaviyo) + Buchberater-Chatbot auf der Website
        │
        ▼
Kauf im Shop (marionbender.com)
```

Der Buchberater-Chatbot ist ein einzigartiger Zwischenschritt: Social-Media-Traffic sollte gezielt auf die Chatbot-Seite geleitet werden („Finde in 2 Minuten heraus, ob das Buch zu deiner Situation passt"), da der Bot Streuverluste reduziert und unentschlossene Besucher:innen persönlich abholt, bevor sie kaufen oder die Leseprobe anfordern.

---

## 11. Kampagnen & Anlässe

- **Launch-/Relaunch-Kampagne** des Buchs auf allen drei Kanälen (zeitlich versetzt: LinkedIn zuerst professionell, dann Instagram/Facebook breiter)
- **Weltrehatag / Tag der Menschen mit Behinderungen (3. Dezember)** – thematisch exakt passend
- **Weihnachten** – „Das etwas andere Geschenk" (Persona B)
- **Neujahr** – „Veränderung beginnt im Kopf" (Vorsatz-Thema, aber ohne Motivationskitsch)
- **Muttertag/Vatertag** – Familienthema im Buch aufgreifen

---

## 12. Paid-Media-Empfehlungen

- **Instagram/Facebook Ads:** Budget zunächst auf Traffic zur Leseprobe statt Direktkauf – niedrigere Einstiegshürde, höhere Conversion in Klaviyo-Liste, spätere Konvertierung über E-Mail
- **LinkedIn Ads:** eher sparsam einsetzen, primär als Sponsored Content für Vortragsangebote an HR-Zielgruppen, nicht für Buchverkauf
- **Retargeting:** Website-Besucher (Shop, Leseprobe-Seite) auf allen drei Plattformen
- Kein Einsatz von Countdown-/Knappheits-Taktiken – widerspricht der Markenstimme („ohne Druck")

---

## 13. Community-Management & sensible Themen

Da das Buchthema Querschnittlähmung, Mobbing und existenzielle Krisen berührt, gelten für Kommentare/DMs **dieselben Regeln wie im Buchberater-Systemprompt**:

- Bei Hinweisen auf Suizidgedanken oder akute Krise in Kommentaren/Nachrichten: kein Verkaufsgespräch, ruhige menschliche Reaktion, Verweis auf Notruf **112** und TelefonSeelsorge (**0800 1110111**, **0800 1110222**, **116 123**, kostenfrei, rund um die Uhr).
- Keine medizinische oder therapeutische Beratung in Kommentaren geben.
- Community-Guidelines für die geplante Facebook-Gruppe klar kommunizieren (respektvoller Umgang, keine Ferndiagnosen, kein Spam).
- Wer moderiert, sollte kurz auf dieses Verhalten vorbereitet/geschult werden – idealerweise dieselbe Person, die auch die Website-Chatbot-Antworten kennt, damit die Reaktion konsistent ist.

---

## 14. Rechtliches & Datenschutz

- Bei jeder Lead-Ads-/Formular-Kampagne: ausdrückliche Einwilligung wie im bestehenden Leseprobe-Formular, Verweis auf die Datenschutzerklärung (`https://marionbender.com/datenschutzerklaerung/`).
- Nie zusichern, dass Daten „nicht weitergegeben" werden – bei Rückfragen sachlich auf die eingesetzten Dienste verweisen (Klaviyo für E-Mail, ggf. Meta/LinkedIn für Ads-Tracking).
- Für Facebook/Instagram-Ads mit Pixel/Custom Audiences: Cookie-Consent auf der Website prüfen, bevor Retargeting live geschaltet wird.
- Bildrechte bei Kooperationen/Reposts von Leser:innen vorher schriftlich klären.

---

## 15. KPIs & Erfolgsmessung

| Plattform | Primäre KPI | Sekundäre KPI |
|---|---|---|
| Facebook | Klicks zur Leseprobe/Shop | Gruppenwachstum, Engagement-Rate |
| Instagram | Reichweite/Profilbesuche über Reels | Story-Interaktionen, Leseprobe-Klicks |
| LinkedIn | Vortragsanfragen/Kontaktaufnahmen | Post-Impressionen, Kommentare von Zielgruppe C |

Monatliches Reporting: Follower-Wachstum, Reichweite, Klicks zur Website, Leseprobe-Anmeldungen (Klaviyo), Shop-Conversions (falls per Analytics zuordenbar). **Wichtig:** aktuelle Ist-Werte müssen zunächst aus den echten Account-Insights nachgetragen werden (siehe 1.3).

---

## 16. 90-Tage-Fahrplan

**Monat 1 – Fundament**
- Redaktionsplan starten, Design-Vorlagen (Zitatkarten, Reel-Intro) erstellen
- Bestehende Profile aufräumen/„Verlag"-Signatur ergänzen, Bio/Links vereinheitlichen
- Erste Content-Säule „… beginnt im Kopf" produzieren (10–15 Assets als Vorrat)

**Monat 2 – Wachstum**
- Reels-Frequenz erhöhen, erste Kooperationen anfragen (Reha/Selbsthilfe)
- Erste kleine Ads-Tests (Traffic zur Leseprobe)
- Facebook-Gruppe launchen (falls gewünscht)

**Monat 3 – Vertiefung & Vorträge**
- LinkedIn-Unternehmensseite aktiv bespielen, erste Vortragsausschnitte posten
- Erste Kampagne rund um einen Anlass (z. B. saisonal, siehe Abschnitt 11)
- Auswertung der ersten 90 Tage, Anpassung des Redaktionsplans anhand echter Daten

---

## 17. Offene Punkte / nächste Schritte

1. **Website-Abgleich nachholen:** marionbender.com und kopfhoch-verlag.de direkt abrufen (aktuell durch Rate-Limit blockiert), um Navigationsstruktur, weitere Buchtitel, Cover-Bilder und exakte Bio-Texte zu übernehmen.
2. **Social-Media-Ist-Zustand verifizieren:** Zugriff auf echte Insights (Follower, Reichweite, Engagement) für Instagram, Facebook, LinkedIn einholen, um Abschnitt 15 mit echten Zahlen zu unterlegen.
3. **Entscheidung Verlags- vs. Personenmarke:** Klären, ob eigene Facebook-/LinkedIn-Unternehmensseiten „KopfHochVerlag" zusätzlich zum Autorinnenprofil aufgebaut werden sollen.
4. **Freigabeprozess:** Wer produziert/genehmigt Inhalte (Marion Bender selbst, Verlag, externe Agentur)? Sollte vor Start des 90-Tage-Fahrplans festgelegt werden.
