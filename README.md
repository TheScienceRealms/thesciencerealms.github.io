# The Science Realms

Free interactive AS revision for **Biology**, **Chemistry** and **Psychology**, in the style of the CCEA (Biology, Chemistry) and WJEC (Psychology) AS specifications. Hands-on labs, games, quizzes and notes.

**Live site:** https://thesciencerealms.github.io

| Realm | Subject | Page |
|---|---|---|
| The Science Realms | Home | `index.html` |
| Quiztoplasm | AS Biology (CCEA style) | `quiztoplasm/index.html` |
| ChemQuest | AS Chemistry (CCEA style) | `chemquest/index.html` |
| The Psycheverse | AS Psychology (WJEC style) | `psycheverse/index.html` |

An educational project by Adrianna Kelly · 2026.
Independent project, not affiliated with or endorsed by CCEA or WJEC. All questions are original.

Visit statistics are collected anonymously with [GoatCounter](https://www.goatcounter.com) (no cookies, no personal data). Each game, lab, topic and notes screen is counted as its own path, e.g. `/quiztoplasm/#sim-simpson`.

## How the site is built

Each realm is one self-contained HTML page (no server needed). The `src/` folder holds the working files used to build and edit them:

- `src/build/` – Quiztoplasm lab and game modules (`sims*.js`, `*.css`), patch scripts and Playwright play-through tests (`t*.js`).
- `src/cq/` – ChemQuest modules; `build.py` assembles them.
- `src/psy/` – Psycheverse data, notes and app; `build.py` assembles them.
- `src/realms/` – the Science Realms home page.
- `src/artifact-versions/` – the pages as published on claude.ai before moving here.

To change something, open a Claude Code session with this repository and describe the change.
