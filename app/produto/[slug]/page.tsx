import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "../../components/ProductDetail";
import { getProduct, products } from "../../lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produto não encontrado" };
  const title = `${product.name} — ${product.line}`;
  const description = product.description;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", locale: "pt_BR", images: [{ url: product.image, alt: product.name }] },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
