import { useState } from "react";
import checkedImg from "../assets/checkedImg.png";
import "../styles/StyleInspoImage.css";

type StyleInspoImageProps = {
  image: string;
};

export default function StyleInspoImage({ image }: StyleInspoImageProps) {
  const [checked, setChecked] = useState(false);

  const checkHandler = () => {
    setChecked(!checked);
  };

  return (
    <div className="inspo_image_container">
      <div onClick={checkHandler}>
        <img
          src={checkedImg}
          height={25}
          className={checked ? "check_active" : "check_inactive"}
        />
        {/* <div style={{ backgroundImage: `url(${image})` }}></div> */}
        <img src={image} className="inspo_image" />
      </div>
    </div>
  );
}
