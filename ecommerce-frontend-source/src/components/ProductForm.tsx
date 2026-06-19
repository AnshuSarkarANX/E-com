import { AdminShell } from "@/components/Layout";
import { Chip, Input, LinkButton, Select, Textarea } from "@/components/ui";
import { getCategories, getProduct } from "@/lib/api";

export async function ProductFormPage({ productId }: { productId?: string }) {
  const [categories, product] = await Promise.all([getCategories(), productId ? getProduct(productId) : Promise.resolve(null)]);
  const badgeLabel = product?.badge?.label ?? "New";
  const badgeColor = product?.badge?.color ?? "#2563eb";
  return (
    <AdminShell>
      <form className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-ink">{product ? "Edit Product" : "Add Product"}</h1>
          <Input placeholder="Product name" defaultValue={product?.name} />
          <Textarea placeholder="Description" defaultValue={product?.description} />
          <div className="grid gap-4 md:grid-cols-2"><Input placeholder="Price" type="number" defaultValue={product?.price} /><Input placeholder="Compare at price" type="number" defaultValue={product?.compareAtPrice ?? ""} /></div>
          <div className="grid gap-4 md:grid-cols-2"><Select defaultValue={product?.categoryId}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select><Input placeholder="Stock quantity" type="number" defaultValue={product?.stock ?? 10} /></div>
          <Input placeholder="Image URL" defaultValue={product?.images[0]} />
          <div className="grid gap-3 md:grid-cols-3"><label className="flex gap-2 text-sm"><input type="checkbox" defaultChecked={product?.isActive ?? true} />Active</label><label className="flex gap-2 text-sm"><input type="checkbox" defaultChecked={product?.isFeatured} />Featured</label><label className="flex gap-2 text-sm"><input type="checkbox" defaultChecked={product?.isProductOfMonth} />Product of Month</label></div>
          <Input placeholder="Sold count" type="number" defaultValue={product?.soldCount ?? 0} />
        </div>
        <aside className="h-fit rounded-lg bg-slate-50 p-4">
          <h2 className="font-bold text-ink">Badge</h2>
          <div className="mt-4 space-y-3">
            <Select defaultValue={product?.badge?.type ?? "NEW"}><option value="NONE">NONE</option><option value="NEW">NEW</option><option value="HOT">HOT</option><option value="SALE">SALE</option><option value="LIMITED">LIMITED</option><option value="BEST_SELLER">BEST_SELLER</option><option value="TRENDING">TRENDING</option><option value="SELLING_FAST">SELLING_FAST</option><option value="ONLY_X_LEFT">ONLY_X_LEFT</option><option value="FREE_SHIPPING">FREE_SHIPPING</option><option value="CUSTOM">CUSTOM</option></Select>
            <Input placeholder="Badge label" defaultValue={badgeLabel} />
            <Input type="color" defaultValue={badgeColor} className="h-12 p-1" />
            <div className="rounded-md border border-dashed border-slate-300 bg-white p-4"><Chip color={badgeColor}>{badgeLabel}</Chip></div>
            <LinkButton href="/admin/products" className="w-full">Save Product</LinkButton>
          </div>
        </aside>
      </form>
    </AdminShell>
  );
}
