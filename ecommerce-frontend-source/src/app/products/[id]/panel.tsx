"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <input type="number" min={1} max={product.stock} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="h-11 w-24 rounded-md border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950" />
      <Button disabled={product.stock === 0} onClick={() => addItem(product, quantity)}>Add to Cart</Button>
      <LinkButton href="/checkout/address" variant="secondary">Buy Now</LinkButton>
    </div>
  );
}
