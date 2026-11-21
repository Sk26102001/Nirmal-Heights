"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Download,
  Play,
  FileText,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Move,
} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookVisitModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    configuration: "3 BHK Premium",
    visitDate: "",
    timeSlot: "Morning (10 AM - 1 PM)",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Client-side instantaneous appointment handling
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1C0904] border border-[#C9A45C]/40 p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">Visit Confirmed</h3>
            <p className="text-white/80 text-xs max-w-sm mb-6 font-light">
              We look forward to welcoming you to Kashi Nirmal Heights, Transport Nagar.
              A confirmation and route map have been dispatched.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
              className="px-6 py-2 rounded-full bg-[#C9A45C] text-[#1C0904] text-xs font-semibold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                VIP APPOINTMENT
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mt-1">
                Schedule a Private Visit
              </h3>
              <p className="text-xs text-white/70 font-light mt-1">
                Experience the residence layouts and meet our architectural team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/70 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs"
                  />
                  <User className="absolute right-3.5 top-3 w-3.5 h-3.5 text-white/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/70 mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 Mobile"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs"
                    />
                    <Phone className="absolute right-3.5 top-3 w-3.5 h-3.5 text-white/30" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/70 mb-1">
                    Configuration
                  </label>
                  <select
                    value={formData.configuration}
                    onChange={(e) =>
                      setFormData({ ...formData, configuration: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2D1209] border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs"
                  >
                    <option value="2 BHK Luxury">2 BHK Luxury</option>
                    <option value="3 BHK Premium">3 BHK Premium</option>
                    <option value="4 BHK Royal">4 BHK Royal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/70 mb-1">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) =>
                      setFormData({ ...formData, visitDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/70 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2D1209] border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs"
                  >
                    <option>Morning (10 AM - 1 PM)</option>
                    <option>Afternoon (1 PM - 4 PM)</option>
                    <option>Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <span>Confirm VIP Visit</span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function BrochureModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#1C0904] border border-[#C9A45C]/40 p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-44 aspect-[3/4] rounded-2xl overflow-hidden bg-white/10 border border-[#C9A45C]/40 shadow-xl flex-shrink-0">
            <Image
              src="/images/pages/page_01.jpg"
              alt="Kashi Nirmal Heights Brochure Cover"
              fill
              sizes="176px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col space-y-3 text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#C9A45C] font-semibold">
              OFFICIAL BROCHURE • 40 PAGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
              Kashi Nirmal Heights
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Explore complete master plans, cluster layouts for Tower A & B, 2, 3 & 4
              BHK floor plates, IIT structural vetting certificates, and project
              specifications.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="/brochure.pdf"
                download="Kashi_Nirmal_Heights_Brochure.pdf"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (31 MB)</span>
              </a>

              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/30 hover:border-[#C9A45C] text-white text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open in Browser</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-black border border-[#C9A45C]/40 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video w-full flex items-center justify-center bg-[#1C0904]">
          {/* Simulated Luxury Video Player with animated background */}
          <div className="absolute inset-0">
            <Image
              src="/images/assets/hero_tower.jpg"
              alt="Cinematic Video Backdrop"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
          </div>

          <div className="relative z-10 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#C9A45C]/20 border-2 border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mx-auto mb-4 animate-pulse">
              <Play className="w-8 h-8 fill-[#C9A45C] ml-1" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              Kashi Nirmal Heights
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-md mx-auto font-light">
              An Architectural Marvel by Hafeez Contractor in Transport Nagar, Varanasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LightboxModal({
  isOpen,
  src,
  caption,
  onClose,
}: {
  isOpen: boolean;
  src: string;
  caption: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Reset zoom & pan when image changes or modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      hasDraggedRef.current = false;
    }
  }, [isOpen, src]);

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        handleZoomOut();
      } else if (e.key === "0" || e.key.toLowerCase() === "r") {
        handleResetZoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleToggleZoom = () => {
    // If the user was dragging/panning, do not toggle zoom
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    if (zoom === 1) {
      setZoom(2.2);
    } else {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    hasDraggedRef.current = true;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 4));
    } else {
      setZoom((prev) => {
        const next = Math.max(Number((prev - 0.25).toFixed(2)), 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Floating Control Bar */}
      <div
        className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1C0904]/90 backdrop-blur-md border border-[#C9A45C]/40 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Current Zoom Percentage Pill */}
        <span className="font-mono text-xs font-semibold text-[#C9A45C] min-w-[50px] text-center px-1">
          {Math.round(zoom * 100)}%
        </span>

        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-4 bg-white/20 mx-1" />

        {/* Reset / Fit Button */}
        <button
          onClick={handleResetZoom}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/15 transition-colors flex items-center gap-1"
          title="Reset Zoom (0 / R)"
        >
          <RotateCcw className="w-3 h-3 text-[#C9A45C]" />
          <span>Fit</span>
        </button>

        <span className="w-[1px] h-4 bg-white/20 mx-1" />

        {/* Download High-Res File */}
        <a
          href={src}
          download={src.split("/").pop() || "floor-plan.jpg"}
          className="p-1.5 rounded-full hover:bg-white/15 transition-colors text-white"
          title="Download High-Res Plan"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>

      {/* Top-Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        title="Close (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Interactive Main Viewer Canvas */}
      <div
        className="relative max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative w-full h-[72vh] sm:h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl ${zoom === 1
              ? "cursor-zoom-in"
              : isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
            }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={handleToggleZoom}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: isDragging
                ? "none"
                : "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="relative w-full h-full flex items-center justify-center will-change-transform"
          >
            <Image
              src={src}
              alt={caption || "Architectural Floor Plan Preview"}
              fill
              sizes="100vw"
              className="object-contain pointer-events-none p-2 sm:p-4"
              priority
            />
          </div>
        </div>

        {/* Bottom Caption & Usage Tip Pill */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          {caption && (
            <div className="px-5 py-1.5 rounded-full bg-[#1C0904]/90 border border-[#C9A45C]/30 text-white text-xs sm:text-sm font-serif tracking-wide shadow-md">
              {caption}
            </div>
          )}

          <div className="text-[10.5px] sm:text-[11px] text-white/60 font-light flex items-center gap-2">
            <span>• Click image to toggle {zoom === 1 ? "2.2x zoom" : "1.0x fit"}</span>
            <span className="hidden sm:inline">• Drag to pan when zoomed</span>
            <span className="hidden sm:inline">• Scroll wheel to zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
