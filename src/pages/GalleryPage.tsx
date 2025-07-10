import "../styles/GalleryPage.css";
import ImageCollage from "../components/ImageCollage";
import GlassFooter from "../components/GlassFooter";
import { useAppContext } from "../context/AppContext";

export default function GalleryPage() {
  const { selectedImages } = useAppContext();
  const isButtonDisabled = selectedImages.length === 0;

  return (
    <>
      <div className="gallery_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="gallery_description uppercase">
              Select the rooms that make you swoon.
            </p>
            <p className="gallery_subtitle">
              Decisions are hard. Pick as many as you want.
            </p>
          </div>
        </div>

        <div className="image_section">
          <ImageCollage />
        </div>
      </div>
      <GlassFooter
        navigateTo={"/room-selection"}
        buttonDisabled={isButtonDisabled}
      />
    </>
  );
}
