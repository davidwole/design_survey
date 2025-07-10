import { useState, useEffect } from "react";
import Check from "../assets/checkedImg.png";
import "../styles/RoomSelector.css";

type RoomSelectorProps = {
  roomId: number;
  roomName: string;
  roomIcon: string;
  initialCount?: number;
  onCountChange: (roomId: number, count: number) => void;
};

function RoomSelector({
  roomId,
  roomName,
  roomIcon,
  initialCount = 0,
  onCountChange,
}: RoomSelectorProps) {
  const [isSelected, setIsSelected] = useState(initialCount > 0);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
    setIsSelected(initialCount > 0);
  }, [initialCount]);

  useEffect(() => {
    onCountChange(roomId, count);
  }, [count, roomId, onCountChange]);

  const handleCircleClick = () => {
    if (!isSelected) {
      setIsSelected(true);
      setCount(1);
    } else {
      setIsSelected(false);
      setCount(0);
    }
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    } else if (count === 1) {
      setCount(0);
      setIsSelected(false);
    }
  };

  return (
    <div className="room-selector">
      {/* Main Circle */}
      <div className="relative">
        <div
          onClick={handleCircleClick}
          className={`room-circle ${isSelected ? "selected" : ""}`}
        >
          {/* Room Icon */}
          <div className="room-icon-emoji">{roomIcon}</div>

          {/* Room Label inside circle */}
          <p className="room-label">{roomName}</p>

          {/* Checkmark when selected */}
          {isSelected && (
            <div className="checkmark-circle">
              <img src={Check} alt={"checkmark"} className="checkmark-icon" />
            </div>
          )}
        </div>
      </div>

      {/* Counter Controls - Only visible when selected */}
      {isSelected && (
        <div className="counter-controls">
          {/* Minus Button */}
          <button onClick={handleDecrement} className="counter-button">
            <p className="counter-button-icon">-</p>
          </button>

          {/* Count Display */}
          <span className="counter-display">{count}</span>

          {/* Plus Button */}
          <button onClick={handleIncrement} className="counter-button">
            <p className="counter-button-icon">+</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomSelector;
