"use client";

import { useRouter } from "next/navigation";
import { CreditCard, IndianRupee } from "lucide-react";
import { UserShell } from "@/components/Layout";
import { Button, Section } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { money } from "@/lib/badge";

export default function PaymentPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const total = Math.round(subtotal * 1.18);
  const place = () => { clearCart(); router.push("/orders/ord-new/confirmation"); };
  return (
    <UserShell>
      <Section title="Payment">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            <button className="rounded-lg border-2 border-primary bg-white p-6 text-left dark:bg-slate-900"><IndianRupee className="mb-4" /><h2 className="font-bold text-ink dark:text-white">Cash on Delivery</h2><p className="mt-1 text-sm text-slate-500">Pay when the order arrives.</p></button>
            <button className="rounded-lg border border-slate-200 bg-white p-6 text-left dark:border-slate-800 dark:bg-slate-900"><CreditCard className="mb-4" /><h2 className="font-bold text-ink dark:text-white">Pay Online</h2><p className="mt-1 text-sm text-slate-500">Razorpay checkout.js stub with mock order ID.</p></button>
          </div>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-bold text-ink dark:text-white">Order Summary</h2><div className="mt-4 space-y-2 text-sm">{items.map((item) => <div key={item.product.id} className="flex justify-between"><span>{item.product.name} x {item.quantity}</span><span>{money(item.product.price * item.quantity)}</span></div>)}</div><div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold"><span>Total</span><span>{money(total)}</span></div><Button onClick={place} className="mt-5 w-full">Place Order</Button></aside>
        </div>
      </Section>
    </UserShell>
  );
}
