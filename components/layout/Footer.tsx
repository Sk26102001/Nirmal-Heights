"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bounceContainerRef = useRef<HTMLDivElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const archState = useRef({ y: 25 });
  const [velocityDisplay, setVelocityDisplay] = useState(0);

  // Helper to re-render the quadratic curved arch path
  const updateArchPaths = (yVal: number) => {
    if (fillPathRef.current) {
      fillPathRef.current.setAttribute(
        "d",
        `M 0 120 Q 720 ${yVal} 1440 120 L 1440 125 L 0 125 Z`
      );
    }
    if (strokePathRef.current) {
      strokePathRef.current.setAttribute(
        "d",
        `M 0 120 Q 720 ${yVal} 1440 120`
      );
    }
  };

  useGSAP(
    () => {
      const footer = footerRef.current;
      const bounceContainer = bounceContainerRef.current;
      if (!footer || !bounceContainer) return;

      let isBouncing = false;

      // GSAP Elastic Bounce Synced on the Rounded Half Arch
      // Reference: https://demos.gsap.com/demo/footer-bounce/
      ScrollTrigger.create({
        trigger: footer,
        start: "top 95%",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const absVelocity = Math.abs(velocity);
          setVelocityDisplay(Math.round(absVelocity));

          // When the user scrolls with speed towards or into the footer
          if (absVelocity > 140 && !isBouncing) {
            isBouncing = true;

            // 1. Calculate dynamic arch deflection based on velocity
            // Positive velocity = scrolling down -> pushes the arch down into the footer
            // Negative velocity = scrolling up -> pulls the arch upward
            const deflection = Math.max(-55, Math.min(65, velocity / 28));
            const startY = 25 + deflection;

            // Animate the arch's center control point with elastic recoil
            gsap.killTweensOf(archState.current);
            gsap.fromTo(
              archState.current,
              { y: startY },
              {
                y: 25,
                duration: 1.8,
                ease: "elastic.out(1.5, 0.22)",
                onUpdate: () => updateArchPaths(archState.current.y),
                onComplete: () => {
                  isBouncing = false;
                },
                overwrite: "auto",
              }
            );

            // 2. Elastic bounce on the inner container
            const bounceOffset = Math.min(80, Math.max(25, absVelocity / 40));
            gsap.fromTo(
              bounceContainer,
              {
                y: bounceOffset,
                scaleY: 1 + Math.min(0.08, absVelocity / 20000),
              },
              {
                y: 0,
                scaleY: 1,
                duration: 1.6,
                ease: "elastic.out(1.35, 0.3)",
                overwrite: "auto",
              }
            );

            // 3. Staggered subtle spring on content items
            gsap.fromTo(
              ".footer-bounce-item",
              { y: Math.min(24, absVelocity / 60), opacity: 0.85 },
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.04,
                ease: "elastic.out(1.2, 0.35)",
                overwrite: "auto",
              }
            );
          }
        },
        onEnter: (self) => {
          // Initial spring on entry
          const initialVelocity = self.getVelocity();
          const drop = Math.max(30, Math.min(60, Math.abs(initialVelocity) / 35));

          gsap.killTweensOf(archState.current);
          gsap.fromTo(
            archState.current,
            { y: 25 + drop },
            {
              y: 25,
              duration: 1.6,
              ease: "elastic.out(1.4, 0.26)",
              onUpdate: () => updateArchPaths(archState.current.y),
            }
          );

          gsap.fromTo(
            bounceContainer,
            { y: drop * 0.7 },
            {
              y: 0,
              duration: 1.5,
              ease: "elastic.out(1.2, 0.3)",
            }
          );
        },
      });
    },
    { scope: footerRef }
  );

  // Manual interactive trigger allowing user to test the elastic arch bounce anytime
  const triggerManualBounce = () => {
    if (!bounceContainerRef.current) return;

    // Bend the arch downwards to 80 and spring back with elastic oscillation
    gsap.killTweensOf(archState.current);
    gsap.fromTo(
      archState.current,
      { y: 85 },
      {
        y: 25,
        duration: 1.9,
        ease: "elastic.out(1.5, 0.22)",
        onUpdate: () => updateArchPaths(archState.current.y),
      }
    );

    gsap.fromTo(
      bounceContainerRef.current,
      { y: 45, scaleY: 1.05 },
      {
        y: 0,
        scaleY: 1,
        duration: 1.6,
        ease: "elastic.out(1.3, 0.3)",
      }
    );

    gsap.fromTo(
      ".footer-bounce-item",
      { y: 16 },
      {
        y: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "elastic.out(1.2, 0.35)",
      }
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-[#171614] text-white pt-2 sm:pt-4 pb-10 z-20"
    >
      {/* Elastic Curved SVG Dome Arch Header (The Rounded Half Border) */}
      <div className="absolute -top-14 sm:-top-20 md:-top-24 left-0 w-full h-16 sm:h-24 md:h-28 overflow-visible pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="goldArchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#451B0E" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#C9A45C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F3E9D4" stopOpacity="1" />
              <stop offset="75%" stopColor="#C9A45C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#451B0E" stopOpacity="0.2" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#C9A45C" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Solid footer fill that seamlessly extends upward into the arch */}
          <path
            ref={fillPathRef}
            d="M 0 120 Q 720 25 1440 120 L 1440 125 L 0 125 Z"
            fill="#171614"
          />

          {/* Glowing Champagne Gold Elastic Stroke Border */}
          <path
            ref={strokePathRef}
            d="M 0 120 Q 720 25 1440 120"
            fill="none"
            stroke="url(#goldArchGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
          />
        </svg>
      </div>

      {/* Main Elastic Bounce Container */}
      <div
        ref={bounceContainerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 origin-bottom will-change-transform pt-4"
      >
        {/* Subtle Indicator & Interactive Bounce Test Pill */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-ping" />
            <span className="text-[11px] uppercase tracking-widest text-[#C9A45C] font-medium">
              Kashi Nirmal Heights • Transport Nagar, Varanasi
            </span>
          </div>

          <button
            onClick={triggerManualBounce}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#C9A45C]/20 border border-[#C9A45C]/40 text-[#C9A45C] text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 shadow-md group"
            title="Click to trigger elastic border bounce"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
            <span>Bounce Circle Border</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="footer-bounce-item md:col-span-5 flex flex-col space-y-4">
            <div className="relative w-28 h-20 sm:w-32 sm:h-22 flex-shrink-0">
              <Image
                src="/images/assets/kashi_logo_emblem.png"
                alt="Kashi Nirmal Heights"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-contain object-left"
              />
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm">
              A premium luxury residential development offering 2, 3 & 4 BHK
              residences in Varanasi, built on full paid-up freehold land in the
              first government-planned township of Varanasi – Transport Nagar.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C9A45C]">
              <ShieldCheck className="w-4 h-4" />
              <span>VDA Allotted • Freehold Clear Title</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-bounce-item md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs uppercase tracking-widest font-semibold text-[#C9A45C] mb-3">
                Exploration
              </span>
              <ul className="space-y-2 text-xs text-white/75 font-light">
                <li>
                  <Link href="#hero" className="hover:text-[#C9A45C] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-[#C9A45C] transition-colors">
                    About Project
                  </Link>
                </li>
                <li>
                  <Link href="#architects" className="hover:text-[#C9A45C] transition-colors">
                    Architectural Excellence
                  </Link>
                </li>
                <li>
                  <Link href="#residences" className="hover:text-[#C9A45C] transition-colors">
                    Residences
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest font-semibold text-[#C9A45C] mb-3">
                Details
              </span>
              <ul className="space-y-2 text-xs text-white/75 font-light">
                <li>
                  <Link href="#amenities" className="hover:text-[#C9A45C] transition-colors">
                    Lifestyle Amenities
                  </Link>
                </li>
                <li>
                  <Link href="#floor-plans" className="hover:text-[#C9A45C] transition-colors">
                    Floor Plans
                  </Link>
                </li>
                <li>
                  <Link href="#specifications" className="hover:text-[#C9A45C] transition-colors">
                    Specifications
                  </Link>
                </li>
                <li>
                  <Link href="#location" className="hover:text-[#C9A45C] transition-colors">
                    Location Advantages
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Address & Social */}
          <div className="footer-bounce-item md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="block text-xs uppercase tracking-widest font-semibold text-[#C9A45C] mb-3">
                Site Address
              </span>
              <p className="text-xs text-white/70 font-light leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                <span>
                  Transport Nagar, First Planned Township, Varanasi, Uttar Pradesh,
                  India
                </span>
              </p>
            </div>

            <div className="pt-6">
              <span className="block text-[11px] uppercase tracking-wider text-white/60 mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bounce-item pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Kashi Nirmal Heights. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms & Conditions
            </span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#C9A45C] hover:text-[#DFBF7A] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-bounce-item pt-4 text-[10px] text-white/40 text-center sm:text-left leading-relaxed">
          Disclaimer: All artistic impressions, layouts, specifications, and
          renderings are indicative and subject to change by competent authorities
          as per VDA guidelines and applicable RERA norms.
        </div>
      </div>
    </footer>
  );
}
