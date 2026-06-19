import { addresses, banners, categories, orders, products, promotions } from "./mockData";
import type { Banner, BannerPosition, OrderStatus, PlaceOrderInput, Product, ProductBadge, PromotionType } from "./types";

const wait = () => new Promise((resolve) => setTimeout(resolve, 120));
const isActiveWindow = (item: { isActive: boolean; startDate: string | null; endDate: string | null }) => {
  const now = Date.now();
  const starts = item.startDate ? new Date(item.startDate).getTime() <= now : true;
  const ends = item.endDate ? new Date(item.endDate).getTime() >= now : true;
  return item.isActive && starts && ends;
};

export async function getProducts(filters?: { categoryId?: string; search?: string; limit?: number; offset?: number; sort?: string }) {
  await wait();
  let list = products.filter((product) => product.isActive);
  if (filters?.categoryId) list = list.filter((product) => product.categoryId === filters.categoryId);
  if (filters?.search) {
    const query = filters.search.toLowerCase();
    list = list.filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(query));
  }
  if (filters?.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (filters?.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (filters?.sort === "newest") list = [...list].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  if (filters?.sort === "best") list = [...list].sort((a, b) => b.soldCount - a.soldCount);
  const offset = filters?.offset ?? 0;
  const limit = filters?.limit ?? list.length;
  return { products: list.slice(offset, offset + limit), total: list.length };
}

export async function getProduct(id: string) {
  await wait();
  return products.find((product) => product.id === id) ?? null;
}

export async function getFeaturedProducts() {
  await wait();
  return products.filter((product) => product.isActive && product.isFeatured);
}

export async function getProductOfMonth() {
  await wait();
  return products.find((product) => product.isActive && product.isProductOfMonth) ?? null;
}

export async function getBannersByPosition(position: BannerPosition) {
  await wait();
  return banners.filter((banner) => banner.position === position && isActiveWindow(banner)).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getActivePromotions() {
  await wait();
  return promotions.filter(isActiveWindow).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPromotion(type: PromotionType) {
  await wait();
  return promotions.find((promotion) => promotion.type === type && isActiveWindow(promotion)) ?? null;
}

export async function getCategories() {
  await wait();
  return categories;
}

export async function getUserOrders(userId: string) {
  await wait();
  return orders.filter((order) => order.userId === userId);
}

export async function getOrder(id: string) {
  await wait();
  return orders.find((order) => order.id === id) ?? null;
}

export async function placeOrder(input: PlaceOrderInput) {
  await wait();
  const selectedAddress = addresses.find((address) => address.id === input.addressId) ?? addresses[0];
  const items = input.items.map((item, index) => {
    const product = products.find((candidate) => candidate.id === item.productId) as Product;
    return { id: `oi-new-${index}`, orderId: "ord-new", productId: product.id, product, quantity: item.quantity, price: product.price };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    id: `ord-${Math.floor(Math.random() * 9000) + 1000}`,
    userId: input.userId,
    addressId: input.addressId,
    address: selectedAddress,
    items,
    totalAmount: Math.round(subtotal * 1.18),
    status: "PENDING" as const,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentMethod === "COD" ? ("PENDING" as const) : ("PAID" as const),
    createdAt: new Date().toISOString(),
  };
}

export async function adminGetAllProducts() { await wait(); return products; }
export async function adminCreateProduct(input: Partial<Product>) { await wait(); return { ...products[0], ...input, id: `p-${Date.now()}` } as Product; }
export async function adminUpdateProduct(id: string, input: Partial<Product>) { await wait(); return { ...products.find((product) => product.id === id), ...input } as Product; }
export async function adminDeleteProduct(id: string) { await wait(); return { id, ok: true }; }
export async function adminUpdateStock(productId: string, quantity: number) { await wait(); return { productId, quantity }; }
export async function adminGetAllOrders() { await wait(); return orders; }
export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus) { await wait(); return { orderId, status }; }
export async function adminGetBanners() { await wait(); return banners; }
export async function adminCreateBanner(input: Partial<Banner>) { await wait(); return { ...banners[0], ...input, id: `b-${Date.now()}` } as Banner; }
export async function adminUpdateBanner(id: string, input: Partial<Banner>) { await wait(); return { ...banners.find((banner) => banner.id === id), ...input } as Banner; }
export async function adminDeleteBanner(id: string) { await wait(); return { id, ok: true }; }
export async function adminToggleBanner(id: string, isActive: boolean) { await wait(); return { id, isActive }; }
export async function adminGetPromotions() { await wait(); return promotions; }
export async function adminCreatePromotion(input: unknown) { await wait(); return input; }
export async function adminUpdatePromotion(id: string, input: unknown) { await wait(); return { id, input }; }
export async function adminDeletePromotion(id: string) { await wait(); return { id, ok: true }; }
export async function adminSetProductBadge(productId: string, badge: ProductBadge | null) { await wait(); return { productId, badge }; }
