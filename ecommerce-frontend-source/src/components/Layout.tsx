"use client";

import Link from "next/link";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export function UserShell({ children }: { children: React.ReactNode }) {
  const { count } = useCart();
  const { user } = useAuth();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200 flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-3xl text-primary">TazaMart</Link>
          <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <Link href="/products">Products</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/admin">Admin</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm sm:inline">{user?.name}</span>
            <button aria-label="Toggle dark mode" onClick={() => setDark((value) => !value)} className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <Link href="/cart" className="relative rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ShoppingBag size={20} />
              {count > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-urgency px-1 text-xs font-bold text-white">{count}</span> : null}
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 py-8 text-center text-sm dark:border-slate-800">Frontend-first commerce demo. Mock data today, GraphQL tomorrow.</footer>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const links = [["/admin", "Dashboard"], ["/admin/products", "Products"], ["/admin/banners", "Banners"], ["/admin/promotions", "Promotions"], ["/admin/categories", "Categories"], ["/admin/orders", "Orders"], ["/admin/inventory", "Inventory"]];
  return (
    <div className="min-h-screen bg-slate-100 text-slate-700">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href="/" className="font-display text-3xl text-primary">TazaMart</Link>
        <nav className="mt-8 space-y-1">{links.map(([href, label]) => <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-slate-100">{label}</Link>)}</nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-5 py-4"><div className="font-semibold text-ink">Admin Panel</div></header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
