import React, { useEffect, useState } from "react";
import GalleryImage from "./GalleryImage";
import { ImageData } from "../context/AppContext";
import "../styles/ImageCollage.css";
import { API_URL } from "../CONST";

function shuffleImages(array: ImageData[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ImageCollage() {
  const [images, setImages] = useState<ImageData[]>([]);

  const getImages = async () => {
    const response = await fetch(`${API_URL}/api/style`);
    const data = await response.json();
    setImages(shuffleImages(data));
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="image_collage">
      {images.map((imageData) => (
        <div key={imageData._id} className="collage_item">
          <GalleryImage imageData={imageData} />
        </div>
      ))}
    </div>
  );
}
