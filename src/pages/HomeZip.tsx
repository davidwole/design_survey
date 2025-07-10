import GlassFooter from "../components/GlassFooter";
import { useAppContext } from "../context/AppContext";
import "../styles/HomeZip.css";
import { useRef, useEffect, useState } from "react";

export default function HomeZip() {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { setZipCode, zipCode, getAllData, clearAllData } = useAppContext();
  const [inputValue, setInputValue] = useState(zipCode || "");

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 5 digits
    if (/^\d{0,5}$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = async () => {
    if (inputValue.length === 5) {
      setZipCode(inputValue);

      // Log all collected data
      const allData = getAllData();
      // console.log("=== ALL COLLECTED DATA ===");
      // console.log("Selected Images:", allData.selectedImages);
      // console.log("Selected Rooms:", allData.selectedRooms);
      // console.log("Focused Room:", allData.focusedRoom);
      // console.log("Name:", allData.name);
      // console.log("Email:", allData.email);
      // console.log("Home Ownership:", allData.homeOwnership);
      // console.log("Room Status:", allData.roomStatus);
      // console.log("Timeframe:", allData.timeframe);
      // console.log("Budget:", allData.budget);
      // console.log("Zip Code:", inputValue);
      // console.log("========================");

      const dataObject = {
        selectedImages: allData.selectedImages,
        selectedRooms: allData.selectedRooms,
        focusedRoom: allData.focusedRoom,
        name: allData.name,
        email: allData.email,
        homeOwnership: allData.homeOwnership,
        roomStatus: allData.roomStatus,
        timeframe: allData.timeframe,
        budget: allData.budget,
        zipCode: inputValue,
      };

      try {
        const response = await fetch(
          "https://services.leadconnectorhq.com/hooks/yjxuZcMiqYvy3ipO4Djn/webhook-trigger/cb28e1ce-05f5-4d20-a5f1-65aa4d9bb692",
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

      // You can navigate to the next page or show a success message here
      alert("Data collected successfully!");
      clearAllData();
    } else {
      alert("Please enter a valid 5-digit zip code");
    }
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
          <h1>Where is your home located?</h1>
          <p>Did you know different zip codes have different design styles?</p>
        </div>

        <div className="zip_input">
          <input
            type="tel"
            ref={inputRef}
            value={inputValue}
            onChange={handleZipChange}
            placeholder="12345"
            maxLength={5}
            pattern="[0-9]{5}"
          />
        </div>
      </div>

      <GlassFooter
        navigateTo="/complete"
        isTransparent={true}
        onCustomAction={handleSubmit}
      />
    </div>
  );
}
