"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  Phone,
  Mail,
  Loader2,
  Download,
  ChevronLeft,
  ChevronRight,
  Pause,
  Maximize2,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HeroProps {
  onOpenVideo?: () => void;
  onOpenBookVisit?: () => void;
  onOpenBrochure?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function Hero({
  onOpenVideo,
  onOpenBookVisit,
  onOpenBrochure,
  onOpenLightbox,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // 6 Flagship High-Resolution Project Banners for Full-Size Crossfade Transition
  const heroBanners = [
    {
      id: "tower",
      src: "/images/assets/hero_tower.jpg",
      title: "Twin Tower Architectural Elevation",
      tag: "Architecture by Hafeez Contractor",
      caption: "30-Storey Aerodynamic Silhouette in Transport Nagar, NH-19 Highway",
    },
    {
      id: "entrance",
      src: "/images/assets/amenity_entrance_portal.jpg",
      title: "Grand Entrance Security Portal",
      tag: "Security & Porte-Cochère",
      caption: "Illuminated Grand Gate Canopy with RFID Boom Barriers & 24/7 Surveillance",
    },
    {
      id: "clubhouse",
      src: "/images/assets/about_clubhouse.jpg",
      title: "Clubhouse Royale & Sunken Pavilions",
      tag: "Clubhouse & Leisure",
      caption: "Palatial Multi-Storey Social Haven with Dining Banquet & Event Lawns",
    },
    {
      id: "pool",
      src: "/images/assets/amenity_swimming_pool.jpg",
      title: "Resort Infinity Swimming Pool",
      tag: "Resort Lifestyle",
      caption: "Temperature-Controlled Infinity Lap Pool & Dedicated Kids Splash Pool",
    },
    {
      id: "living",
      src: "/images/assets/residence_living.jpg",
      title: "Grand Living & Dining Salon",
      tag: "3 & 4 BHK Luxury Interiors",
      caption: "Double-Height Salon with Italian Marble Finish & Running Sundeck Balcony",
    },
    {
      id: "master",
      src: "/images/assets/bedroom_master_luxury.jpg",
      title: "Presidential Master Suite",
      tag: "Master Bedroom Suite",
      caption: "Imported Laminated Wooden Flooring with Private Coffee Deck Overlooking Pool",
    },
  ];

  // Current Active Banner Slide State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-Slide Interval for Cinematic Banner Transitions (every 5.5s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroBanners.length]);

  const goToSlide = (idx: number) => {
    const target = (idx + heroBanners.length) % heroBanners.length;
    setCurrentSlide(target);
  };

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    configuration: "3 BHK Premium",
    visitPreference: "Site Walkthrough",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormStatus("error");
      setErrorMessage("Please enter your name and phone number.");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      setFormStatus("success");
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      configuration: "3 BHK Premium",
      visitPreference: "Site Walkthrough",
    });
    setFormStatus("idle");
    setErrorMessage("");
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left Column Text Entrance
      tl.from(".hero-stagger-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });

      // Gold line expand
      tl.fromTo(
        ".hero-gold-line",
        { width: 0, opacity: 0 },
        { width: "120px", opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

      // Lead Form Entrance
      if (formCardRef.current) {
        tl.from(
          formCardRef.current,
          {
            scale: 0.95,
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    },
    { scope: containerRef }
  );

  const activeBanner = heroBanners[currentSlide];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white pt-28 sm:pt-32 pb-16 lg:py-24"
    >
      {/* ================================================================= */}
      {/* FULL-SIZE BANNER IMAGE CANVAS WITH CINEMATIC CROSSFADE TRANSITION */}
      {/* ================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {heroBanners.map((banner, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 z-[-1]"
                }`}
            >
              <Image
                src={banner.src}
                alt={banner.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                  }`}
              />
            </div>
          );
        })}

        {/* Multi-Layer Cinematic Scrim for Text & Form Readability */}
        {/* Left Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/85 z-10" />
        {/* Top/Bottom Blends */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120502] via-transparent to-black/60 z-10" />
        {/* Subtle Warm Gold Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,92,0.15),transparent_70%)] z-10" />
      </div>

      {/* ================================================================= */}
      {/* HERO CONTENT: TWO-COLUMN EDITORIAL STORY & VIP LEAD FORM         */}
      {/* ================================================================= */}
      <div className="relative z-20 w-full pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12 2xl:pl-16 pr-3 sm:pr-4 lg:pr-4 xl:pr-6 2xl:pr-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-10 w-full">
          {/* ========================================================= */}
          {/* LEFT COLUMN: BRAND STORY, CONTROLS & THUMBNAIL SCROLLER   */}
          {/* ========================================================= */}
          <div className="w-full lg:max-w-xl xl:max-w-2xl flex flex-col justify-center text-left">
            {/* Top Project Badge */}
            <div className="hero-stagger-item inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/40 mb-4 w-max backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-pulse" />
              <span className="text-[#C9A45C] text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold">
                VDA Approved • Full Paid-Up Freehold Land
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="hero-stagger-item text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif font-light text-white leading-[1.12] tracking-tight mb-3 drop-shadow-md"
            >
              An Elevated Address.
              <br />
              <span className="font-normal italic gold-gradient-text">
                A Timeless Legacy.
              </span>
            </h1>

            {/* Decorative Gold Accent Line */}
            <div className="hero-gold-line h-[2px] bg-gradient-to-r from-[#C9A45C] via-[#E7D4AD] to-transparent mb-4 max-w-xs" />

            {/* Subheading from Authentic Brochure */}
            <p className="hero-stagger-item text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-4 drop-shadow">
              Full paid-up, freehold land allotted by VDA in Varanasi&apos;s first government-planned
              township, <strong className="text-[#DFBF7A] font-semibold">Transport Nagar</strong>.
              Introducing luxurious{" "}
              <strong className="text-[#DFBF7A] font-semibold">2, 3 & 4 bedroom residences</strong>{" "}
              envisioned by Padma Bhushan Architect Hafeez Contractor.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-stagger-item flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <Link
                href="#residences"
                className="px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#C9A45C]/30 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Key Project Highlight Metrics Row */}
            <div className="hero-stagger-item grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15 max-w-xl">
              <div>
                <span className="block text-base sm:text-lg font-serif font-medium text-[#C9A45C]">
                  2, 3 & 4 BHK
                </span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                  1395 - 2825 SQ.FT.
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-serif font-medium text-[#C9A45C]">
                  30 Storeys
                </span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                  Twin Iconic Towers
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-serif font-medium text-[#C9A45C]">
                  Hafeez Contractor
                </span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                  Padma Bhushan
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-serif font-medium text-[#C9A45C]">
                  Transport Nagar
                </span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                  NH-19 Highway
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: VIP LEAD CAPTURE FORM (RIGHT END ANCHORED) */}
          {/* ========================================================= */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end justify-center lg:ml-auto flex-shrink-0 lg:mr-0">
            <div
              ref={formCardRef}
              className="w-full sm:w-[430px] lg:w-[410px] xl:w-[435px] rounded-3xl bg-[#1C0904]/96 backdrop-blur-2xl border-2 border-[#C9A45C]/60 p-5 sm:p-5.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-[#DFBF7A]/25 relative mr-0"
            >
              {/* Official 3D Gold Logo Emblem in Top Right */}
              <div className="absolute top-4 right-5 w-16 h-8 pointer-events-none opacity-90">
                <Image
                  src="/images/assets/kashi_logo_emblem.png"
                  alt="Kashi Nirmal Heights Emblem"
                  fill
                  className="object-contain"
                />
              </div>

              {formStatus === "success" ? (
                /* Success Confirmation State */
                <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#C9A45C]/20 border-2 border-[#C9A45C] flex items-center justify-center mx-auto text-[#C9A45C] shadow-lg shadow-[#C9A45C]/25">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#C9A45C] uppercase tracking-widest">
                      VIP Registration Confirmed
                    </span>
                    <h3 className="text-2xl font-serif text-white">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 font-light max-w-sm mx-auto leading-relaxed">
                      Your VIP request for{" "}
                      <strong className="text-[#DFBF7A]">{formData.configuration}</strong> has
                      been registered with the developer desk. Our Relationship Manager
                      will call you within 15 minutes.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
                    {onOpenBrochure && (
                      <button
                        onClick={onOpenBrochure}
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Official Brochure</span>
                      </button>
                    )}

                    <a
                      href={`https://wa.me/919170889988?text=Hello%20Kashi%20Nirmal%20Heights,%20I%20have%20submitted%20a%20VIP%20enquiry%20for%20${encodeURIComponent(
                        formData.configuration
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/60 hover:bg-[#25D366]/30 text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <span>Connect on WhatsApp</span>
                    </a>

                    <button
                      onClick={handleResetForm}
                      className="text-xs text-white/60 hover:text-white pt-1 underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Lead Capture Form — Elegant High-Contrast Luxury Form */
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-3.5">
                  {/* Form Header */}
                  <div className="pr-16 mb-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#DFBF7A] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                      <span>Direct Developer Desk</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-tight leading-snug">
                      Schedule a VIP Site Visit
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-white/80 font-light mt-0.5">
                      Instant official VDA plans, price sheet & priority booking.
                    </p>
                  </div>

                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#DFBF7A] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A45C]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/25 focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/40 text-xs sm:text-sm text-white placeholder-white/45 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 2: Phone Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#DFBF7A] uppercase tracking-wider mb-1">
                      Phone Number (+91) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A45C]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. 98765 43210"
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/25 focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/40 text-xs sm:text-sm text-white placeholder-white/45 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 3: Email and Preference (2-column layout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10.5px] font-semibold text-[#DFBF7A] uppercase tracking-wider mb-1">
                        Email (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C9A45C]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="rahul@example.com"
                          className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/25 focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/40 text-xs text-white placeholder-white/45 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-semibold text-[#DFBF7A] uppercase tracking-wider mb-1">
                        Preference
                      </label>
                      <select
                        value={formData.visitPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, visitPreference: e.target.value })
                        }
                        className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-[#2D1209] border border-white/25 focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/40 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="Site Walkthrough" className="bg-[#1C0904] text-white">
                          Site Walkthrough Tour
                        </option>
                        <option value="Request Callback" className="bg-[#1C0904] text-white">
                          Priority Callback
                        </option>
                        <option value="Brochure on WhatsApp" className="bg-[#1C0904] text-white">
                          Plans on WhatsApp
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Field 4: Interested Configuration */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#DFBF7A] uppercase tracking-wider mb-1.5">
                      Interested Configuration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "2 BHK", detail: "1395 SQ.FT." },
                        { label: "3 BHK", detail: "1695 / 1995" },
                        { label: "4 BHK", detail: "2395 / 2825" },
                      ].map((cfg) => {
                        const isSelected = formData.configuration.startsWith(cfg.label);
                        return (
                          <button
                            type="button"
                            key={cfg.label}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                configuration: `${cfg.label} (${cfg.detail})`,
                              })
                            }
                            className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                                ? "bg-[#C9A45C] border-[#DFBF7A] text-[#1C0904] font-bold shadow-md shadow-[#C9A45C]/30"
                                : "bg-white/10 border-white/20 text-white/85 hover:border-[#C9A45C]/60 hover:text-white hover:bg-white/15"
                              }`}
                          >
                            <span className="block text-xs font-semibold leading-tight">{cfg.label}</span>
                            <span className="block text-[9.5px] opacity-80 leading-tight mt-0.5">{cfg.detail}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Error Message */}
                  {formStatus === "error" && errorMessage && (
                    <div className="p-2 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs sm:text-sm font-bold uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#C9A45C]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule VIP Visit & Price Sheet</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Trust & WhatsApp Direct Link */}
                  <div className="pt-1 text-center text-[10.5px] text-white/70 flex items-center justify-between border-t border-white/15 mt-1">
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Lock className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>100% Privacy • Direct Desk</span>
                    </div>
                    <div>
                      WhatsApp?{" "}
                      <a
                        href="https://wa.me/919170889988?text=Hello%20Kashi%20Nirmal%20Heights,%20I%20would%20like%20to%20enquire%20about%20the%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#DFBF7A] hover:underline font-semibold"
                      >
                        Chat Directly
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div
        className="absolute bottom-4 left-8 z-30 hidden md:flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-0.5">
          <div className="w-1 h-1.5 rounded-full bg-[#C9A45C] animate-bounce mt-0.5" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">
          Scroll Down
        </span>
      </div>
    </section>
  );
}
