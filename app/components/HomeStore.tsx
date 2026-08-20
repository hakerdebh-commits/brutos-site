"use client";

import { useEffect, useState } from "react";
import { money, products } from "../lib/products";
import { useCart } from "./CartProvider";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

const brutosLogo = "/brutos-logo.jpg";
const instagramUrl = "https://www.instagram.com/brutosbarbearia_/";
const scheduleUrl = "https://sites.appbarber.com.br/brutosbarbearia-oewd";
const linksUrl = "https://heylink.me/Brutosbarbeariajti";

const categories = [
  { name: "Perfumes", number: "01", image: "https://fimgs.net/mdimg/perfume/375x500.46259.jpg" },
  { name: "Perfumes Árabes", number: "02", image: "https://fimgs.net/mdimg/perfume/375x500.72821.jpg" },
  { name: "Cabelo", number: "03", image: "https://cdn.shopify.com/s/files/1/0772/9122/5338/files/Pomada1x1site.png?v=1773688068" },
];

export function HomeStore() {
  const { add, count, setOpen } = useCart();
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const visibleProducts = filter === "Todos" ? products : products.filter((product) => product.category === filter);
  const featuredArabic = products.find((product) => product.slug === "asad-lattafa")!;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="announcement">Agende seu horário online <span>•</span> Seg–Sex 9h–20h · Sáb 9h–18h · Dom 9h–12h</div>
      <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Brutos, início"><img className="brand-logo-image" src={brutosLogo} alt="Logo Brutos Barbearia" /><span className="brand-name">BRUTOS<small>PERFUMES & POMADAS</small></span></a>
        <nav aria-label="Navegação principal" className={menuOpen ? "menu-open" : ""}>
          <a href="#colecao" onClick={() => setMenuOpen(false)}>Perfumes</a>
          <a href="#arabes" onClick={() => setMenuOpen(false)}>Árabes</a>
          <a href="#cabelo" onClick={() => setMenuOpen(false)}>Cabelo</a>
          <a href="#barbearia" onClick={() => setMenuOpen(false)}>A Barbearia</a>
          <a href={scheduleUrl} target="_blank" rel="noreferrer">Agendar ↗</a>
        </nav>
        <div className="nav-actions"><button className="nav-bag" type="button" onClick={() => setOpen(true)} aria-label={`Abrir sacola com ${count} itens`}>Sacola <span>{count}</span></button><button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><i /><i /></button></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" />
        <div className="hero-content"><img className="hero-logo" src={brutosLogo} alt="Brutos Barbearia" /><p className="eyebrow">Brutos Barbearia · Jataí</p><h1>Cheiro de presença.<br /><em>Estilo de homem.</em></h1><p className="hero-copy">212, 1 Million, perfumes árabes e pomadas masculinas selecionadas pela Brutos.</p><div className="hero-actions"><a className="button button-gold" href="#colecao">Ver produtos</a><a className="text-link" href={scheduleUrl} target="_blank" rel="noreferrer">Agendar corte <span>↗</span></a></div></div>
        <div className="hero-index" aria-hidden="true"><span>BRUTOS</span><i /><span>2026</span></div><a className="scroll-cue" href="#categorias">Role para descobrir <span>↓</span></a>
      </section>

      <section className="trust-strip" aria-label="Diferenciais"><span>✦ Perfumes masculinos</span><span>✦ Perfumes árabes</span><span>✦ Produtos Macho-Lândia</span><span>✦ Linha Jaboque</span></section>

      <section className="section categories-section" id="categorias">
        <Reveal className="section-heading"><div><p className="eyebrow">Escolha sua presença</p><h2>Perfume e cabelo.<br /><em>Sem enrolação.</em></h2></div><p>Um catálogo 100% masculino: fragrâncias que marcam e pomadas que seguram o estilo do começo ao fim do dia.</p></Reveal>
        <div className="category-grid">{categories.map((category, index) => <Reveal key={category.name} delay={index * 90}><button className="category-card" onClick={() => { setFilter(category.name); document.querySelector("#colecao")?.scrollIntoView(); }}><img src={category.image} alt="" loading="lazy" /><span className="category-number">{category.number}</span><span className="category-title">{category.name}<i>↗</i></span></button></Reveal>)}</div>
      </section>

      <section className="section collection-section" id="colecao">
        <Reveal className="collection-head"><div><p className="eyebrow">Brutos Store</p><h2>Os mais procurados</h2></div><div className="filters" role="group" aria-label="Filtrar produtos">{["Todos", "Perfumes", "Perfumes Árabes", "Cabelo"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></Reveal>
        <div className="product-grid">{visibleProducts.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * 75}><ProductCard product={product} /></Reveal>)}</div>
      </section>

      <section className="manifesto" id="barbearia">
        <div className="manifesto-photo manifesto-video"><iframe src="https://www.instagram.com/reel/DOEYs_tDvfN/embed/" title="Vídeo da Brutos Barbearia sobre perfumes importados" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen /><span>Vídeo oficial · @brutosbarbearia_</span></div>
        <Reveal className="manifesto-copy"><p className="eyebrow">A identidade Brutos</p><h2>Onde estilo e<br /><em>tradição se encontram.</em></h2><p>A mesma curadoria masculina da barbearia agora também em perfumes e pomadas. Produtos para finalizar o visual e deixar sua marca.</p><p>Escolha seu perfume, encontre a pomada ideal e, quando precisar renovar o corte, agende diretamente pelo AppBarber.</p><a href={scheduleUrl} target="_blank" rel="noreferrer" className="text-link">Agendar na barbearia <span>↗</span></a></Reveal>
      </section>

      <section className="instagram-section section">
        <Reveal className="instagram-copy"><p className="eyebrow">Direto do Instagram</p><h2>A Brutos<br /><em>de verdade.</em></h2><p>Mais de 2 mil pessoas acompanham cortes, novidades e a rotina da barbearia.</p><a className="button button-outline" href={instagramUrl} target="_blank" rel="noreferrer">Seguir @brutosbarbearia_</a></Reveal>
        <div className="instagram-grid">{[1, 2, 3].map((item, index) => <Reveal key={item} delay={index * 100}><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Abrir Instagram da Brutos"><img src={`/brutos-instagram-${item}.jpg`} alt={`Registro da Brutos Barbearia ${item}`} loading="lazy" /><span>Ver no Instagram ↗</span></a></Reveal>)}</div>
      </section>

      <section className="section grooming-section" id="cabelo">
        <Reveal className="grooming-intro"><div><p className="eyebrow">Macho-Lândia & Jaboque</p><h2>Fixação.<br />Cuidado. <em>Atitude.</em></h2><p>Pomadas, ceras, shampoo e finalizadores masculinos reais, com fotos e valores das marcas comercializadas.</p></div><div className="grooming-image"><img src="/brutos-instagram-1.jpg" alt="Clientes na Brutos Barbearia" loading="lazy" /></div></Reveal>
        <div className="ritual-products">{products.filter((product) => product.category === "Cabelo").map((product, index) => <Reveal key={product.slug} delay={(index % 4) * 80}><ProductCard product={product} /></Reveal>)}</div>
      </section>

      <section className="kit-feature" id="arabes">
        <div className="kit-photo"><img src={featuredArabic.image} alt="Perfume árabe masculino Asad Lattafa" loading="lazy" /></div>
        <Reveal className="kit-copy"><span className="kit-kicker">Perfume árabe</span><p className="eyebrow">Destaque Brutos</p><h2>Asad<br /><em>Lattafa</em></h2><p>Potente, especiado e feito para a noite. Um dos perfumes árabes masculinos mais procurados, com presença forte e excelente custo-benefício.</p><ul><li>Pimenta preta, tabaco e baunilha</li><li>Alta projeção e longa duração</li><li>Frasco de 100 ml</li></ul><div className="kit-action"><strong>{money(featuredArabic.price)}</strong><button className="button button-gold" onClick={() => add(featuredArabic)}>Adicionar à sacola</button></div></Reveal>
      </section>

      <section className="testimonials section"><Reveal><p className="eyebrow">Escolha de presença</p><blockquote>“212 VIP Black para a noite. Pomada matte para o dia. O essencial masculino em um só lugar.”</blockquote><div className="quote-author"><span>BB</span><p><strong>Curadoria Brutos</strong><small>Perfumes & pomadas masculinas</small></p></div></Reveal><div className="quote-side"><span>12</span><div><strong>PRODUTOS</strong><p>seleção inicial exclusiva para homens</p></div></div></section>

      <section className="visit-section" id="contato"><Reveal><p className="eyebrow">Visite a Brutos</p><h2>Corte renovado.<br /><em>Presença completa.</em></h2></Reveal><div className="visit-grid"><Reveal delay={80}><span>01</span><h3>Endereço</h3><p>Rua André Luiz, 1230<br />Setor Sôdre · Jataí</p><a href="https://www.google.com/maps/search/?api=1&query=Brutos+Barbearia+André+Luiz+1230+Jataí" target="_blank" rel="noreferrer">Abrir no mapa ↗</a></Reveal><Reveal delay={160}><span>02</span><h3>Horários</h3><p>Seg–Sex · 9h às 20h<br />Sábado · 9h às 18h<br />Domingo · 9h às 12h</p><a href={scheduleUrl} target="_blank" rel="noreferrer">Agendar agora ↗</a></Reveal><Reveal delay={240}><span>03</span><h3>Contato</h3><p>Instagram, WhatsApp e<br />todos os links oficiais.</p><a href={linksUrl} target="_blank" rel="noreferrer">Abrir central de links ↗</a></Reveal></div></section>

      <section className="newsletter"><div><p className="eyebrow">Clube Brutos</p><h2>Entre para<br />o <em>clube.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); window.alert("Bem-vindo ao Clube Brutos."); }}><p>Novidades de perfumes, pomadas, lançamentos e condições reservadas.</p><label><span className="sr-only">Seu melhor e-mail</span><input required type="email" placeholder="SEU MELHOR E-MAIL" /><button aria-label="Cadastrar e-mail">→</button></label><small>Ao entrar, você concorda com nossa política de privacidade.</small></form></section>

      <footer><div className="footer-brand"><img className="footer-logo" src={brutosLogo} alt="Brutos Barbearia" /><h2>BRUTOS</h2><p>Perfumes e produtos masculinos<br />com alma de barbearia.</p></div><div className="footer-links"><div><strong>Loja</strong><a href="#colecao">Perfumes</a><a href="#arabes">Perfumes árabes</a><a href="#cabelo">Cabelo</a></div><div><strong>Barbearia</strong><a href={scheduleUrl} target="_blank" rel="noreferrer">Agendar horário ↗</a><a href="#contato">Endereço e horários</a><a href={linksUrl} target="_blank" rel="noreferrer">Todos os links ↗</a></div><div><strong>Siga</strong><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a><a href={scheduleUrl} target="_blank" rel="noreferrer">AppBarber ↗</a></div></div><div className="footer-bottom"><span>© 2026 Brutos Store · Catálogo demonstrativo</span><span>Jataí · Goiás</span></div></footer>
    </main>
  );
}
