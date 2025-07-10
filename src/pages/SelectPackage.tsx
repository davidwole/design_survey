import PackageSelector from "../components/PackageSelector";
import "../styles/GalleryPage.css";
import "../styles/SelectPackage.css";

export default function SelectPackage() {
  const packages = [
    { id: 1, name: "Apartment", icon: "🏢" },
    { id: 2, name: "House", icon: "🏠" },
    { id: 3, name: "Condo", icon: "🏘️" },
    { id: 4, name: "Townhouse", icon: "🏡" },
    { id: 5, name: "Studio", icon: "🛏️" },
    { id: 6, name: "Other", icon: "🏗️" },
  ];

  return (
    <>
      <div className="gallery_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="package_description">
              What kind of home do you live in?
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
                    navigateTo="/home-ownership"
                    dataType="homeType"
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
