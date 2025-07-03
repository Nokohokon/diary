# 📔 Mein Tagebuch - Diary Web App

Eine moderne, persönliche Tagebuch-Webapp mit Next.js, NextAuth.js und Prisma.

## ✨ Features

- 🔐 **Sichere Authentifizierung** - Magic Link Login über E-Mail (kein Passwort nötig)
- 📝 **Persönliche Einträge** - Erstelle und verwalte deine Tagebucheinträge
- 😊 **Stimmungs-Tracking** - Verfolge deine Emotionen mit jedem Eintrag
- 🔍 **Suche & Filter** - Finde deine Einträge schnell und einfach
- 🎨 **Modernes Design** - Schöne, responsive UI mit Gradient-Designs
- 📱 **Mobile-First** - Optimiert für alle Geräte

## 🚀 Quick Start

### Voraussetzungen

- Node.js 18+ 
- npm oder yarn

### Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd diary
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**
   
   Erstelle eine `.env` Datei im Root-Verzeichnis:
   ```env
   # Datenbank (SQLite für lokale Entwicklung)
   DATABASE_URL="file:./dev.db"
   
   # NextAuth.js
   NEXTAUTH_SECRET="dein-geheimer-schluessel-hier"
   NEXTAUTH_URL="http://localhost:3000"
   
   # E-Mail Provider (z.B. Gmail)
   EMAIL_SERVER_USER="deine@email.com"
   EMAIL_SERVER_PASSWORD="dein-app-passwort"
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_FROM="deine@email.com"
   ```

4. **Datenbank einrichten**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Development Server starten**
   ```bash
   npm run dev
   ```

   Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 🔧 E-Mail Setup

### Gmail Setup

1. **2-Faktor-Authentifizierung aktivieren** in deinem Google-Account
2. **App-Passwort erstellen**:
   - Gehe zu Google Account Einstellungen
   - Sicherheit → 2-Faktor-Authentifizierung → App-Passwörter
   - Erstelle ein neues App-Passwort für "Mail"
   - Verwende dieses Passwort in `EMAIL_SERVER_PASSWORD`

### Alternative: Mailtrap (für Testing)

Für Entwicklung kannst du auch [Mailtrap](https://mailtrap.io/) verwenden:

```env
EMAIL_SERVER_HOST="smtp.mailtrap.io"
EMAIL_SERVER_PORT=2525
EMAIL_SERVER_USER="dein-mailtrap-user"
EMAIL_SERVER_PASSWORD="dein-mailtrap-passwort"
EMAIL_FROM="test@example.com"
```

## 🗄️ Datenbank

### Lokale Entwicklung (SQLite)

Die App nutzt SQLite für lokale Entwicklung - keine weitere Setup nötig!

### Produktion (PostgreSQL/MySQL)

Für Produktion (z.B. Vercel):

1. **Datenbank-Provider wählen** (z.B. PlanetScale, Supabase, Railway)
2. **DATABASE_URL aktualisieren** in den Umgebungsvariablen
3. **Prisma Schema anpassen** falls nötig:
   ```prisma
   datasource db {
     provider = "postgresql" // oder "mysql"
     url      = env("DATABASE_URL")
   }
   ```
4. **Migration durchführen**:
   ```bash
   npx prisma migrate deploy
   ```

## 🚀 Deployment auf Vercel

1. **Repository zu GitHub pushen**

2. **Vercel Dashboard**:
   - Neues Projekt erstellen
   - GitHub Repository verknüpfen
   - Umgebungsvariablen hinzufügen

3. **Umgebungsvariablen in Vercel**:
   ```
   DATABASE_URL=deine-produktions-datenbank-url
   NEXTAUTH_SECRET=dein-super-sicherer-schluessel
   NEXTAUTH_URL=https://deine-app.vercel.app
   EMAIL_SERVER_USER=deine@email.com
   EMAIL_SERVER_PASSWORD=dein-app-passwort
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_FROM=deine@email.com
   ```

4. **Deploy** - Vercel baut automatisch bei jedem Push!

## 🏗️ Technologie-Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentifizierung**: NextAuth.js (Auth.js)
- **Datenbank**: Prisma ORM
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Projektstruktur

```
diary/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Auth-Seiten
│   └── ...
├── components/            # React Components
├── lib/                   # Utility-Funktionen
├── prisma/               # Datenbank Schema
├── types/                # TypeScript Typen
└── ...
```

## 🔒 Sicherheit

- Magic Link Authentication (kein Passwort speichern)
- Session-basierte Autorisierung
- CSRF-Schutz durch NextAuth.js
- Datenbank-Zugriff nur für authentifizierte Benutzer
- Sichere E-Mail-Übertragung

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne eine Pull Request

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei.

---

💝 **Viel Spaß beim Tagebuch schreiben!**
