import "./App.css";
import { Route, Routes } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import FooterBar from "./components/FooterBar";

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBar />
    </div>
  );
}

export default App;
