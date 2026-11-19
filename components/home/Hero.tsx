"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Sparkles, Building2, Shield, Compass, DoorOpen } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface HeroProps {
  onOpenVideo?: () => void;
  onOpenBookVisit?: () => void;
}

export default function Hero({ onOpenVideo, onOpenBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildingCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Toggle between Generated Property with Logo, Grand Entrance Portal, and Brochure Elevation
  const [activePropertyView, setActivePropertyView] = useState<"property" | "entrance" | "elevation">("property");

  const getImageDetails = () => {
    switch (activePropertyView) {
      case "entrance":
        return {
          src: "/images/assets/amenity_entrance_portal.jpg",
          alt: "Kashi Nirmal Heights Grand Entrance Security Portal",
          tag: "Grand Entrance Portal & Security",
          caption: "Illuminated Facade & Security Gate",
        };
      case "elevation":
        return {
          src: "/images/assets/hero_building_portrait.jpg",
          alt: "Kashi Nirmal Heights Architectural Elevation",
          tag: "Hafeez Contractor Masterwork",
          caption: "Tower Elevation & Balconies",
        };
      default:
        return {
          src: "/images/assets/hero_property_with_logo.jpg",
          alt: "Kashi Nirmal Heights Luxury Residential Tower with Official Logo",
          tag: "Twin Towers • 30 Storey Icon",
          caption: "Architectural Vision by Hafeez Contractor",
        };
    }
  };

  const currentView = getImageDetails();

  useGSAP(
    () => {
      // 1. Initial entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered text reveal on left column
      tl.from(".hero-stagger-item", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Gold line expand
      tl.fromTo(
        ".hero-gold-line",
        { width: 0, opacity: 0 },
        { width: "120px", opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Building showcase card entrance on right column
      if (buildingCardRef.current) {
        tl.from(
          buildingCardRef.current,
          {
            scale: 0.94,
            opacity: 0,
            y: 40,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      // 2. Subtle ScrollTrigger Parallax on the property building image
      if (imageRef.current && containerRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#140602] via-[#1A0904] to-[#120502] text-white pt-28 pb-16 lg:py-24"
    >
      {/* Ambient luxury radial glow — NO background image */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C9A45C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#451B0E]/20 blur-3xl pointer-events-none" />

      {/* Two-Column Editorial Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Project Tagline Badge */}
            <div className="hero-stagger-item inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C9A45C]/30 mb-6 w-max backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-pulse" />
              <span className="text-[#C9A45C] text-[11px] uppercase tracking-[0.22em] font-medium">
                VDA Approved • Full Paid-Up Freehold Land
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="hero-stagger-item text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-[1.12] tracking-tight mb-4"
            >
              An Elevated Address.
              <br />
              <span className="font-normal italic gold-gradient-text">
                A Timeless Legacy.
              </span>
            </h1>

            {/* Decorative Gold Line */}
            <div className="hero-gold-line h-[2px] bg-gradient-to-r from-[#C9A45C] via-[#E7D4AD] to-transparent mb-6 max-w-xs" />

            {/* Subheading with Authentic Brochure Wording */}
            <p
              ref={subheadRef}
              className="hero-stagger-item text-white/85 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-4"
            >
              Full paid-up, freehold land, allotted by VDA, in the first government planned
              township of Varanasi, Transport Nagar. Introducing luxurious{" "}
              <strong className="text-[#DFBF7A] font-semibold">2, 3 & 4 bedroom residences</strong>{" "}
              designed by Architect Hafeez Contractor.
            </p>

            <p className="hero-stagger-item text-white/60 text-xs sm:text-sm font-serif italic mb-8 max-w-lg">
              &ldquo;A symphony of design, luxury & timeless sophistication.&rdquo;
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="hero-stagger-item flex flex-wrap items-center gap-4 mb-8"
            >
              <Link
                href="#residences"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#C9A45C]/25 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenVideo}
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium uppercase tracking-wider border border-white/20 hover:border-[#C9A45C]/60 backdrop-blur-md transition-all duration-300 flex items-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 fill-[#C9A45C]" />
                </div>
                <span>Watch Film</span>
              </button>
            </div>

            {/* Key Project Highlight Metrics Row */}
            <div className="hero-stagger-item grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <span className="block text-lg sm:text-xl font-serif font-medium text-[#C9A45C]">
                  2, 3 & 4 BHK
                </span>
                <span className="text-[11px] text-white/60 uppercase tracking-wider">
                  1395 - 2825 SQ.FT.
                </span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-serif font-medium text-[#C9A45C]">
                  Hafeez
                </span>
                <span className="text-[11px] text-white/60 uppercase tracking-wider">
                  Project Architect
                </span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-serif font-medium text-[#C9A45C]">
                  Transport Nagar
                </span>
                <span className="text-[11px] text-white/60 uppercase tracking-wider">
                  NH-19 Highway
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Property Showcase Card with Official Logo */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* View Switcher Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActivePropertyView("property")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activePropertyView === "property"
                    ? "bg-[#C9A45C] text-[#140602] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Property Render</span>
              </button>
              <button
                onClick={() => setActivePropertyView("entrance")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activePropertyView === "entrance"
                    ? "bg-[#C9A45C] text-[#140602] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <DoorOpen className="w-3 h-3" />
                <span>Entrance Gate</span>
              </button>
              <button
                onClick={() => setActivePropertyView("elevation")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activePropertyView === "elevation"
                    ? "bg-[#C9A45C] text-[#140602] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>Elevation</span>
              </button>
            </div>

            {/* Majestic Property Showcase Card */}
            <div
              ref={buildingCardRef}
              className="relative w-full max-w-[460px] lg:max-w-[480px] h-[520px] sm:h-[600px] lg:h-[660px] rounded-3xl overflow-hidden bg-[#1E0B05] border border-[#C9A45C]/40 shadow-2xl shadow-black/85 group cursor-pointer"
              onClick={onOpenVideo}
            >
              {/* Actual Building Image */}
              <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                  src={currentView.src}
                  alt={currentView.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom Scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              {/* Top Tag: Property View */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C0904]/85 backdrop-blur-md border border-[#C9A45C]/50 text-white text-[11px] font-semibold tracking-wider uppercase shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-ping" />
                <span>{currentView.tag}</span>
              </div>

              {/* Official 3D Gold Logo Emblem in Top Right */}
              <div className="absolute top-4 right-4 z-10 w-24 sm:w-28 h-12 relative pointer-events-none">
                <Image
                  src="/images/assets/kashi_logo_emblem.png"
                  alt="Kashi Nirmal Heights Logo"
                  fill
                  className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Bottom Details Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-[#1C0904]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                    {currentView.caption}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white">
                    Transport Nagar, Varanasi
                  </span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Play className="w-3 h-3 fill-[#1C0904]" />
                  <span>Play Film</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-8 z-20 hidden md:flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-[#C9A45C] animate-bounce mt-0.5" />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-white/70 font-medium">
          Scroll Down
        </span>
      </div>
    </section>
  );
}
