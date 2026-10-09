## Von der Spezifikation bis zum Betrieb

Wie sieht das in der Praxis aus? Gerne zeige ich dir in einer **Live-Demo**, wie aus
**einer Spezifikation** eine laufende App wird – in rund 30 Minuten, online oder bei dir vor Ort,
mit Zeit für deine Fragen. [Schreib mir](mailto:pascal.mengelt@z9nai.ch?subject=Demo%20Orchescala)
für einen Termin.

Gezeigt wird eine echte App – **Kundentermine**: Kundinnen und Kunden buchen ohne Login einen
Termin, die Beraterin oder der Berater bestätigt mit Login. Die Demo führt in acht Stationen
durch den ganzen Kreis: Seiten, Code, Tests, Doku und Betrieb.

<svg class="demo-cycle" viewBox="0 0 680 520" role="img" aria-labelledby="demo-cycle-title">
<title id="demo-cycle-title">Die acht Stationen der Demo im Orchescala-Kreis</title>
<path d="M348.6 100.2 A165 165 0 0 1 504.8 256.4 L472.2 274.2 L439.9 259.8 A100 100 0 0 0 345.2 165.1 L363.0 134.5 Z" fill="#C4362F"/>
<path d="M504.8 273.6 A165 165 0 0 1 229.6 387.6 L240.0 351.9 L273.1 339.3 A100 100 0 0 0 439.9 270.2 L470.5 288.0 Z" fill="#A82B27"/>
<path d="M217.4 375.4 A165 165 0 0 1 331.4 100.2 L349.2 132.8 L334.8 165.1 A100 100 0 0 0 265.7 331.9 L231.5 341.0 Z" fill="#8C2320"/>
<text class="title" x="340" y="254" text-anchor="middle" dominant-baseline="central">Kundentermine</text>
<text class="sub" x="340" y="276" text-anchor="middle" dominant-baseline="central">eine Spezifikation</text>
<circle cx="389.6" cy="142.1" r="13" fill="#FFFFFF"/><text class="num" x="389.6" y="142.1" text-anchor="middle" dominant-baseline="central" fill="#C4362F">1</text>
<text class="title" x="408.6" y="85.3" dominant-baseline="central">1 Spezifikation</text>
<text class="sub" x="408.6" y="103.3" dominant-baseline="central">orch-spec</text>
<circle cx="457.0" cy="202.8" r="13" fill="#FFFFFF"/><text class="num" x="457.0" y="202.8" text-anchor="middle" dominant-baseline="central" fill="#C4362F">2</text>
<text class="title" x="501.6" y="169.1" dominant-baseline="central">2 Seiten</text>
<text class="sub" x="501.6" y="187.1" dominant-baseline="central">Designer, live</text>
<circle cx="460.1" cy="321.0" r="13" fill="#FFFFFF"/><text class="num" x="460.1" y="321.0" text-anchor="middle" dominant-baseline="central" fill="#A82B27">3</text>
<text class="title" x="505.9" y="332.3" dominant-baseline="central">3 Generieren</text>
<text class="sub" x="505.9" y="350.3" dominant-baseline="central">Gerüst aus Spec</text>
<circle cx="396.0" cy="385.1" r="13" fill="#FFFFFF"/><text class="num" x="396.0" y="385.1" text-anchor="middle" dominant-baseline="central" fill="#A82B27">4</text>
<text class="title" x="417.3" y="420.9" dominant-baseline="central">4 Ausrollen</text>
<text class="sub" x="417.3" y="438.9" dominant-baseline="central">Bauen, compose</text>
<circle cx="301.3" cy="391.7" r="13" fill="#FFFFFF"/><text class="num" x="301.3" y="391.7" text-anchor="middle" dominant-baseline="central" fill="#A82B27">5</text>
<text class="title" x="286.5" y="430.0" text-anchor="end" dominant-baseline="central">5 Testen</text>
<text class="sub" x="286.5" y="448.0" text-anchor="end" dominant-baseline="central">Simulationen</text>
<circle cx="215.5" cy="310.3" r="13" fill="#FFFFFF"/><text class="num" x="215.5" y="310.3" text-anchor="middle" dominant-baseline="central" fill="#8C2320">6</text>
<text class="title" x="168.0" y="317.6" text-anchor="end" dominant-baseline="central">6 Nutzen</text>
<text class="sub" x="168.0" y="335.6" text-anchor="end" dominant-baseline="central">Kunde, Berater</text>
<circle cx="217.1" cy="215.4" r="13" fill="#FFFFFF"/><text class="num" x="217.1" y="215.4" text-anchor="middle" dominant-baseline="central" fill="#8C2320">7</text>
<text class="title" x="170.3" y="186.4" text-anchor="end" dominant-baseline="central">7 Doku</text>
<text class="sub" x="170.3" y="204.4" text-anchor="end" dominant-baseline="central">Gateway, Projekt</text>
<circle cx="281.9" cy="145.9" r="13" fill="#FFFFFF"/><text class="num" x="281.9" y="145.9" text-anchor="middle" dominant-baseline="central" fill="#8C2320">8</text>
<text class="title" x="259.8" y="90.5" text-anchor="end" dominant-baseline="central">8 Betrieb</text>
<text class="sub" x="259.8" y="108.5" text-anchor="end" dominant-baseline="central">Cockpit, Logs</text>
<rect x="120" y="484" width="12" height="12" rx="2" fill="#C4362F"/>
<text class="sub" x="139" y="490" dominant-baseline="central">Fachseite, ohne Code</text>
<rect x="300" y="484" width="12" height="12" rx="2" fill="#A82B27"/>
<text class="sub" x="319" y="490" dominant-baseline="central">Entwicklung</text>
<rect x="430" y="484" width="12" height="12" rx="2" fill="#8C2320"/>
<text class="sub" x="449" y="490" dominant-baseline="central">Nutzung und Betrieb</text>
</svg>
<svg class="demo-cycle-mobile" viewBox="165 90 350 350" role="img" aria-label="Die acht Stationen der Demo im Orchescala-Kreis">
<path d="M348.6 100.2 A165 165 0 0 1 504.8 256.4 L472.2 274.2 L439.9 259.8 A100 100 0 0 0 345.2 165.1 L363.0 134.5 Z" fill="#C4362F"/>
<path d="M504.8 273.6 A165 165 0 0 1 229.6 387.6 L240.0 351.9 L273.1 339.3 A100 100 0 0 0 439.9 270.2 L470.5 288.0 Z" fill="#A82B27"/>
<path d="M217.4 375.4 A165 165 0 0 1 331.4 100.2 L349.2 132.8 L334.8 165.1 A100 100 0 0 0 265.7 331.9 L231.5 341.0 Z" fill="#8C2320"/>
<text class="title" x="340" y="254" text-anchor="middle" dominant-baseline="central">Kundentermine</text>
<text class="sub" x="340" y="276" text-anchor="middle" dominant-baseline="central">eine Spezifikation</text>
<circle cx="389.6" cy="142.1" r="13" fill="#FFFFFF"/><text class="num" x="389.6" y="142.1" text-anchor="middle" dominant-baseline="central" fill="#C4362F">1</text>
<circle cx="457.0" cy="202.8" r="13" fill="#FFFFFF"/><text class="num" x="457.0" y="202.8" text-anchor="middle" dominant-baseline="central" fill="#C4362F">2</text>
<circle cx="460.1" cy="321.0" r="13" fill="#FFFFFF"/><text class="num" x="460.1" y="321.0" text-anchor="middle" dominant-baseline="central" fill="#A82B27">3</text>
<circle cx="396.0" cy="385.1" r="13" fill="#FFFFFF"/><text class="num" x="396.0" y="385.1" text-anchor="middle" dominant-baseline="central" fill="#A82B27">4</text>
<circle cx="301.3" cy="391.7" r="13" fill="#FFFFFF"/><text class="num" x="301.3" y="391.7" text-anchor="middle" dominant-baseline="central" fill="#A82B27">5</text>
<circle cx="215.5" cy="310.3" r="13" fill="#FFFFFF"/><text class="num" x="215.5" y="310.3" text-anchor="middle" dominant-baseline="central" fill="#8C2320">6</text>
<circle cx="217.1" cy="215.4" r="13" fill="#FFFFFF"/><text class="num" x="217.1" y="215.4" text-anchor="middle" dominant-baseline="central" fill="#8C2320">7</text>
<circle cx="281.9" cy="145.9" r="13" fill="#FFFFFF"/><text class="num" x="281.9" y="145.9" text-anchor="middle" dominant-baseline="central" fill="#8C2320">8</text>
</svg>

### 1 · Spezifikation – orch-spec

Die Fachseite beschreibt den Prozess im Browser: den Ablauf neben dem BPMN-Diagramm, die
Terminregeln als Entscheidungstabelle (DMN), das Datenmodell mit Ein- und Ausgaben. orch-spec
prüft dabei laufend, ob alles zusammenpasst.

- **Vorteil**: Eine Quelle für alles Weitere – Fachseite und Entwicklung reden über dasselbe Modell.
- **Einsparung**: Kein Fachkonzept, das später von Hand in Code übersetzt werden muss.

### 2 · Seiten – der Designer

Die Seiten der App entstehen aus Bausteinen, live mit Beispieldaten aus dem Datenmodell.
Was ein Knopf tut – einen Service aufrufen, einen Prozess starten –, kommt aus Auswahllisten.
Der Designer zeigt die Seiten mit demselben Renderer wie die App.

- **Vorteil**: Was im Designer steht, steht in der App – eine Änderung ist ohne Build sichtbar.
- **Einsparung**: Kein eigenes Frontend-Projekt, kein Release für einen geänderten Text.

### 3 · Generieren

Aus der Spezifikation entstehen die Domäne, die Gerüste der Worker, die Simulationen und das BPMN
mit seinen Mappings. Bestehendes überschreibt der Generator nie; die Fachlogik ergänzt die
Entwicklung – typisiert und getestet.

- **Vorteil**: Schnittstellen, Prozess und Code bleiben konsistent.
- **Einsparung**: Boilerplate und Mappings von Hand fallen weg.

### 4 · Bauen und Ausrollen

Ein Build packt die Seiten in die Worker-App und erzeugt die Images. Lokal läuft alles mit
Docker Compose, beim Kunden auf Kubernetes – mit denselben Images. Der Gateway ist der einzige
Einstieg: Seiten, öffentliche Aufrufe, Prozesse und Doku.

- **Vorteil**: Dieselben Artefakte überall, die Konfiguration kommt aus der Umgebung.
- **Einsparung**: Keine getrennten Deployments für Frontend und Backend.

### 5 · Testen

Simulationen spielen die Szenarien gegen die echte Engine durch – auch gleichzeitige Buchungen
und Ablehnungen. In der Demo haben sie echte Lücken gefunden, die beim Spezifizieren niemand gesehen hat.

- **Vorteil**: Fehler zeigen sich vor der Produktion, nicht danach.
- **Einsparung**: Weniger manuelles Durchklicken bei jeder Änderung.

### 6 · Nutzen – Kunde und Berater

Der Kunde bucht ohne Login und bestätigt per E-Mail; die Beraterin nimmt die Anfrage mit Login an;
beide erhalten die Einladung. Der Gateway gibt nach aussen nur frei, was konfiguriert ist – mit
Rate Limit und Grössenlimit, ohne Token im Browser.

- **Vorteil**: Öffentliche Seiten und interne Prozesse in einer App, sicher getrennt.
- **Einsparung**: Keine eigene öffentliche API und Sicherheitsschicht pro App.

### 7 · Doku

Die API des Gateways und die Doku des Projekts – Prozesse mit Diagrammen, Services, Ein- und
Ausgaben mit Beispielen – werden aus der Domäne erzeugt und mit der App ausgeliefert.

- **Vorteil**: Die Doku ist immer auf dem Stand der Software.
- **Einsparung**: Keine Dokumentation von Hand, die veraltet.

### 8 · Betrieb

Im Cockpit der Engine sieht der Betrieb jede Instanz mit ihrem Schlüssel, die Timer und die
Fehler. Nach aussen gibt der Gateway nur den Status, das Detail steht im Log. Was der Betrieb
lernt, fliesst in die nächste Version der Spezifikation – der Kreis schliesst sich.

- **Vorteil**: Der Betrieb sieht, was schiefging – und warum.
- **Einsparung**: Kürzere Fehlersuche, weniger Rückfragen bei der Entwicklung.
