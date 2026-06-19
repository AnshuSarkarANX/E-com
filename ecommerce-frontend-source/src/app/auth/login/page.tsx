"use client";

import { UserShell } from "@/components/Layout";
import { Button, Input, LinkButton, Section } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { loginAs } = useAuth();
  return <UserShell><Section><div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h1 className="font-display text-4xl text-ink dark:text-white">Login</h1><div className="mt-5 space-y-3"><Input placeholder="Email" /><Input placeholder="Password" type="password" /><Button onClick={() => loginAs("CUSTOMER")} className="w-full">Login as Customer</Button><Button onClick={() => loginAs("ADMIN")} variant="secondary" className="w-full">Login as Admin</Button><LinkButton href="/auth/register" variant="ghost" className="w-full">Create account</LinkButton></div></div></Section></UserShell>;
}
