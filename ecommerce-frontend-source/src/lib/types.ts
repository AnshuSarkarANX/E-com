export type ProductBadgeType =
  | "NEW"
  | "HOT"
  | "SALE"
  | "LIMITED"
  | "BEST_SELLER"
  | "TRENDING"
  | "SELLING_FAST"
  | "ONLY_X_LEFT"
  | "FREE_SHIPPING"
  | "CUSTOM";

export type BannerPosition =
  | "HOME_HERO"
  | "HOME_MIDDLE"
  | "HOME_BOTTOM"
  | "PRODUCT_SIDEBAR"
  | "CATEGORY_TOP";

export type BannerType = "HERO" | "PROMOTIONAL" | "OFFER" | "AD";
export type PromotionType = "PRODUCT_OF_MONTH" | "FLASH_DEAL" | "DEAL_OF_DAY" | "FEATURED" | "CLEARANCE";
export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PayMethod = "COD" | "RAZORPAY";
export type PayStatus = "PENDING" | "PAID" | "FAILED";
export type Role = "CUSTOMER" | "ADMIN";

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface ProductBadge {
  type: ProductBadgeType;
  label: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  isActive: boolean;
  images: string[];
  categoryId: string;
  category: Category;
  badge: ProductBadge | null;
  isFeatured: boolean;
  isProductOfMonth: boolean;
  soldCount: number;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkType: "PRODUCT" | "CATEGORY" | "URL" | "NONE";
  linkValue: string;
  position: BannerPosition;
  type: BannerType;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: PromotionType;
  productId: string | null;
  categoryId: string | null;
  discountPercent: number | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  address: Address;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PayMethod;
  paymentStatus: PayStatus;
  createdAt: string;
}

export interface PlaceOrderInput {
  userId: string;
  addressId: string;
  items: Array<{ productId: string; quantity: number }>;
  paymentMethod: PayMethod;
}
