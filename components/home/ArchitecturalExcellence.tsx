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
      highlights: [
        "Aerodynamically curved 30-storey twin tower elevation",
        "Triple-height grand entrance porte-cochère with illuminated portals",
        "3-side open residences engineered for cross-ventilation and sunlight",
      ],
      image: "/images/assets/hero_property_with_logo.jpg",
      imageCaption: "Twin Tower Elevation • Masterwork by Hafeez Contractor",
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
      highlights: [
        "Climate-responsive orientation for optimal thermal efficiency",
        "Seamless indoor-outdoor clubhouse integration & sunken pavilions",
        "Low carbon footprint construction methodologies and green buffers",
      ],
      image: "/images/assets/about_clubhouse.jpg",
      imageCaption: "Clubhouse Royale & Pavilion Architecture",
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
      highlights: [
        "Stringent multi-tier material batch testing (cement & Fe-550D steel)",
        "Precision ultrasonic concrete density auditing & durability benchmarks",
        "Zero-compromise safety protocols and structural certifications",
      ],
      image: "/images/assets/amenity_entrance_portal.jpg",
      imageCaption: "Grand Security Portal & Construction Quality Surveillance",
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
      highlights: [
        "Full structural vetting for Seismic Zone IV requirements",
        "High-velocity boundary layer aerodynamic wind tunnel testing",
        "Advanced deep-pile foundation load capacity verification",
      ],
      image: "/images/assets/hero_building_portrait.jpg",
      imageCaption: "Aerodynamic Twin Towers • Wind Tunnel & Seismic Vetted by IIT",
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

    // On desktop, scroll the window to the exact ScrollTrigger progress
    const st = ScrollTrigger.getById("architects-pin");
    if (st && window.innerWidth >= 1024) {
      const targetProgress = CARD_PROGRESS_MAP[clampedIdx];
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
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
          const prevInner = prevPanel.querySelector(".panel-inner-content");
          const currImage = currPanel.querySelector(".panel-image-parallax");

          const transitionLabel = `transition-${i}`;
          tl.addLabel(transitionLabel);

          // 1. Previous panel scales down & dims
          tl.to(
            prevPanel,
            {
              scale: 0.94,
              opacity: 0.2,
              yPercent: -6,
              ease: "power2.inOut",
              duration: 1.0,
            },
            transitionLabel
          );

          if (prevInner) {
            tl.to(
              prevInner,
              {
                y: -25,
                ease: "power2.inOut",
                duration: 1.0,
              },
              transitionLabel
            );
          }

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

          // 3. Parallax settle on current panel's image
          if (currImage) {
            tl.fromTo(
              currImage,
              { scale: 1.15, yPercent: 6 },
              { scale: 1.0, yPercent: 0, ease: "none", duration: 1.0 },
              transitionLabel
            );
          }

          // 4. Card Dwell: card remains resting & readable
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
      <div className="relative w-full h-full flex flex-col justify-between py-3 sm:py-4 lg:py-3 px-4 sm:px-6 lg:px-8 max-w-[1720px] mx-auto z-10">
        {/* Top Header & Navigation Bar */}
        <div className="z-20 w-full mb-2 lg:mb-2 flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DDCA] pb-2 mb-2 gap-2">
            <div>
              <div className="inline-flex items-center gap-2 mb-0.5">
                <span className="w-8 h-[1px] bg-[#C9A45C]" />
                <span className="text-[#C9A45C] text-[11px] font-semibold tracking-[0.25em] uppercase">
                  ARCHITECTURAL EXCELLENCE • PINNED STORYTELLING
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-light text-[#24211E] leading-tight">
                Designed by Vision.{" "}
                <span className="italic font-normal text-[#451B0E]">
                  Crafted for Generations.
                </span>
              </h2>
            </div>

            {/* Step Controls, Counter & Brochure CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-1 bg-white border border-[#E8DDCA] rounded-full p-1 shadow-sm">
                <button
                  onClick={() => goToCard(activePanelIdx - 1)}
                  disabled={activePanelIdx === 0}
                  aria-label="Previous Partner"
                  className="p-1 sm:p-1.5 rounded-full hover:bg-[#FAF5EE] disabled:opacity-30 disabled:cursor-not-allowed text-[#451B0E] transition-all"
                  title="Previous Partner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="px-2 py-0.5 flex items-center gap-1.5 font-mono text-xs font-semibold">
                  <span className="text-[#C9A45C]">0{activePanelIdx + 1}</span>
                  <span className="text-neutral-300">/</span>
                  <span className="text-neutral-500">04</span>
                </div>

                <button
                  onClick={() => goToCard(activePanelIdx + 1)}
                  disabled={activePanelIdx === partnersData.length - 1}
                  aria-label="Next Partner"
                  className="p-1 sm:p-1.5 rounded-full hover:bg-[#FAF5EE] disabled:opacity-30 disabled:cursor-not-allowed text-[#451B0E] transition-all"
                  title="Next Partner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {onOpenBrochure && (
                <button
                  onClick={onOpenBrochure}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#451B0E]/30 hover:border-[#451B0E] hover:bg-[#451B0E] hover:text-white text-[#451B0E] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>Brochure Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 4 Interactive Partner Tabs (Clicking any tab immediately displays that card!) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {partnersData.map((p, idx) => {
              const isActive = activePanelIdx === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => goToCard(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 flex items-center gap-2.5 bg-white cursor-pointer group ${
                    isActive
                      ? "border-[#C9A45C] shadow-md ring-2 ring-[#C9A45C]/40 bg-[#FAF7F2]"
                      : "border-[#E8DDCA] opacity-80 hover:opacity-100 hover:border-[#C9A45C]/60"
                  }`}
                >
                  {/* Number pill & Logo */}
                  <div className="relative w-10 h-7 sm:w-11 sm:h-8 flex-shrink-0 bg-white rounded-lg p-0.5 border border-[#E8DDCA]/60 flex items-center justify-center">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>

                  {/* Partner Text */}
                  <div className="flex flex-col overflow-hidden min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          isActive ? "text-[#C9A45C]" : "text-neutral-400"
                        }`}
                      >
                        {p.number}
                      </span>
                      <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#451B0E] truncate group-hover:text-[#6E2D1D]">
                        {p.name.replace(" (Indian Institute of Technology)", "")}
                      </span>
                    </div>
                    <span className="text-[9px] text-[#C9A45C] font-medium tracking-tight truncate">
                      {p.role}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scrubbed Scroll Progress Line (Desktop) */}
          <div className="hidden lg:block w-full h-[2px] bg-[#E8DDCA] rounded-full overflow-hidden mt-2">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#451B0E] w-0 transition-all duration-75"
            />
          </div>
        </div>

        {/* Pinned Stacked Panels Container — ALL 4 CARDS FULLY RENDERED */}
        <div
          ref={panelsContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full flex-1 h-full min-h-0 my-1"
        >
          {partnersData.map((partner, idx) => {
            const isCurrent = activePanelIdx === idx;
            return (
              <div
                key={partner.id}
                className={`pinned-story-panel w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-[#E8DDCA] shadow-xl p-5 sm:p-7 lg:p-6 xl:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  // On desktop (lg:), GSAP timeline controls absolute layering & scroll animation
                  "lg:absolute lg:inset-0"
                } ${
                  // On mobile/tablet (< lg), show the current card with clean transitions
                  isCurrent
                    ? "block opacity-100"
                    : "hidden lg:block lg:opacity-100"
                }`}
                style={{ zIndex: 10 + idx }}
              >
                <div className="panel-inner-content grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-center h-full w-full">
                  {/* Left Narrative Column */}
                  <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full py-1">
                    {/* Top Badge & Number */}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#FAF5EE] text-[#451B0E] text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[#C9A45C]/30 shadow-sm">
                        {partner.badge}
                      </span>
                      <span className="text-xs font-mono text-[#C9A45C] font-semibold">
                        Phase {partner.number} of 04
                      </span>
                    </div>

                    {/* Partner Brand Identity */}
                    <div className="space-y-1 mt-2">
                      <div className="relative w-40 sm:w-48 h-10 sm:h-12">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-medium text-[#24211E] tracking-tight">
                        {partner.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#C9A45C] tracking-wide uppercase">
                        {partner.role} • {partner.tagline}
                      </p>
                    </div>

                    {/* Editorial Description */}
                    <p className="text-xs sm:text-sm xl:text-base text-[#24211E]/80 font-light leading-relaxed my-2 line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
                      {partner.description}
                    </p>

                    {/* Verified Architectural Highlights */}
                    <div className="space-y-2 py-2 border-t border-[#E8DDCA]">
                      {partner.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#24211E]/85 font-light">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Bottom Row */}
                    <div className="pt-2 flex items-center justify-between gap-4">
                      {onOpenBrochure && (
                        <button
                          onClick={onOpenBrochure}
                          className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#451B0E] hover:bg-[#6E2D1D] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 group"
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
                        className="text-xs font-medium text-[#C9A45C] hover:text-[#451B0E] transition-colors flex items-center gap-1 group"
                      >
                        <span className="hidden sm:inline">
                          {idx === partnersData.length - 1
                            ? "Back to 01"
                            : `Next: ${partnersData[idx + 1].name.split(" ")[0]}`}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Visual Column (Parallax Image with Scrim & Caption) */}
                  <div className="lg:col-span-6 xl:col-span-6 h-full flex flex-col justify-center">
                    <div
                      className="relative w-full h-[260px] sm:h-[340px] lg:h-[calc(100vh-240px)] xl:h-[calc(100vh-220px)] rounded-2xl overflow-hidden bg-black/10 border border-[#E8DDCA] shadow-2xl group cursor-pointer"
                      onClick={() =>
                        onOpenLightbox?.(
                          partner.image,
                          `${partner.name} • ${partner.imageCaption}`
                        )
                      }
                      title="Click to expand full image"
                    >
                      <div className="panel-image-parallax absolute inset-0 w-full h-full">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

                      {/* Zoom hint icon */}
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-lg">
                        <span className="text-xs sm:text-sm font-serif italic text-white/95 line-clamp-1">
                          {partner.imageCaption}
                        </span>
                        <span className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-wider font-semibold flex-shrink-0 ml-2">
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
        <div className="flex items-center justify-between pt-2 border-t border-[#E8DDCA]/60 flex-shrink-0 text-xs">
          {/* Quick Dots Jump */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider hidden sm:inline">
              Partners:
            </span>
            <div className="flex items-center gap-1.5">
              {partnersData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => goToCard(dotIdx)}
                  aria-label={`Jump to Partner 0${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activePanelIdx === dotIdx
                      ? "w-6 bg-[#C9A45C]"
                      : "w-2 bg-[#E8DDCA] hover:bg-[#C9A45C]/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop scroll guidance */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-neutral-400">
            <span>
              Scroll down or use tabs/arrows to explore all 4 partners
            </span>
            <span className="font-mono text-[#C9A45C] uppercase tracking-widest">
              • GSAP Pinned Storytelling
            </span>
          </div>

          {/* Mobile swipe hint */}
          <div className="lg:hidden text-[11px] text-neutral-400">
            Swipe left/right or tap tabs to switch
          </div>
        </div>
      </div>
    </section>
  );
}
