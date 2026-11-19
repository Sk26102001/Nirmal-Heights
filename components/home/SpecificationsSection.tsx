"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ShieldCheck,
  Layers,
  Utensils,
  Bath,
  Maximize,
  Zap,
  Lock,
  BatteryCharging,
  CheckCircle2,
  FileText,
  Maximize2,
  ChevronsUpDown,
} from "lucide-react";
import { SPECIFICATIONS_DATA } from "@/lib/data";

interface SpecificationsSectionProps {
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function SpecificationsSection({ onOpenLightbox }: SpecificationsSectionProps) {
  // Independent multi-accordion state: opening any item does NOT close or distort other items
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const isAllExpanded = openIndices.length === SPECIFICATIONS_DATA.length;

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(SPECIFICATIONS_DATA.map((_, i) => i));
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />,
    Layers: <Layers className="w-5 h-5 text-[#C9A45C]" />,
    Utensils: <Utensils className="w-5 h-5 text-[#C9A45C]" />,
    Bath: <Bath className="w-5 h-5 text-[#C9A45C]" />,
    Maximize: <Maximize className="w-5 h-5 text-[#C9A45C]" />,
    Zap: <Zap className="w-5 h-5 text-[#C9A45C]" />,
    Lock: <Lock className="w-5 h-5 text-[#C9A45C]" />,
    BatteryCharging: <BatteryCharging className="w-5 h-5 text-[#C9A45C]" />,
  };

  // Split into two independent columns so expanding one side never stretches or deforms the other side
  const midPoint = Math.ceil(SPECIFICATIONS_DATA.length / 2);
  const leftColumnSpecs = SPECIFICATIONS_DATA.slice(0, midPoint);
  const rightColumnSpecs = SPECIFICATIONS_DATA.slice(midPoint);

  const renderCard = (spec: (typeof SPECIFICATIONS_DATA)[0], originalIdx: number) => {
    const isOpen = openIndices.includes(originalIdx);
    return (
      <div
        key={spec.category}
        className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden ${
          isOpen ? "border-[#C9A45C] ring-1 ring-[#C9A45C]/30" : "border-[#E8DDCA]"
        }`}
      >
        <button
          onClick={() => toggleIndex(originalIdx)}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                isOpen
                  ? "bg-[#451B0E] border-[#451B0E] text-white"
                  : "bg-[#FAF5EE] border-[#C9A45C]/30 group-hover:border-[#C9A45C]"
              }`}
            >
              {iconMap[spec.icon] || <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />}
            </div>
            <span
              className={`font-serif text-base sm:text-lg font-medium transition-colors truncate ${
                isOpen ? "text-[#451B0E]" : "text-[#24211E] group-hover:text-[#451B0E]"
              }`}
            >
              {spec.category}
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isOpen ? "bg-[#FAF5EE] text-[#451B0E]" : "text-[#C9A45C] group-hover:bg-[#FAF5EE]"
            }`}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-[#451B0E]" : "text-[#C9A45C]"
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-2 border-t border-[#FAF5EE] space-y-2.5 animate-in fade-in duration-200">
            {spec.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#24211E]/80 leading-relaxed font-light">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="specifications" className="py-24 md:py-32 bg-[#FAF7F2] text-[#24211E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#C9A45C]" />
            <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
              TECHNICAL SPECIFICATIONS
            </span>
            <span className="w-8 h-[1px] bg-[#C9A45C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E] leading-tight">
            Excellence in{" "}
            <span className="italic font-normal text-[#451B0E]">
              Every Detail.
            </span>
          </h2>
          <p className="mt-3 text-[#24211E]/70 text-base sm:text-lg font-light">
            Every specification is engineered to meet national safety codes, seismic
            standards, and timeless luxury longevity – directly from the official project brochure.
          </p>

          {/* Action Row: Expand/Collapse All + Lightbox Spread */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleToggleAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8DDCA] hover:border-[#C9A45C] text-[#24211E] text-xs font-medium transition-all shadow-sm"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{isAllExpanded ? "Collapse All Categories" : "Expand All Categories"}</span>
            </button>

            {onOpenLightbox && (
              <button
                onClick={() =>
                  onOpenLightbox(
                    "/images/brochure/authentic_specifications.jpg",
                    "Authentic Technical Specifications Spread • Kashi Nirmal Heights"
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#C9A45C]/40 text-[#451B0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#451B0E] hover:text-white transition-all shadow-sm group"
              >
                <FileText className="w-4 h-4 text-[#C9A45C] group-hover:text-white" />
                <span>Inspect Authentic Brochure Spread</span>
                <Maximize2 className="w-3.5 h-3.5 ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Two Independent Vertical Columns (Opening in one column NEVER stretches the other) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
          {/* Left Column Stack */}
          <div className="flex flex-col gap-4">
            {leftColumnSpecs.map((spec, i) => renderCard(spec, i))}
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-4">
            {rightColumnSpecs.map((spec, i) => renderCard(spec, midPoint + i))}
          </div>
        </div>
      </div>
    </section>
  );
}
