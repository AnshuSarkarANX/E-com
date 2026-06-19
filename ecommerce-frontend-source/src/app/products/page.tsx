import { UserShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/ui";
import { getCategories, getProducts } from "@/lib/api";

export default async function ProductsPage({ searchParams }: { searchParams: { categoryId?: string; search?: string; sort?: string } }) {
  const [categories, result] = await Promise.all([getCategories(), getProducts({ categoryId: searchParams.categoryId, search: searchParams.search, sort: searchParams.sort })]);
  return (
    <UserShell>
      <Section title="Products">
        <form className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1fr_220px_180px]">
          <input name="search" defaultValue={searchParams.search} placeholder="Search products" className="h-11 rounded-md border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950" />
          <select name="categoryId" defaultValue={searchParams.categoryId ?? ""} className="h-11 rounded-md border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
          <select name="sort" defaultValue={searchParams.sort ?? ""} className="h-11 rounded-md border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"><option value="">Sort</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="newest">Newest</option><option value="best">Best Selling</option></select>
          <button className="h-11 rounded-md bg-primary px-4 font-semibold text-white md:col-span-3">Apply Filters</button>
        </form>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{result.products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </Section>
    </UserShell>
  );
}
