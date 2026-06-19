import Link from "next/link";
import { UserShell } from "@/components/Layout";
import { Chip, Section } from "@/components/ui";
import { getUserOrders } from "@/lib/api";
import { money } from "@/lib/badge";

export default async function OrdersPage() {
  const orders = await getUserOrders("u-customer");
  return (
    <UserShell>
      <Section title="My Orders">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {orders.map((order) => <Link key={order.id} href={`/orders/${order.id}/confirmation`} className="grid gap-2 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-4"><span className="font-bold text-ink dark:text-white">{order.id}</span><span>{new Date(order.createdAt).toLocaleDateString()}</span><span>{money(order.totalAmount)}</span><span><Chip color={order.status === "SHIPPED" ? "#2563eb" : "#01696f"}>{order.status}</Chip></span></Link>)}
        </div>
      </Section>
    </UserShell>
  );
}
