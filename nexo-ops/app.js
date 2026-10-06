const seedClients=[
{name:"Studio Aurora",status:"active",owner:"Adilson",last:"hoje, 09:42",value:1250},
{name:"Clínica Horizonte",status:"proposal",owner:"Adilson",last:"hoje, 08:18",value:1800},
{name:"Colégio Norte",status:"active",owner:"Adilson",last:"ontem",value:2400},
{name:"Lume Arquitetura",status:"lead",owner:"Adilson",last:"02 out",value:3200},
{name:"Bossa Café",status:"proposal",owner:"Adilson",last:"01 out",value:980},
{name:"Norte Saúde",status:"active",owner:"Adilson",last:"29 set",value:1650}
];
const seedTasks=[
{id:1,title:"Enviar proposta revisada",meta:"Clínica Horizonte",due:"11:30",done:false},
{id:2,title:"Conferir notas fiscais",meta:"Financeiro · setembro",due:"14:00",done:false},
{id:3,title:"Follow-up de onboarding",meta:"Studio Aurora",due:"16:30",done:false},
{id:4,title:"Atualizar relatório semanal",meta:"Operações",due:"amanhã",done:false},
{id:5,title:"Revisar cadastro CRM",meta:"Lume Arquitetura",due:"sexta",done:false},
{id:6,title:"Organizar documentos",meta:"Colégio Norte",due:"sexta",done:true},
{id:7,title:"Responder ticket #1042",meta:"Atendimento",due:"hoje",done:false}
];
const tickets=[
{id:"#1042",title:"Acesso ao painel administrativo",client:"Colégio Norte",priority:"Alta",time:"34 min"},
{id:"#1039",title:"Dúvida sobre cobrança mensal",client:"Studio Aurora",priority:"Normal",time:"1h 12m"},
{id:"#1035",title:"Atualização cadastral",client:"Bossa Café",priority:"Normal",time:"2h 08m"},
{id:"#1031",title:"Integração de novo usuário",client:"Norte Saúde",priority:"Alta",time:"3h 16m"}
];
let clients=JSON.parse(localStorage.getItem("nexoClients")||"null")||seedClients;
let tasks=JSON.parse(localStorage.getItem("nexoTasks")||"null")||seedTasks;
let currentFilter="all";

const titles={overview:"Visão geral",clients:"Clientes & CRM",tasks:"Tarefas",finance:"Financeiro",support:"Atendimento"};
function switchView(id){
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
 document.getElementById("pageTitle").textContent=titles[id];
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>switchView(b.dataset.view));
document.querySelectorAll("[data-view-jump]").forEach(b=>b.onclick=()=>switchView(b.dataset.viewJump));

function statusLabel(s){return s==="active"?"Ativo":s==="proposal"?"Proposta":"Lead"}
function renderClients(){
 const q=document.getElementById("search").value.trim().toLowerCase();
 const rows=clients.filter(c=>(currentFilter==="all"||c.status===currentFilter)&&(!q||c.name.toLowerCase().includes(q)));
 document.getElementById("clientRows").innerHTML=rows.map(c=>`<tr><td>${c.name}</td><td><span class="pill ${c.status}">${statusLabel(c.status)}</span></td><td>${c.owner}</td><td>${c.last}</td><td>R$ ${c.value.toLocaleString("pt-BR")}</td><td>•••</td></tr>`).join("");
}
document.getElementById("search").addEventListener("input",renderClients);
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentFilter=b.dataset.filter;renderClients()});
let asc=true;document.getElementById("sortClients").onclick=()=>{clients.sort((a,b)=>asc?a.name.localeCompare(b.name):b.name.localeCompare(a.name));asc=!asc;renderClients()};

function taskRow(t,compact=false){return `<label class="task-row ${t.done?"done":""}"><input type="checkbox" data-task="${t.id}" ${t.done?"checked":""}><div><b>${t.title}</b><span>${t.meta}</span></div><time>${t.due}</time></label>`}
function renderTasks(){
 document.getElementById("priorityList").innerHTML=tasks.filter(t=>!t.done).slice(0,3).map(t=>taskRow(t,true)).join("");
 document.getElementById("taskList").innerHTML=tasks.map(t=>taskRow(t)).join("");
 const open=tasks.filter(t=>!t.done).length;document.getElementById("openTaskCount").textContent=open;
 document.getElementById("focusScore").textContent=Math.round((tasks.filter(t=>t.done).length/tasks.length)*100)+"%";
 document.querySelectorAll("[data-task]").forEach(c=>c.onchange=()=>{const t=tasks.find(x=>x.id===+c.dataset.task);t.done=c.checked;localStorage.setItem("nexoTasks",JSON.stringify(tasks));renderTasks()});
}
document.getElementById("addTaskBtn").onclick=()=>{const title=prompt("Nome da tarefa:");if(title){tasks.unshift({id:Date.now(),title,meta:"Nova tarefa",due:"hoje",done:false});localStorage.setItem("nexoTasks",JSON.stringify(tasks));renderTasks()}};

document.getElementById("ticketGrid").innerHTML=tickets.map(t=>`<article class="ticket"><div class="ticket-top"><div><p class="eyebrow">${t.id} · ${t.client}</p><h3>${t.title}</h3></div><span class="pill ${t.priority==="Alta"?"proposal":""}">${t.priority}</span></div><p>Solicitação em acompanhamento pela equipe de operações.</p><footer><span>aberto há ${t.time}</span><span>ver ticket →</span></footer></article>`).join("");

const modal=document.getElementById("modal");function openModal(){modal.classList.add("open");modal.setAttribute("aria-hidden","false")}function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("newBtn").onclick=openModal;document.getElementById("closeModal").onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
document.getElementById("recordForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);clients.unshift({name:f.get("name"),value:+f.get("value"),status:f.get("status"),owner:"Adilson",last:"agora"});localStorage.setItem("nexoClients",JSON.stringify(clients));renderClients();e.currentTarget.reset();closeModal();showToast("Registro salvo com sucesso.");switchView("clients")};
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.getElementById("todayBtn").onclick=()=>showToast("Painel atualizado para hoje.");
renderClients();renderTasks();