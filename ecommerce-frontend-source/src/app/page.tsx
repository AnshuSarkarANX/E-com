import Link from "next/link";
import { BannerCarousel } from "@/components/BannerCarousel";
import { UserShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { LinkButton, Section } from "@/components/ui";
import { getActivePromotions, getBannersByPosition, getCategories, getFeaturedProducts, getProduct, getProductOfMonth, getProducts, getPromotion } from "@/lib/api";
import { money } from "@/lib/badge";

export default async function HomePage() {
  const [heroBanners, categories, featuredProducts, middleBanners, bottomBanners, productOfMonth, deal, allProducts] = await Promise.all([
    getBannersByPosition("HOME_HERO"),
    getCategories(),
    getFeaturedProducts(),
    getBannersByPosition("HOME_MIDDLE"),
    getBannersByPosition("HOME_BOTTOM"),
    getProductOfMonth(),
    getPromotion("DEAL_OF_DAY"),
    getProducts({ limit: 12, sort: "newest" }),
    getActivePromotions(),
  ]);
  const dealProduct = deal?.productId ? await getProduct(deal.productId) : null;
  const promoBanner = middleBanners.find((banner) => banner.type === "PROMOTIONAL");
  const adBanner = middleBanners.find((banner) => banner.type === "AD");
  const bottomOffer = bottomBanners.find((banner) => banner.type === "OFFER");
  const topSelling = [...allProducts.products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

  return (
    <UserShell>
      <BannerCarousel banners={heroBanners} />
      <Section>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?categoryId=${category.id}`} className="flex min-w-48 items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <img src={category.imageUrl} alt={category.name} className="h-12 w-12 rounded-md object-cover" />
              <span className="font-semibold text-ink dark:text-white">{category.name}</span>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Featured Products" action={<LinkButton href="/products" variant="secondary">View all</LinkButton>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </Section>
      {promoBanner ? <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Link href="/products" className="relative block overflow-hidden rounded-lg bg-slate-900"><img src={promoBanner.imageUrl} alt={promoBanner.title} className="h-64 w-full object-cover opacity-70" /><span className="absolute bottom-6 left-6 font-display text-4xl text-white">{promoBanner.title}</span></Link></section> : null}
      {productOfMonth ? (
        <Section title="Product of the Month">
          <div className="grid overflow-hidden rounded-lg bg-primary text-white lg:grid-cols-2">
            <img src={productOfMonth.images[0]} alt={productOfMonth.name} className="h-full min-h-96 w-full object-cover" />
            <div className="flex flex-col justify-center p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-100">Monthly pick</p>
              <h2 className="mt-3 font-display text-5xl">{productOfMonth.name}</h2>
              <p className="mt-4 max-w-xl text-teal-50">{productOfMonth.description}</p>
              <p className="mt-6 text-3xl font-bold">{money(productOfMonth.price)}</p>
              <div className="mt-6 flex flex-wrap gap-3"><LinkButton href={`/products/${productOfMonth.id}`} variant="secondary">View Details</LinkButton><LinkButton href="/cart" variant="primary" className="bg-urgency">Add to Cart</LinkButton></div>
            </div>
          </div>
        </Section>
      ) : null}
      {deal && dealProduct ? (
        <Section title="Deal of the Day">
          <div className="grid gap-5 rounded-lg border border-orange-200 bg-orange-50 p-5 md:grid-cols-[1fr_2fr_auto] md:items-center">
            <img src={dealProduct.images[0]} alt={dealProduct.name} className="h-40 w-full rounded-md object-cover md:w-56" />
            <div><span className="rounded-full bg-urgency px-3 py-1 text-sm font-bold text-white">{deal.discountPercent}% off</span><h3 className="mt-3 text-2xl font-bold text-ink">{dealProduct.name}</h3><p className="mt-1 text-slate-600">{deal.description}</p><p className="mt-3 font-mono text-sm font-bold">23h 59m 59s</p></div>
            <LinkButton href={`/products/${dealProduct.id}`}>Grab Deal</LinkButton>
          </div>
        </Section>
      ) : null}
      {bottomOffer ? <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Link href="/products" className="block rounded-lg bg-ink p-8 text-center font-display text-4xl text-white">{bottomOffer.title}</Link></section> : null}
      {adBanner ? (
        <Section title={adBanner.title}>
          <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4">{topSelling.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </Section>
      ) : null}
      <Section title="All Products">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{allProducts.products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </Section>
    </UserShell>
  );
}
