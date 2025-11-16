import { Info } from "lucide-react";
import { useState } from "react";
import InfoPage from "../components/infoPage.tsx";

function Header({ name = "Agent" }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="flex w-full h-1/12 justify-center items-center bg-[#1e1e2e]">
        {/* Name and pic */}
        <div className="flex items-center w-full h-full gap-4 p-2">
          <img
            src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
            alt="Robot.img"
            className=" h-full rounded-full ring outline-[#b4befe] outline-2 "
          />
          <span className="text-[#b4befe] text-xl"> {name}</span>
        </div>
        <Info
          className="text-[#b4befe] m-4 hover:text-[#cdd6f4] transition duration-300 cursor-pointer"
          onClick={() => setShowInfo(true)}
        />
      </div>

      {/* Info Modal */}
      {showInfo && <InfoPage setShowInfo={setShowInfo} />}
    </>
  );
}

export default Header;
