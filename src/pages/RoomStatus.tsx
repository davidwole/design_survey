import PackageSelector from "../components/PackageSelector";
import "../styles/GalleryPage.css";
import "../styles/SelectPackage.css";

export default function RoomStatus() {
  const packages = [
    { id: 1, name: "Blank Space", icon: "📄" },
    { id: 2, name: "Partway There", icon: "📋" },
    { id: 3, name: "Just Needs Love", icon: "💝" },
  ];

  return (
    <>
      <div className="gallery_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="package_description uppercase">
              What best describes the current state of your space?
            </p>
          </div>
        </div>

        <div className="focus_option_section">
          {packages.length > 0 && (
            <div className="selected_rooms_section">
              <div className="focus_grid">
                {packages.map((item) => (
                  <PackageSelector
                    key={item.id}
                    option={item}
                    navigateTo="/timeframe"
                    dataType="roomStatus"
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
