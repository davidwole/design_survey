import PackageSelector from "../components/PackageSelector";
import "../styles/GalleryPage.css";
import "../styles/SelectPackage.css";

export default function HomeOwnership() {
  const packages = [
    { id: 1, name: "Rent", icon: "🗝️" },
    { id: 2, name: "Own", icon: "🏡" },
  ];

  return (
    <>
      <div className="gallery_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="package_description uppercase">
              Do you rent or own your place?
            </p>
            <p className="package_subtitle">
              This helps us know what kind of changes you'd be able to make.
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
                    navigateTo="/room-status"
                    dataType="homeOwnership"
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
