import { ProductFormPage } from "@/components/ProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <ProductFormPage productId={params.id} />;
}
