import HeroSection from "./components/HeroSection";
import Navigation from "./layouts/Navigation";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
