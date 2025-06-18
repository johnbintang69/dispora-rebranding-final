import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-gold text-navy p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gold ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Kembali ke atas"
    >
      <FaArrowUp className="text-2xl" />
    </button>
  );
}
