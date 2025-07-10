import GlassFooter from "../components/GlassFooter";
import { useAppContext } from "../context/AppContext";
import "../styles/HomeZip.css";
import "../styles/Name.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Email() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { setEmail, email, getAllData } = useAppContext();
  const [validEmail, setValidEmail] = useState(false);
  const [inputValue, setInputValue] = useState(email || "");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValidEmail(validateEmail(inputValue));
  };

  const handleSubmit = async () => {
    setEmail(inputValue);
    const allData = getAllData();

    const dataObject = {
      name: allData.name,
      email: allData.email,
      selectedImages: allData.selectedImages,
      selectedRooms: allData.selectedRooms,
      focusedRooms: allData.focusedRoom,
    };

    try {
      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/yjxuZcMiqYvy3ipO4Djn/webhook-trigger/8292fe03-b515-46cb-9b26-2921cc9c8118",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObject),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        // Handle success (e.g., show success message, redirect, etc.)
      } else {
        console.error("Error:", response.status, response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network error
    }

    navigate("/style-reveal ");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setValidEmail(validateEmail(inputValue));
  }, []);

  return (
    <div>
      <div className="zip_page_container">
        <div className="zip_label">
          <h1>What is your email?</h1>
          <p>Let's get to know you!</p>
        </div>

        <div className="name_input for_desktop">
          <input
            type="email"
            ref={inputRef}
            value={inputValue}
            onChange={handleNameChange}
            placeholder="Email goes here...."
          />
        </div>
      </div>
      <div className="name_mobile_input for_mobile">
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleNameChange}
          placeholder="Email goes here...."
        />
      </div>
      <GlassFooter
        navigateTo="/email"
        isTransparent={true}
        buttonDisabled={!validEmail}
        onCustomAction={handleSubmit}
      />
    </div>
  );
}
