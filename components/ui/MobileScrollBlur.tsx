"use client";

import GradualBlur from "@/components/ui/GradualBlur";

/**
 * Blur halus di tepi atas & bawah viewport, cuma muncul di mobile
 * (di-hide di breakpoint md ke atas via className).
 *
 * Blur BAWAH pakai target="page" (fixed penuh, nempel dasar layar).
 *
 * Blur ATAS sengaja TIDAK pakai target="page" langsung dari top:0 —
 * itu bikin dia nutupin Navbar (logo ikut keblur). Sebagai gantinya,
 * dibungkus div fixed sendiri yang di-offset ke bawah setinggi Navbar
 * (NAVBAR_HEIGHT), jadi area Navbar sama sekali gak kesentuh blur.
 *
 * Kalau tinggi Navbar kamu beda dari 5rem (80px), tinggal ubah
 * NAVBAR_HEIGHT di bawah ini.
 */
const NAVBAR_HEIGHT = "5rem";

export function MobileScrollBlur() {
  return (
    <div className="md:hidden">
      {/* Blur atas — mulai di bawah Navbar, bukan dari ujung layar */}
      <div
        className="pointer-events-none fixed inset-x-0 z-30"
        style={{ top: NAVBAR_HEIGHT, height: "4.5rem" }}
      >
        <GradualBlur
          target="parent"
          position="top"
          height="4.5rem"
          strength={1.5}
          divCount={5}
          curve="bezier"
          opacity={0.9}
        />
      </div>

      {/* Blur bawah — tetap nempel dasar layar, aman gak nabrak apa-apa */}
      <GradualBlur
        target="page"
        position="bottom"
        height="4.5rem"
        strength={1.5}
        divCount={5}
        curve="bezier"
        opacity={0.9}
        zIndex={30}
      />
    </div>
  );
}
