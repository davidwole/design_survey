import { useState } from "react";
import StyleInspoImage from "./StyleInspoImage";
import hometest from "../assets/hometest.jpg";
import window from "../assets/window.jpg";
import "../styles/StyleInspoCollage.css";

export default function StyleInspoCollage() {
  const [images, setImage] = useState([
    window,
    hometest,
    hometest,
    window,
    hometest,
    window,
    window,
    hometest,
    hometest,
    hometest,
    window,
    hometest,
    window,
    hometest,
    hometest,
    window,
    hometest,
    window,
    hometest,
    hometest,
  ]);
  return (
    <div className="collage">
      {images.map((image) => {
        return (
          <div className="collage_image">
            <StyleInspoImage image={image} />
          </div>
        );
      })}
    </div>
  );
}
