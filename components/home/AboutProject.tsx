"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, KeyRound, Gem, Play, ArrowRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DEVELOPER_PARTNERS_LOGO } from "@/lib/developerLogo";

interface AboutProps {
  onOpenVideo?: () => void;
  onOpenBrochure?: () => void;
}

export default function AboutProject({ onOpenVideo, onOpenBrochure }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Watermark Parallax
      if (watermarkRef.current && containerRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 2. Image Mask Reveal
      if (imageMaskRef.current && containerRef.current) {
        gsap.fromTo(
          imageMaskRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            y: 40,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageMaskRef.current,
              start: "top 80%",
              end: "top 25%",
              scrub: 0.6,
            },
          }
        );

        // Inner image zoom counter-parallax
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.25 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageMaskRef.current,
              start: "top 85%",
              end: "bottom 30%",
              scrub: true,
            },
          }
        );
      }

      // 3. Staggered reveal for badges and text
      if (textColRef.current) {
        gsap.from(".about-fade-item", {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 75%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#F8F5EF] text-[#24211E] overflow-hidden"
    >


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text & Badges */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col space-y-6">
            <div className="about-fade-item inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                A NEW LEGACY IN VARANASI
              </span>
            </div>

            <h2 className="about-fade-item text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E] leading-[1.15]">
              A Symphony of Design,
              <br />
              <span className="font-normal italic text-[#451B0E]">
                Luxury & Timeless Sophistication.
              </span>
            </h2>

            <p className="about-fade-item text-base sm:text-lg text-[#24211E]/85 font-light leading-relaxed">
              Full paid-up, freehold land, allotted by VDA, in the first government planned
              township of Varanasi,{" "}
              <strong className="font-semibold text-[#451B0E]">Transport Nagar</strong>.
              Introducing luxurious{" "}
              <strong className="font-semibold text-[#451B0E]">
                2, 3 & 4 bedroom residences
              </strong>{" "}
              engineered to redefine luxury living.
            </p>

            {/* Authentic Editorial Quote Box */}
            <div className="about-fade-item p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#C9A45C] shadow-sm space-y-2">
              <p className="text-xs sm:text-sm text-[#24211E]/80 font-light italic leading-relaxed">
                &ldquo;Kashi Nirmal Heights embodies a new standard of architectural excellence.
                Every residence is meticulously curated with elegant proportions, exquisite materials,
                and exceptional craftsmanship, creating spaces that exude understated luxury.&rdquo;
              </p>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A45C]">
                — Official Project Vision
              </span>
            </div>

            {/* Visionary Joint Developers Showcase - Exclusive Large View */}


            {/* Large View Logo */}
            <div className="w-full flex items-center justify-center py-2 transition-transform duration-300 group-hover:scale-[1.03]">
              <img
                src={DEVELOPER_PARTNERS_LOGO}
                alt="Shivyatan Group & Aaditri Joint Developers"
                className="h-20 sm:h-24 md:h-28 w-auto max-w-[340px] sm:max-w-[400px] object-contain drop-shadow-2xl"
              />
            </div>


            {/* 3 Prominent Verified Badges */}
            <div className="about-fade-item grid grid-cols-3 gap-3 pt-1 pb-1">
              <div className="p-4 rounded-xl bg-white border border-[#E8DDCA] shadow-sm flex flex-col items-center text-center group hover:border-[#C9A45C] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#C9A45C]/30 flex items-center justify-center text-[#451B0E] mb-2 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />
                </div>
                <span className="text-xs font-semibold text-[#24211E] tracking-tight">
                  VDA Approved
                </span>
                <span className="text-[10px] text-[#24211E]/60 mt-0.5">
                  100% Clear Title
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8DDCA] shadow-sm flex flex-col items-center text-center group hover:border-[#C9A45C] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#C9A45C]/30 flex items-center justify-center text-[#451B0E] mb-2 group-hover:scale-110 transition-transform duration-300">
                  <KeyRound className="w-5 h-5 text-[#C9A45C]" />
                </div>
                <span className="text-xs font-semibold text-[#24211E] tracking-tight">
                  Freehold Land
                </span>
                <span className="text-[10px] text-[#24211E]/60 mt-0.5">
                  Fully Paid-Up
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8DDCA] shadow-sm flex flex-col items-center text-center group hover:border-[#C9A45C] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#C9A45C]/30 flex items-center justify-center text-[#451B0E] mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Gem className="w-5 h-5 text-[#C9A45C]" />
                </div>
                <span className="text-xs font-semibold text-[#24211E] tracking-tight">
                  Hafeez Design
                </span>
                <span className="text-[10px] text-[#24211E]/60 mt-0.5">
                  Padma Bhushan
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="about-fade-item flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#floor-plans"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#451B0E] hover:text-[#C9A45C] transition-colors group"
              >
                <span>View Floor Plans & Layouts</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Iconic Twin Tower Architectural Visual */}
          <div className="lg:col-span-6">
            <div
              ref={imageMaskRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <div ref={imageInnerRef} className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/assets/hero_tower.jpg"
                  alt="Kashi Nirmal Heights Iconic 30-Storey Twin Towers Architectural Elevation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

              {/* Tagline Watermark */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20">
                30-Storey Twin Towers • NH-19 Landmark
              </div>

              {/* Interactive Video Play Button Trigger */}
              <button
                onClick={onOpenVideo}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-[#C9A45C] shadow-2xl group/btn"
                aria-label="Play Project Film"
              >
                <Play className="w-6 h-6 fill-white ml-1 transition-transform duration-300 group-hover/btn:scale-110" />
              </button>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <span className="font-serif italic tracking-wide text-white/95">
                  Architectural Elevation • Masterwork by Padma Bhushan Hafeez Contractor
                </span>
                <span className="text-[#C9A45C] text-[11px] font-semibold tracking-wider uppercase flex-shrink-0 ml-3">
                  Explore Film
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
