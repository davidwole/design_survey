import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/StyleReveal.css";
import GlassFooter from "../components/GlassFooter";

export default function StyleReveal() {
  const { selectedImages } = useAppContext();
  const navigate = useNavigate();

  if (!selectedImages) {
    navigate("/");
  }

  return (
    <div className="style_container">
      <div className="descriptions">
        {selectedImages[0] && (
          <h1 className="main_style">
            Based on our super fancy algorithm™, your main style is{" "}
            <span>{selectedImages[0].title}.</span>
          </h1>
        )}

        <div className="style_mobile_images for_mobile">
          {selectedImages[0] && (
            <img
              src={selectedImages[0].url}
              alt={selectedImages[0].title}
              height={335}
              width={433}
              style={{ objectFit: "cover" }}
            />
          )}

          {selectedImages[2] && (
            <img
              src={selectedImages[2].url}
              alt={selectedImages[2].title}
              width={198}
              height={267}
              style={{ objectFit: "cover" }}
            />
          )}
          {selectedImages[3] && (
            <img
              src={selectedImages[3].url}
              alt={selectedImages[3].title}
              height={335}
              width={433}
              style={{ objectFit: "cover" }}
            />
          )}

          {selectedImages[1] && (
            <img
              src={selectedImages[1].url}
              alt={""}
              width={198}
              height={267}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <div className="sub_styles">
          <h3 className="style_subheading">ABOUT YOUR STYLE</h3>
          {selectedImages[0] && (
            <p className="style_subheading_body_text">
              {selectedImages[0].description}
            </p>
          )}

          <h3 className="substyle_subheading">YOUR SUBSTYLES</h3>
          <div className="substyle_group">
            {selectedImages[1] && (
              <div>
                <h5>{selectedImages[1].title}</h5>
                <p className="style_body_text ">
                  {selectedImages[1].description}
                </p>{" "}
              </div>
            )}
            {selectedImages[2] && (
              <div>
                <h5>{selectedImages[2].title}</h5>
                <p className="style_body_text">
                  {selectedImages[2].description}
                </p>{" "}
              </div>
            )}
            {selectedImages[3] && (
              <div>
                <h5>{selectedImages[3].title}</h5>
                <p className="style_body_text">
                  {selectedImages[3].description}
                </p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="style_images for_desktop">
        {selectedImages[0] && (
          <img
            src={selectedImages[0].url}
            alt={""}
            className="main_style_image"
            height={335}
            width={433}
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="flex_substyles">
          {selectedImages[2] && (
            <img
              src={selectedImages[2].url}
              alt={""}
              width={198}
              height={267}
              style={{ objectFit: "cover" }}
            />
          )}
          {selectedImages[3] && (
            <img
              src={selectedImages[3].url}
              alt={""}
              width={198}
              height={267}
              style={{ objectFit: "cover" }}
            />
          )}
          {/* <img src={"https://picsum.photos/198/267?random=11"} alt={""} />
          <img src={"https://picsum.photos/198/267?random=9"} alt={""} /> */}
        </div>

        {selectedImages[1] && (
          <img
            src={selectedImages[1].url}
            alt={""}
            className="last_style_image"
            height={335}
            width={433}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <GlassFooter
        navigateTo="/home-ownership"
        buttonTitles={[
          "Ready to see more? Let us give you some advice tailored to your situation. Completely free.",
        ]}
        nextButton="Get Free Advice"
      />
    </div>
  );
}
