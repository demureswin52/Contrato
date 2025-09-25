// Estado (edítalo aquí)
const state = {
  title: 'Contrato de Amistad — Versión Oficial',
  desc: 'Reglas que mantienen la amistad sana, leal y divertida. (Edita el archivo script.js para cambiar).',
  partyA: 'Jandy Pérez',
  partyB: 'Amigo Fiel',
  startDate: new Date().toISOString(),
  editedAt: new Date().toISOString(),
  sigA: 'Jandy Pérez — ' + new Date().toLocaleDateString(),
  sigB: 'Amigo Fiel — ' + new Date().toLocaleDateString(),
  rules: [
    {text: 'No desaparecer por más de 2 días sin explicación válida.', tag: 'Importante'},
    {text: 'Respetar los secretos: lo que se cuente queda entre nosotros.', tag: 'Confidencial'},
    {text: 'Apoyo garantizado en cosas importantes (exámenes, problemas, alegrías).', tag: 'Serio'},
    {text: 'No cancelar planes de último minuto salvo emergencia.', tag: 'Civismo'},
    {text: 'Enviar al menos 1 meme/nota graciosa a la semana.', tag: 'Diversión'},
    {text: 'Si hay pelea, no pasar más de 48 horas sin hablarlo.', tag: 'Paz'},
    {text: 'No usar al otro solo cuando se necesita algo.', tag: 'Respeto'},
    {text: 'No contar spoilers de series/películas sin permiso.', tag: 'Spoilers'},
    {text: 'Compartir comida: preguntar antes de tomar la última porción.', tag: 'Comida'},
    {text: 'Si uno manda "necesito hablar", responder en lo posible rápido.', tag: 'Urgente'}
  ]
};

// Render (solo lectura)
const el = id => document.getElementById(id);
function render(){
  el('pvTitle').textContent = state.title;
  el('pvDesc').textContent = state.desc;
  el('partyA').textContent = state.partyA;
  el('partyB').textContent = state.partyB;
  el('startDate').textContent = new Date(state.startDate).toLocaleDateString();
  el('editedAt').textContent = new Date(state.editedAt).toLocaleString();

  const container = el('rulesList'); container.innerHTML = '';
  state.rules.forEach((r,i)=>{
    const node = document.createElement('div'); node.className='rule';
    node.innerHTML = `<div class="num">${i+1}</div><div class="text">${escapeHtml(r.text)}</div><div><div class="tag">${escapeHtml(r.tag)}</div></div>`;
    container.appendChild(node);
  });

  el('sigAview').textContent = state.sigA || '—';
  el('sigBview').textContent = state.sigB || '—';
}

function escapeHtml(text){ return String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

document.addEventListener('DOMContentLoaded', ()=>{
  render();

  // acciones permitidas
  el('exportJson').addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
    downloadBlob(blob, 'contrato-amigos.json');
  });
  el('exportTxt').addEventListener('click', ()=>{
    downloadBlob(new Blob([renderPlainText()],{type:'text/plain'}),'contrato-amigos.txt');
  });
  el('printBtn').addEventListener('click', ()=> window.print());
  el('viewCode').addEventListener('click', ()=> alert('Edita la variable `state` en script.js y vuelve a subir los archivos.'));
});

function downloadBlob(blob, filename){ const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
function renderPlainText(){ 
  const parts=[];
  parts.push(state.title);
  parts.push('Descripción: '+state.desc);
  parts.push('Partes:');
  parts.push('  A: '+state.partyA);
  parts.push('  B: '+state.partyB);
  parts.push('\nReglas:');
  state.rules.forEach((r,i)=>parts.push(`${i+1}. ${r.text} [${r.tag}]`));
  parts.push('\nFirmas:');
  parts.push('  A: '+(state.sigA||'—'));
  parts.push('  B: '+(state.sigB||'—'));
  parts.push('\nGenerado por Contrato de Amigos — '+new Date().toLocaleString());
  return parts.join('\n'); 
}
