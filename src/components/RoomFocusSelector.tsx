import { useNavigate } from "react-router-dom";
import { RoomData, useAppContext } from "../context/AppContext";
import "../styles/RoomSelector.css";
import "../styles/RoomFocus.css";

type RoomFocusSelectorProps = {
  room: RoomData;
  isHighlighted?: boolean;
};

function RoomFocusSelector({
  room,
  isHighlighted = false,
}: RoomFocusSelectorProps) {
  const navigate = useNavigate();
  const { setFocusedRoom } = useAppContext();

  const handleClick = () => {
    if (isHighlighted) {
      // Set the focused room in the app context
      setFocusedRoom(room);
      navigate(`/name/`);
    }
  };

  return (
    <div
      className={`room-selector ${isHighlighted ? "highlighted" : "dimmed"}`}
      onClick={handleClick}
      style={{ cursor: isHighlighted ? "pointer" : "default" }}
    >
      {/* Main Circle */}
      <div className="relative">
        <div
          className={isHighlighted ? `focus-circle` : `focus-circle-unselected`}
        >
          {/* Room Icon */}
          <div className="room-icon-emoji">{room.icon}</div>

          {/* Room Label inside circle */}
          <p className="room-label">{room.name}</p>
        </div>
      </div>
    </div>
  );
}

export default RoomFocusSelector;
