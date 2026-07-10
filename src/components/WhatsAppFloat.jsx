"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const phoneNumber = "919911956789";
  const message = encodeURIComponent(
    "Hi Cashmax Finserve, I am interested in applying for a loan. Please share details."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Label */}
      <span className="hidden sm:inline-block mr-3 bg-white text-brand-neutralDark font-semibold text-xs px-3 py-1.5 rounded-lg shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider">
        Chat on WhatsApp
      </span>
      
      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Pulsing ring outline */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10"></span>
        
        {/* WhatsApp Custom Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M1.5 12c0-5.799 4.701-10.5 10.5-10.5S22.5 6.201 22.5 12s-4.701 10.5-10.5 10.5c-1.895 0-3.676-.503-5.215-1.382l-5.183 1.728a.75.75 0 0 1-.951-.95l1.728-5.183A10.457 10.457 0 0 1 1.5 12zm10.5-7.5a7.5 7.5 0 0 0-6.19 11.725.75.75 0 0 1 .094.618l-.946 2.837 2.837-.946a.75.75 0 0 1 .618.094A7.5 7.5 0 1 0 12 4.5zm2.84 8.78c-.2.435-.783.74-1.272.827-.37.067-.852.12-2.484-.555-2.086-.863-3.433-2.986-3.537-3.125-.104-.139-.834-1.11-.834-2.115 0-1.005.52-1.5.706-1.705.186-.205.405-.257.54-.257.135 0 .27.001.388.006.126.005.295-.047.461.353.17.411.583 1.42.632 1.52.05.1.083.218.016.353-.066.136-.1.218-.2.336-.1.117-.21.263-.3.353-.1.1-.205.209-.089.409.117.2.52 1.554 1.114 2.083.473.42 1.07.727 1.458.82.164.04.309.043.43-.021.16-.084.632-.736.8-1 .168-.263.336-.219.563-.135.228.084 1.442.68 1.69.798.248.118.413.176.474.281.062.105.062.61-.137 1.045z"
            clipRule="evenodd"
          />
        </svg>
      </motion.a>
    </div>
  );
}
