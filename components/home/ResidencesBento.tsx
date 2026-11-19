"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Maximize2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ResidencesProps {
  onOpenFloorPlans?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function ResidencesBento({
  onOpenFloorPlans,
  onOpenLightbox,
}: ResidencesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  const images = {
    living: {
      src: "/images/assets/residence_living.jpg",
      title: "Grand Living & Dining Salon",
      tag: "3 & 4 BHK",
      caption: "Expansive double-height salon with Italian marble & running sundeck",
    },
    bedroom1: {
      src: "/images/assets/bedroom_master_luxury.jpg",
      title: "Presidential Master Suite",
      tag: "Master Bedroom",
      caption: "Designed to inspire. Crafted to endure. Imported laminate & cove lighting",
    },
    bedroom2: {
      src: "/images/assets/balcony_deck_luxury.jpg",
      title: "Resort Balcony & Swimming Pool",
      tag: "Private Deck",
      caption: "Expansive sit-out deck with glass railing overlooking the resort swimming pool",
    },
    kitchen: {
      src: "/images/assets/residence_kitchen.jpg",
      title: "Modular Kitchen & Balcony",
      tag: "Balcony View",
      caption: "Granite countertop kitchen with panoramic running sundeck & skyline view",
    },
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate left column text elements
      gsap.fromTo(
        ".residences-fade-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate photo cards gently without locking them to opacity: 0
      gsap.fromTo(
        ".residence-card",
        { y: 20, scale: 0.98 },
        {
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="residences"
      ref={containerRef}
      className="relative py-20 md:py-28 lg:py-32 bg-[#F8F5EF] text-[#24211E] overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#451B0E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Information & CTA (Matching Reference) */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col justify-center space-y-5 text-left"
          >
            {/* Category Tag */}
            <div className="residences-fade-item inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                RESIDENCES
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="residences-fade-item text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E] leading-[1.15]">
              Spaces That{" "}
              <span className="italic font-normal text-[#451B0E] block sm:inline">
                Redefine Luxury.
              </span>
            </h2>

            {/* Description */}
            <p className="residences-fade-item text-base sm:text-lg text-[#24211E]/75 font-light leading-relaxed">
              Elegant 2, 3 & 4 BHK residences with spacious layouts and premium finishes.
            </p>

            {/* Key Specifications Bullet Highlights */}
            <div className="residences-fade-item space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#24211E]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0" />
                <span>2, 3 & 4 BHK VDA Approved Freehold Residences</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#24211E]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0" />
                <span>3-Side Open Ventilation & Expansive Sundecks</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#24211E]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0" />
                <span>Double-Height Living Salons with Italian Marble</span>
              </div>
            </div>

            {/* Floor Plans Action CTA Button */}
            <div className="residences-fade-item pt-2">
              <button
                onClick={onOpenFloorPlans}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A45C]/20 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span>Explore Floor Plans</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic 4-Photo Luxury Collage (Fully Visible & Proportioned) */}
          <div ref={collageRef} className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 h-auto sm:h-[440px] md:h-[480px] lg:h-[500px]">
              {/* Photo 1: Grand Living Room (Left Large Card ~50%) */}
              <div
                className="residence-card relative w-full sm:w-[50%] h-[280px] sm:h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8DDCA] shadow-xl group cursor-pointer bg-[#EFE9DD]"
                onClick={() => onOpenLightbox?.(images.living.src, images.living.title)}
              >
                <Image
                  src={images.living.src}
                  alt={images.living.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle bottom gradient scrim for legible text without darkening the room */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Top Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#1C0904]/80 backdrop-blur-md border border-[#C9A45C]/50 text-[#C9A45C] text-[11px] font-semibold tracking-wider uppercase shadow-md">
                    {images.living.tag}
                  </span>
                </div>

                {/* Expand Pill */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="text-base sm:text-lg font-serif font-medium group-hover:text-[#DFBF7A] transition-colors">
                    {images.living.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 font-light line-clamp-1">
                    {images.living.caption}
                  </p>
                </div>
              </div>

              {/* Photos 2 & 3: Middle Vertical Stack (2 Bedrooms ~25%) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 w-full sm:w-[25%] h-auto sm:h-full">
                {/* Photo 2: Master Bedroom Suite (Top Card) */}
                <div
                  className="residence-card relative w-full h-[180px] sm:h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-[#E8DDCA] shadow-md group cursor-pointer bg-[#EFE9DD]"
                  onClick={() => onOpenLightbox?.(images.bedroom1.src, images.bedroom1.title)}
                >
                  <Image
                    src={images.bedroom1.src}
                    alt={images.bedroom1.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1C0904]/80 backdrop-blur-md border border-[#C9A45C]/40 text-[#C9A45C] text-[10px] font-semibold uppercase shadow-sm">
                      {images.bedroom1.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <h4 className="text-xs sm:text-sm font-serif font-medium leading-tight group-hover:text-[#DFBF7A] transition-colors">
                      {images.bedroom1.title}
                    </h4>
                  </div>
                </div>

                {/* Photo 3: Second Luxury Bedroom (Bottom Card) */}
                <div
                  className="residence-card relative w-full h-[180px] sm:h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-[#E8DDCA] shadow-md group cursor-pointer bg-[#EFE9DD]"
                  onClick={() => onOpenLightbox?.(images.bedroom2.src, images.bedroom2.title)}
                >
                  <Image
                    src={images.bedroom2.src}
                    alt={images.bedroom2.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1C0904]/80 backdrop-blur-md border border-[#C9A45C]/40 text-[#C9A45C] text-[10px] font-semibold uppercase shadow-sm">
                      {images.bedroom2.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <h4 className="text-xs sm:text-sm font-serif font-medium leading-tight group-hover:text-[#DFBF7A] transition-colors">
                      {images.bedroom2.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Photo 4: Modular Kitchen & Panoramic Balcony (Right Card ~25%) */}
              <div
                className="residence-card relative w-full sm:w-[25%] h-[280px] sm:h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8DDCA] shadow-xl group cursor-pointer bg-[#EFE9DD]"
                onClick={() => onOpenLightbox?.(images.kitchen.src, images.kitchen.title)}
              >
                <Image
                  src={images.kitchen.src}
                  alt={images.kitchen.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#1C0904]/80 backdrop-blur-md border border-[#C9A45C]/50 text-[#C9A45C] text-[11px] font-semibold tracking-wider uppercase shadow-md">
                    {images.kitchen.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="text-sm sm:text-base font-serif font-medium group-hover:text-[#DFBF7A] transition-colors">
                    {images.kitchen.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 font-light line-clamp-1">
                    {images.kitchen.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
