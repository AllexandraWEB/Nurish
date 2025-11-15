"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  ingredients,
  instructions,
  recipeDetails,
  recipeSlides,
} from "@/constants";
import { useModalClose } from "@/hooks/useModalClose";
import { Button } from "./ui/button";

type PriceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RecipeDetailsModal: React.FC<PriceModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useModalClose({
    modalRef,
    onClose,
    enableSwipe: false,
  });

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end md:justify-center bg-blur-background text-white">
        {/* Modal Body */}
        <div
          ref={modalRef}
          className="backdrop-blur-[32px] rounded-lg w-full max-w-[1290px] shadow-lg relative p-4 glass-border overflow-hidden"
        >
          <div className="flex justify-between relative z-10">
            <div>{}</div>
            <button onClick={onClose} className="text-dark-700 cursor-pointer">
              <X size={24} />
            </button>
          </div>
          {/* Slides Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Slide 1 - Recipe Details */}
              <div className="min-w-full px-30 py-17 flex justify-between relative">
                {recipeSlides.map((recipe) => (
                  <>
                    {/* Left Side */}
                    <div className="flex flex-col max-w-[350px] relative z-10">
                      <p className="text-neutral-400">{recipe.subtitle}</p>
                      <h1 className="text-4xl mt-2">{recipe.title}</h1>

                      {/* Top Info */}
                      <div className="flex gap-4">
                        {recipeDetails.map((item, index) => (
                          <p
                            key={index}
                            className="text-neutral-400 text-sm mt-4"
                          >
                            {item}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center gap-8 mt-2">
                        <div className="flex gap-1">
                          <img src="/icons/user.svg" className="w-5" />
                          <p>{recipe.servings}</p>
                        </div>

                        <div className="flex gap-1">
                          <img src="/icons/user.svg" className="w-5" />
                          <p>{recipe.prepTime}</p>
                        </div>

                        <div className="flex gap-1">
                          <img src="/icons/user.svg" className="w-5" />
                          <p>{recipe.cookTime}</p>
                        </div>
                      </div>

                      {/* Video */}
                      <div className="mt-6">
                        <h1 className="text-xl mb-3">Watch and Cook</h1>

                        <div className="relative rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                          <iframe
                            className="w-full aspect-video rounded-lg shadow-lg"
                            src={recipe.video}
                            allowFullScreen
                          />
                        </div>
                        {/* Button - CTA */}
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="absolute top-0 right-20 w-1/2 h-full">
                      <img
                        src={recipe.image}
                        className="w-full h-full object-cover rounded-r-lg"
                      />
                    </div>
                  </>
                ))}
              </div>

              {/* Slide 2 - Ingredients & Instructions */}
              <div className="min-w-full px-30 py-15 flex justify-between relative">
                {/* Left Side - Ingredients & Instructions */}
                <div className="flex flex-col relative z-10">
                  <h1 className="text-3xl font-semibold mb-6">
                    Ingredients & Instructions
                  </h1>

                  <div className="flex gap-10 w-full justify-between">
                    {/* Instructions Section */}
                    <div className="max-w-[700px]">
                      <h2 className="text-2xl font-semibold mb-3">
                        Instructions
                      </h2>

                      <div className="space-y-3">
                        {instructions.map((step) => (
                          <div className="flex gap-2" key={step.number}>
                            <h1
                              className={`text-6xl ${
                                step.number === 1 ? "pr-9" : "pr-5"
                              }`}
                            >
                              {step.number}.
                            </h1>
                            <p>{step.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ingredients Section */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-3">
                        Ingredients
                      </h2>
                      <ul className="list-disc list-inside space-y-2 text-neutral-300">
                        {ingredients.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <iframe
                        className="w-full aspect-video rounded-lg shadow-lg mt-4"
                        src="https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew"
                        title="Recipe Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation buttons */}
          <div className="absolute left-10  right-10  top-1/2 flex justify-between space-x-6 sm:space-x-8 z-10">
            <button
              onClick={prevSlide}
              className="p-2 sm:p-3 border border-white/50 rounded-full hover:bg-white hover:text-black transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 sm:p-3 border border-white/50 rounded-full hover:bg-white hover:text-black transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsModal;
