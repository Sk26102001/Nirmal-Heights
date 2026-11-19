"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone, Download, ChevronDown } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  onOpenBookVisit?: () => void;
  onOpenBrochure?: () => void;
}

export default function Navbar({ onOpenBookVisit, onOpenBrochure }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Residences", href: "#residences", hasDropdown: true },
    { name: "Amenities", href: "#amenities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#1C0904]/90 backdrop-blur-md py-3 shadow-xl border-b border-[#C9A45C]/20"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#hero" className="flex items-center gap-2 group">
              <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/assets/kashi_logo_emblem.png"
                  alt="Kashi Nirmal Heights"
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-[#C9A45C] text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1 inline-flex items-center gap-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-[#C9A45C] opacity-80" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenBookVisit}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A45C]/20 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Book a Visit</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenBookVisit}
                className="px-3 py-1.5 rounded-full bg-[#C9A45C] text-[#1C0904] text-[11px] font-semibold uppercase tracking-wider"
              >
                Visit
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-[#C9A45C] transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#1C0904]/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ top: "60px" }}
      >
        <div className="flex flex-col space-y-5 pt-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/90 hover:text-[#C9A45C] text-lg font-serif tracking-wider transition-all duration-200 border-b border-white/5 pb-2"
              style={{
                transitionDelay: `${idx * 40}ms`,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(15px)",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="pt-6 border-t border-[#C9A45C]/20 flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBookVisit?.();
            }}
            className="w-full py-3 rounded-full bg-[#C9A45C] text-[#1C0904] text-xs font-semibold uppercase tracking-widest text-center shadow-lg"
          >
            Schedule a Private Visit
          </button>
          {onOpenBrochure && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure?.();
              }}
              className="w-full py-2.5 rounded-full border border-[#C9A45C]/50 text-white text-xs uppercase tracking-widest text-center"
            >
              Download PDF Brochure
            </button>
          )}
        </div>
      </div>
    </>
  );
}
