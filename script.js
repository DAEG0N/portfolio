const copy={
en:{
navProjects:"Scene Selection",navProfile:"Yearbook",navContact:"Contact",
heroA:"Web, data &",heroB:"digital operations.",
heroLead:"I turn complex workflows, information and ideas into clear digital products — with a little stage energy.",
menuProjects:"Scene Selection",menuProfile:"Player Profile",menuResume:"Resume / CV",menuContact:"Contact",
projectsTitle:"Featured projects",
chartsDesc:"Music-chart platform with weekly rankings, archives, artist and album pages, historical data and responsive chart experiences.",
musicDesc:"A streaming-chart experience inspired by editorial music platforms, reading weekly Songs, Albums and Artists data.",
chatDesc:"CRM and messaging concept shaped by hands-on experience with customer service, WhatsApp workflows and administrative operations.",
educaDesc:"School-management product inspired by real administrative routines: enrollment, students, teachers, grades, calendars and report cards.",
schoolDesc:"An original school website concept focused on clear institutional communication, responsive structure and a stronger digital experience.",
profileTitle:"The person behind the projects.",
profileIntro:"A background that crosses operations, education, legal support, CRM, editorial production and modern web development.",
profileText:"My background connects administration, legal support, customer service, CRM, financial routines, school operations, editorial production and process organization with web development and product thinking.",
profileText2:"That mix shapes how I build: I think about the person operating the system, the data behind the screen, the workflow around it and the points where friction can be removed.",
experienceTitle:"Professional experience behind the portfolio.",
expLegal:"Legal-administrative support involving document preparation and review, procedural deadlines, file organization, legal research and communication with stakeholders.",
expVita:"Administrative and commercial routines, CRM/customer support, proposals, contracts, reports, spreadsheets, financial follow-up and process organization.",
expConectando:"Administrative and operational support across documentation, customer service, reports, spreadsheets, financial routines and process automation.",
expSchool:"School administration using Hust Chat and WhatsApp bot workflows, plus ActiveSoft for student, teacher, subject and calendar registration, enrollment, grades and report-card closing.",
expEditorial:"Three years of experience with page layout and editorial production, building visual hierarchy, organizing information and preparing polished materials.",
contactTitle:"Let’s build the next project.",
contactText:"Remote opportunities, web projects, operations, support and digital product work."
},
pt:{
navProjects:"Seleção de Cenas",navProfile:"Anuário",navContact:"Contato",
heroA:"Web, dados &",heroB:"operações digitais.",
heroLead:"Transformo fluxos complexos, informação e ideias em produtos digitais claros — com um pouco de energia de palco.",
menuProjects:"Seleção de Cenas",menuProfile:"Perfil do Jogador",menuResume:"Currículo / CV",menuContact:"Contato",
projectsTitle:"Projetos em destaque",
chartsDesc:"Plataforma de charts musicais com rankings semanais, arquivo histórico, páginas de artistas e álbuns e experiências responsivas.",
musicDesc:"Experiência de charts de streaming inspirada em plataformas editoriais de música, lendo dados semanais de Songs, Albums e Artists.",
chatDesc:"Conceito de CRM e mensageria moldado por experiência prática com atendimento, WhatsApp e operações administrativas.",
educaDesc:"Produto de gestão escolar inspirado em rotinas administrativas reais: matrículas, alunos, professores, notas, calendários e boletins.",
schoolDesc:"Conceito original de site escolar focado em comunicação institucional clara, responsividade e uma experiência digital mais forte.",
profileTitle:"A pessoa por trás dos projetos.",
profileIntro:"Um background que cruza operações, educação, suporte jurídico, CRM, produção editorial e desenvolvimento web moderno.",
profileText:"Minha trajetória conecta administração, suporte jurídico, atendimento, CRM, rotinas financeiras, operações escolares, produção editorial e organização de processos com desenvolvimento web e pensamento de produto.",
profileText2:"Essa mistura muda a forma como eu construo: penso em quem opera o sistema, nos dados por trás da tela, no fluxo ao redor e nos pontos em que a interface pode reduzir atrito.",
experienceTitle:"A experiência profissional por trás do portfólio.",
expLegal:"Suporte jurídico-administrativo envolvendo preparação e revisão de documentos, prazos processuais, organização de arquivos, pesquisa jurídica e comunicação com envolvidos.",
expVita:"Rotinas administrativas e comerciais, CRM/atendimento, propostas, contratos, relatórios, planilhas, acompanhamento financeiro e organização de processos.",
expConectando:"Suporte administrativo e operacional em documentação, atendimento, relatórios, planilhas, rotinas financeiras e automação de processos.",
expSchool:"Administração escolar com Hust Chat e fluxos de bot no WhatsApp, além do ActiveSoft para cadastros de alunos, professores, matérias e calendários, matrículas, notas e fechamento de boletins.",
expEditorial:"Três anos de experiência com diagramação e produção editorial, trabalhando hierarquia visual, organização da informação e preparação de materiais.",
contactTitle:"Vamos construir o próximo projeto.",
contactText:"Oportunidades remotas, projetos web, operações, suporte e trabalho com produtos digitais."
}};
let lang=localStorage.getItem("portfolioLang")||"en";
function applyLang(){
 document.documentElement.lang=lang==="pt"?"pt-BR":"en";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(copy[lang][k])el.textContent=copy[lang][k]});
 document.getElementById("langToggle").textContent=lang==="en"?"PT":"EN";
}
document.getElementById("langToggle").onclick=()=>{lang=lang==="en"?"pt":"en";localStorage.setItem("portfolioLang",lang);applyLang()};
applyLang();

document.querySelectorAll(".scene-card").forEach((card,i)=>{
 card.style.opacity="0";card.style.transform+=" translateY(18px)";
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{
   if(e.isIntersecting){e.target.style.transition="opacity .55s ease, transform .55s ease";e.target.style.opacity="1";e.target.style.transform=e.target.style.transform.replace(" translateY(18px)","");io.unobserve(e.target)}
 }),{threshold:.12});
 io.observe(card);
});
