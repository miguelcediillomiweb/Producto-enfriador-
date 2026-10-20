/* SCRIPT.JS - Grupo Peñafiel / Ruta 1371 */
const MARCAS = [
 {id:'aguafiel',nombre:'Aguafiel',color:'#00b4d8',logo:'marcas/aguafiel.png',emoji:'💧',texto:'Agua para acompañarte y refrescar tu día.',productos:['Aguafiel 600 ml','Aguafiel 1.5 L','Garrafón 20 L']},
 {id:'penafiel',nombre:'Peñafiel',color:'#0072ce',logo:'marcas/penafiel.png',emoji:'✨',texto:'Agua mineral y sabores para disfrutar cada momento.',productos:['Peñafiel Mineral','Peñafiel Twist','Peñafiel Sabores']},
 {id:'drpepper',nombre:'Dr Pepper',color:'#9b1c31',logo:'marcas/drpepper.png',emoji:'🥤',texto:'Un sabor inconfundible para quienes buscan algo diferente.',productos:['Dr Pepper']},
 {id:'clamato',nombre:'Clamato',color:'#d62828',logo:'marcas/clamato.png',emoji:'🍅',texto:'El toque de tomate ideal para preparar tus bebidas favoritas.',productos:['Clamato Original']}
];
const TEMPORADA_MANUAL = null;
const TEMPORADAS = {
 navidad:['🎄','❄️','🎁','⭐'], muertos:['💀','🌼','🕯️','🧡'],
 patrias:['🇲🇽','🎉','🌶️','🎊'], verano:['☀️','🌴','🍉','🧊'],
 normal:['💧','✨','🥤','🌟','🎈','🚚']
};
function detectarTemporada(){
 if(TEMPORADA_MANUAL && TEMPORADAS[TEMPORADA_MANUAL])return TEMPORADA_MANUAL;
 const fecha=new Date(),m=fecha.getMonth()+1,d=fecha.getDate();
 if(m===12||(m===1&&d<=6))return'navidad';
 if((m===10&&d>=25)||(m===11&&d<=3))return'muertos';
 if(m===9&&d<=20)return'patrias';
 if(m>=6&&m<=8)return'verano';
 return'normal';
}
function crear(tag,clase,texto){
 const el=document.createElement(tag);
 if(clase)el.className=clase;
 if(texto!==undefined)el.textContent=texto;
 return el;
}
function agregarLogo(contenedor,marca){
 const img=document.createElement('img');
 img.src=marca.logo;img.alt='Logo '+marca.nombre;
 img.onerror=()=>{img.remove();contenedor.textContent=marca.emoji;};
 contenedor.appendChild(img);
}
function saludar(){
 const ahora=new Date(),hora=ahora.getHours();
 let saludo='¡Buenas noches!',emoji='🌙';
 if(hora>=6&&hora<12){saludo='¡Buenos días!';emoji='☀️';}
 else if(hora>=12&&hora<19){saludo='¡Buenas tardes!';emoji='🌤️';}
 document.getElementById('greeting-text').textContent=saludo+' '+emoji;
 document.getElementById('greeting-date').textContent=ahora.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}
function mostrarMarca(marca){
 const panel=document.getElementById('brand-detail');
 const contenido=document.getElementById('brand-detail-content');
 contenido.replaceChildren();
 panel.style.setProperty('--brand',marca.color);
 const cabecera=crear('div','detail-head');
 const logo=crear('div','detail-logo');agregarLogo(logo,marca);
 const texto=crear('div','detail-heading');
 texto.append(crear('h3','detail-title',marca.nombre+' '+marca.emoji),crear('p','detail-description',marca.texto));
 cabecera.append(logo,texto);
 const titulo=crear('h4','detail-products-title','Productos de la marca '+marca.emoji);
 const lista=crear('ul','detail-products');
 marca.productos.forEach((producto,i)=>{
  const li=crear('li','detail-product');
  const emoji=crear('span','animated-emoji',['🥤','✨','💧','⭐'][i%4]);
  emoji.style.marginRight='7px';
  li.append(emoji,document.createTextNode(producto));
  lista.appendChild(li);
 });
 contenido.append(cabecera,titulo,lista);
 panel.hidden=false;
 document.querySelectorAll('.brand-circle').forEach(b=>{
  b.setAttribute('aria-pressed',String(b.dataset.brand===marca.id));
 });
 panel.scrollIntoView({behavior:'smooth',block:'start'});
}
function pintarMarcas(){
 const contenedor=document.getElementById('brand-circles');
 MARCAS.forEach(marca=>{
  const boton=crear('button','brand-circle');
  boton.type='button';boton.dataset.brand=marca.id;boton.setAttribute('aria-label','Ver productos de '+marca.nombre);
  boton.setAttribute('aria-pressed','false');boton.style.setProperty('--brand',marca.color);
  const logo=crear('span','brand-circle__logo');agregarLogo(logo,marca);
  const nombre=crear('span','brand-circle__name',marca.nombre);
  const emoji=crear('span','brand-circle__emoji animated-emoji',marca.emoji);
  boton.append(logo,nombre,emoji);
  boton.addEventListener('click',()=>mostrarMarca(marca));
  contenedor.appendChild(boton);
 });
}
function aplicarTemporada(){
 const temporada=detectarTemporada();document.body.dataset.season=temporada;
 const capa=document.getElementById('season-layer'),emojis=TEMPORADAS[temporada]||TEMPORADAS.normal;
 for(let i=0;i<13;i++){
  const e=crear('span','season-emoji',emojis[i%emojis.length]);
  e.style.setProperty('--x',Math.round(Math.random()*96)+'%');
  e.style.setProperty('--size',(17+Math.round(Math.random()*17))+'px');
  e.style.setProperty('--dur',(11+Math.round(Math.random()*9))+'s');
  e.style.setProperty('--delay','-'+Math.round(Math.random()*15)+'s');
  capa.appendChild(e);
 }
}
function iniciarCarga(){
 const pantalla=document.getElementById('loader-screen');
 const barra=document.getElementById('progress-bar');
 const numero=document.getElementById('progress-number');
 const contenedor=barra.parentElement;
 const inicio=performance.now(),duracion=2800;
 function animar(ahora){
  const progreso=Math.min(1,(ahora-inicio)/duracion);
  const porcentaje=Math.round((1-Math.pow(1-progreso,1.7))*100);
  barra.style.width=porcentaje+'%';
  numero.textContent=porcentaje;
  contenedor.setAttribute('aria-valuenow',String(porcentaje));
  if(progreso<1){requestAnimationFrame(animar);}
  else{setTimeout(()=>pantalla.classList.add('loader-finished'),350);}
 }
 requestAnimationFrame(animar);
}
document.addEventListener('DOMContentLoaded',()=>{
 saludar();pintarMarcas();aplicarTemporada();
 document.getElementById('close-detail').addEventListener('click',()=>{
  document.getElementById('brand-detail').hidden=true;
  document.querySelectorAll('.brand-circle').forEach(b=>b.setAttribute('aria-pressed','false'));
 });
 iniciarCarga();
});