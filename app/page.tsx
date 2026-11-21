"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutProject from "@/components/home/AboutProject";
import ArchitecturalExcellence from "@/components/home/ArchitecturalExcellence";
import ResidencesBento from "@/components/home/ResidencesBento";
import AmenitiesHorizontal from "@/components/home/AmenitiesHorizontal";
import ProjectGalleryInfinite from "@/components/home/ProjectGalleryInfinite";
import FloorPlansSection from "@/components/home/FloorPlansSection";
import SpecificationsSection from "@/components/home/SpecificationsSection";
import LocationSection from "@/components/home/LocationSection";
import EnquirySection from "@/components/home/EnquirySection";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import {
  BookVisitModal,
  BrochureModal,
  VideoModal,
  LightboxModal,
} from "@/components/ui/Modals";

export default function HomePage() {
  const [bookVisitOpen, setBookVisitOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; caption: string }>({
    isOpen: false,
    src: "",
    caption: "",
  });

  const handleOpenLightbox = (src: string, caption: string) => {
    setLightbox({ isOpen: true, src, caption });
  };

  const handleCloseLightbox = () => {
    setLightbox({ isOpen: false, src: "", caption: "" });
  };

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#24211E] selection:bg-[#C9A45C] selection:text-[#1A0A05] relative">
      {/* Premium Luxury Navigation */}
      <Navbar
        onOpenBookVisit={() => setBookVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      {/* 1. Cinematic Hero Section (GSAP Demo 5: Image Mask on Scroll + Stagger) */}
      <Hero
        onOpenVideo={() => setVideoOpen(true)}
        onOpenBookVisit={() => setBookVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 2. Project Introduction (GSAP Demo 5: Image Mask + Watermark Parallax) */}
      <AboutProject
        onOpenVideo={() => setVideoOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      {/* 3. Architectural Excellence (GSAP Demo 3: Pinned Panels with Overscroll) */}
      <ArchitecturalExcellence
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 4. Residences (GSAP Demo 1: Scrubbed Bento Gallery) */}
      <ResidencesBento
        onOpenFloorPlans={() => {
          document.getElementById("floor-plans")?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 5. Thoughtfully Designed Floor Plans & Clusters */}
      <FloorPlansSection
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 6. Lifestyle & Amenities (GSAP Demo 6: Horizontal Scrolling Gallery) */}
      <AmenitiesHorizontal
        onOpenBookVisit={() => setBookVisitOpen(true)}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 7. Project Gallery (GSAP Demo 2: Infinite Looped Panels) */}
      <ProjectGalleryInfinite
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 8. Technical Specifications */}
      <SpecificationsSection onOpenLightbox={handleOpenLightbox} />

      {/* 9. Location Advantages & Verified Connectivity */}
      <LocationSection onOpenLightbox={handleOpenLightbox} />

      {/* 10. Lead Generation & Booking Inquiry Banner */}
      <EnquirySection />

      {/* 11. Elastic Footer (GSAP Demo 4: Elastic Footer Bounce) */}
      <Footer />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloat />

      {/* Modals & Overlays */}
      <BookVisitModal
        isOpen={bookVisitOpen}
        onClose={() => setBookVisitOpen(false)}
      />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <LightboxModal
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        caption={lightbox.caption}
        onClose={handleCloseLightbox}
      />
    </main>
  );
}
