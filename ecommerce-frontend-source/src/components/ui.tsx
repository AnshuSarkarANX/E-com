import Link from "next/link";
import { cn } from "@/lib/cn";

export function Button({ className, variant = "primary", size = "md", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-primary text-white hover:bg-primary/90",
        variant === "secondary" && "border border-slate-200 bg-white text-ink hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
        variant === "ghost" && "text-ink hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        className,
      )}
      {...props}
    />
  );
}

export function LinkButton({ href, children, className, variant = "primary" }: { href: string; children: React.ReactNode; className?: string; variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <Link href={href} className={cn("inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition", variant === "primary" && "bg-primary text-white hover:bg-primary/90", variant === "secondary" && "border border-slate-200 bg-white text-ink hover:bg-slate-50", variant === "ghost" && "text-ink hover:bg-slate-100", className)}>
      {children}
    </Link>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-primary/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-900", props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("min-h-28 w-full rounded-md border border-slate-200 bg-white p-3 text-sm outline-none ring-primary/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-900", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-primary/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-900", props.className)} />;
}

export function Chip({ children, color = "#01696f" }: { children: React.ReactNode; color?: string }) {
  return <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: color }}>{children}</span>;
}

export function Section({ title, children, action }: { title?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {title ? <div className="mb-5 flex items-center justify-between gap-4"><h2 className="font-display text-3xl text-ink dark:text-white">{title}</h2>{action}</div> : null}
      {children}
    </section>
  );
}
