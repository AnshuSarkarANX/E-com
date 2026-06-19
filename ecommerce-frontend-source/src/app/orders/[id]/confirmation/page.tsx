import { UserShell } from "@/components/Layout";
import { LinkButton, Section } from "@/components/ui";
import { getOrder } from "@/lib/api";
import { money } from "@/lib/badge";

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  const eta = new Date();
  eta.setDate(eta.getDate() + 5);
  return (
    <UserShell>
      <Section>
        <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="font-display text-5xl text-ink dark:text-white">Thank you</h1>
          <p className="mt-3">Order ID: <strong>{params.id}</strong></p>
          <p className="mt-1">Estimated delivery: <strong>{eta.toLocaleDateString()}</strong></p>
          {order ? <div className="mt-6 rounded-lg bg-slate-50 p-4 text-left dark:bg-slate-950">{order.items.map((item) => <div key={item.id} className="flex justify-between py-2"><span>{item.product.name} x {item.quantity}</span><span>{money(item.price * item.quantity)}</span></div>)}<div className="border-t pt-3 font-bold">Total: {money(order.totalAmount)}</div></div> : <p className="mt-5 text-slate-500">Mock order created from checkout flow.</p>}
          <div className="mt-6"><LinkButton href="/products">Continue Shopping</LinkButton></div>
        </div>
      </Section>
    </UserShell>
  );
}
