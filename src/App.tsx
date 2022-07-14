import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Settings } from "./types";
import Game from "./views/Game";
import Home from "./views/Home";

export default function App() {
  const [settings, setSettings] = useState<Settings>({
    tilesStyle: "numbers",
    players: 4,
    boardSize: 4,
  });

  return (
    <Routes>
      <Route
        path="/"
        element={<Home settings={settings} setSettings={setSettings} />}
      />

      <Route path="memory" element={<Game settings={settings} />} />
    </Routes>
  );
}
