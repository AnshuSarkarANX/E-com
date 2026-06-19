"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { UserShell } from "@/components/Layout";
import { Button, LinkButton, Section } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { money } from "@/lib/badge";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, savings } = useCart();
  const gst = Math.round(subtotal * 0.18);
  if (items.length === 0) {
    return <UserShell><Section><div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-teal-50 text-4xl font-bold text-primary">0</div><h1 className="mt-6 font-display text-4xl text-ink dark:text-white">Your cart is empty</h1><div className="mt-6"><LinkButton href="/products">Browse Products</LinkButton></div></div></Section></UserShell>;
  }
  return (
    <UserShell>
      <Section title="Cart">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[96px_1fr_auto]">
                <img src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                <div><Link href={`/products/${product.id}`} className="font-semibold text-ink dark:text-white">{product.name}</Link><p className="mt-1 text-sm">{money(product.price)}</p><p className="mt-1 text-xs text-slate-500">Max stock: {product.stock}</p></div>
                <div className="flex items-center gap-2"><Button variant="secondary" size="sm" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></Button><span className="w-8 text-center font-bold">{quantity}</span><Button variant="secondary" size="sm" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></Button><Button variant="ghost" size="sm" onClick={() => removeItem(product.id)}><Trash2 size={16} /></Button></div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-ink dark:text-white">Price Breakdown</h2>
            <dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div className="flex justify-between"><dt>GST 18%</dt><dd>{money(gst)}</dd></div><div className="flex justify-between text-green-600"><dt>Savings</dt><dd>{money(savings)}</dd></div><div className="border-t pt-3 flex justify-between text-lg font-bold text-ink dark:text-white"><dt>Total</dt><dd>{money(subtotal + gst)}</dd></div></dl>
            <LinkButton href="/checkout/address" className="mt-5 w-full">Proceed to Checkout</LinkButton>
          </aside>
        </div>
      </Section>
    </UserShell>
  );
}
