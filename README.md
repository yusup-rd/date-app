# Date App

A cute, single-page date invitation: say yes, pick dinner, choose a day and time, and the plan is sent as a Telegram message.

**Live site:** [https://yrd-kitty-date.netlify.app/](https://yrd-kitty-date.netlify.app/)

## What it does

The app walks through four screens:

1. **Invite** — A yes/no love note. Tapping **No!** plays a sprite-sheet kitty that runs in and kicks the button off the screen so “no” is no longer an option.
2. **Dinner vote** — Choose one of eight options (pizza, burger, sushi, ramen, pasta, donuts, pancakes, or a strawberry treat).
3. **When** — Pick a date (today or later) and a time. Submitting calls a Netlify Function that posts the plan to Telegram.
4. **Confirmation** — A summary of food, day, and time.

The background is a field of rising Hello Kitty–style silhouettes. Clicks leave a small spark burst. Fonts and animation frames are preloaded so the first screen does not flash missing assets.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Toasts | react-hot-toast |
| Hosting | [Netlify](https://www.netlify.com/) (static app + serverless function) |
| Notifications | Telegram Bot API |

## Project layout

```
src/
  App.tsx                          # Step state, preload, Telegram submit
  components/modals/               # Invite, food, date form, final
  components/ui/                   # Cards, kitty background, kick animation, sparks
  utils/constants.ts               # Food options
netlify/functions/sendTelegram.ts  # POST handler → Telegram
netlify.toml
```

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

- `npm run build` — type-check and production build
- `npm run preview` — serve the build locally
- `npm run lint` — ESLint

## Telegram notifications

When someone submits the date form, the frontend `POST`s JSON `{ food, date, time }` to `/.netlify/functions/sendTelegram`. That function sends a message like:

```
💌 New Date Planned

🍔 Food: Pizza
📅 Date: 2026-09-10
⏰ Time: 19:00
```

Create a bot with [@BotFather](https://t.me/BotFather), start a chat with the bot (or add it to a group), then set these **Netlify environment variables** (Site settings → Environment variables). Do not commit them.

| Variable | Meaning |
| --- | --- |
| `BOT_TOKEN` | Token from BotFather |
| `CHAT_ID` | Chat (or group) ID that should receive the plan |

`vite` alone does not run Netlify Functions. To test submit locally, use [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```bash
npx netlify dev
```

That serves the Vite app and the function together. Put the same variables in a `.env` file for local use (`.env` is gitignored via `*.local`; prefer `.env` only if you keep it out of git).

## Deploy

The live site is already on Netlify. To deploy your own copy:

1. Connect this repo to a Netlify site (build command `npm run build`, publish directory `dist`).
2. Set `BOT_TOKEN` and `CHAT_ID`.
3. `netlify.toml` already points functions at `netlify/functions`.

## Customizing

- Food list: `src/utils/constants.ts`
- Copy and steps: files under `src/components/modals/`
- Colors: `@theme` in `src/index.css`
- Floating kitties: constants at the top of `src/components/ui/KittyBubbleBackground.tsx`

## License

[MIT](LICENSE) © 2026 Yusup
