import { useState } from "react";
import { apiFetch } from "@/lib/api";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;

          const response = await apiFetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ image: base64String }),
          });

          if (response.url) {
            setImagePreview(response.url);
            onSuccess(response.url);
          } else {
            throw new Error("No URL returned from upload");
          }
        } catch (error: any) {
          console.error("Upload error:", error);
          alert(
            "Failed to upload image: " + (error?.message || "Unknown error")
          );
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("Failed to read file");
        setIsUploading(false);
      };
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Failed to upload image: " + (error?.message || "Unknown error"));
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setImagePreview("");
  };

  return {
    isUploading,
    imagePreview,
    setImagePreview,
    handleImageUpload,
    clearImage,
  };
};