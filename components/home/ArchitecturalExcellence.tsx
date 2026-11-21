"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ArchitecturalProps {
  onOpenBrochure?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function ArchitecturalExcellence({
  onOpenBrochure,
  onOpenLightbox,
}: ArchitecturalProps) {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);

  const partnersData = [
    {
      id: "hafeez",
      number: "01",
      name: "Architect Hafeez Contractor",
      role: "Project Architect",
      badge: "Padma Bhushan • 40 Years of Distinction",
      logo: "/images/assets/partner_hafeez.png",
      tagline: "India's Master of Skylines",
      description:
        "Renowned Padma Bhushan architect with over four decades of global distinction. Hafeez Contractor has envisioned Kashi Nirmal Heights as a landmark vertical silhouette, harmonizing sacred Varanasi heritage with contemporary international luxury aesthetics.",
      metrics: [
        { label: "Elevation", value: "30-Storey Twin Iconic Towers" },
        { label: "Residences", value: "3-Side Open Aerodynamic Units" },
        { label: "Arrival", value: "Triple-Height Porte-Cochère" },
      ],
      highlights: [
        "Aerodynamically curved 30-storey twin tower elevation with panoramic river and city views",
        "Triple-height grand entrance porte-cochère featuring custom illuminated brass and stone portals",
        "3-side open luxury residences engineered for cross-ventilation, abundant sunlight and privacy",
      ],
      image: "/images/assets/hero_tower.jpg",
      imageCaption: "30-Storey Twin Tower Elevation • Masterwork by Padma Bhushan Hafeez Contractor",
    },
    {
      id: "acpl",
      number: "02",
      name: "ACPL Consultant",
      role: "Principal Architect",
      badge: "Principal Consultant",
      logo: "/images/assets/partner_acpl.png",
      tagline: "Sustainable Urban & Structural Innovation",
      description:
        "Leading architectural consulting practice delivering cutting-edge biophilic design and climate-responsive engineering. ACPL orchestrates the site master planning, clubhouse architecture, and internal circulation to create an effortless private living sanctuary.",
      metrics: [
        { label: "Masterplan", value: "Climate-Responsive Orientation" },
        { label: "Clubhouse", value: "Biophilic Integrated Amenities" },
        { label: "Circulation", value: "Zero-Surface-Vehicle Walkways" },
      ],
      highlights: [
        "Climate-responsive orientation designed for thermal efficiency, natural shade and cool breezes",
        "Seamless indoor-outdoor clubhouse integration featuring sunken pavilions and reflexology courts",
        "Low carbon footprint construction methodologies with multi-tiered indigenous green buffers",
      ],
      image: "/images/assets/amenity_porte_cochere.jpg",
      imageCaption: "Grand Porte-Cochère & Arrival Promenade • Architectural Masterplan by ACPL",
    },
    {
      id: "tata",
      number: "03",
      name: "TQ Cert Services",
      role: "Construction Quality Management",
      badge: "A TATA Enterprise",
      logo: "/images/assets/partner_tqcert.png",
      tagline: "Uncompromising Construction Integrity",
      description:
        "A wholly owned subsidiary of TATA Projects, TQ Cert oversees continuous, multi-tiered quality surveillance across every stage of development—from raw material testing to concrete curing, reinforcing structural longevity for generations.",
      metrics: [
        { label: "Surveillance", value: "Multi-Tier Quality Audits" },
        { label: "Reinforcement", value: "Fe-550D High-Ductility Steel" },
        { label: "Certification", value: "Zero-Compromise TATA Standard" },
      ],
      highlights: [
        "Stringent multi-tier material batch testing verifying high-grade cement and Fe-550D primary steel",
        "Precision ultrasonic concrete density auditing, core permeability testing and durability benchmarks",
        "Zero-compromise occupational safety protocols, slump checks and certified structural benchmarks",
      ],
      image: "/images/assets/amenity_entrance_portal.jpg",
      imageCaption: "Illuminated Grand Gateway & Construction Quality Surveillance by TQ Cert",
    },
    {
      id: "iit",
      number: "04",
      name: "IIT (Indian Institute of Technology)",
      role: "Structural Vetting & Wind Tunnel Testing",
      badge: "National Technical Excellence",
      logo: "/images/assets/partner_iit.png",
      tagline: "Seismic Safety & Aerodynamic Validation",
      description:
        "India's preeminent institute of technical excellence. IIT vetted the foundation design, seismic load resilience for Zone IV earthquake criteria, and conducted high-velocity boundary layer wind tunnel simulations to ensure absolute structural safety.",
      metrics: [
        { label: "Earthquake Vetting", value: "Seismic Zone IV Standards" },
        { label: "Simulation", value: "Boundary Layer Wind Tunnel" },
        { label: "Foundation", value: "Deep-Pile Load Capacity Audited" },
      ],
      highlights: [
        "Rigorous structural engineering vetting compliant with Seismic Zone IV earthquake specifications",
        "High-velocity boundary layer aerodynamic wind tunnel simulations for multi-directional wind shear",
        "Advanced deep-pile foundation load capacity verification and soil dynamics stability auditing",
      ],
      image: "/images/assets/amenity_swimming_pool.jpg",
      imageCaption: "Aerodynamic Twin Towers & Structural Engineering Vetted by IIT",
    },
  ];

  // Exact progress centers for the 4 panels in the desktop GSAP timeline:
  // Card 0 dwell: 0 to 1.0s (center ~0.068)
  // Card 1 dwell: 2.0 to 3.0s (center ~0.338)
  // Card 2 dwell: 4.0 to 5.0s (center ~0.608)
  // Card 3 dwell: 6.0 to 7.5s (center ~0.905)
  const CARD_PROGRESS_MAP = [0.068, 0.338, 0.608, 0.905];

  const goToCard = (targetIdx: number) => {
    const clampedIdx = Math.max(0, Math.min(partnersData.length - 1, targetIdx));
    setActivePanelIdx(clampedIdx);

    // Smoothly animate panels in GSAP so the chosen card is guaranteed in view
    const panels = gsap.utils.toArray<HTMLElement>(".pinned-story-panel");
    if (panels && panels.length > 0) {
      panels.forEach((panel, i) => {
        if (i === clampedIdx) {
          gsap.to(panel, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          });
        } else if (i < clampedIdx) {
          gsap.to(panel, {
            yPercent: 0,
            opacity: 0,
            scale: 0.98,
            duration: 0.35,
            ease: "power2.out",
          });
        } else {
          gsap.to(panel, {
            yPercent: 100,
            opacity: 0,
            scale: 0.96,
            duration: 0.45,
            ease: "power2.out",
          });
        }
      });
    }

    // On desktop, sync the window scroll to the exact ScrollTrigger progress
    const st = ScrollTrigger.getById("architects-pin");
    if (st && window.innerWidth >= 1024) {
      const targetProgress = CARD_PROGRESS_MAP[clampedIdx];
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${targetProgress * 100}%`;
      }
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activePanelIdx < partnersData.length - 1) {
        goToCard(activePanelIdx + 1); // Swipe left -> Next
      } else if (diff < 0 && activePanelIdx > 0) {
        goToCard(activePanelIdx - 1); // Swipe right -> Prev
      }
    }
    touchStartX.current = null;
  };

  useGSAP(
    () => {
      const pinSection = pinSectionRef.current;
      const panels = gsap.utils.toArray<HTMLElement>(".pinned-story-panel");
      if (!pinSection || panels.length === 0) return;

      const mm = gsap.matchMedia();

      // Desktop Pinning (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        const totalPanels = panels.length;

        // Reset positions
        panels.forEach((panel, i) => {
          if (i === 0) {
            gsap.set(panel, { yPercent: 0, opacity: 1, scale: 1 });
          } else {
            gsap.set(panel, { yPercent: 100, opacity: 0.9, scale: 0.96 });
          }
        });

        // Timeline with generous dwell period on EVERY card
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "architects-pin",
            trigger: pinSection,
            pin: true,
            start: "top top",
            end: () => `+=${totalPanels * 135}%`, // 540vh total scroll distance for ample dwell
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
              const p = self.progress;
              let currentIdx = 0;
              if (p < 0.20) currentIdx = 0;
              else if (p < 0.47) currentIdx = 1;
              else if (p < 0.74) currentIdx = 2;
              else currentIdx = 3;
              setActivePanelIdx(currentIdx);
            },
          },
        });

        tlRef.current = tl;

        // Card 0 dwell (resting comfortably on screen)
        tl.addLabel("card-0-dwell", 0);
        tl.to({}, { duration: 1.0 });

        // Sequence through remaining panels
        for (let i = 1; i < totalPanels; i++) {
          const prevPanel = panels[i - 1];
          const currPanel = panels[i];

          const transitionLabel = `transition-${i}`;
          tl.addLabel(transitionLabel);

          // 1. Previous panel fades out cleanly in place (never peeking above the active card)
          tl.to(
            prevPanel,
            {
              scale: 0.98,
              opacity: 0,
              yPercent: 0,
              ease: "power2.inOut",
              duration: 0.8,
            },
            transitionLabel
          );

          // 2. Current panel slides up smoothly to full view
          tl.to(
            currPanel,
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              duration: 1.0,
            },
            transitionLabel
          );

          // 3. Card Dwell: card remains resting & readable
          const dwellLabel = `card-${i}-dwell`;
          tl.addLabel(dwellLabel);
          // Last card (IIT) gets extra dwell (1.5s) so it NEVER unpins prematurely!
          const dwellDuration = i === totalPanels - 1 ? 1.5 : 1.0;
          tl.to({}, { duration: dwellDuration });
        }
      });

      return () => mm.revert();
    },
    { scope: pinSectionRef }
  );

  return (
    <section
      id="architects"
      ref={pinSectionRef}
      className="relative bg-[#FAF7F2] text-[#24211E] lg:h-screen w-full flex flex-col justify-between overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8DDCA_1px,transparent_1px),linear-gradient(to_bottom,#E8DDCA_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Main Full-Screen Pinned Wrapper */}
      <div className="relative w-full h-full flex flex-col justify-between py-1.5 sm:py-2.5 lg:py-1.5 px-3 sm:px-6 lg:px-8 max-w-[1720px] mx-auto z-10">
        {/* Top Header & Navigation Bar */}
        <div className="z-20 w-full mb-1 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8DDCA] pb-1.5 mb-1.5 gap-2">
            <div>
              <div className="inline-flex items-center gap-2 mb-0.5">
                <span className="w-5 sm:w-7 h-[1px] bg-[#C9A45C]" />
                <span className="text-[#C9A45C] text-[9.5px] sm:text-[10.5px] font-semibold tracking-[0.2em] uppercase">
                  ARCHITECTURAL EXCELLENCE • PINNED STORYTELLING
                </span>
              </div>
              <h2 className="text-base sm:text-xl lg:text-xl xl:text-2xl font-serif font-light text-[#24211E] leading-tight">
                Designed by Vision.{" "}
                <span className="italic font-normal text-[#451B0E]">
                  Crafted for Generations.
                </span>
              </h2>
            </div>

            {/* Step Controls, Partner Quick Tabs & Brochure CTA */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
              {/* 4 Partner Navigation Tabs */}
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white/90 backdrop-blur-sm border border-[#E8DDCA] rounded-full shadow-sm">
                {partnersData.map((p, pIdx) => {
                  const isSelected = activePanelIdx === pIdx;
                  const shortName =
                    p.id === "hafeez"
                      ? "Hafeez Contractor"
                      : p.id === "acpl"
                      ? "ACPL"
                      : p.id === "tata"
                      ? "TQ Cert (TATA)"
                      : "IIT";
                  return (
                    <button
                      key={p.id}
                      onClick={() => goToCard(pIdx)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "bg-[#451B0E] text-white shadow-md font-semibold"
                          : "text-[#24211E]/75 hover:text-[#451B0E] hover:bg-[#FAF5EE]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[9.5px] ${
                          isSelected ? "text-[#C9A45C]" : "text-neutral-400"
                        }`}
                      >
                        {p.number}
                      </span>
                      <span className="hidden md:inline">{shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-1 bg-white border border-[#E8DDCA] rounded-full p-0.5 sm:p-1 shadow-sm">
                <button
                  onClick={() => goToCard(activePanelIdx - 1)}
                  disabled={activePanelIdx === 0}
                  aria-label="Previous Partner"
                  className="p-1 sm:p-1.5 rounded-full hover:bg-[#FAF5EE] disabled:opacity-30 disabled:cursor-not-allowed text-[#451B0E] transition-all cursor-pointer"
                  title="Previous Partner"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="px-1.5 sm:px-2 py-0.5 flex items-center gap-1 font-mono text-[10.5px] sm:text-xs font-semibold">
                  <span className="text-[#C9A45C]">0{activePanelIdx + 1}</span>
                  <span className="text-neutral-300">/</span>
                  <span className="text-neutral-500">04</span>
                </div>

                <button
                  onClick={() => goToCard(activePanelIdx + 1)}
                  disabled={activePanelIdx === partnersData.length - 1}
                  aria-label="Next Partner"
                  className="p-1 sm:p-1.5 rounded-full hover:bg-[#FAF5EE] disabled:opacity-30 disabled:cursor-not-allowed text-[#451B0E] transition-all cursor-pointer"
                  title="Next Partner"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {onOpenBrochure && (
                <button
                  onClick={onOpenBrochure}
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#451B0E]/30 hover:border-[#451B0E] hover:bg-[#451B0E] hover:text-white text-[#451B0E] text-[10.5px] font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Brochure</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>


          {/* Scrubbed Scroll Progress Line (Desktop) */}
          <div className="hidden lg:block w-full h-[2px] bg-[#E8DDCA] rounded-full overflow-hidden mt-1">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#451B0E] w-0 transition-all duration-75"
            />
          </div>
        </div>

        {/* Pinned Stacked Panels Container — ALL 4 CARDS FULLY RENDERED & INTERACTIVE */}
        <div
          ref={panelsContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full flex-1 min-h-0 my-0.5 lg:my-1 overflow-hidden"
        >
          {partnersData.map((partner, idx) => {
            const isCurrent = activePanelIdx === idx;
            return (
              <div
                key={partner.id}
                className={`pinned-story-panel w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-[#E8DDCA] shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 p-0 ${
                  isCurrent
                    ? "relative lg:absolute lg:inset-0 block opacity-100 z-30 pointer-events-auto visible"
                    : "hidden lg:block lg:absolute lg:inset-0 opacity-0 z-10 pointer-events-none invisible"
                }`}
                style={{ zIndex: isCurrent ? 35 : 10 + idx }}
              >
                <div className="panel-inner-content grid grid-cols-1 lg:grid-cols-12 items-stretch h-full w-full">
                  {/* Left Narrative Column */}
                  <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full p-4 sm:p-5 lg:p-5 xl:p-7 min-h-0 space-y-2 sm:space-y-2.5">
                    {/* Top Badge & Number */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="px-3 py-1 rounded-full bg-[#FAF5EE] text-[#451B0E] text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-wider border border-[#C9A45C]/40 shadow-sm">
                        {partner.badge}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-[#C9A45C] font-bold">
                        Phase {partner.number} of 04
                      </span>
                    </div>

                    {/* Partner Brand Identity */}
                    <div className="space-y-1 flex-shrink-0">
                      <div className="relative w-28 sm:w-36 h-6 sm:h-7">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-serif font-medium text-[#24211E] tracking-tight leading-tight">
                        {partner.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-semibold text-[#C9A45C] tracking-wide uppercase">
                        {partner.role} • {partner.tagline}
                      </p>
                    </div>

                    {/* Editorial Description — Rich & Fully Readable */}
                    <p className="text-xs sm:text-sm lg:text-[13px] xl:text-[14px] text-[#24211E]/85 font-light leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Key Architectural Credential Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-[#E8DDCA]/70 flex-shrink-0">
                      {partner.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8DDCA] text-left"
                        >
                          <span className="block text-[9.5px] font-semibold text-[#451B0E] uppercase tracking-wider truncate">
                            {m.label}
                          </span>
                          <span className="block text-[11px] sm:text-xs font-serif font-medium text-[#24211E] mt-0.5 leading-tight line-clamp-1">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Verified Architectural Highlights */}
                    <div className="space-y-1.5 py-1.5 border-t border-[#E8DDCA]/70 flex-shrink-0">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-0.5">
                        Architectural Distinctions & Standards:
                      </div>
                      {partner.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#FAF5EE] border border-[#C9A45C]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-[#C9A45C]" />
                          </div>
                          <span className="text-[11px] sm:text-xs xl:text-[12.5px] text-[#24211E]/90 font-light leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Bottom Row — Prominent and Balanced */}
                    <div className="pt-2 pb-0 flex items-center justify-between gap-3 flex-shrink-0 border-t border-[#E8DDCA] mt-auto bg-white z-10">
                      {onOpenBrochure && (
                        <button
                          onClick={onOpenBrochure}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#451B0E] hover:bg-[#6E2D1D] text-white text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 group cursor-pointer"
                        >
                          <span>Project Architecture in Brochure</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      )}

                      {/* Next partner quick hint on card */}
                      <button
                        onClick={() =>
                          goToCard(
                            idx === partnersData.length - 1 ? 0 : idx + 1
                          )
                        }
                        className="text-xs sm:text-[13px] font-semibold text-[#C9A45C] hover:text-[#451B0E] transition-colors flex items-center gap-1 group flex-shrink-0 cursor-pointer"
                      >
                        <span>
                          {idx === partnersData.length - 1
                            ? "Back to 01"
                            : `Next: ${
                                partnersData[idx + 1].name.split(" ")[0] ===
                                "Architect"
                                  ? "Hafeez"
                                  : partnersData[idx + 1].name.split(" ")[0]
                              }`}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Visual Column (Full Bleed Edge-to-Edge Image with Scrim & Caption) */}
                  <div className="lg:col-span-6 xl:col-span-6 h-full w-full relative min-h-[320px] lg:min-h-0 overflow-hidden">
                    <div
                      className="relative w-full h-full overflow-hidden group cursor-pointer"
                      onClick={() =>
                        onOpenLightbox?.(
                          partner.image,
                          `${partner.name} • ${partner.imageCaption}`
                        )
                      }
                      title="Click to expand full image"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                      {/* Zoom hint icon */}
                      <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 p-2.5 sm:p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-xl">
                        <span className="text-xs sm:text-[13px] font-serif italic text-white/95 line-clamp-1">
                          {partner.imageCaption}
                        </span>
                        <span className="text-[10.5px] sm:text-xs font-mono text-[#C9A45C] uppercase tracking-wider font-bold flex-shrink-0 ml-2">
                          {partner.number} / 04
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Direct Pill Dots & Instruction */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#E8DDCA]/60 flex-shrink-0 text-[11px] sm:text-xs">
          {/* Quick Dots Jump */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider hidden sm:inline">
              Partners:
            </span>
            <div className="flex items-center gap-1.5">
              {partnersData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => goToCard(dotIdx)}
                  aria-label={`Jump to Partner 0${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activePanelIdx === dotIdx
                    ? "w-5 bg-[#C9A45C]"
                    : "w-1.5 bg-[#E8DDCA] hover:bg-[#C9A45C]/50"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop scroll guidance */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] sm:text-[11px] text-neutral-400">
            <span>
              Scroll down or use tabs/arrows to explore all 4 partners
            </span>
            <span className="font-mono text-[#C9A45C] uppercase tracking-widest">
              • GSAP Pinned Storytelling
            </span>
          </div>

          {/* Mobile swipe hint */}
          <div className="lg:hidden text-[10px] sm:text-[11px] text-neutral-400">
            Swipe left/right or tap tabs to switch
          </div>
        </div>
      </div>
    </section>
  );
}
