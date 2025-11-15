import { useEffect, useRef } from "react";

type UseModalCloseProps<T extends HTMLElement> = {
  modalRef: React.RefObject<T | null>;
  onClose: () => void;
  enableSwipe?: boolean;
  swipeThreshold?: number;
};

export const useModalClose = <T extends HTMLElement>({
  modalRef,
  onClose,
  enableSwipe = true,
  swipeThreshold = 100,
}: UseModalCloseProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const startY = useRef<number | null>(null);
  const endY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    endY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!enableSwipe) return;
    if (startY.current !== null && endY.current !== null) {
      const distance = endY.current - startY.current;
      if (distance > swipeThreshold) onClose();
    }
    startY.current = null;
    endY.current = null;
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};