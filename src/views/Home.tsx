import BoardSize from "../components/settingsRows/BoardSize";
import Players from "../components/settingsRows/Players";
import TilesStyle from "../components/settingsRows/TilesStyle";
import { Settings } from "../types";
import { Link } from "react-router-dom";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function Home(props: Props) {
  function changeSettingValues(newSettings: Partial<Settings>) {
    props.setSettings((settings) => ({
      ...settings,
      ...newSettings,
    }));
  }

  return (
    <div>
      <TilesStyle
        tilesStyle={props.settings.tilesStyle}
        changeSettingValues={changeSettingValues}
      />

      <Players
        players={props.settings.players}
        changeSettingValues={changeSettingValues}
      />

      <BoardSize
        boardSize={props.settings.boardSize}
        changeSettingValues={changeSettingValues}
      />

      <Link to="memory">Start game</Link>
    </div>
  );
}
