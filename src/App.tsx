import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import GalleryPage from "./pages/GalleryPage";
import RoomSelection from "./pages/RoomSelection";
import RoomFocus from "./pages/RoomFocus";
import StyleReveal from "./pages/StyleReveal";
import SelectPackage from "./pages/SelectPackage";
import HomeOwnership from "./pages/HomeOwnership";
import RoomStatus from "./pages/RoomStatus";
import TimeFrame from "./pages/TimeFrame";
import Budget from "./pages/Budget";
import HomeZip from "./pages/HomeZip";
import Name from "./pages/Name";
import Email from "./pages/Email";
import ImageUpload from "./pages/ImageUpload";
import Upload from "./pages/Upload";
import ShowImages from "./pages/ShowImages";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GalleryPage />} />
          <Route path="/room-selection" element={<RoomSelection />} />
          <Route path="/room-focus" element={<RoomFocus />} />
          <Route path="/name" element={<Name />} />
          <Route path="/email" element={<Email />} />
          <Route path="/style-reveal" element={<StyleReveal />} />
          <Route path="/select-package" element={<SelectPackage />} />
          <Route path="/home-ownership" element={<HomeOwnership />} />
          <Route path="/room-status" element={<RoomStatus />} />
          <Route path="/timeframe" element={<TimeFrame />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/home-zip" element={<HomeZip />} />
          <Route path="/showimages" element={<ShowImages />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
