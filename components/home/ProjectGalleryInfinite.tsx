"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GalleryProps {
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function ProjectGalleryInfinite({ onOpenLightbox }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const galleryItemsRow1 = [
    {
      title: "Tower Elevation by Hafeez Contractor",
      category: "Architecture",
      image: "/images/assets/hero_tower.jpg",
    },
    {
      title: "Grand Living & Double-Height Salon",
      category: "Interiors",
      image: "/images/assets/residence_living.jpg",
    },
    {
      title: "Resort Swimming Pool & Kids Pool",
      category: "Leisure",
      image: "/images/assets/amenity_swimming_pool.jpg",
    },
    {
      title: "Presidential Master Suite",
      category: "Interiors",
      image: "/images/assets/bedroom_master_luxury.jpg",
    },
    {
      title: "Championship Tennis Court Arena",
      category: "Sports",
      image: "/images/assets/amenity_tennis_court.jpg",
    },
    {
      title: "Club Royale Dining & Banquet",
      category: "Amenities",
      image: "/images/assets/amenity_club_dining.jpg",
    },
  ];

  const galleryItemsRow2 = [
    {
      title: "Chef's Kitchen & Sunset Deck",
      category: "Interiors",
      image: "/images/assets/residence_kitchen.jpg",
    },
    {
      title: "State-of-the-Art Gymnasium",
      category: "Wellness",
      image: "/images/assets/amenity_gymnasium.jpg",
    },
    {
      title: "Private Poolside Balcony Deck",
      category: "Interiors",
      image: "/images/assets/balcony_deck_luxury.jpg",
    },
    {
      title: "Floodlit Cricket Net Practice Pitch",
      category: "Sports",
      image: "/images/assets/amenity_cricket_pitch.jpg",
    },
    {
      title: "Billiards & Indoor Games Lounge",
      category: "Leisure",
      image: "/images/assets/amenity_billiards.jpg",
    },
    {
      title: "Grand Entrance Security Portal",
      category: "Architecture",
      image: "/images/assets/amenity_entrance_portal.jpg",
    },
  ];

  useGSAP(
    () => {
      // Infinite Looped Panels (GSAP Demo 2 Reference)
      // Uses seamless wrap/xPercent animation with ScrollTrigger velocity influence
      const r1 = row1Ref.current;
      const r2 = row2Ref.current;
      if (!r1 || !r2) return;

      // Animate Row 1 towards left
      const tween1 = gsap.to(r1, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // Animate Row 2 towards right
      gsap.set(r2, { xPercent: -50 });
      const tween2 = gsap.to(r2, {
        xPercent: 0,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // Scroll velocity booster
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const speedMultiplier = 1 + Math.abs(velocity) / 600;
          gsap.to([tween1, tween2], {
            timeScale: Math.min(speedMultiplier, 3.5),
            duration: 0.3,
            overwrite: "auto",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#1A0A05] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,164,92,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#C9A45C]" />
          <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
            PROJECT GALLERY
          </span>
          <span className="w-8 h-[1px] bg-[#C9A45C]" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
          A Glimpse Into{" "}
          <span className="italic font-normal gold-gradient-text">
            Extraordinary Living.
          </span>
        </h2>
        <p className="mt-3 text-white/70 text-base sm:text-lg font-light max-w-2xl mx-auto">
          An editorial showcase of architectural mastery, bespoke interiors, and
          curated recreation designed for discerning connoisseurs.
        </p>
      </div>

      {/* Looped Row 1 (Moves Left) */}
      <div className="relative w-full overflow-hidden mb-6">
        <div ref={row1Ref} className="flex gap-6 w-max">
          {/* Double items for seamless infinite looping */}
          {[...galleryItemsRow1, ...galleryItemsRow1].map((item, idx) => (
            <div
              key={idx}
              className="relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[16/10] rounded-2xl overflow-hidden bg-black/50 border border-[#C9A45C]/20 shadow-xl group cursor-pointer flex-shrink-0"
              onClick={() => onOpenLightbox?.(item.image, item.title)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 460px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  {item.category}
                </span>
                <h3 className="text-base font-serif font-medium mt-0.5 group-hover:text-[#DFBF7A] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Looped Row 2 (Moves Right) */}
      <div className="relative w-full overflow-hidden">
        <div ref={row2Ref} className="flex gap-6 w-max">
          {[...galleryItemsRow2, ...galleryItemsRow2].map((item, idx) => (
            <div
              key={idx}
              className="relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[16/10] rounded-2xl overflow-hidden bg-black/50 border border-[#C9A45C]/20 shadow-xl group cursor-pointer flex-shrink-0"
              onClick={() => onOpenLightbox?.(item.image, item.title)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 460px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  {item.category}
                </span>
                <h3 className="text-base font-serif font-medium mt-0.5 group-hover:text-[#DFBF7A] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
