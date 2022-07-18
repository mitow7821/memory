import BoardSize from "../components/settingsRows/BoardSize";
import Players from "../components/settingsRows/Players";
import TilesStyle from "../components/settingsRows/TilesStyle";
import { Settings } from "../types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function Home(props: Props) {
  const { t } = useTranslation();

  function changeSettingValues(newSettings: Partial<Settings>) {
    props.setSettings((settings) => ({
      ...settings,
      ...newSettings,
    }));
  }

  return (
    <div className="bg-dark w-screen h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-white text-[1.7rem] font-semibold">memory</h1>

      <div className="w-[450px] bg-white rounded-2xl px-8 py-10 grid gap-5">
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

        <Link
          to="memory"
          className="bg-accent text-white rounded-full text-center font-medium py-2 mt-3"
        >
          {t("startGame")}
        </Link>
      </div>
    </div>
  );
}
