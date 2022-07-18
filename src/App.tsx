import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Settings } from "./types";
import Game from "./views/Game";
import Home from "./views/Home";

function getSettings(): Settings {
  const fromStorage = localStorage.getItem("memory_settings");

  return fromStorage
    ? JSON.parse(fromStorage)
    : {
        tilesStyle: "numbers",
        players: 4,
        boardSize: 4,
      };
}

export default function App() {
  const [settings, setSettings] = useState<Settings>(getSettings());

  useEffect(() => {
    localStorage.setItem("memory_settings", JSON.stringify(settings));
  }, [settings]);

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
