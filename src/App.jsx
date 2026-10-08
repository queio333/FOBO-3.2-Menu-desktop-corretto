import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
gsap.registerPlugin(ScrollTrigger);

// Immagini dimostrative online: prima della pubblicazione sostituire con foto autorizzate del locale.
const IMG = {
  fish: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1400&q=85',
  food: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1400&q=85',
  water: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85',
};
function FishIllustration() { return <svg className="big-fish" viewBox="0 0 570 300" fill="none" role="img" aria-label="Pesce illustrato stilizzato">
<defs><linearGradient id="bodyFill" x1="40" y1="20" x2="500" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#ffca7a"/><stop offset=".49" stopColor="#ff7542"/><stop offset="1" stopColor="#e9482e"/></linearGradient></defs>
<path d="M139 149L28 49 62 148 27 246 139 149Z" fill="#ff9858" stroke="#102b38" strokeWidth="8" strokeLinejoin="round"/>
<path d="M117 149C180 37 365 31 511 149 358 266 179 257 117 149Z" fill="url(#bodyFill)" stroke="#102b38" strokeWidth="8"/>
<path d="M250 65L304 10 362 64M249 229L315 293 365 233" fill="#ffbd7c" stroke="#102b38" strokeWidth="8" strokeLinejoin="round"/>
<path d="M195 108C269 125 344 125 421 111M193 152C268 170 346 168 427 149M193 195C269 215 350 192 424 176" stroke="#ffe0a7" strokeWidth="8" strokeLinecap="round" opacity=".72"/>
<circle cx="445" cy="127" r="14" fill="#102b38"/><circle cx="449" cy="123" r="4" fill="white"/><path d="M471 165Q493 176 509 152" stroke="#102b38" strokeWidth="7" strokeLinecap="round"/>
</svg> }
export default function App(){
const root=useRef(null); const [open,setOpen]=useState(false);
useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const ctx=gsap.context(()=>{
const tl=gsap.timeline({defaults:{ease:'power3.out'}});
tl.from('.site-header',{y:-85,opacity:0,duration:.7}).from('.hero-super span',{yPercent:135,rotation:7,stagger:.12,duration:1.05},'-=.3').from('.hero-punch,.hero-sidenote,.hero-info,.sticker',{y:36,opacity:0,stagger:.11,duration:.65},'-=.55');
gsap.to('.hero-super',{yPercent:-21,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:0.45}});
gsap.to('.hero-photo',{scale:1.25,rotation:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:0.45}});
gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:75,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
gsap.fromTo('.fish-fly',{x:()=>-window.innerWidth*.85,rotate:-32,scale:.65},{x:()=>window.innerWidth*.8,rotate:14,scale:1.27,ease:'none',scrollTrigger:{trigger:'.fish-scene',start:'top 80%',end:'bottom 15%',scrub:0.55, invalidateOnRefresh:true}});
gsap.to('.fish-scene .scene-words',{xPercent:-25,scale:1.32,ease:'none',scrollTrigger:{trigger:'.fish-scene',start:'top bottom',end:'bottom top',scrub:0.45}});
gsap.utils.toArray('.service-photo img').forEach(el=>gsap.fromTo(el,{scale:1.17},{scale:1,ease:'none',scrollTrigger:{trigger:el.parentNode,start:'top bottom',end:'bottom top',scrub:0.45}}));
gsap.to('.stripe-copy',{xPercent:-12,ease:'none',scrollTrigger:{trigger:'.orange-statement',start:'top bottom',end:'bottom top',scrub:0.45}});
},root);return()=>ctx.revert()},[]);
useEffect(()=>{
  if (!open) return;
  const previous = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
  window.addEventListener('keydown', onKey);
  return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
},[open]);
const go=(id)=>{setOpen(false);requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}))};
const handleMove=(e)=>{if(e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${(e.clientX-r.left)/r.width*100}%`);e.currentTarget.style.setProperty('--my',`${(e.clientY-r.top)/r.height*100}%`)};
return <div ref={root} className="site">
<header className="site-header"><button className="brand" onClick={()=>go('home')}>FO.BO<span>FISH</span><sup>®</sup></button><span className="header-mid">NOT YOUR AVERAGE FISH SHOP</span><button className="menu-button" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'CHIUDI ×':'MENU +'} </button></header>
<div className={'nav-overlay'+(open?' active':'')} aria-hidden={!open}><span>MENU / NAVIGAZIONE</span>{[['home','HOME'],['manifesto','LA NOSTRA IDEA'],['fresh','PESCHERIA'],['fried','FRIGGITORIA'],['contact','CONTATTI']].map(([id,label],i)=><button tabIndex={open?0:-1} key={id} onClick={()=>go(id)}><small>0{i+1}</small>{label}<b>↗</b></button>)}</div>
<main>
<section id="home" className="hero">
<div className="hero-grain"/>
<div className="hero-photo"><img src={IMG.fish} alt="Pesce fresco presentato su un piatto"/></div>
<span className="hero-sidenote">FRESH FROM THE SEA <i>✳</i> DAILY GOOD MOOD</span>
<h1 className="hero-super"><span>FO.</span><span>BO.</span><span className="red">FISH!</span></h1>
<div className="hero-punch">IL MARE.<br/>SENZA<br/><em>FILTRI.</em></div>
<div className="sticker" aria-label="Fresh and crispy">100%<br/>FRESH<br/><strong>✳</strong></div>
<div className="hero-info"><span>PESCHERIA + FRIGGITORIA</span><button onClick={()=>go('manifesto')}>SCOPRI IL NOSTRO MONDO <b>↗</b></button><span>SCROLL TO EXPLORE ↓</span></div>
</section>
<div className="marquee" aria-hidden="true"><div>GOOD FISH ✳ GOOD MOOD ✳ GOOD FISH ✳ GOOD MOOD ✳ GOOD FISH ✳ GOOD MOOD ✳ GOOD FISH ✳ GOOD MOOD ✳</div></div>
<section className="manifesto" id="manifesto"><div className="section-index reveal">01 / WHAT WE BELIEVE IN <span>✳</span></div><h2 className="reveal">LA VITA È<br/>TROPPO CORTA<br/>PER IL PESCE<br/><em>NOIOSO.</em></h2><div className="manifesto-foot reveal"><span className="asterisk">✳</span><p>Il pescato fresco. La frittura fatta bene. Nessuna posa da ristorante stellato: soltanto tanto mare e un bel po' di carattere.</p></div></section>
<section className="fish-scene" aria-label="Pesce animato allo scroll"><div className="scene-sticky"><span className="scene-index">02 / A LITTLE BIT FISHY</span><div className="scene-words">SO<br/>FISHY<span>!</span></div><div className="fish-fly"><FishIllustration/></div><span className="scene-bottom">SCROLL PER FAR NUOTARE IL PESCE ↘</span></div></section>
<section className="services" id="fresh"><div className="services-heading reveal"><small>03 / TWO SIDES OF THE SAME SEA</small><h2>FRESH<br/><i>&</i> CRISPY<span>.</span></h2><p>Due anime, una sola grande ossessione: il pesce buono.</p></div><div className="service-grid">
<article className="service-card reveal" onPointerMove={handleMove}><div className="service-photo"><img src={IMG.fish} alt="Selezione di pesce fresco" loading="lazy"/></div><div className="service-bottom"><span>01 / AL BANCO</span><h3>PESCHERIA <b>↗</b></h3><p>Fresco ogni giorno. Come piace a noi.</p></div></article>
<article className="service-card reveal" id="fried" onPointerMove={handleMove}><div className="service-photo"><img src={IMG.food} alt="Specialità a base di pesce" loading="lazy"/></div><div className="service-bottom"><span>02 / NEL PIATTO</span><h3>FRIGGITORIA <b>↗</b></h3><p>Croccante fuori. Felicità dentro.</p></div></article>
</div></section>
<section className="orange-statement"><div className="stripe-copy">NO FISH.<br/>NO PARTY<span>✳</span></div><p>SE SA DI MARE, CI PIACE.</p></section>
<section className="last-scene"><img src={IMG.water} alt="Acqua e atmosfera marina" loading="lazy"/><div className="last-content reveal"><span>04 / SEA YOU SOON</span><h2>WHAT<br/>THE<br/><em>FISH?!</em></h2><p>Una pescheria, una friggitoria, tutta un'altra storia.</p></div></section>
<section className="contact" id="contact"><span>05 / LET'S MEET</span><h2>CI VEDIAMO<br/><em>DA FO.BO?</em></h2><p>Il prossimo passo è inserire indirizzo, orari e contatti reali.</p><button onClick={()=>go('home')}>TORNA ALL'INIZIO ↗</button></section>
</main><footer><strong>FO.BO<span>FISH</span></strong><small>EXPERIMENTAL CONCEPT — 2026</small><small>MADE WITH LOVE ✳</small></footer>
</div>
}
