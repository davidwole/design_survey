import "../styles/RoomSelector.css";
import "../styles/RoomFocus.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

type PackageSelectorProps = {
  option: { icon: string; name: string };
  navigateTo: string;
  dataType: "homeType" | "homeOwnership" | "roomStatus" | "timeframe";
};

function PackageSelector({
  option,
  navigateTo,
  dataType,
}: PackageSelectorProps) {
  const navigate = useNavigate();
  const { setHomeType, setHomeOwnership, setRoomStatus, setTimeframe } =
    useAppContext();

  const updateDataAndNavigate = () => {
    // Store the selected data based on the type
    switch (dataType) {
      case "homeType":
        setHomeType(option.name);
        break;
      case "homeOwnership":
        setHomeOwnership(option.name);
        break;
      case "roomStatus":
        setRoomStatus(option.name);
        break;
      case "timeframe":
        setTimeframe(option.name);
        break;
    }

    navigate(navigateTo);
  };

  return (
    <div className={`room-selector `} onClick={updateDataAndNavigate}>
      {/* Main Circle */}
      <div className="relative">
        <div className={`focus-circle`}>
          {/* Room Icon */}
          <div className="room-icon-emoji">{option.icon}</div>

          {/* Room Label inside circle */}
          <p className="room-label">{option.name}</p>
        </div>
      </div>
    </div>
  );
}

export default PackageSelector;
