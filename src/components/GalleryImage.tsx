import "../styles/GalleryImage.css";
import { useState, useEffect } from "react";
import { useAppContext, ImageData } from "../context/AppContext";
import checkedImg from "../assets/checkedImg.png";

type GalleryImageProps = {
  imageData: ImageData;
};

export default function GalleryImage({ imageData }: GalleryImageProps) {
  const { selectedImages, addSelectedImage, removeSelectedImage } =
    useAppContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isSelected = selectedImages.some((img) => img._id === imageData._id);
    setChecked(isSelected);
  }, [selectedImages, imageData._id]);

  const checkHandler = () => {
    if (checked) {
      removeSelectedImage(imageData._id);
    } else {
      addSelectedImage(imageData);
    }
  };

  return (
    <div className="gallery_image_container" onClick={checkHandler}>
      <img
        src={checkedImg}
        height={25}
        alt={"Checkmark"}
        className={checked ? "check_active" : "check_inactive"}
      />
      <img
        src={imageData.url}
        alt={imageData.title}
        className="gallery_image"
      />
      <div className="image_overlay"></div>
    </div>
  );
}
