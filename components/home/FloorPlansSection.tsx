"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Maximize2,
  Download,
  Check,
  Compass,
  Shield,
  Layers,
  Building2,
  Sparkles,
  ArrowRight,
  Eye,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  FLOOR_PLANS_DATA,
  BROCHURE_SPREADS_DATA,
  FloorPlanItem,
  BrochureSpreadItem,
} from "@/lib/data";

interface FloorPlansProps {
  onOpenBrochure?: () => void;
  onOpenLightbox?: (src: string, caption: string) => void;
}

export default function FloorPlansSection({
  onOpenBrochure,
  onOpenLightbox,
}: FloorPlansProps) {
  // Navigation tabs: All, Tower A, Tower B, Site Plan, or Full Brochure Spreads
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Tower A" | "Tower B" | "Site Plan" | "Brochure Spreads"
  >("All");

  // Selected floor plan ID
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    FLOOR_PLANS_DATA[1]?.id || FLOOR_PLANS_DATA[0].id // Default to Tower-A Unit 1 or Cluster
  );

  // Selected brochure spread ID
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>(
    BROCHURE_SPREADS_DATA[0].id
  );

  // Filtered unit floor plans
  const filteredPlans =
    activeCategory === "All"
      ? FLOOR_PLANS_DATA
      : activeCategory === "Site Plan"
      ? FLOOR_PLANS_DATA.filter((p) => p.tower === "Site Plan")
      : activeCategory === "Tower A"
      ? FLOOR_PLANS_DATA.filter((p) => p.tower === "Tower A")
      : activeCategory === "Tower B"
      ? FLOOR_PLANS_DATA.filter((p) => p.tower === "Tower B")
      : [];

  const activePlan: FloorPlanItem =
    filteredPlans.find((p) => p.id === selectedPlanId) ||
    filteredPlans[0] ||
    FLOOR_PLANS_DATA[1] ||
    FLOOR_PLANS_DATA[0];

  const activeSpread: BrochureSpreadItem =
    BROCHURE_SPREADS_DATA.find((s) => s.id === selectedSpreadId) ||
    BROCHURE_SPREADS_DATA[0];

  // =========================================================================
  // DEDICATED FULL-SCALE ARCHITECTURAL BLUEPRINT ZOOM VIEWER STATE & HANDLERS
  // =========================================================================
  const [zoomModalPlan, setZoomModalPlan] = useState<FloorPlanItem | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1);
  const [modalPan, setModalPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isModalDragging, setIsModalDragging] = useState<boolean>(false);
  const modalDragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const modalHasDragged = useRef<boolean>(false);

  const openPlanZoomModal = (plan: FloorPlanItem) => {
    setSelectedPlanId(plan.id);
    setZoomModalPlan(plan);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
    setIsModalDragging(false);
    modalHasDragged.current = false;
    onOpenLightbox?.(
      plan.image,
      `${plan.title} • ${plan.configuration} (${plan.salableArea})`
    );
  };

  const closePlanZoomModal = () => {
    setZoomModalPlan(null);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
  };

  const handleNextPlan = () => {
    if (!zoomModalPlan) return;
    const currentIdx = filteredPlans.findIndex((p) => p.id === zoomModalPlan.id);
    const nextIdx = (currentIdx + 1) % filteredPlans.length;
    const nextPlan = filteredPlans[nextIdx];
    setSelectedPlanId(nextPlan.id);
    setZoomModalPlan(nextPlan);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
  };

  const handlePrevPlan = () => {
    if (!zoomModalPlan) return;
    const currentIdx = filteredPlans.findIndex((p) => p.id === zoomModalPlan.id);
    const prevIdx = (currentIdx - 1 + filteredPlans.length) % filteredPlans.length;
    const prevPlan = filteredPlans[prevIdx];
    setSelectedPlanId(prevPlan.id);
    setZoomModalPlan(prevPlan);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setModalZoom((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 4));
  };

  const handleZoomOut = () => {
    setModalZoom((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
      if (next === 1) setModalPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
  };

  const handleToggleZoom = () => {
    if (modalHasDragged.current) {
      modalHasDragged.current = false;
      return;
    }
    if (modalZoom === 1) {
      setModalZoom(2.2);
    } else {
      setModalZoom(1);
      setModalPan({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation & zoom shortcuts inside modal
  useEffect(() => {
    if (!zoomModalPlan) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlanZoomModal();
      else if (e.key === "ArrowRight") handleNextPlan();
      else if (e.key === "ArrowLeft") handlePrevPlan();
      else if (e.key === "+" || e.key === "=") handleZoomIn();
      else if (e.key === "-" || e.key === "_") handleZoomOut();
      else if (e.key === "0" || e.key.toLowerCase() === "r") handleResetZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomModalPlan, filteredPlans]);

  return (
    <section
      id="floor-plans"
      className="py-20 md:py-32 bg-[#F8F5EF] text-[#24211E] relative overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8DDCA_1px,transparent_1px),linear-gradient(to_bottom,#E8DDCA_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Download CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DDCA]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-[#C9A45C]" />
              <span className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase">
                AUTHENTIC ARCHITECTURAL LAYOUTS • VDA APPROVED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#24211E] leading-tight">
              Site Plan & Floor Layouts.
              <br />
              <span className="italic font-normal text-[#451B0E]">
                Crafted for Space & Elegance.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#24211E]/75 font-light max-w-2xl leading-relaxed">
              Authentic VDA-approved floor plates and unit plans for Tower A and
              Tower B, featuring exact RERA carpet areas, spacious sundecks, and
              3D isometric cutaways directly from the official project brochure.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-3">
            {onOpenBrochure && (
              <button
                onClick={onOpenBrochure}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#C9A45C] to-[#B08B42] text-[#1C0904] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A45C]/20 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Plans in Brochure</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {[
            { id: "All", label: "All Floor Plans", count: FLOOR_PLANS_DATA.length },
            { id: "Tower A", label: "Tower A (2 & 3 BHK)", count: 4 },
            { id: "Tower B", label: "Tower B (3 & 4 BHK)", count: 4 },
            { id: "Site Plan", label: "Master Site Plan", count: 1 },
            {
              id: "Brochure Spreads",
              label: "Official Brochure Spreads",
              count: BROCHURE_SPREADS_DATA.length,
            },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  if (cat.id !== "Brochure Spreads") {
                    const firstPlan =
                      cat.id === "All"
                        ? FLOOR_PLANS_DATA[1]?.id || FLOOR_PLANS_DATA[0].id
                        : FLOOR_PLANS_DATA.find((p) => p.tower === cat.id)?.id ||
                          FLOOR_PLANS_DATA[0].id;
                    setSelectedPlanId(firstPlan);
                  }
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#451B0E] text-white shadow-md shadow-[#451B0E]/20 ring-1 ring-[#C9A45C]"
                    : "bg-white text-[#24211E]/80 hover:text-[#24211E] border border-[#E8DDCA] hover:border-[#C9A45C]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#C9A45C] text-[#1C0904]"
                      : "bg-[#FAF5EE] text-[#451B0E]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: UNIT FLOOR PLANS SHOWCASE & VISUAL GALLERY            */}
        {/* ============================================================== */}
        {activeCategory !== "Brochure Spreads" && activePlan && (
          <div className="space-y-10">
            {/* Featured Active Plan Inspector Card */}
            <div id="floor-plans-inspector" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start bg-white rounded-3xl border border-[#E8DDCA] p-5 sm:p-8 md:p-10 shadow-xl scroll-mt-24">
              {/* Left Column: High-Res Plan View with Zoom & Lightbox Trigger */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div
                  className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DDCA] shadow-inner group cursor-pointer"
                  onClick={() => openPlanZoomModal(activePlan)}
                  title="Click to open full-resolution plan in Lightbox"
                >
                  <Image
                    src={activePlan.image}
                    alt={activePlan.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain p-3 sm:p-5 transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#451B0E] text-xs font-semibold uppercase tracking-wider border border-[#C9A45C]/40 shadow-sm">
                      {activePlan.tower}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#1C0904]/90 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider">
                      {activePlan.type}
                    </span>
                  </div>

                  {/* Zoom Hint Pill */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C0904]/85 backdrop-blur-md text-white text-xs font-medium group-hover:bg-[#C9A45C] group-hover:text-[#1C0904] transition-all shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Zoom High-Res</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#24211E]/65 px-1">
                  <span>* Dimensions verified as per official VDA building sanction.</span>
                  <button
                    onClick={() => openPlanZoomModal(activePlan)}
                    className="text-[#451B0E] hover:text-[#C9A45C] font-semibold flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Expand Full Screen</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Metrics & Specifications */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                    <Layers className="w-4 h-4" />
                    <span>
                      {activePlan.tower} • {activePlan.type}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#24211E] mt-1.5">
                    {activePlan.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#451B0E] mt-1">
                    {activePlan.configuration}
                  </p>
                </div>

                {/* 4 Dimension Badges Grid */}
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

                {/* Detailed Narrative */}
                <p className="text-xs sm:text-sm text-[#24211E]/80 font-light leading-relaxed">
                  {activePlan.details}
                </p>

                {/* Verified Building Sanction Highlights */}
                <div className="space-y-2 py-2 border-t border-[#E8DDCA]">
                  <div className="flex items-center gap-2.5 text-xs text-[#24211E]/85">
                    <Compass className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                    <span>
                      Orientation:{" "}
                      <strong className="font-semibold text-[#451B0E]">
                        {activePlan.facing}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#24211E]/85">
                    <Shield className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                    <span>VDA Approved Full Paid-Up Freehold Land</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#24211E]/85">
                    <Check className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                    <span>3-Side Open Homes Engineered for Cross-Ventilation</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => openPlanZoomModal(activePlan)}
                    className="w-full sm:flex-1 py-3 rounded-full bg-[#451B0E] hover:bg-[#6E2D1D] text-white text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Zoom Plan Layout</span>
                  </button>

                  {onOpenBrochure && (
                    <button
                      onClick={onOpenBrochure}
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#FAF5EE] hover:bg-[#F2ECE0] text-[#451B0E] border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#C9A45C]" />
                      <span>Brochure PDF</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* VISUAL GALLERY GRID OF ALL PLANS (So No Plan Is Ever Hidden!) */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base sm:text-lg font-serif font-medium text-[#24211E]">
                  Browse All Architectural Floor Plates ({filteredPlans.length}{" "}
                  Layouts)
                </h4>
                <span className="text-xs text-neutral-500 font-light">
                  Click any plan to open in high-res zoom
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPlans.map((plan) => {
                  const isSelected = activePlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => openPlanZoomModal(plan)}
                      className={`group p-3.5 rounded-2xl bg-white border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:border-[#C9A45C] ${
                        isSelected
                          ? "border-[#C9A45C] shadow-lg ring-2 ring-[#C9A45C]/50 bg-[#FAF7F2]"
                          : "border-[#E8DDCA] hover:border-[#C9A45C]/60 hover:shadow-md"
                      }`}
                    >
                      {/* Thumbnail Container — Clicking Opens Lightbox in Large with Interactive Zoom */}
                      <div
                        className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DDCA]/70 mb-3 group/thumb"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPlanZoomModal(plan);
                        }}
                        title="Click to zoom and view in large"
                      >
                        <Image
                          src={plan.image}
                          alt={plan.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#1C0904]/80 text-white text-[9px] font-semibold uppercase tracking-wider">
                          {plan.tower}
                        </div>

                        {/* Hover Overlay with "See in Large" Button */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#1C0904]/90 border border-[#C9A45C]/70 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg group-hover:bg-[#C9A45C] group-hover:text-[#1C0904] transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>See in Large</span>
                          </span>
                        </div>

                        {/* Top-Right Maximize Icon */}
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-[#451B0E] shadow-sm">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Title & Info */}
                      <div>
                        <span className="text-[10px] text-[#C9A45C] font-semibold uppercase tracking-wide block">
                          {plan.configuration}
                        </span>
                        <h5 className="text-xs sm:text-sm font-serif font-semibold text-[#24211E] mt-0.5 group-hover:text-[#451B0E] line-clamp-1">
                          {plan.title.replace("Tower-A | ", "").replace("Tower-B | ", "")}
                        </h5>
                        <div className="flex items-center justify-between text-[11px] text-[#451B0E] font-medium mt-2 pt-2 border-t border-[#E8DDCA]/60">
                          <span>Salable:</span>
                          <strong className="font-bold">{plan.salableArea}</strong>
                        </div>
                      </div>

                      {/* Explicit Action Button: See in Large */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPlanZoomModal(plan);
                        }}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#451B0E] text-[#451B0E] hover:text-white border border-[#C9A45C]/40 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer group-hover:border-[#451B0E]"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>See in Large</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: AUTHENTIC 2-PAGE BROCHURE SPREADS (Direct From Brochure)*/}
        {/* ============================================================== */}
        {activeCategory === "Brochure Spreads" && (
          <div className="space-y-8">
            {/* Active Spread Featured Viewer */}
            <div className="bg-white rounded-3xl border border-[#E8DDCA] p-5 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C9A45C] uppercase tracking-wider">
                    {activeSpread.spreadNumber} • {activeSpread.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#24211E] mt-0.5">
                    {activeSpread.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onOpenLightbox?.(
                        activeSpread.image,
                        `${activeSpread.title} • Official Brochure Spread`
                      )
                    }
                    className="px-4 py-2 rounded-full bg-[#451B0E] hover:bg-[#6E2D1D] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom Spread High-Res</span>
                  </button>
                </div>
              </div>

              {/* Large Spread Canvas (3200px HD Spread) */}
              <div
                className="relative w-full aspect-[32/11] sm:aspect-[32/10] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DDCA] shadow-inner group cursor-pointer"
                onClick={() =>
                  onOpenLightbox?.(
                    activeSpread.image,
                    `${activeSpread.title} • Official Brochure Spread`
                  )
                }
              >
                <Image
                  src={activeSpread.image}
                  alt={activeSpread.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-102"
                  priority
                />

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C0904]/85 text-white text-xs font-medium">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Zoom 3200px Spread</span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#24211E]/75 font-light leading-relaxed">
                {activeSpread.description}
              </p>
            </div>

            {/* Grid of All 5 Authentic Brochure Spreads */}
            <div>
              <h4 className="text-base sm:text-lg font-serif font-medium text-[#24211E] mb-4">
                All 5 Official Architectural Spreads
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BROCHURE_SPREADS_DATA.map((spread) => {
                  const isSelected = activeSpread.id === spread.id;
                  return (
                    <div
                      key={spread.id}
                      onClick={() => setSelectedSpreadId(spread.id)}
                      className={`p-4 rounded-2xl bg-white border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-[#C9A45C] shadow-lg ring-2 ring-[#C9A45C]/50 bg-[#FAF7F2]"
                          : "border-[#E8DDCA] hover:border-[#C9A45C]/60 hover:shadow-md"
                      }`}
                    >
                      <div
                        className="relative w-full aspect-[32/10] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DDCA]/70 mb-3 group/thumb"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpreadId(spread.id);
                          onOpenLightbox?.(
                            spread.image,
                            `${spread.title} • ${spread.spreadNumber}`
                          );
                        }}
                        title="Click to zoom in large resolution"
                      >
                        <Image
                          src={spread.image}
                          alt={spread.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#1C0904]/90 border border-[#C9A45C]/70 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg group-hover:bg-[#C9A45C] group-hover:text-[#1C0904] transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>See in Large</span>
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-[#451B0E] shadow-sm">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#C9A45C] font-bold uppercase">
                            {spread.spreadNumber}
                          </span>
                          <h5 className="text-xs sm:text-sm font-serif font-semibold text-[#24211E]">
                            {spread.title}
                          </h5>
                        </div>

                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#451B0E] border border-[#C9A45C]/30 font-semibold uppercase">
                          {spread.tower}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpreadId(spread.id);
                          onOpenLightbox?.(
                            spread.image,
                            `${spread.title} • ${spread.spreadNumber}`
                          );
                        }}
                        className="mt-2 w-full py-1.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#451B0E] text-[#451B0E] hover:text-white border border-[#C9A45C]/40 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>See in Large</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* DEDICATED FULL-SCALE ARCHITECTURAL BLUEPRINT ZOOM VIEWER MODAL */}
      {/* ============================================================== */}
      {zoomModalPlan && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
          onClick={closePlanZoomModal}
        >
          {/* Top Floating Control Bar */}
          <div
            className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1C0904]/90 backdrop-blur-md border border-[#C9A45C]/40 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Plan Button */}
            <button
              onClick={handlePrevPlan}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
              title="Previous Layout (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Plan Counter */}
            <span className="font-mono text-xs font-semibold text-[#C9A45C] min-w-[75px] text-center px-1">
              {filteredPlans.findIndex((p) => p.id === zoomModalPlan.id) + 1} / {filteredPlans.length}
            </span>

            {/* Next Plan Button */}
            <button
              onClick={handleNextPlan}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
              title="Next Layout (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="w-[1px] h-4 bg-white/20 mx-1" />

            {/* Zoom Out Button */}
            <button
              onClick={handleZoomOut}
              disabled={modalZoom <= 1}
              className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Current Zoom Percentage Pill */}
            <span className="font-mono text-xs font-semibold text-[#DFBF7A] min-w-[48px] text-center">
              {Math.round(modalZoom * 100)}%
            </span>

            {/* Zoom In Button */}
            <button
              onClick={handleZoomIn}
              disabled={modalZoom >= 4}
              className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <span className="w-[1px] h-4 bg-white/20 mx-1" />

            {/* Fit / Reset */}
            <button
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/15 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset Zoom (0 / R)"
            >
              <RotateCcw className="w-3 h-3 text-[#C9A45C]" />
              <span>Fit</span>
            </button>

            <span className="w-[1px] h-4 bg-white/20 mx-1" />

            {/* Download Plan */}
            <a
              href={zoomModalPlan.image}
              download={`${zoomModalPlan.title.replace(/\s+/g, "_")}.jpg`}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              title="Download High-Res Plan"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          {/* Top-Right Close Button */}
          <button
            onClick={closePlanZoomModal}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Zoomable Canvas */}
          <div
            className="relative max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative w-full h-[70vh] sm:h-[76vh] flex items-center justify-center overflow-hidden rounded-2xl ${
                modalZoom === 1
                  ? "cursor-zoom-in"
                  : isModalDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }`}
              onMouseDown={(e) => {
                if (modalZoom <= 1) return;
                e.preventDefault();
                setIsModalDragging(true);
                modalHasDragged.current = false;
                modalDragStart.current = {
                  x: e.clientX - modalPan.x,
                  y: e.clientY - modalPan.y,
                };
              }}
              onMouseMove={(e) => {
                if (!isModalDragging || modalZoom <= 1) return;
                e.preventDefault();
                modalHasDragged.current = true;
                setModalPan({
                  x: e.clientX - modalDragStart.current.x,
                  y: e.clientY - modalDragStart.current.y,
                });
              }}
              onMouseUp={() => setIsModalDragging(false)}
              onMouseLeave={() => setIsModalDragging(false)}
              onWheel={(e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                  setModalZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 4));
                } else {
                  setModalZoom((prev) => {
                    const next = Math.max(Number((prev - 0.25).toFixed(2)), 1);
                    if (next === 1) setModalPan({ x: 0, y: 0 });
                    return next;
                  });
                }
              }}
              onClick={handleToggleZoom}
            >
              <div
                style={{
                  transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalZoom})`,
                  transition: isModalDragging
                    ? "none"
                    : "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
                }}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                <Image
                  src={zoomModalPlan.image}
                  alt={zoomModalPlan.title}
                  fill
                  sizes="100vw"
                  className="object-contain pointer-events-none p-2 sm:p-4"
                  priority
                />
              </div>
            </div>

            {/* Bottom Info Bar with Complete Metrics */}
            <div className="mt-3 w-full flex flex-col items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl bg-[#1C0904]/90 border border-[#C9A45C]/40 text-white shadow-xl text-xs sm:text-sm">
                <span className="font-serif font-medium text-[#DFBF7A]">
                  {zoomModalPlan.title}
                </span>
                <span className="text-white/40">•</span>
                <span className="font-semibold text-white">
                  {zoomModalPlan.configuration}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-[#C9A45C]">
                  Salable: <strong>{zoomModalPlan.salableArea}</strong>
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-white/80 hidden sm:inline">
                  RERA: {zoomModalPlan.reraCarpetArea}
                </span>
                <span className="text-white/40 hidden md:inline">•</span>
                <span className="text-white/80 hidden md:inline">
                  Balcony: {zoomModalPlan.balconyArea}
                </span>
              </div>

              <div className="text-[10.5px] sm:text-[11px] text-white/60 font-light flex items-center gap-2">
                <span>• Click image to toggle {modalZoom === 1 ? "2.2x zoom" : "1.0x fit"}</span>
                <span className="hidden sm:inline">• Drag to pan when zoomed</span>
                <span className="hidden sm:inline">• Scroll wheel to zoom in/out</span>
                <span className="hidden sm:inline">• Use ← / → arrows to flip layouts</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
