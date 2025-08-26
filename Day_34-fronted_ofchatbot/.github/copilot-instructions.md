<!-- .github/copilot-instructions.md - concise, actionable instructions for AI coding agents -->
# Quick orientation for automated coding agents

Purpose: help an AI coding agent be immediately useful in this repo by describing the architecture, run/debug workflow, conventions, and the exact places to change AI/integration behavior.

1) Big picture
- Two main apps: `backend/` (Express + Mongoose + Socket.IO + AI integrations) and `frontend/` (Vite + React SPA).
- Backend is the API, DB connector, and real-time socket server. Frontend is a Vite app that talks to the backend REST/API and sockets for chat updates.

2) How to run (developer flow)
- Backend (default):
  - cd into `backend/` and run `npm install` then `npm run dev` (script uses `npx nodemon server.js`). Server listens on port 3001 by default (`backend/server.js`).
- Frontend (default):
  - cd into `frontend/` and run `npm install` then `npm run dev` (Vite). Vite default port (5173) applies unless configured otherwise in `vite.config.js`.

3) Important files / where to look first
- `backend/server.js` — app bootstrap, HTTP server, and `serverSocket` registration (ports and top-level start).
- `backend/src/app.js` — Express app wiring (middleware, CORS, routes) (open this first to see global middleware expectations).
- `backend/src/DB/db.js` — DB connection logic (Mongo URI usage). Check `.env` reading here.
- `backend/src/sockets/server.socket.js` — socket.io event handlers and namespace wiring used by the chat UI.
- `backend/src/service/ai.service.js` and `backend/src/services/ai.service.js` — primary AI wrapper(s) using `@google/genai` (contains model names, embedding settings and persona/systemInstruction). If changing model behavior, edit these.
- `backend/src/service/vector.service.js` — vector store / Pinecone interactions (embedding storage / retrieval).
- `backend/src/controllers/*.js` and `backend/src/models/*.js` — standard Express controller → model pattern (Mongoose models). Example: `d34chats.controller.js` creates chat entries via `d34chats.model`.
- `frontend/src/*` — React components, `main.jsx` and `App.jsx` are the entry points; `ChatInterface.jsx` and sidebar files show how socket/API data is consumed.

4) Environment & secrets (discoverable hints)
- `backend` uses `dotenv`. Expect at least the Gemini API key referenced in `ai.service.js` (`GEMINI_API_KEY` per comment). Also confirm the repo `.env` for common names such as `MONGO_URI`, `JWT_SECRET`, and any `PINECONE_*` keys before running.

5) Project-specific conventions & gotchas
- There are two folders with similar names: `src/service/` and `src/services/` — both contain AI related files. Check both locations when adding or refactoring AI code to avoid duplication.
- Controllers follow a simple pattern: functions receive `(req, res)` and export named handlers (see `d34chats.controller.js`). Keep the same export shape when adding handlers.
- The backend `package.json` dev script uses `npx nodemon server.js` (with an extra leading space). It works, but adding a `start` script (`node server.js`) or making `nodemon` a devDependency is safe if you modify scripts.
- Express version is declared as `^5.1.0`. Some middleware examples online assume Express v4; verify middleware signatures when editing.

6) AI integration details agents must know
- `backend/src/service/ai.service.js` uses `@google/genai` with two primary capabilities implemented: `generateResponse(prompt)` which calls `models.generateContent` and `generVector(prompt)` which calls `models.embedContent`.
- Model names used in the repo: `gemini-2.5-flash` (generation) and `gemini-embedding-001` (embeddings). Edit these strings directly in `ai.service.js` to change the model. Embedding dimensionality is set to 768.
- The service includes a `systemInstruction` persona block — preserve or update it deliberately when changing behavior.

7) Editing examples (concrete snippets)
- To change AI temperature: edit `config.temperature` inside `backend/src/service/ai.service.js` (default 0.7).
- To change embedding model: update the `model` value in `generVector` in the same file.
- To add a new chat route: follow existing pattern in `src/controllers/*` and register it in the relevant route file under `src/routes/`.

8) Debugging tips
- If server fails to start: check `backend/server.js` output (port 3001) and verify `.env` keys. Missing Gemini or Mongo keys commonly cause runtime failures.
- For socket problems: confirm `server.socket.js` is registering namespaces/events expected by frontend `ChatInterface.jsx`.

9) Tests & CI
- No test framework found. When adding tests, prefer lightweight node tests under `backend/test` and add npm scripts for `test`.

10) What to change in this file
- If you (or another AI agent) update repository structure or add CI/test tooling, update this file to reflect the new commands and major files to inspect.

If anything here is unclear or I missed a file you rely on, tell me which area to expand and I will iterate.
