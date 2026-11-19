"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Plane,
  Train,
  Landmark,
  GraduationCap,
  Navigation,
  Compass,
  Clock,
  ExternalLink,
  Shield,
  Building2,
  Maximize2,
  Map as MapIcon,
  Layers,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LOCATION_CONNECTIVITY, LocationItem } from "@/lib/data";

interface LocationSectionProps {
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function LocationSection({ onOpenLightbox }: LocationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [activeMapView, setActiveMapView] = useState<"map" | "site">("map");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const getIcon = (category: string) => {
    switch (category) {
      case "transit":
        return <Train className="w-4 h-4 text-[#C9A45C]" />;
      case "heritage":
        return <Landmark className="w-4 h-4 text-[#C9A45C]" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-[#C9A45C]" />;
      default:
        return <Building2 className="w-4 h-4 text-[#C9A45C]" />;
    }
  };

  const filteredItems =
    filterCategory === "all"
      ? LOCATION_CONNECTIVITY
      : LOCATION_CONNECTIVITY.filter((item) => item.category === filterCategory);

  const currentMapImage =
    activeMapView === "map"
      ? "/images/assets/authentic_varanasi_location_map.jpg"
      : "/images/brochure/authentic_site_plan_vda.jpg";

  const currentMapCaption =
    activeMapView === "map"
      ? "Authentic Varanasi Regional Connectivity Map • Kashi Nirmal Heights"
      : "Authentic VDA Approved Master Site Plan • Transport Nagar, Varanasi";

  useGSAP(
    () => {
      // Map Reveal Animation
      if (mapCardRef.current && containerRef.current) {
        gsap.from(mapCardRef.current, {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapCardRef.current,
            start: "top 80%",
          },
        });
      }

      // Staggered list items
      if (listRef.current) {
        gsap.from(".location-item-row", {
          x: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="location"
      ref={containerRef}
      className="py-24 md:py-36 bg-[#F8F5EF] text-[#24211E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#C9A45C]" />
            <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
              LOCATION & CONNECTIVITY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E] leading-tight">
            Strategic Varanasi Address.{" "}
            <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#451B0E]">
              Connected to Everything That Matters.
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#24211E]/75 font-light">
            Situated directly at Transport Nagar on the NH-19 corridor – Varanasi's premier
            government-planned township. Effortless 10-to-30 minute travel times to the
            airport, railway hubs, sacred ghats, and Vishwanath Temple.
          </p>
        </div>

        {/* Master Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Authentic Varanasi Map & Site Plan Showcase */}
          <div ref={mapCardRef} className="lg:col-span-5 flex flex-col space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 bg-[#FAF5EE] p-1.5 rounded-full border border-[#E8DDCA] w-max">
              <button
                onClick={() => setActiveMapView("map")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeMapView === "map"
                    ? "bg-[#451B0E] text-white shadow-sm font-semibold"
                    : "text-[#24211E]/70 hover:text-[#24211E]"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Varanasi Regional Map</span>
              </button>
              <button
                onClick={() => setActiveMapView("site")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeMapView === "site"
                    ? "bg-[#451B0E] text-white shadow-sm font-semibold"
                    : "text-[#24211E]/70 hover:text-[#24211E]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>VDA Site Plan</span>
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8DDCA] shadow-xl group">
              {/* Authentic Map/Site Plan Image */}
              <div
                className="absolute inset-0 w-full h-full cursor-pointer bg-[#FAF7F2]"
                onClick={() => onOpenLightbox?.(currentMapImage, currentMapCaption)}
              >
                <Image
                  src={currentMapImage}
                  alt={currentMapCaption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-2.5 sm:p-4 transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Top Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#1C0904]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-[#C9A45C]/50 flex items-center gap-1.5 shadow-md">
                  <Shield className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>
                    {activeMapView === "map" ? "Authentic Regional Map" : "VDA Approved Layout"}
                  </span>
                </span>
              </div>

              {/* Bottom Details Bar */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8DDCA] flex items-center justify-between shadow-lg">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                    Township Address
                  </span>
                  <span className="text-xs font-semibold text-[#24211E]">
                    Transport Nagar • NH-19 Corridor
                  </span>
                </div>
                <button
                  onClick={() => onOpenLightbox?.(currentMapImage, currentMapCaption)}
                  className="px-3 py-1.5 rounded-full bg-[#451B0E] text-white text-[11px] font-medium flex items-center gap-1 hover:bg-[#6E2D1D] transition-colors"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Zoom High-Res</span>
                </button>
              </div>
            </div>

            {/* Strategic Urban Advantages Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8DDCA] shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                <h4 className="text-sm font-serif font-semibold text-[#451B0E] uppercase tracking-wider">
                  Township Infrastructure Highlights
                </h4>
              </div>
              <ul className="text-xs sm:text-[13px] text-[#24211E]/80 space-y-2.5 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-[#24211E]">Direct NH-19 Connectivity:</strong> Just 5 KM (10 MIN) to Varanasi-Prayagraj National Highway.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-[#24211E]">Airport Fast Corridor:</strong> Direct 30 MIN (20 KM) access to Lal Bahadur Shastri Int'l Airport (VNS).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-[#24211E]">First Planned Township:</strong> Wide 8000mm roads, underground utilities, and planned social amenities.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-[#24211E]">Full Paid-Up Freehold:</strong> 100% clear VDA title with zero encumbrances.
                  </span>
                </li>
              </ul>

              <div className="pt-2 border-t border-[#E8DDCA] flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Transport+Nagar+Varanasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#451B0E] font-semibold hover:text-[#C9A45C] flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[11px] text-[#24211E]/60">Varanasi, UP</span>
              </div>
            </div>
          </div>

          {/* Right Column: All 17 Verified Destinations with KM & MIN */}
          <div ref={listRef} className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E8DDCA] p-6 sm:p-8 shadow-xl">
              {/* Header with Category Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DDCA] mb-4">
                <div>
                  <h3 className="text-base font-serif font-semibold text-[#451B0E]">
                    17 Verified Landmarks & Travel Times
                  </h3>
                  <span className="text-[11px] text-[#24211E]/60">
                    Directly from the Official Kashi Nirmal Heights Brochure
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {[
                    { id: "all", label: "All (17)" },
                    { id: "transit", label: "Transit" },
                    { id: "heritage", label: "Heritage" },
                    { id: "lifestyle", label: "City & Hubs" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterCategory(f.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap ${
                        filterCategory === f.id
                          ? "bg-[#451B0E] text-white"
                          : "bg-[#FAF5EE] text-[#24211E]/70 hover:text-[#24211E]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column Labels */}
              <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C9A45C] border-b border-[#FAF5EE]">
                <span>Destination / Landmark</span>
                <div className="flex items-center gap-6">
                  <span>Distance</span>
                  <span className="w-16 text-right">Drive Time</span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#FAF7F2] max-h-[580px] overflow-y-auto pr-1">
                {filteredItems.map((item, idx) => (
                  <div
                    key={item.name}
                    className="location-item-row py-3 flex items-center justify-between group hover:bg-[#FAF7F2] px-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#C9A45C]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {getIcon(item.category)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#24211E] group-hover:text-[#451B0E] transition-colors truncate">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs sm:text-sm font-semibold text-[#451B0E] font-serif tracking-wide bg-[#FAF5EE] px-2.5 py-1 rounded-md border border-[#E8DDCA]">
                        {item.distance}
                      </span>
                      <div className="w-16 flex items-center justify-end gap-1 text-xs font-semibold text-[#C9A45C]">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DDCA] flex items-center justify-between text-[11px] text-[#24211E]/60">
                <span>* Distances measured from project gate via primary express corridors.</span>
                <span className="text-[#C9A45C] font-medium">Source: Official Brochure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
