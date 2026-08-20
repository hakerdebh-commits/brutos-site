"use client";

import Link from "next/link";
import { money, type Product } from "../lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="product-card">
      <Link className="product-visual" href={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.image} alt={`${product.name}, ${product.line}`} loading="lazy" />
        <span className="view-product">Ver detalhes ↗</span>
      </Link>
      <div className="product-info">
        <div><p>{product.line}</p><Link href={`/produto/${product.slug}`}><h3>{product.name}</h3></Link></div>
        <div className="product-price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
      </div>
      <button className="quick-add" onClick={() => add(product)}>Adicionar à sacola <span>+</span></button>
    </article>
  );
}
