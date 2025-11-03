import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/constants";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [animateOnce, setAnimateOnce] = useState(true); 

  useEffect(() => {
    // Disable animation after first load
    const timer = setTimeout(() => setAnimateOnce(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
      setFadeState("fade-in");
    }, 300);
  };

  const prevSlide = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
      setFadeState("fade-in");
    }, 300);
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Backgrounds */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            index === currentIndex && fadeState === "fade-in"
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
      ))}

      {/* Text content */}
      <div className="relative z-10 text-right space-y-1 p-6 rounded-2xl">
        <h1
          className={`text-6xl uppercase text-center font-semibold font-body ${
            animateOnce ? "hero-text" : ""
          }`}
        >
          {heroSlides[currentIndex].title}
        </h1>

        <h2
          className={`text-8xl uppercase text-center font-thin ${
            animateOnce ? "hero-text" : ""
          }`}
        >
          {heroSlides[currentIndex].subtitle}
        </h2>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-8 z-10">
        <button
          onClick={prevSlide}
          className="p-3 border border-white/50 rounded-full hover:bg-white hover:text-black transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 border border-white/50 rounded-full hover:bg-white hover:text-black transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
