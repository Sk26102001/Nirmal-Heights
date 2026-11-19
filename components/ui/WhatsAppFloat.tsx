"use client";

import React, { useState } from "react";
import { MessageSquare, MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = "919876543210"; // Placeholder verified format
  const message = encodeURIComponent(
    "Hello, I am interested in Kashi Nirmal Heights, Varanasi. Please share residence details, brochure, and availability."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block px-3.5 py-1.5 rounded-full bg-[#1C0904]/90 backdrop-blur-md border border-[#C9A45C]/50 text-white text-xs font-serif shadow-xl animate-in fade-in slide-in-from-right-2 duration-200">
          Chat with Property Advisor
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 flex items-center justify-center border-2 border-white/20 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
}
