# Orch Platform – Architektur

> Stand: Oktober 2026. Die Plattform entsteht auf Orchescala; was hier steht, ist teils umgesetzt,
> teils geplant.

## Ziel

Eine Plattform, mit der wir für unsere Kunden Apps im Enterprise-Umfeld bauen –
von der Spezifikation über UI und Backend bis zu Deployment, Dokumentation und
Betrieb. Im Fokus stehen Banken mit ihrem Kernbanksystem, zum Beispiel **Finnova Neo**,
und ihrer eigenen Infrastruktur – typischerweise eine Private Cloud mit Kubernetes.

Die Plattform setzt so weit wie möglich auf **Orchescala** auf. Neu gebaut wird
nur, was fehlt.

## Grundsätze

1. **Orchescala zuerst.** Spezifikation, Gateway, Engine-Abstraktion und Worker
   kommen aus Orchescala; die Plattform ergänzt und verbindet.
2. **Ein Vertrag von der Spez bis zur UI.** Das Datenmodell aus der Spezifikation wird zur
   Domäne, der Gateway publiziert es als OpenAPI, die UI arbeitet mit denselben Typen.
   Spez, Backend und Frontend laufen nicht auseinander.
3. **Eine App ist eine Sammlung von Prozessen und Seiten.** Was etwas verändert und
   länger läuft (Benutzer-Tasks, Retries, Timer, Kompensation), ist ein Prozess. Was
   nur liest oder sofort antwortet, ist eine Seite mit Services – ohne Prozess. Beides
   steckt im selben Projekt (Worker-App) und nutzt dieselben Worker.
4. **Der Gateway ist generisch.** Er enthält keinen Kundencode. Die Kunden-App
   steckt in den Worker-Apps.
5. **Alles hinter Abstraktionen.** IdP, API-Gateway, Engine, Datenbank und später
   Kafka sind austauschbar. Wir setzen auf Standards (OIDC, JDBC, OpenTelemetry,
   OCI, Helm).
6. **Mitliefern oder vorhanden.** Jede Infrastruktur-Komponente kann von uns
   geliefert werden oder beim Kunden schon existieren.
7. **Kubernetes zuerst, AWS später.** Vanilla Kubernetes, keine
   distributionsspezifischen Annahmen. Für AWS ändern sich nur Helm-Werte und
   die extern bereitgestellten Komponenten.

## Übersicht

![Übersicht](arch-overview.svg)

### Bausteine

| Baustein | Aufgabe |
|---|---|
| **Prozess Designer** (orch-spec) | Fachliche Spezifikation: Ablauf, Datenmodell, Service-Mapping, Entscheidungen; dazu die Seiten der App im UI Designer |
| **Generatoren** | Aus der Spez: Domäne, Worker, Tests, Simulation, Migrationen |
| **UI** | Ein Renderer zeigt die Seiten aus der UI-Spez zur Laufzeit; ausgeliefert von der Worker-App |
| **Gateway** | Einziger Einstiegspunkt: Token-Prüfung, Weiterleitung an Worker-Apps und Engines, OpenAPI, Doku |
| **Engine** | BPMN/DMN-Ausführung, pro Projekt wählbar |
| **Worker-Apps** | Die eigentliche Kunden-App: Integration, Orchestrierung, Persistenz |
| **Doku** | Generierte Doku je App, ausgeliefert über den Gateway |
| **Deployment-Kit** | Images, Helm-Chart, compose, Pipeline-Vorlagen, Manifest |

## UI und Gateway

**Die UI spricht ausschliesslich mit dem Gateway**, nie direkt mit einer
Worker-App.

- **Ein Einstiegspunkt:** gleicher Origin, kein CORS, ein Login.
- **Token einmal prüfen:** auch mehrere IdPs parallel, z.B. Keycloak und Entra. Danach wird
  das Benutzer-Token bis in die Worker-App und weiter zum Kernbanksystem durchgereicht.
- **Prozess und Worker hinter derselben API:** Ob ein Schritt synchron ist oder ein
  Prozess dahinter steht, sieht die UI nicht.
- **Worker-Apps bleiben intern:** kein eigenes Ingress, keine eigene
  Auth-Konfiguration.
- **Doku am selben Ort:** `/docs` (OpenAPI) und `/site` (App-Doku), auf Wunsch mit Login.

### Der Gateway leitet nur weiter

Für Worker-Aufrufe der UI macht der Gateway **reines Forwarding**:

1. Bearer-Token prüfen.
2. Ziel-Worker-App aus dem Topic bestimmen.
3. Body und Token **unverändert** an die Worker-App weiterreichen.
4. Antwort der Worker-App unverändert zurückgeben.

Kein Mapping, keine Aggregation, keine Fachlogik im Gateway. Validierung der Eingabe,
Mapping und alles Fachliche passieren in der Worker-App.

### Routing zu den Worker-Apps

Die Adresse der Worker-App ergibt sich aus dem Topic:

```
Topic:       acme-konto-openAccount.get
Worker-App:  http://acme-konto:5555
```

Die ersten beiden Teile des Topics sind der Service-Name – in Kubernetes wie in
docker compose. Damit braucht das Routing keine eigene Konfiguration; für
Sonderfälle lässt sich die Adresse überschreiben.

### Konsequenz für Kundenlogik

Braucht ein Screen Daten aus mehreren Quellen, entsteht dafür ein
**CustomWorker** in der Worker-App – nicht Code im Gateway.

### Das UI-Bundle kommt aus der Worker-App

Auch die Dateien, die der Browser lädt (`index.html`, JavaScript, CSS, Bilder,
Fonts), liefert die **Worker-App**. Der Gateway leitet sie weiter – wie die
Worker-Aufrufe:

```
Browser:     GET https://<host>/app/acme-konto/assets/index-3f9a.js
Gateway:     → http://acme-konto:5555/ui/assets/index-3f9a.js
Worker-App:  liefert die Datei aus ihrem Image
```

- **Eine Worker-App = ein Deployable:** UI und Backend werden zusammen gebaut,
  versioniert und deployt. UI und API passen immer zur selben Version des
  Vertrags.
- **Kein eigener UI-Container, kein eigenes Ingress** für die UI.
- **Mehrere Worker-Apps, mehrere UIs:** jede unter ihrem Pfad
  (`/app/acme-konto/`, `/app/acme-kunde/`).
- **Schutz:** Das UI-Bundle enthält keine Daten und keine Geheimnisse und ist deshalb
  öffentlich; die UI meldet sich danach selbst per OIDC an, jeder API-Aufruf trägt das
  Token. Will eine Bank keine anonym erreichbare App-Hülle, schützt der Gateway das Bundle
  wie die Doku mit einem Login.
- **Sicherheits-Header** setzt der Gateway einheitlich: `Content-Security-Policy`,
  `X-Content-Type-Options`, `Referrer-Policy`.

## Abläufe

### Synchron, ohne Prozess

![Ablauf synchron](arch-flow-sync.svg)

### Mit Prozess und Benutzer-Task

![Ablauf mit Prozess](arch-flow-process.svg)

## Engine

Die Engine ist **pro Projekt** wählbar. Der Gateway unterstützt mehrere Engines
gleichzeitig und leitet pro Prozess an die richtige.

| Engine | Wann |
|---|---|
| **Camunda 8** | Projekte, die Operate/Tasklist brauchen; Lizenzfrage pro Kunde |
| **Operaton** | Open Source (Apache 2.0), leichtgewichtig, Cockpit inklusive – reicht für viele Projekte |
| **keine** | Apps ohne Prozess |
| Camunda 7 | nur Bestand / Migration |

Eine Installation kann Camunda 8 und Operaton **nebeneinander** betreiben.

## Worker

### Worker-Familie

| Worker | Zweck |
|---|---|
| ServiceWorker | REST-Integration, z.B. Kernbanksystem über das API-Gateway |
| CustomWorker | Orchestrierung, Fachlogik, Aggregation für die UI |
| ValidationWorker / InitWorker | Prozess-Eingang |
| PersistenceWorker | eigene Daten (Postgres) |
| KafkaWorker (Consumer/Producer) | Events (später) |

Jeder Worker läuft synchron über den Gateway (`/worker/{topic}`) **und** als Schritt
in einem Prozess – ohne Änderung.

### Schichten: Basis-Worker pro Umgebung

Die Konfiguration (Basis-URL, Authentisierung, Header, DataSource) steckt in
**Basis-Workern pro Umgebung**. Projekte erben davon und definieren nur noch, was
fachlich ist. Eine Plattform-Schicht liefert die wiederverwendbaren Bausteine.

![Schichten der Worker](arch-worker-layers.svg)

- Wechselt das API-Gateway, wählt der Basis-Worker einen anderen Baustein – die Projekte
  merken nichts.
- Daraus entsteht ein **Katalog fertiger Service-Worker** für das Kernbanksystem (generiert
  aus dessen OpenAPIs), die beim Kunden nur noch vom Basis-Worker erben.

### PersistenceWorker

Damit eine Worker-App eigene Daten halten kann, ohne SQL von Hand: ein **generischer
Entity-Store** – alle Tabellen haben dieselben Spalten, so braucht es kein SQL pro Entity.

| Spalte | Inhalt |
|---|---|
| `id` | Schlüssel |
| `version` | Optimistic Locking (passt zum ETag-Muster) |
| `keys` | die abfragbaren Schlüsselfelder als `JSONB`, GIN-Index |
| `payload` | das Domain-Objekt als `JSONB` |
| `created_at/by`, `updated_at/by` | Audit; der Benutzer kommt aus dem Bearer-Token |

```scala
// Basis-Worker der Umgebung: woher die Verbindung kommt
trait AcmePersistenceWorkerDsl[In, Out] extends PersistenceWorkerDsl[In, Out]:
  protected def entityStore = AcmeStore.store   // PostgresEntityStore.app(PostgresConfig.fromEnv("ACME_DB"))

// Projekt: welche Entity, welche Schlüsselfelder
val notizen = EntityDef[Notiz]("notiz", _.id, n => Map("kundenNr" -> n.kundenNr))

class NotizSpeichernWorker extends AcmePersistenceWorkerDsl[In, Out]:
  override def runWorkZIO(in: In) =
    save(notizen, Notiz(...), in.version).map(stored => Out(...))
```

- Operationen im Worker: `get`, `query` (über die Schlüsselfelder), `save` (anlegen ohne
  Version, ändern mit der gelesenen Version), `delete`, `history`.
- **Audit-Log:** Jede Änderung schreibt in **derselben Transaktion** einen Eintrag in den
  Verlauf – Version, Aktion, Stand des Dokuments, Benutzer, Zeitpunkt. Revisionssicher
  wird er, wenn die App auf den Verlaufstabellen nur einfügen und lesen darf.
- **Konflikte:** Wer mit einer veralteten Version speichert oder löscht, bekommt einen
  Fehler, nichts wird überschrieben.
- Plain JDBC, kein ORM; ein eigenes Schema pro Worker-App, getrennt von den Engine-Daten.
  Relationales Mapping erst, wenn ein Projekt es braucht.

## UI

- **Design-System:** App-Shell (Login, Navigation, Fehlerbehandlung), Branding pro Kunde –
  das Theme lässt sich aus der Website der Bank übernehmen.
- **Seiten:** Eine App hat zwei Arten – die **reine Seite** (Übersicht, Suche,
  Buchung; Daten über Services) und das **UI eines Benutzer-Tasks**. Eine Seite ist mit
  Login oder **öffentlich**.
- **UI-Spez deklarativ:** pro Seite die Komponenten aus einem festen Katalog (Abschnitt,
  Formular, Feld, Tabelle, Detail, Aktion, Hinweis), gebunden über Feldpfade an die Typen des
  Datenmodells; Datenquellen (Service, Prozessstart, Benutzer-Task); Aktionen («ruft Service X»,
  «startet Prozess Y», «schliesst Task Z ab», «öffnet Seite»); Rollen.
- **Renderer zur Laufzeit:** Eine generische App zeigt die Seiten aus der Spez –
  kein generierter Code pro Seite. Derselbe Renderer ist die Live-Vorschau im
  UI Designer. Für Sonderfälle eine eigene Komponente unter einem Namen.
- **Figma optional:** Import von Design-Tokens und Layout-Hinweisen, wo ein Kunde mit
  Figma arbeitet – nicht die Quelle der Spez.

### Archetypen

| Archetyp | Beispiel | Bestandteile |
|---|---|---|
| **CRUD** | Stammdaten, interne Listen | UI · Gateway · PersistenceWorker · Postgres |
| **Integration** | Daten des Kernbanksystems anzeigen und ändern | UI · Gateway · ServiceWorker |
| **Prozess** | Kontoeröffnung, KYC mit Benutzer-Tasks | + Engine, BPMN/DMN |
| **Headless** | Batch, Synchronisation | Worker-Apps (+ Engine), keine UI |

## Komponenten-Modell

Jede Infrastruktur-Komponente hat einen von drei Zuständen:

- **`bundled`** – wir liefern und betreiben sie (Helm-Subchart / compose-Service).
- **`external`** – vorhanden; wir brauchen nur Verbindungsdaten und Secrets.
- **`off`** – nicht benötigt.

| Komponente | Lokal | Bei der Bank (Beispiel) | Abstraktion |
|---|---|---|---|
| Gateway, Worker-Apps, UI | bundled | bundled (immer) | – |
| IdP | Keycloak bundled | external (bereitgestellt) | OIDC / JWT |
| API-Gateway | Mock des Kernbanksystems | external | Baustein im Basis-Worker |
| Camunda 8 | Profil `c8` | pro Projekt, bundled oder external | Engine |
| Operaton | bundled | pro Projekt, bundled | Engine |
| Postgres | bundled | bundled oder external | JDBC |
| Kafka | – | später, nur external | KafkaWorker |
| E-Mail (SMTP) | Mailpit bundled | external (SMTP der Bank) | Mail-Worker |
| Kalender | Kalender-Mock | external (z.B. Outlook über Microsoft Graph) | Kalender-Worker |
| Observability | optional | external oder mitgeliefert | OpenTelemetry |

### Manifest pro Umgebung

Ein Manifest beschreibt, was eine Umgebung enthält. Daraus werden die
compose-Profile und die Helm-Values erzeugt.

```yaml
app: acme-kontoeroeffnung
environment: acme-test
ui: { enabled: true }
workerApps: [acme-konto, acme-kunde]
process:
  engine: operaton                  # c8 | operaton | none
components:
  idp:        { mode: external, kind: oidc, issuer: https://idp.example/realms/apps }
  apiGateway: { mode: external }
  operaton:   { mode: bundled }
  postgres:   { mode: external }
  kafka:      { mode: off }
```

## Umgebungen

### Lokal: docker compose

Profile, damit nur läuft, was gebraucht wird:

| Profil | Inhalt |
|---|---|
| `core` | Keycloak · Gateway · Worker-App(s) · UI · Postgres · Mock des Kernbanksystems |
| `operaton` | Operaton (+ Postgres) – leicht, Standard für die Entwicklung |
| `c8` | Camunda 8 (Zeebe, Operate, Tasklist, Elasticsearch) – braucht viel Speicher |

### Beim Kunden: Private Cloud

- **Vanilla Kubernetes.** Ingress-Klasse, StorageClass, Registry und Ressourcen sind
  Helm-Werte.
- **Namespaces** pro Umgebung, z.B. `acme-dev`, `acme-test`, `acme-abn`, `acme-prod`.
- **Registry der Bank, nur Mirror.** Images und Helm-Charts (OCI) werden in die Registry
  der Bank gespiegelt; wir liefern Image-Liste und Spiegel-Skript.
- **GitOps im Pull-Prinzip:** Argo CD oder GitLab Agent for Kubernetes – nichts
  wird von aussen in die Bankenzone gestossen.
- **Kernbanksystem** nur über das API-Gateway der Bank; Konfiguration in den
  Basis-Workern.
- **IdP** bereitgestellt; der Gateway prüft dessen Tokens.

### Später: AWS

Derselbe Helm-Chart auf EKS. Externe Komponenten wechseln auf AWS-Dienste (RDS,
MSK, Secrets Manager über External Secrets, ECR) – App-Code bleibt gleich.

## Sicherheit

- **Anmeldung:** OIDC Authorization Code + PKCE in der UI; der Gateway prüft das
  Bearer-Token (JWT, Issuer/Audience über JWKS).
- **Weitergabe:** Benutzer-Token bis in die Worker-App; der Basis-Worker entscheidet, ob es
  weitergereicht, getauscht (Token Exchange) oder durch Client Credentials ersetzt wird.
- **Öffentlicher Einstieg** (z.B. Terminanfrage auf der Homepage, ohne Login): Der
  Gateway hat dafür konfigurierte öffentliche Endpoints – jeder startet genau einen
  Prozess bzw. ruft genau einen Service, prüft die Eingabe gegen den Typ und spricht
  intern mit einem technischen Token; der Browser bekommt nie ein Token. Gegen Missbrauch:
  Double-Opt-in per E-Mail, bevor ein Mensch etwas sieht; Honeypot-Feld und Grössenlimits;
  Rate Limit im API-Gateway, im Gateway als Rückfall.
- **Rollen:** Ein Worker verlangt mindestens eine Rolle für den Aufruf, sonst 403. Die
  Worker-App liest sie aus dem Token (Entra wie Keycloak).
- **Netz:** nur der Gateway hat ein Ingress (API, UI-Bundle, Doku); Worker-Apps,
  Engines und Datenbanken sind intern.
- **Secrets:** Kubernetes Secrets, befüllt vom Betrieb des Kunden; nichts im Repo.
- **Audit:** Wer/wann in den Persistence-Tabellen; Prozess-Historie in der Engine.

## Deployment und Pipeline

- **Repo pro App** mit fester Struktur:
  ```
  acme-<app>/
    spec/       Spezifikation (Quelle der Wahrheit)
    worker/     Worker-App(s), Domäne, Seiten
    process/    optional: BPMN/DMN
    deploy/     Manifest + Helm-Values pro Umgebung
    docs/       generiert
  ```
- **Pipeline-Vorlage** (GitLab CI): Build, Tests, Simulation, Images, Chart,
  Doku, Architektur-Review als Gate.
- **Ein Helm-Chart** für alle Archetypen; Bestandteile über das Manifest ein- und
  ausgeschaltet.

## Betrieb

- **Logs, Metriken, Traces** über OpenTelemetry, angebunden an die Observability
  des Kunden (oder optional mitgeliefert).
- **Prozesse:** Operate (Camunda 8) bzw. Cockpit (Operaton).
- **Später:** Instanzen auf dem Spez-Baum – «wo hängt dieser Fall?» aus fachlicher Sicht.

## Entscheide

| # | Entscheid | Begründung |
|---|---|---|
| E1 | Orchescala als Basis; nur Fehlendes neu bauen | Vorhandene Spez, Gateway, Engine-Abstraktion, Worker |
| E2 | UI nur über den Gateway | Ein Einstiegspunkt, eine Token-Prüfung, Worker-Apps intern |
| E3 | Gateway generisch, Kundenlogik in Worker-Apps | Gateway bleibt Produkt |
| E5 | Engine pro Projekt: Camunda 8 oder Operaton, parallel möglich | Operate wo nötig, sonst Open Source |
| E6 | Konfiguration in Basis-Workern pro Umgebung | Projekte erben, statt zu konfigurieren |
| E7 | Komponenten `bundled` / `external` / `off` | Banken bringen IdP, API-Gateway, Kafka, DB mit |
| E8 | IdP und API-Gateway abstrakt | Der Kunde entscheidet; Entra muss möglich sein |
| E9 | PersistenceWorker als generischer JSONB-Entity-Store, plain JDBC | Kein SQL pro Entity, kein ORM nötig; relational bei Bedarf |
| E10 | Vanilla Kubernetes, Helm, GitOps im Pull-Prinzip; AWS später | Keine Lizenzkosten, Bankenzone, portabel |
| E11 | Kafka später, nur Integration | Zuerst die Kernbausteine |
| E12 | UI-Bundle aus der Worker-App, über den Gateway weitergeleitet | Ein Deployable pro App, UI und API in derselben Version, kein eigenes Ingress |
| E13 | Audit-Log im Entity-Store, in derselben Transaktion wie die Änderung | Jede Entity hat lückenlos einen Verlauf |
| E14 | App = Sammlung von Prozessen und Seiten; was nur liest, ist eine Seite mit Services | Einheitlich modelliert und validiert; keine Prozessinstanz pro Blick |
| E15 | UI-Spez deklarativ, Renderer zur Laufzeit statt Code-Generierung | WYSIWYG im Designer ohne zweite Implementierung; UI-Änderung ohne Build |
| E16 | Öffentlicher Einstieg über konfigurierte Gateway-Endpoints mit technischem Token; Double-Opt-in, Rate Limit | Kunden ohne Login, ohne Token im Browser und ohne anonyme Aufgaben bei Mitarbeitenden |
| E17 | Engine pro Projekt in der Projekt-Konfiguration, sonst Firmen-Default | Umsetzung von E5 im Generator |
| E18 | Termine als Einladung (`.ics`) per Mail; Outlook über Microsoft Graph später | Funktioniert mit jedem Mailserver, ohne Kalenderrechte |
