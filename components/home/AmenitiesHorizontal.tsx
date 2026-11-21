"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  Building,
  Dumbbell,
  Trees,
  Smile,
  Sun,
  Gamepad2,
  Trophy,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { AMENITIES_LIST } from "@/lib/data";

interface AmenitiesProps {
  onOpenBookVisit?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function AmenitiesHorizontal({
  onOpenBookVisit,
  onOpenLightbox,
}: AmenitiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleSlide = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const scrollAmount = direction === "left" ? -460 : 460;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Sync with GSAP ScrollTrigger if on desktop pinned mode
    const st = ScrollTrigger.getById("amenities-pin");
    if (st && window.innerWidth >= 1024) {
      const step = 0.12;
      const newProgress = Math.max(
        0,
        Math.min(1, st.progress + (direction === "right" ? step : -step))
      );
      const targetScroll = st.start + newProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Map icon names to Lucide icons
  const iconMap: Record<string, React.ReactNode> = {
    Waves: <Waves className="w-5 h-5" />,
    Home: <Building className="w-5 h-5" />,
    Dumbbell: <Dumbbell className="w-5 h-5" />,
    Sun: <Sun className="w-5 h-5" />,
    Trees: <Trees className="w-5 h-5" />,
    Trophy: <Trophy className="w-5 h-5" />,
    Smile: <Smile className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Gamepad2: <Gamepad2 className="w-5 h-5" />,
    BookOpen: <BookOpen className="w-5 h-5" />,
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        // Calculate dynamic scroll distance
        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        // Horizontal Scrolling Gallery (GSAP Demo 6 reference)
        const scrollTween = gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            id: "amenities-pin",
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });

        // Image cards subtle scale effect while scrolling
        const cards = gsap.utils.toArray<HTMLElement>(".amenity-slide-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector(".amenity-img"),
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="amenities"
      ref={containerRef}
      className="relative bg-[#35140A] text-white overflow-hidden"
    >
      {/* Top Gold Ornamental Border */}
      <div className="w-full h-1 bg-gradient-to-r from-[#451B0E] via-[#C9A45C] to-[#451B0E]" />

      {/* Static Header & Quick Icons Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                LIFESTYLE & AMENITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              An Extraordinary Lifestyle,
              <br />
              <span className="italic font-normal gold-gradient-text">
                Every Single Day.
              </span>
            </h2>
            <p className="mt-3 text-white/70 text-base sm:text-lg font-light max-w-xl">
              World-class amenities crafted for a healthier, happier, and more
              luxurious life in the tranquil heart of Transport Nagar.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end items-center gap-4">
            <button
              onClick={onOpenBookVisit}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A45C]/20 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>View Amenities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 12-Icon Gold Grid (Exactly matching the design mockup) */}
        {/* <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 p-5 rounded-2xl bg-black/30 border border-[#C9A45C]/20 backdrop-blur-sm">
          {[
            { label: "Swimming Pool", icon: <Waves className="w-5 h-5" /> },
            { label: "Clubhouse", icon: <Building className="w-5 h-5" /> },
            { label: "Gymnasium", icon: <Dumbbell className="w-5 h-5" /> },
            { label: "Landscaped Garden", icon: <Trees className="w-5 h-5" /> },
            { label: "Kids Play Area", icon: <Smile className="w-5 h-5" /> },
            { label: "Yoga & Meditation", icon: <Sun className="w-5 h-5" /> },
            { label: "Indoor Games", icon: <Gamepad2 className="w-5 h-5" /> },
            { label: "Badminton Court", icon: <Trophy className="w-5 h-5" /> },
            { label: "Basketball Court", icon: <Trophy className="w-5 h-5" /> },
            { label: "Tennis Court", icon: <Trophy className="w-5 h-5" /> },
            { label: "Library", icon: <BookOpen className="w-5 h-5" /> },
            { label: "Banquet Hall", icon: <Building className="w-5 h-5" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#451B0E] border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-2 group-hover:scale-110 group-hover:border-[#DFBF7A] transition-all">
                {item.icon}
              </div>
              <span className="text-[11px] font-medium text-white/90 tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Horizontal Scrolling Gallery Stage (GSAP Demo 6) */}
      <div className="relative pb-24">




        {/* Gallery Slider Track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-12 overflow-x-auto lg:overflow-visible no-scrollbar pb-6 lg:pb-0"
        >
          {AMENITIES_LIST.map((amenity, idx) => (
            <div
              key={amenity.id}
              className="amenity-slide-card flex-shrink-0 w-[290px] sm:w-[360px] md:w-[440px] aspect-[16/11] relative rounded-3xl overflow-hidden bg-black/60 border border-[#C9A45C]/30 shadow-2xl group cursor-pointer"
              onClick={() =>
                onOpenLightbox?.(amenity.image, amenity.name + " – " + amenity.description)
              }
            >
              {/* Inner Image with scrub counter-scale */}
              <div className="amenity-img absolute inset-0 w-full h-full">
                <Image
                  src={amenity.image}
                  alt={amenity.name}
                  fill
                  sizes="(max-width: 640px) 290px, (max-width: 768px) 360px, 440px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Top Tag & Index */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C0904]/80 backdrop-blur-md border border-[#C9A45C]/40 text-[#C9A45C] text-[10px] font-semibold tracking-wider uppercase">
                  {iconMap[amenity.iconName]}
                  <span>{amenity.category}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10">
                  {idx + 1} / {AMENITIES_LIST.length}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-serif font-medium leading-snug group-hover:text-[#DFBF7A] transition-colors">
                  {amenity.name}
                </h3>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
