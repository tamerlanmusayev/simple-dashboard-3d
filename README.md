# Simple Dashboard 3D

A React app with two pages: **Designers** and **Editor**.

- Designers page: view and add designers.
- Editor page: 3D canvas to add, select, move, and edit objects with assigned designers.

---

## Features

- Add designers and assign objects to them.
- 3D editor using **React Three Fiber**.
- Objects are hoverable, selectable, and movable.
- Edit object properties: designer, size, color, name.
- State persisted in browser using **Zustand + localStorage**.
- i18n support with English, Russian, and Azerbaijani.
- Uses **Chakra UI** for layout and styling.

---

## Tech Stack

- React 18+
- Zustand (state management)
- React Three Fiber (3D scene)
- Chakra UI (UI components)
- react-i18next (translations)
- Jest + @testing-library/react (unit tests)

---

## Installation

```bash
git clone https://github.com/tamerlanmusayev/simple-dashboard-3d
cd simple-dashboard-3d
npm install
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/)
in your browser.

## Run tests

```bash
npm run test
```
