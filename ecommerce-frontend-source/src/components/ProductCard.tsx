"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { resolveProductBadge, money } from "@/lib/badge";
import type { Product } from "@/lib/types";
import { Button, Chip } from "./ui";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const badge = resolveProductBadge(product);
  const { addItem } = useCart();
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        {badge ? <span className="absolute left-3 top-3"><Chip color={badge.color}>{badge.label}</Chip></span> : null}
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{product.category.name}</p>
          <Link href={`/products/${product.id}`} className="mt-1 line-clamp-2 min-h-11 font-semibold text-ink hover:text-primary dark:text-white">{product.name}</Link>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-ink dark:text-white">{money(product.price)}</span>
          {product.compareAtPrice ? <span className="text-sm text-slate-400 line-through">{money(product.compareAtPrice)}</span> : null}
        </div>
        <Button disabled={product.stock === 0} onClick={() => addItem(product)} className="w-full gap-2">
          <ShoppingCart size={16} /> {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
