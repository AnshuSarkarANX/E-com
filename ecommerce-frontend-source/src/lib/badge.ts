import type { Product } from "./types";

export function resolveProductBadge(product: Product) {
  if (product.stock === 0) return { label: "Out of Stock", color: "#64748b" };
  if (product.stock > 0 && product.stock < 5) return { label: `Only ${product.stock} Left!`, color: "#dc2626" };
  if (product.badge) return { label: product.badge.label, color: product.badge.color };
  if (product.soldCount > 50 && product.stock < 20) return { label: "Selling Fast", color: "#ea580c" };
  if (product.compareAtPrice) return { label: "SALE", color: "#16a34a" };
  return null;
}

export function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}
