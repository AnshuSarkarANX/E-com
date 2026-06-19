"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Banner } from "@/lib/types";
import { cn } from "@/lib/cn";

function linkFor(banner: Banner) {
  if (banner.linkType === "URL") return banner.linkValue;
  if (banner.linkType === "PRODUCT") return `/products/${banner.linkValue}`;
  if (banner.linkType === "CATEGORY") return `/products?categoryId=${banner.linkValue}`;
  return "/";
}

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % Math.max(1, banners.length)), 5000);
    return () => window.clearInterval(timer);
  }, [banners.length]);
  const banner = banners[index];
  if (!banner) return null;
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-slate-900">
      <Link href={linkFor(banner)} className="absolute inset-0">
        <img src={banner.imageUrl} alt={banner.title} className="h-full w-full object-cover opacity-70" />
      </Link>
      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-100">Fresh arrivals</p>
        <h1 className="max-w-2xl font-display text-5xl text-white sm:text-6xl">{banner.title}</h1>
        <div className="mt-8 flex gap-2">
          {banners.map((item, dotIndex) => (
            <button key={item.id} aria-label={`Show ${item.title}`} onClick={() => setIndex(dotIndex)} className={cn("h-2.5 w-8 rounded-full bg-white/40", index === dotIndex && "bg-white")} />
          ))}
        </div>
      </div>
    </section>
  );
}
