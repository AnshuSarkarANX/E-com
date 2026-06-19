"use client";

import { UserShell } from "@/components/Layout";
import { Input, LinkButton, Section } from "@/components/ui";

export default function AddressPage() {
  return (
    <UserShell>
      <Section title="Delivery Address">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <label className="rounded-lg border-2 border-primary bg-white p-4 shadow-sm dark:bg-slate-900"><input type="radio" defaultChecked className="mr-2" />Mira Customer<br /><span className="text-sm text-slate-500">12 Market Road, Bengaluru, Karnataka 560001</span></label>
          <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
            <Input placeholder="Full name" defaultValue="Mira Customer" /><Input placeholder="Phone" defaultValue="9876543210" />
            <Input placeholder="Line 1 with Google Places autocomplete" className="md:col-span-2" />
            <Input placeholder="Line 2" className="md:col-span-2" />
            <Input placeholder="City" /><Input placeholder="State" /><Input placeholder="Pincode" /><Input placeholder="Country" defaultValue="India" />
            <div className="md:col-span-2"><LinkButton href="/checkout/payment">Continue to Payment</LinkButton></div>
          </form>
        </div>
      </Section>
    </UserShell>
  );
}
