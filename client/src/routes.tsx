// import { Routes, Route, useLocation } from "react-router-dom";
// import HeroSection from "./components/HeroSection";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Navigation from "./layouts/Navigation";
// import RecipesPage from "./pages/recipesPage";

// export default function AppRoutes() {
//   const location = useLocation();
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   return (
//     <>
//       {!isAuthPage && <Navigation />}
//       <Routes>
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/recipes" element={<RecipesPage />} />
//       </Routes>
//     </>
//   );
// }