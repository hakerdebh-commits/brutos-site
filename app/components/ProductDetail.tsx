"use client";

import Link from "next/link";
import { useState } from "react";
import { money, products, type Product } from "../lib/products";
import { useCart } from "./CartProvider";
import { ProductCard } from "./ProductCard";

const brutosLogo = "/brutos-logo.jpg";

export function ProductDetail({ product }: { product: Product }) {
  const { add, count, setOpen } = useCart();
  const [activeNote, setActiveNote] = useState(0);
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  return <main className="detail-page">
    <header className="detail-nav"><Link className="brand" href="/"><img className="brand-logo-image" src={brutosLogo} alt="Logo Brutos Barbearia" /><span className="brand-name">BRUTOS<small>PERFUMARIA & BARBERSHOP</small></span></Link><Link href="/#colecao" className="back-link">← Voltar à coleção</Link><button className="nav-bag" onClick={() => setOpen(true)}>Sacola <span>{count}</span></button></header>
    <section className="product-detail">
      <div className="detail-image"><img src={product.image} alt={`${product.name}, ${product.line}`} />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="image-caption">Imagem ilustrativa · Produto fictício</span></div>
      <div className="detail-copy"><p className="eyebrow">{product.category} · Brutos Store</p><h1>{product.name}</h1><p className="detail-line">{product.line} <span>{product.size}</span></p><div className="detail-rating"><strong>★★★★★</strong><span>4.9 · 48 avaliações</span></div><p className="detail-description">{product.description}</p>
        {product.notes && <div className="notes"><p>Arquitetura olfativa</p><div>{product.notes.map((note, index) => <button key={note} onClick={() => setActiveNote(index)} className={activeNote === index ? "active" : ""}><span>0{index + 1}</span>{note}</button>)}</div></div>}
        <div className="detail-price">{product.oldPrice && <del>{money(product.oldPrice)}</del>}<strong>{money(product.price)}</strong><span>ou 6x sem juros</span></div>
        <button className="button button-gold detail-add" onClick={() => add(product)}>Adicionar à sacola <span>+</span></button>
        <div className="detail-benefits"><span>Entrega para todo Brasil</span><span>5% de desconto no Pix</span><span>Compra segura</span></div>
      </div>
    </section>
    <section className="detail-story"><p className="eyebrow">A experiência</p><h2>Feito para permanecer<br /><em>na memória.</em></h2><p>{product.description}</p></section>
    <section className="section related"><div className="collection-head"><div><p className="eyebrow">Continue o ritual</p><h2>Você também pode gostar</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></section>
    <footer className="detail-footer"><Link className="brand" href="/"><img className="brand-logo-image" src={brutosLogo} alt="Logo Brutos Barbearia" /><span className="brand-name">BRUTOS</span></Link><p>Catálogo demonstrativo · Brasil</p></footer>
  </main>;
}
