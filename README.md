# DigitalShop - Online Shop für digitale Produkte

Ein vollständiger Online-Shop für digitale Assets wie Wallpapers, Icons und Templates, erstellt mit HTML, CSS (Bootstrap) und JavaScript. Simuliert echte E-Commerce-Funktionen ohne Backend.

## Features

- **Produktkatalog**: 10 digitale Produkte in Kategorien (Wallpapers, Icons, Templates) mit Vorschaubildern, Beschreibungen und Bewertungen.
- **Suche und Filter**: Suchleiste und Kategorien-Filter für Produkte.
- **Warenkorb**: Hinzufügen, Entfernen und Anzeige von digitalen Artikeln.
- **Checkout**: Vollständiges Formular mit Adresse; Währungsumrechnung; sofortiger Download-Link nach Zahlung (simuliert).
- **Währungsumrechnung**: Live-Umrechnung in EUR, USD, GBP.
- **Zahlungsoptionen**: Simulierte Anbieter wie PayPal, Stripe, Kreditkarte, Sofortüberweisung, Klarna.
- **Newsletter-Anmeldung**: Simuliertes Abonnement.
- **Responsive Design**: Bootstrap für mobile und Desktop-Ansicht.
- **Footer**: Links zu AGB, Datenschutz, etc.

## Wie starten

1. Stelle sicher, dass Python installiert ist.
2. Öffne ein Terminal im Projektverzeichnis.
3. Führe aus: `python3 -m http.server 8000`
4. Öffne http://localhost:8000 in deinem Browser.

## Struktur

- `index.html`: Haupt-HTML-Datei mit Bootstrap-Integration.
- `styles.css`: Zusätzliche benutzerdefinierte Styles.
- `script.js`: JavaScript-Logik für alle Funktionen.
- `README.md`: Diese Datei.

## Hinweis

Dies ist eine clientseitige Demo. Alle Transaktionen und Downloads sind simuliert und führen zu keinen echten Aktionen. Für einen echten Shop wäre ein Backend (z.B. Node.js, PHP) und eine Datenbank erforderlich.