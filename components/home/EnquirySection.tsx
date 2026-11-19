"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Calendar, Phone, Mail, User } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface EnquiryProps {
  onSuccess?: () => void;
}

export default function EnquirySection({ onSuccess }: EnquiryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    configuration: "3 BHK Premium",
    visitDate: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your name and valid phone number.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Purely frontend client-side submission with smooth feedback
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        configuration: "3 BHK Premium",
        visitDate: "",
        message: "",
      });
      onSuccess?.();
    }, 700);
  };

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(".enquiry-fade-item", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#2D1209] text-white overflow-hidden"
    >


      {/* Decorative Gold Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C9A45C]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#451B0E] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
            <div className="enquiry-fade-item inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                SCHEDULE AN APPOINTMENT
              </span>
            </div>

            <h2 className="enquiry-fade-item text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              Your Extraordinary
              <br />
              <span className="italic font-normal gold-gradient-text">
                Address Awaits.
              </span>
            </h2>

            <p className="enquiry-fade-item text-white/75 text-sm sm:text-base font-light leading-relaxed">
              Experience the unmatched luxury and serenity of Kashi Nirmal Heights.
              Schedule a personalized walkthrough of the model residences and
              explore complete project layouts.
            </p>

            <div className="enquiry-fade-item pt-4 flex flex-col space-y-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>Complimentary VIP Site Visit & Site Escort</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>Instant High-Resolution Digital Brochure Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>Transparent VDA Approval Documentation Review</span>
              </div>
            </div>
          </div>

          {/* Right Inline Booking Form */}
          <div className="lg:col-span-7">
            <div className="enquiry-fade-item bg-[#1C0904]/90 border border-[#C9A45C]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              {status === "success" ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    Thank You For Your Interest
                  </h3>
                  <p className="text-white/80 text-sm max-w-md mx-auto mb-6">
                    Our Senior Relationship Manager has received your request and will
                    connect with you shortly to schedule your exclusive private visit.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 rounded-full bg-[#C9A45C] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs placeholder:text-white/40 transition-colors"
                        />
                        <User className="absolute right-3.5 top-3.5 w-4 h-4 text-white/30" />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 Phone number"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs placeholder:text-white/40 transition-colors"
                        />
                        <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-white/30" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs placeholder:text-white/40 transition-colors"
                        />
                        <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-white/30" />
                      </div>
                    </div>

                    {/* Configuration */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                        Select Configuration
                      </label>
                      <select
                        value={formData.configuration}
                        onChange={(e) =>
                          setFormData({ ...formData, configuration: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#2D1209] border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs transition-colors"
                      >
                        <option value="2 BHK Luxury">2 BHK Luxury Residence</option>
                        <option value="3 BHK Premium">3 BHK Premium Residence</option>
                        <option value="4 BHK Royal">4 BHK Royal Penthouse</option>
                      </select>
                    </div>
                  </div>

                  {/* Visit Date & Optional Note */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                      Preferred Date of Visit / Note
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="e.g. Saturday afternoon or specific inquiries"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#C9A45C] focus:outline-none text-white text-xs placeholder:text-white/40 transition-colors"
                      />
                      <Calendar className="absolute right-3.5 top-3.5 w-4 h-4 text-white/30" />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#C9A45C]/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Schedule a Site Visit</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
