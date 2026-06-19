import { UserShell } from "@/components/Layout";
import { Input, LinkButton, Section } from "@/components/ui";

export default function RegisterPage() {
  return <UserShell><Section><div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h1 className="font-display text-4xl text-ink dark:text-white">Register</h1><div className="mt-5 space-y-3"><Input placeholder="Name" /><Input placeholder="Email" /><Input placeholder="Password" type="password" /><LinkButton href="/products" className="w-full">Create Account</LinkButton></div></div></Section></UserShell>;
}
