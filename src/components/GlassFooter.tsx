import "../styles/GlassFooter.css";
import { useNavigate } from "react-router-dom";

type GlassFooterProps = {
  buttonTitles?: string[];
  nextButton?: string;
  navigateTo: string;
  isTransparent?: boolean;
  buttonDisabled?: boolean;
  onCustomAction?: () => void;
};

export default function GlassFooter({
  buttonTitles,
  nextButton = "NEXT",
  navigateTo,
  isTransparent = false,
  onCustomAction,
  buttonDisabled = false,
}: GlassFooterProps) {
  const navigate = useNavigate();

  const navigationRouter = () => {
    if (onCustomAction) {
      onCustomAction();
    } else {
      navigate(navigateTo);
    }
  };

  return (
    <div
      className={isTransparent ? `glass_footer bg_transparent` : `glass_footer`}
    >
      <div className="footer_content">
        <div className="footer_left">
          {/* <div className="status_indicator"></div> */}
          {/* <span className="status_text">Gallery Experience</span> */}
        </div>

        <div className="footer_right">
          {buttonTitles && (
            <button className="skip_button">{buttonTitles[0]}</button>
          )}
          <button
            className="next_button"
            onClick={navigationRouter}
            disabled={buttonDisabled}
          >
            {nextButton}
          </button>
        </div>
      </div>
    </div>
  );
}
