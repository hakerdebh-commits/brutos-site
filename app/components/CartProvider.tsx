"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { money, type Product } from "../lib/products";

type CartLine = { product: Product; quantity: number };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product) => void;
  change: (slug: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart precisa estar dentro de CartProvider");
  return value;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("brutos-cart-v2");
      if (saved) setLines(JSON.parse(saved));
    } catch { /* carrinho novo quando o navegador bloquear armazenamento */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("brutos-cart-v2", JSON.stringify(lines));
  }, [lines, ready]);

  const add = (product: Product) => {
    setLines((current) => {
      const match = current.find((line) => line.product.slug === product.slug);
      return match
        ? current.map((line) => line.product.slug === product.slug ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }];
    });
    setOpen(true);
  };

  const change = (slug: string, quantity: number) =>
    setLines((current) => quantity < 1 ? current.filter((line) => line.product.slug !== slug) : current.map((line) => line.product.slug === slug ? { ...line, quantity } : line));

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return (
    <CartContext.Provider value={{ lines, count, open, setOpen, add, change }}>
      {children}
      <div className={`cart-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`cart-drawer ${open ? "is-open" : ""}`} aria-hidden={!open} aria-label="Sua sacola">
        <div className="cart-head">
          <div><p className="eyebrow">Sua seleção</p><h2>Sacola <sup>{count}</sup></h2></div>
          <button onClick={() => setOpen(false)} className="icon-button" aria-label="Fechar sacola">×</button>
        </div>
        <div className="cart-lines">
          {lines.length === 0 ? (
            <div className="empty-cart"><span>B</span><h3>Sua sacola está vazia</h3><p>Descubra a fragrância que vai marcar sua presença.</p><button className="button button-outline" onClick={() => setOpen(false)}>Explorar produtos</button></div>
          ) : lines.map(({ product, quantity }) => (
            <article className="cart-line" key={product.slug}>
              <img src={product.image} alt="" />
              <div><p>{product.line}</p><h3>{product.name}</h3><strong>{money(product.price)}</strong>
                <div className="quantity"><button onClick={() => change(product.slug, quantity - 1)} aria-label={`Diminuir ${product.name}`}>−</button><span>{quantity}</span><button onClick={() => change(product.slug, quantity + 1)} aria-label={`Aumentar ${product.name}`}>+</button></div>
              </div>
              <button className="remove-line" onClick={() => change(product.slug, 0)} aria-label={`Remover ${product.name}`}>×</button>
            </article>
          ))}
        </div>
        {lines.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Frete calculado na próxima etapa.</p><button className="button button-gold" onClick={() => window.alert("Checkout demonstrativo: seu pedido Brutos foi registrado.")}>Finalizar compra</button></div>}
      </aside>
    </CartContext.Provider>
  );
}
