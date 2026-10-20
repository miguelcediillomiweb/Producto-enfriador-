/* SCRIPT.JS - Grupo Peñafiel - Ruta 1371 */
const MARCAS = [
 {id:'aguafiel',nombre:'Aguafiel',color:'#00b4d8',logo:'marcas/aguafiel.png',emoji:'💧',texto:'Agua pura para toda la familia.',productos:['Aguafiel 600 ml','Aguafiel 1.5 L','Garrafón 20 L']},
 {id:'penafiel',nombre:'Peñafiel',color:'#0072ce',logo:'marcas/penafiel.png',emoji:'⭐',texto:'Aguas minerales y sabores que refrescan.',productos:['Mineral 600 ml','Sabores 600 ml','Mineral 2 L']},
 {id:'drpepper',nombre:'Dr Pepper',color:'#9b1c31',logo:'marcas/drpepper.png',emoji:'🥤',texto:'El sabor único que no se parece a nada.',productos:['Dr Pepper 600 ml']},
 {id:'clamato',nombre:'Clamato',color:'#d62828',logo:'marcas/clamato.png',emoji:'🍅',texto:'El compañero perfecto de tus micheladas.',productos:['Clamato 473 ml']}
];
const NOVEDADES = [];
const TEMPORADA_MANUAL = null;
const TEMPORADAS = {
 navidad:{emojis:['🎄','❄️','🎁','⭐']},muertos:{emojis:['💀','🌼','🕯️','🧡']},
 patrias:{emojis:['🇲🇽','🎉','🌶️','🎊']},verano:{emojis:['☀️','🌴','🍉','🧊']},
 normal:{emojis:['💧','✨','🥤','🌟']}
};
function detectarTemporada(){
 if(TEMPORADA_MANUAL)return TEMPORADA_MANUAL;
 const hoy=new Date(),m=hoy.getMonth()+1,d=hoy.getDate();
 if(m===12||(m===1&&d<=6))return'navidad';
 if((m===10&&d>=25)||(m===11&&d<=3))return'muertos';
 if(m===9&&d<=20)return'patrias';
 if(m>=6&&m<=8)return'verano';
 return'normal';
}
function crear(etiqueta,clase,texto){
 const el=document.createElement(etiqueta);
 if(clase)el.className=clase;
 if(texto)el.textContent=texto;
 return el;
}
function ponerLogo(contenedor,marca){
 const img=document.createElement('img');
 img.src=marca.logo;img.alt='Logo '+marca.nombre;
 img.onerror=()=>{contenedor.textContent=marca.emoji;};
 contenedor.appendChild(img);
}
function saludar(){
 const hora=new Date().getHours();let saludo='¡Buenas noches! 🌙';
 if(hora>=6&&hora<12)saludo='¡Buenos días! ☀️';
 else if(hora>=12&&hora<19)saludo='¡Buenas tardes! 🌤️';
 document.getElementById('greeting-text').textContent=saludo;
}
function pintarMarcas(){
 const circulos=document.getElementById('brand-circles'),banners=document.getElementById('brand-banners');
 MARCAS.forEach(marca=>{
  const circulo=crear('a','brand-circle');circulo.href='#banner-'+marca.id;circulo.style.setProperty('--brand',marca.color);
  const logoC=crear('div','brand-circle__logo');ponerLogo(logoC,marca);
  circulo.append(logoC,crear('span','brand-circle__name',marca.nombre));circulos.appendChild(circulo);
  const banner=crear('article','brand-banner');banner.id='banner-'+marca.id;banner.style.setProperty('--brand',marca.color);
  const logoB=crear('div','brand-banner__logo');ponerLogo(logoB,marca);
  const info=crear('div','brand-banner__info');
  info.appendChild(crear('h3','brand-banner__title',marca.nombre+' '+marca.emoji));
  info.appendChild(crear('p','brand-banner__text',marca.texto));
  const lista=crear('ul','brand-banner__products');
  marca.productos.forEach(p=>lista.appendChild(crear('li','chip',p)));
  info.appendChild(lista);banner.append(logoB,info);banners.appendChild(banner);
 });
}
function pintarNovedades(){
 if(!NOVEDADES.length)return;
 const lista=document.getElementById('news-list');
 NOVEDADES.forEach(n=>{
  const item=crear('div','news-item');if(n.color)item.style.setProperty('--brand',n.color);
  if(n.video){const v=document.createElement('video');v.src=n.video;v.controls=true;v.playsInline=true;item.appendChild(v);}
  else if(n.imagen){const i=document.createElement('img');i.src=n.imagen;i.alt=n.titulo;item.appendChild(i);}
  item.appendChild(crear('h3','news-item__title',n.titulo));lista.appendChild(item);
 });
 document.getElementById('news-section').hidden=false;
}
function aplicarTemporada(){
 const temporada=detectarTemporada();document.body.dataset.season=temporada;
 const capa=document.getElementById('season-layer'),emojis=TEMPORADAS[temporada].emojis;
 for(let i=0;i<16;i++){
  const e=crear('span','season-emoji',emojis[i%emojis.length]);
  e.style.setProperty('--x',Math.round(Math.random()*96)+'%');
  e.style.setProperty('--size',(18+Math.round(Math.random()*18))+'px');
  e.style.setProperty('--dur',(12+Math.round(Math.random()*10))+'s');
  e.style.setProperty('--delay','-'+Math.round(Math.random()*14)+'s');capa.appendChild(e);
 }
}
document.addEventListener('DOMContentLoaded',()=>{
 saludar();pintarMarcas();pintarNovedades();aplicarTemporada();
 setTimeout(()=>document.body.classList.add('loaded'),5000);
});