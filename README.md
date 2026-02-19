# Panel Operatora Call Center

Aplikacja do obsługi zgłoszeń klientów w call center — Vue 3, TypeScript, PrimeVue.

## Tech Stack

- **Vue 3** — Composition API, `<script setup lang="ts">`
- **TypeScript** — strict mode, enumy, generics
- **Pinia** — Setup Store, niemutowalny state
- **Vue Router** — lazy loading, catch-all redirect
- **PrimeVue** — DataTable, Dialog, Breadcrumb, Toast
- **Sass** — zmienne, mixiny, BEM, responsywność
- **Axios** — wydzielona warstwa API
- **Zod** — walidacja formularzy
- **json-server** — mock REST API
- **ESLint + Prettier** — code quality
- **Husky + lint-staged** — pre-commit hooks (ESLint + Prettier + vue-tsc)
- **GitHub Actions** — CI (type-check, lint, build)

## Uruchomienie

```bash
git clone https://github.com/your-user/call-center-panel.git
cd call-center-panel
npm install
npm run dev:full
```

Aplikacja: `http://localhost:5173`
API: `http://localhost:3005`

## Komendy

| Komenda | Opis |
|---------|------|
| `npm run dev:full` | Frontend + API równolegle |
| `npm run dev` | Tylko Vite dev server |
| `npm run server` | Tylko json-server |
| `npm run build` | Production build |
| `npm run type-check` | Sprawdzenie typów |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Struktura

```
src/
├── api/            # Warstwa API (axios)
├── assets/styles/  # Sass (zmienne, mixiny, reset)
├── components/     # Komponenty UI
│   ├── layout/     # Sidebar, nawigacja
│   └── tickets/    # Tabela, karty, badge, filtry, dialog
├── config/         # PrimeVue theme preset
├── constants/      # Labele, opcje, konfiguracja
├── stores/         # Pinia store
├── types/          # TypeScript typy i enumy
├── utils/          # Helpery (formatDate)
├── validation/     # Zod schematy
├── views/          # Widoki (lista, szczegóły)
└── router/         # Vue Router
```

## Funkcjonalności

- Lista zgłoszeń z paginacją i sortowaniem server-side
- Filtrowanie po statusie (Wszystkie / Nowe / W trakcie / Zamknięte)
- Szczegóły zgłoszenia ze zmianą statusu
- Tworzenie nowych zgłoszeń z walidacją (Zod)
- Usuwanie z potwierdzeniem
- Toast notyfikacje (sukces / błąd)
- Responsywność (tabela → karty na mobile)
- Breadcrumb nawigacja

## Zmienne środowiskowe

```bash
cp .env.example .env.development
```

| Zmienna | Domyślnie |
|---------|-----------|
| `VITE_API_URL` | `http://localhost:3005` |
