import React from "react";
import { useAppContext } from "../context/AppContext";
import "../styles/ImageCollage.css";
import RoomSelector from "./RoomSelector";

export default function RoomCollection() {
  const { updateRoomCount, selectedRooms } = useAppContext();

  const roomsData = [
    { id: 1, name: "Living Room", icon: "🛋️" },
    { id: 2, name: "Bedroom", icon: "🛏️" },
    { id: 3, name: "Kitchen", icon: "🍳" },
    { id: 4, name: "Bathroom", icon: "🛁" },
    { id: 5, name: "Dining Room", icon: "🍽️" },
    { id: 6, name: "Office", icon: "💻" },
    { id: 7, name: "Garage", icon: "🚗" },
    { id: 8, name: "Basement", icon: "🏠" },
    { id: 9, name: "Attic", icon: "📦" },
    { id: 10, name: "Laundry Room", icon: "🧺" },
    { id: 11, name: "Guest Room", icon: "🛌" },
    { id: 13, name: "Other", icon: "☝️" },
    { id: 12, name: "Not Sure Yet", icon: "❓" },
  ];

  const getRoomCount = (roomId: number) => {
    const selectedRoom = selectedRooms.find((room) => room.id === roomId);
    return selectedRoom?.count || 0;
  };

  return (
    <div className="room_collection">
      <div className="room_grid">
        {roomsData.map((room) => (
          <RoomSelector
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            roomIcon={room.icon}
            initialCount={getRoomCount(room.id)}
            onCountChange={updateRoomCount}
          />
        ))}
      </div>
    </div>
  );
}
