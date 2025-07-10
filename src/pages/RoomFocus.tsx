import "../styles/GalleryPage.css";
import "../styles/RoomFocus.css";
import { useAppContext } from "../context/AppContext";
import RoomFocusSelector from "../components/RoomFocusSelector";
import { useState } from "react";

export default function RoomFocus() {
  const { selectedRooms } = useAppContext();
  const [isSelected, setIsSelected] = useState(false);

  const allRooms = [
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

  const showUnSelectedRooms = () => {
    setIsSelected(!isSelected);
  };

  const unselectedRooms = allRooms
    .filter(
      (room) => !selectedRooms.find((selected) => selected.id === room.id)
    )
    .map((room) => ({ ...room, count: 0 }));

  return (
    <>
      <div className="focus_container">
        <div className="focus_text">
          <div className="text_content">
            <p className="room_description uppercase">
              Great! Which room should we focus on first?
            </p>
          </div>
        </div>
        <div className="focus_option_section">
          {selectedRooms.length > 0 && (
            <div className="selected_rooms_section">
              <div className="focus_grid">
                {selectedRooms.map((room) => (
                  <RoomFocusSelector
                    key={room.id}
                    room={room}
                    isHighlighted={true}
                  />
                ))}
              </div>
            </div>
          )}
          <button className="view_options" onClick={showUnSelectedRooms}>
            <p>View all options</p>
            <svg
              className={
                isSelected ? `view_options_selected` : "view_options_unselected"
              }
              width="14"
              height="8"
              viewBox="0 0 14 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1 7 7 1 1"
                stroke="#000"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          {isSelected && unselectedRooms.length > 0 && (
            <div className="unselected_rooms_section">
              <div className="unselected_room_grid">
                {unselectedRooms.map((room) => (
                  <RoomFocusSelector
                    key={room.id}
                    room={room}
                    isHighlighted={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
