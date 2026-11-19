"use client";

import React, { useState } from "react";
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
              Kashi Nirmal Heights Film
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
  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="relative max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[75vh]">
          <Image
            src={src}
            alt={caption || "Gallery Preview"}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        {caption && (
          <div className="mt-4 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-serif tracking-wide text-center">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
