import { AdminShell } from "@/components/Layout";
import { Chip, LinkButton } from "@/components/ui";
import { adminGetAllOrders, adminGetAllProducts, adminGetBanners, adminGetPromotions, getCategories } from "@/lib/api";
import { money } from "@/lib/badge";

export async function Dashboard() {
  const [products, banners, orders] = await Promise.all([adminGetAllProducts(), adminGetBanners(), adminGetAllOrders()]);
  const lowStock = products.filter((product) => product.stock < 5);
  return (
    <AdminShell>
      <div className="grid gap-4 md:grid-cols-4">{[
        ["Total Products", products.length],
        ["Active Banners", banners.filter((banner) => banner.isActive).length],
        ["Total Orders", orders.length],
        ["Revenue", money(orders.reduce((sum, order) => sum + order.totalAmount, 0))],
      ].map(([label, value]) => <div key={label} className="rounded-lg border border-slate-200 bg-white p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-ink">{value}</p></div>)}</div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2"><Panel title="Low Stock Alerts">{lowStock.map((product) => <Row key={product.id} cells={[product.name, product.stock === 0 ? "Out of stock" : `${product.stock} left`]} />)}</Panel><Panel title="Recent Orders">{orders.map((order) => <Row key={order.id} cells={[order.id, order.status, money(order.totalAmount)]} />)}</Panel></div>
    </AdminShell>
  );
}

export async function ProductsAdmin() {
  const products = await adminGetAllProducts();
  return <AdminShell><Panel title="Products" action={<LinkButton href="/admin/products/new">Add Product</LinkButton>}>{products.map((product) => <Row key={product.id} warning={product.stock < 5} cells={[<img key="img" src={product.images[0]} alt="" className="h-12 w-12 rounded object-cover" />, product.name, product.category.name, money(product.price), product.compareAtPrice ? money(product.compareAtPrice) : "-", product.stock, product.badge?.label ?? "-", product.isActive ? "Active" : "Hidden", <LinkButton key="edit" href={`/admin/products/${product.id}/edit`} variant="secondary">Edit</LinkButton>]} />)}</Panel></AdminShell>;
}

export async function BannersAdmin() {
  const banners = await adminGetBanners();
  return <AdminShell><Panel title="Banners" action={<LinkButton href="/admin/banners?modal=new">Add Banner</LinkButton>}>{banners.map((banner) => <Row key={banner.id} cells={[<img key="img" src={banner.imageUrl} alt="" className="h-12 w-20 rounded object-cover" />, banner.title, banner.position, banner.type, banner.isActive ? "Active" : "Inactive", banner.startDate ?? "Always", banner.endDate ?? "Always"]} />)}</Panel><Preview title="Banner Preview" /></AdminShell>;
}

export async function PromotionsAdmin() {
  const promotions = await adminGetPromotions();
  return <AdminShell><Panel title="Promotions" action={<LinkButton href="/admin/promotions?modal=new">Add Promotion</LinkButton>}>{promotions.map((promotion) => <Row key={promotion.id} cells={[promotion.title, <Chip key="type">{promotion.type}</Chip>, promotion.discountPercent ? `${promotion.discountPercent}%` : "-", promotion.isActive ? "Active" : "Inactive", new Date(promotion.endDate).toLocaleDateString()]} />)}</Panel></AdminShell>;
}

export async function CategoriesAdmin() {
  const categories = await getCategories();
  return <AdminShell><Panel title="Categories" action={<LinkButton href="/admin/categories?modal=new">Add Category</LinkButton>}>{categories.map((category) => <Row key={category.id} cells={[<img key="img" src={category.imageUrl} alt="" className="h-12 w-12 rounded object-cover" />, category.name, category.slug]} />)}</Panel></AdminShell>;
}

export async function OrdersAdmin() {
  const orders = await adminGetAllOrders();
  return <AdminShell><Panel title="Orders">{orders.map((order) => <Row key={order.id} cells={[order.id, order.address.fullName, money(order.totalAmount), order.paymentMethod, order.paymentStatus, order.status, new Date(order.createdAt).toLocaleDateString()]} />)}</Panel></AdminShell>;
}

export async function InventoryAdmin() {
  const products = (await adminGetAllProducts()).sort((a, b) => a.stock - b.stock);
  return <AdminShell><Panel title="Inventory Overview">{products.map((product) => <Row key={product.id} warning={product.stock < 5} cells={[product.name, stockChip(product.stock), <input key="stock" defaultValue={product.stock} className="h-9 w-24 rounded border border-slate-200 px-2" />, <button key="bulk" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">Bulk Update</button>]} />)}</Panel></AdminShell>;
}

function stockChip(stock: number) {
  const color = stock === 0 ? "#dc2626" : stock < 5 ? "#f97316" : stock < 10 ? "#ca8a04" : "#16a34a";
  return <Chip color={color}>{stock}</Chip>;
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <section className="rounded-lg border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-4"><h1 className="text-xl font-bold text-ink">{title}</h1>{action}</div><div className="overflow-x-auto">{children}</div></section>;
}

function Row({ cells, warning }: { cells: React.ReactNode[]; warning?: boolean }) {
  return <div className={`grid min-w-[760px] grid-flow-col auto-cols-fr items-center gap-3 border-b border-slate-100 p-3 text-sm last:border-b-0 ${warning ? "bg-orange-50" : ""}`}>{cells.map((cell, index) => <div key={index}>{cell}</div>)}</div>;
}

function Preview({ title }: { title: string }) {
  return <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4"><h2 className="font-bold text-ink">{title}</h2><div className="mt-4 rounded-lg bg-primary p-8 font-display text-3xl text-white">Live homepage banner shape</div></section>;
}
