import GlassFooter from "../components/GlassFooter";
import { useAppContext } from "../context/AppContext";
import "../styles/HomeZip.css";
import "../styles/Name.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Name() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { setName, name } = useAppContext();

  const [inputValue, setInputValue] = useState(name || "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = () => {
    setName(inputValue);
    navigate("/email");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div className="zip_page_container">
        <div className="zip_label">
          <h1>Tell us your name?</h1>
          <p>Let's get to know you!</p>
        </div>

        <div className="name_input for_desktop">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleNameChange}
            placeholder="Name goes here...."
          />
        </div>
      </div>

      <div className="name_mobile_input for_mobile">
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleNameChange}
          placeholder="Name goes here...."
        />
      </div>
      <GlassFooter
        navigateTo="/email"
        isTransparent={true}
        buttonDisabled={!inputValue}
        onCustomAction={handleSubmit}
      />
    </div>
  );
}
