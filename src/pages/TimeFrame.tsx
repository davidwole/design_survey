import PackageSelector from "../components/PackageSelector";
import "../styles/GalleryPage.css";
import "../styles/SelectPackage.css";

export default function TimeFrame() {
  const packages = [
    { id: 1, name: "ASAP", icon: "⚡" },
    { id: 2, name: "Soonish", icon: "📅" },
    { id: 3, name: "No Rush", icon: "🌱" },
  ];

  return (
    <>
      <div className="gallery_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="package_description uppercase">
              When do you need to have your perfect room?
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
                    navigateTo="/budget"
                    dataType="timeframe"
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
