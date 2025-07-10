import "../styles/GalleryPage.css";
import { useAppContext } from "../context/AppContext";
import GlassFooter from "../components/GlassFooter";
import RoomCollection from "../components/RoomCollection";

export default function RoomSelection() {
  const { selectedRooms } = useAppContext();

  const totalRoomCount = selectedRooms.reduce(
    (sum, room) => sum + room.count,
    0
  );

  return (
    <>
      <div className="room_container">
        <div className="room_text">
          <div className="text_content">
            <p className="room_description uppercase">
              Which rooms are on your "It needs a little something" list?
            </p>
            <p className="gallery_subtitle">Select as many as you like.</p>
          </div>
        </div>

        <div className="room_option_section">
          <RoomCollection />
        </div>
      </div>
      <GlassFooter
        navigateTo={"/room-focus"}
        buttonTitles={[`TOTAL ROOMS: ${totalRoomCount}`, "NEXT"]}
      />
    </>
  );
}
