"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Download, Check, Sparkles, Compass, Shield, Building, Layers } from "lucide-react";
import { FLOOR_PLANS_DATA, FloorPlanItem } from "@/lib/data";

interface FloorPlansProps {
  onOpenBrochure?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function FloorPlansSection({
  onOpenBrochure,
  onOpenLightbox,
}: FloorPlansProps) {
  const [activeTower, setActiveTower] = useState<"All" | "Tower A" | "Tower B" | "Site Plan">("All");
  const [selectedPlanId, setSelectedPlanId] = useState(FLOOR_PLANS_DATA[0].id);

  const filteredPlans =
    activeTower === "All"
      ? FLOOR_PLANS_DATA
      : FLOOR_PLANS_DATA.filter((p) => p.tower === activeTower);

  const activePlan =
    filteredPlans.find((p) => p.id === selectedPlanId) || filteredPlans[0] || FLOOR_PLANS_DATA[0];

  return (
    <section id="floor-plans" className="py-24 md:py-36 bg-[#F8F5EF] text-[#24211E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                AUTHENTIC BROCHURE PLANS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E]">
              Site Plan & Floor Layouts.
              <br />
              <span className="italic font-normal text-[#451B0E]">
                Crafted for Space & Elegance.
              </span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#24211E]/75 font-light max-w-2xl">
              Authentic VDA-approved floor plates and unit plans for Tower A and Tower B,
              featuring exact RERA carpet areas, spacious sundeck balconies, and 3D isometric views.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            {onOpenBrochure && (
              <button
                onClick={onOpenBrochure}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A45C]/20 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Plans in Brochure</span>
              </button>
            )}
          </div>
        </div>

        {/* Tower Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          {(["All", "Site Plan", "Tower A", "Tower B"] as const).map((tower) => (
            <button
              key={tower}
              onClick={() => {
                setActiveTower(tower);
                const firstInTower =
                  tower === "All"
                    ? FLOOR_PLANS_DATA[0].id
                    : FLOOR_PLANS_DATA.find((p) => p.tower === tower)?.id || FLOOR_PLANS_DATA[0].id;
                setSelectedPlanId(firstInTower);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTower === tower
                  ? "bg-[#451B0E] text-white shadow-md shadow-[#451B0E]/20"
                  : "bg-white text-[#24211E]/75 hover:text-[#24211E] border border-[#E8DDCA]"
              }`}
            >
              {tower === "All"
                ? "All Layouts"
                : tower === "Site Plan"
                ? "Master Site Plan"
                : `${tower} (2, 3 & 4 BHK)`}
            </button>
          ))}
        </div>

        {/* Plan Selectors Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E8DDCA] overflow-x-auto">
          {filteredPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activePlan.id === plan.id
                  ? "bg-[#C9A45C] text-[#140602] font-semibold shadow-sm"
                  : "bg-white/80 text-[#24211E]/70 hover:text-[#24211E] hover:bg-white border border-[#E8DDCA]/70"
              }`}
            >
              <span className="opacity-70 mr-1.5 text-[10px] uppercase font-semibold">
                [{plan.tower}]
              </span>
              <span>{plan.title.replace("Tower-A | ", "").replace("Tower-B | ", "")}</span>
            </button>
          ))}
        </div>

        {/* Active Plan Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white rounded-3xl border border-[#E8DDCA] p-6 sm:p-8 md:p-10 shadow-xl">
          {/* Left: High-Res Plan View with Zoom trigger */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div
              className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DDCA] shadow-inner group cursor-pointer"
              onClick={() => onOpenLightbox?.(activePlan.image, `${activePlan.title} (${activePlan.configuration})`)}
            >
              <Image
                src={activePlan.image}
                alt={activePlan.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Watermark / Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#451B0E] text-xs font-semibold uppercase tracking-wider border border-[#C9A45C]/40 shadow-sm">
                  {activePlan.tower}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1C0904]/85 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider">
                  {activePlan.type}
                </span>
              </div>

              {/* Zoom pill */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C0904]/85 backdrop-blur-md text-white text-xs font-medium group-hover:bg-[#C9A45C] group-hover:text-[#1C0904] transition-all shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to Zoom High-Res</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#24211E]/60 px-1">
              <span>* Dimensions & layouts as per official VDA approved building sanction.</span>
              <button
                onClick={() => onOpenLightbox?.(activePlan.image, activePlan.title)}
                className="text-[#451B0E] hover:text-[#C9A45C] font-semibold flex items-center gap-1 underline underline-offset-4"
              >
                <span>View Full-Screen</span>
              </button>
            </div>
          </div>

          {/* Right: Architectural Metrics & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                <Layers className="w-4 h-4" />
                <span>{activePlan.tower} • {activePlan.type}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#24211E] mt-1">
                {activePlan.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#451B0E] mt-1">
                {activePlan.configuration}
              </p>
            </div>

            {/* Key Authentic Dimension Badges Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCA]">
              <div className="p-3 rounded-xl bg-white border border-[#E8DDCA]/60">
                <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  Salable Area
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#451B0E]">
                  {activePlan.salableArea}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8DDCA]/60">
                <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  RERA Carpet Area
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#24211E] leading-tight block">
                  {activePlan.reraCarpetArea}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8DDCA]/60">
                <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  Balcony Area
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#24211E] leading-tight block">
                  {activePlan.balconyArea}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8DDCA]/60">
                <span className="block text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  Unit Covered Area
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#24211E] leading-tight block">
                  {activePlan.coveredArea}
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <p className="text-xs sm:text-sm text-[#24211E]/75 font-light leading-relaxed">
              {activePlan.details}
            </p>

            {/* Features check rows */}
            <div className="space-y-2.5 pt-2 border-t border-[#E8DDCA]">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#24211E]/80">
                <Compass className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>Aspect & Orientation: <strong className="font-medium text-[#451B0E]">{activePlan.facing}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#24211E]/80">
                <Shield className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>VDA Approved Full Paid-Up Freehold Land Title</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#24211E]/80">
                <Check className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>Structural Vetting & Wind Tunnel Testing by IIT</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenLightbox?.(activePlan.image, activePlan.title)}
                className="w-full sm:flex-1 py-3.5 rounded-full bg-[#451B0E] hover:bg-[#6E2D1D] text-white text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Zoom Full Layout</span>
              </button>

              {onOpenBrochure && (
                <button
                  onClick={onOpenBrochure}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#FAF5EE] hover:bg-[#F2ECE0] text-[#451B0E] border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#C9A45C]" />
                  <span>Brochure PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
