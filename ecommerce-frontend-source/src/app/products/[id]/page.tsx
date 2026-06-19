import { notFound } from "next/navigation";
import { UserShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Chip, LinkButton, Section } from "@/components/ui";
import { getProduct, getProducts } from "@/lib/api";
import { money, resolveProductBadge } from "@/lib/badge";
import { AddToCartPanel } from "./panel";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  const related = await getProducts({ categoryId: product.categoryId, limit: 4 });
  const badge = resolveProductBadge(product);
  const savings = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <UserShell>
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div><img src={product.images[0]} alt={product.name} className="aspect-square w-full rounded-lg object-cover" /></div>
          <div className="flex flex-col justify-center">
            {badge ? <div><Chip color={badge.color}>{badge.label}</Chip></div> : null}
            <h1 className="mt-4 font-display text-5xl text-ink dark:text-white">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{product.description}</p>
            <div className="mt-6 flex items-baseline gap-3"><span className="text-3xl font-bold text-ink dark:text-white">{money(product.price)}</span>{product.compareAtPrice ? <span className="text-xl text-slate-400 line-through">{money(product.compareAtPrice)}</span> : null}{savings ? <span className="font-bold text-green-600">{savings}% savings</span> : null}</div>
            <p className="mt-4 font-semibold">{product.stock === 0 ? "Out of Stock" : product.stock < 5 ? `Only ${product.stock} left!` : "In Stock"}</p>
            {product.soldCount > 50 && product.stock < 20 ? <p className="mt-1 text-sm font-semibold text-urgency">Selling fast based on current stock.</p> : null}
            <AddToCartPanel product={product} />
          </div>
        </div>
      </Section>
      <Section title="Related Products"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.products.filter((item) => item.id !== product.id).map((item) => <ProductCard key={item.id} product={item} />)}</div></Section>
    </UserShell>
  );
}
