/* Site Prompts360: vidro com refração, rolagem, animações e formulário de diagnóstico. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var largo = function () { return window.matchMedia("(min-width: 981px)").matches; };

  /* ===== 1. Vidro líquido =====
     Gera um mapa de deslocamento de borda (como a lente do vidro do iOS): perto da borda, o fundo é puxado
     para dentro e entorta; no centro fica limpo. Só Chrome e Edge aplicam filtro SVG no backdrop-filter. */
  function mapaLente(lado, borda, raio) {
    var c = document.createElement("canvas");
    c.width = c.height = lado;
    var x = c.getContext("2d"), img = x.createImageData(lado, lado), d = img.data;
    var r = raio * lado, h = lado / 2;
    function sdf(px, py) { // distância até a borda de um retângulo arredondado (negativa dentro)
      var qx = Math.abs(px - h) - (h - r), qy = Math.abs(py - h) - (h - r);
      var ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
    }
    var bw = borda * lado;
    for (var y = 0; y < lado; y++) for (var xx = 0; xx < lado; xx++) {
      var i = (y * lado + xx) * 4, s = sdf(xx + .5, y + .5), dx = 0, dy = 0;
      if (s < 0 && -s < bw) {
        var t = 1 - (-s / bw), forca = t * t * (3 - 2 * t);
        var gx = sdf(xx + 1.5, y + .5) - sdf(xx - .5, y + .5), gy = sdf(xx + .5, y + 1.5) - sdf(xx + .5, y - .5);
        var n = Math.hypot(gx, gy) || 1;
        dx = -gx / n * forca; dy = -gy / n * forca;
      }
      d[i] = 128 + dx * 127; d[i + 1] = 128 + dy * 127; d[i + 2] = 128; d[i + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    return c.toDataURL();
  }
  var ua = navigator.userAgent;
  var chromium = /Chrome\/|Edg\//.test(ua) && !/CriOS|FxiOS|Firefox/.test(ua);
  if (chromium) {
    try {
      var m1 = mapaLente(256, .3, .42), m2 = mapaLente(256, .42, .48);
      document.getElementById("mapa-lente").setAttribute("href", m1);
      document.getElementById("mapa-forte").setAttribute("href", m2);
      doc.classList.add("refracao");
    } catch (e) { /* sem refração: fica o vidro com desfoque */ }
  }

  /* ===== 2. Barra: progresso, esconder ao descer, menu ===== */
  var barra = document.getElementById("barra"), prog = document.getElementById("progresso");
  var ultimo = 0;
  function aoRolar() {
    var y = window.scrollY, h = doc.scrollHeight - innerHeight;
    prog.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    ultimo = y;
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();
  var menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", function () {
    var aberto = barra.classList.toggle("aberta");
    menuBtn.setAttribute("aria-expanded", String(aberto));
  });
  barra.querySelectorAll("nav a").forEach(function (a) { a.addEventListener("click", function () { barra.classList.remove("aberta"); menuBtn.setAttribute("aria-expanded", "false"); }); });

  /* ===== 3. Rede animada do herói ===== */
  (function rede() {
    var c = document.getElementById("rede");
    if (!c) return;
    var x = c.getContext("2d"), P = [], W = 0, H = 0, k = Math.min(window.devicePixelRatio || 1, 2), mouse = { x: -999, y: -999 }, ativo = true;
    function medir() {
      var r = c.getBoundingClientRect(); W = r.width; H = r.height;
      c.width = W * k; c.height = H * k; x.setTransform(k, 0, 0, k, 0, 0);
      var n = Math.round(Math.min(150, Math.max(50, W * H / 9000)));
      P = [];
      for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, t: Math.random() });
    }
    function quadro() {
      if (!ativo) return;
      x.clearRect(0, 0, W, H);
      var lim = Math.max(90, W / 13);
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        if (!reduz) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.hypot(mx, my);
        if (md < 140 && !reduz) { p.x += mx / md * .6; p.y += my / md * .6; }
        for (var j = i + 1; j < P.length; j++) {
          var q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < lim) { x.strokeStyle = "rgba(16,123,255," + (.2 * (1 - d / lim)) + ")"; x.lineWidth = .7; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); }
        }
        var teal = p.t > .86;
        x.fillStyle = teal ? "rgba(0,209,194,.9)" : "rgba(130,175,255," + (.25 + p.t * .4) + ")";
        x.beginPath(); x.arc(p.x, p.y, teal ? 1.8 : 1.1, 0, 7); x.fill();
      }
      if (!reduz) requestAnimationFrame(quadro);
    }
    medir(); quadro();
    var tr; window.addEventListener("resize", function () { clearTimeout(tr); tr = setTimeout(function () { medir(); if (reduz) quadro(); }, 200); });
    c.parentElement.addEventListener("pointermove", function (e) { var r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    c.parentElement.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { var vis = es[0].isIntersecting; if (vis && !ativo) { ativo = true; quadro(); } ativo = vis; }).observe(c);
  })();

  /* ===== 4. Botões magnéticos ===== */
  if (!reduz && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-mag]").forEach(function (b) {
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * .18) + "px," + ((e.clientY - r.top - r.height / 2) * .25) + "px)"; });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ===== 5. Formulário de diagnóstico ===== */
  sinais(); ctaFixo(); triagem();

  /* ===== 6. Movimento com GSAP ===== */
  function movimento() {
    if (reduz || !window.gsap || !window.ScrollTrigger) { document.querySelectorAll(".rv").forEach(function (e) { e.classList.remove("pre"); }); return; }
    gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis) {
      var lenis = new Lenis({ lerp: .1 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) { var alvo = document.querySelector(a.getAttribute("href")); if (alvo) { e.preventDefault(); lenis.scrollTo(alvo, { offset: -20 }); } });
      });
    }
    // Entrada do herói
    gsap.from(".heroi h1 .l>span", { yPercent: 110, duration: 1.15, ease: "power4.out", stagger: .12, delay: .1 });
    gsap.from(".heroi .selo,.heroi .lead,.heroi .acoes,.heroi .micro", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: .08, delay: .45 });
    gsap.from("#cartaoDiag", { opacity: 0, y: 40, rotateX: 8, duration: 1.2, ease: "power3.out", delay: .55 });
    // Parallax das camadas de fundo
    var f = largo() ? 1 : .45;
    document.querySelectorAll("[data-vel]").forEach(function (el) {
      var v = parseFloat(el.getAttribute("data-vel")) * f;
      gsap.fromTo(el, { y: -v * 2 }, { y: v * 2, ease: "none", scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    // Manifesto palavra por palavra
    var tx = document.getElementById("manifestoTexto"), ws = [];
    (function quebra(el, hl) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var fr = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { fr.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement("span"); s.className = "w" + (hl ? " hl" : ""); s.textContent = t; fr.appendChild(s); ws.push(s);
          });
          n.parentNode.replaceChild(fr, n);
        } else if (n.nodeType === 1) quebra(n, hl || n.classList.contains("hl"));
      });
    })(tx, false);
    ws.forEach(function (w) { w.style.setProperty("--o", .15); });
    ScrollTrigger.create({ trigger: "#manifesto", start: "top top", end: "+=110%", pin: true, scrub: true, onUpdate: function (s) { var a = s.progress * ws.length * 1.1; ws.forEach(function (w, i) { w.style.setProperty("--o", Math.max(.15, Math.min(1, a - i + 1))); }); } });
    // Frentes em trilho horizontal no computador
    var trilho = document.getElementById("trilho");
    ScrollTrigger.matchMedia({
      "(min-width: 981px)": function () {
        var dist = function () { return trilho.scrollWidth - innerWidth; };
        gsap.to(trilho, { x: function () { return -dist(); }, ease: "none", scrollTrigger: { trigger: trilho, start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: true, invalidateOnRefresh: true } });
        gsap.utils.toArray(".painel .emb").forEach(function (e) { gsap.fromTo(e, { scale: .86 }, { scale: 1.04, ease: "none", scrollTrigger: { trigger: trilho, start: "top top", end: function () { return "+=" + dist(); }, scrub: true } }); });
      }
    });
    // Linha do método
    var tm = document.getElementById("trilhaMetodo");
    gsap.fromTo(tm, { "--p": 0 }, { "--p": 1, ease: "none", scrollTrigger: { trigger: tm, start: "top 80%", end: "bottom 50%", scrub: true } });
    // Revelar ao entrar
    gsap.utils.toArray(".rv").forEach(function (el, i) {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .9, ease: "power3.out", delay: (i % 3) * .06, scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
    });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === "complete") movimento(); else window.addEventListener("load", movimento);

  function ev(n, d) { if (window.p360Evento) window.p360Evento(n, d || {}); }
  /* ===== Sinais: o visitante marca o que reconhece ===== */
  function sinais() {
    var lista = document.querySelectorAll("#sinais .sinal"), txt = document.getElementById("placarTexto");
    if (!lista.length) return;
    var padrao = txt.textContent;
    lista.forEach(function (b) {
      b.addEventListener("click", function () {
        b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
        var n = document.querySelectorAll('#sinais .sinal[aria-pressed="true"]').length; ev("sinais_marcados", { quantidade: n });
        txt.innerHTML = n === 0 ? padrao : n === 1 ? "Você marcou <b>1</b> de 6 sinais. Já é um ponto de atenção, e a triagem mostra como resolver." : "Você marcou <b>" + n + "</b> de 6 sinais. " + (n >= 4 ? "Sua empresa está deixando dinheiro na mesa. Vale começar agora." : "Há espaço claro para acelerar. Veja por onde começar.");
      });
    });
  }

  /* ===== CTA fixo no celular: some no topo e na triagem ===== */
  function ctaFixo() {
    var c = document.getElementById("ctaFixo"), d = document.getElementById("diagnostico");
    if (!c || !d) return;
    var noDiag = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { noDiag = es[0].isIntersecting; atualiza(); }, { threshold: .05 }).observe(d);
    function atualiza() { c.classList.toggle("some", window.scrollY < 500 || noDiag); }
    window.addEventListener("scroll", atualiza, { passive: true }); atualiza();
  }

  /* ===== Triagem: 7 perguntas, recomendação na hora, contato para o diagnóstico completo ===== */
  function triagem() {
    var raiz = document.getElementById("triagem");
    if (!raiz) return;
    var WHATS = "5581971009601";
    var P = [
      { id: "objetivo", t: "Qual é o seu principal objetivo agora?", a: "Escolha o que mais pesa hoje.", op: [["Vender mais e atrair clientes", { G: 3 }], ["Fortalecer a marca e a presença digital", { G: 2 }], ["Capacitar a equipe para usar IA", { A: 3 }], ["Automatizar atendimento e processos", { L: 3 }], ["Criar um app, sistema ou produto digital", { L: 3 }]] },
      { id: "marketing", t: "Como está o marketing da empresa hoje?", a: "Sem resposta certa. Queremos entender o ponto de partida.", op: [["Ninguém cuida de forma constante", { G: 2 }], ["Fazemos por conta própria, sem método", { G: 2, A: 1 }], ["Temos fornecedor, mas sem resultado claro", { G: 2 }], ["Temos um time interno", { A: 2, L: 1 }]] },
      { id: "tempo", t: "Onde a sua equipe mais perde tempo?", a: "Pense na semana passada.", op: [["Respondendo clientes no WhatsApp", { L: 2 }], ["Criando conteúdo e posts", { G: 1, A: 1 }], ["Planilhas, relatórios e tarefas repetidas", { L: 2, A: 1 }], ["Não sabemos medir", { G: 1, A: 1 }]] },
      { id: "ia", t: "A sua equipe já usa IA no dia a dia?", a: "ChatGPT, Claude, Gemini ou qualquer outra.", op: [["Não, ainda nada", { A: 2 }], ["Um pouco, cada um do seu jeito", { A: 2 }], ["Sim, bastante", { L: 1 }]] },
      { id: "faturamento", t: "Qual é o faturamento mensal da empresa?", a: "Usamos só para dimensionar o plano. Fica entre nós.", duas: true, op: [["Até R$ 30 mil", {}, 10], ["R$ 30 mil a R$ 100 mil", { G: 1 }, 25], ["R$ 100 mil a R$ 500 mil", { G: 1, L: 1 }, 35], ["Acima de R$ 500 mil", { G: 1, L: 1 }, 40]] },
      { id: "urgencia", t: "Quando você quer começar?", a: "Isso define o ritmo da primeira fase.", op: [["Agora, é prioridade", {}, 30], ["Nos próximos 30 dias", {}, 20], ["Só estou pesquisando", {}, 5]] },
      { id: "decisor", t: "Quem decide sobre esse investimento?", a: "Assim chamamos as pessoas certas para a conversa.", op: [["Eu decido", {}, 20], ["Eu e meus sócios", {}, 15], ["Outra pessoa", {}, 5]] }
    ];
    var F = {
      G: { nome: "Growth", slug: "growth", cor: "#107BFF", porque: "O seu gargalo está em atrair e converter clientes.", passos: ["Diagnóstico de marca e de canais", "Linha editorial e conteúdo com método", "Tráfego pago e página que capta leads"] },
      A: { nome: "Academy", slug: "academy", cor: "#00D1C2", porque: "A sua equipe pode render muito mais com IA.", passos: ["Workshop de IA aplicada à gestão", "Capacitação da equipe por função", "Rotinas com IA no dia a dia"] },
      L: { nome: "Labs", slug: "labs", cor: "#8C7BFF", porque: "Tempo e dinheiro estão escapando em tarefas que podem ser automatizadas.", passos: ["Agente de IA no WhatsApp", "Automação dos processos repetidos", "Sistema ou app sob medida"] }
    };
    var resp = {}, idx = 0, bonus = {};
    var caixa = document.getElementById("triPerguntas"), res = document.getElementById("triResultado"), ok = document.getElementById("triSucesso");
    var barra = document.getElementById("triBarra"), cont = document.getElementById("triContador"), frase = document.getElementById("triFrase");
    var voltar = document.getElementById("triVoltar"), nav = document.getElementById("triNav");
    var frases = ["Leva menos de um minuto", "Ótimo, siga", "Estamos quase lá", "Faltam só 4", "Metade feita", "Penúltima", "Última pergunta"];

    document.querySelectorAll("[data-frente]").forEach(function (b) {
      b.addEventListener("click", function () { var k = { Growth: "G", Academy: "A", Labs: "L" }[b.getAttribute("data-frente")]; bonus = {}; if (k) bonus[k] = 1; });
    });

    function mostra() {
      var p = P[idx];
      cont.textContent = "PERGUNTA " + (idx + 1) + " DE " + P.length;
      frase.textContent = frases[idx] || "";
      barra.style.width = (idx / P.length * 100) + "%";
      voltar.disabled = idx === 0;
      var h = '<div class="tri-passo"><h3 id="triTitulo">' + p.t + '</h3><p class="ajuda">' + p.a + '</p><div class="escolhas' + (p.duas ? " duas" : "") + '" role="radiogroup" aria-labelledby="triTitulo">';
      p.op.forEach(function (o, i) {
        var marcada = resp[p.id] === i;
        h += '<button type="button" class="escolha' + (marcada ? " marcada" : "") + '" role="radio" aria-checked="' + marcada + '" data-i="' + i + '"><span class="letra">' + String.fromCharCode(65 + i) + "</span>" + o[0] + "</button>";
      });
      caixa.innerHTML = h + "</div></div>";
      caixa.querySelectorAll(".escolha").forEach(function (b) {
        b.addEventListener("click", function () {
          resp[p.id] = Number(b.getAttribute("data-i")); if (idx === 0) ev("diagnostico_inicio", { origem: "secao" }); ev("diagnostico_pergunta", { numero: idx + 1, pergunta: p.id });
          caixa.querySelectorAll(".escolha").forEach(function (x) { x.classList.remove("marcada"); x.setAttribute("aria-checked", "false"); });
          b.classList.add("marcada"); b.setAttribute("aria-checked", "true");
          setTimeout(function () { if (idx < P.length - 1) { idx++; mostra(); foco(); } else resultado(); }, reduz ? 0 : 260);
        });
      });
    }
    function foco() { var b = caixa.querySelector(".escolha.marcada") || caixa.querySelector(".escolha"); if (b) b.focus({ preventScroll: true }); }
    voltar.addEventListener("click", function () { if (idx > 0) { idx--; mostra(); foco(); } });

    function calcula() {
      var s = { G: 0, A: 0, L: 0 }, nota = 10;
      P.forEach(function (p) { var i = resp[p.id]; if (i == null) return; var o = p.op[i]; Object.keys(o[1]).forEach(function (k) { s[k] += o[1][k]; }); if (o[2]) nota += o[2]; });
      Object.keys(bonus).forEach(function (k) { s[k] += bonus[k]; });
      var ordem = Object.keys(s).sort(function (a, b) { return s[b] - s[a]; }), topo = s[ordem[0]] || 1;
      var rec = ordem.filter(function (k, i) { return i === 0 || (i === 1 && s[k] >= 3 && s[k] >= topo * .5); });
      return { s: s, rec: rec, topo: topo, nota: Math.min(100, nota) };
    }
    function minus(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
    function texto(p) { var i = resp[p]; var q = P.filter(function (x) { return x.id === p; })[0]; return i == null ? "" : q.op[i][0]; }

    var calc;
    function resultado() {
      calc = calcula();
      barra.style.width = "100%"; cont.textContent = "RESULTADO"; frase.textContent = "Sua recomendação"; nav.hidden = true;
      caixa.innerHTML = "";
      var nomes = calc.rec.map(function (k) { return F[k].nome; });
      var titulo = calc.rec.length === 1 ? "Recomendamos o Prompts360 " + nomes[0] + "." : "Recomendamos " + nomes.join(" + ") + ".";
      var sub = calc.rec.length === 1 ? F[calc.rec[0]].porque : "A combinação certa para o seu momento: " + calc.rec.map(function (k) { return F[k].porque.charAt(0).toLowerCase() + F[k].porque.slice(1, -1); }).join("; ") + ".";
      var logos = calc.rec.map(function (k) { return '<figure class="vidro" style="--c:' + F[k].cor + '"><img src="assets/img/' + F[k].slug + '-escuro.webp" alt="Prompts360 ' + F[k].nome + '"><figcaption>' + F[k].nome.toUpperCase() + "</figcaption></figure>"; }).join("");
      var passos = []; calc.rec.forEach(function (k) { F[k].passos.forEach(function (x, i) { if (i < (calc.rec.length > 1 ? 2 : 3)) passos.push(x); }); });
      var med = ["G", "A", "L"].map(function (k) { var pct = Math.round(calc.s[k] / calc.topo * 100); return '<div class="medidor" style="--c:' + F[k].cor + '"><span>' + F[k].nome + '</span><i><b data-w="' + pct + '%"></b></i><span>' + pct + "%</span></div>"; }).join("");
      res.innerHTML = '<p class="rotulo">SUA RECOMENDAÇÃO</p><h3>' + titulo + '</h3><p class="lead" style="margin-top:10px">' + sub + "</p>" +
        '<div class="rec-logos">' + logos + "</div>" +
        '<div class="rec-por"><div><h4>Por que essa recomendação</h4><ul><li>Seu objetivo: ' + minus(texto("objetivo")) + "</li><li>Hoje: " + minus(texto("marketing")) + "</li><li>Onde perde tempo: " + minus(texto("tempo")) + '</li></ul></div><div><h4>Afinidade com cada frente</h4><div class="medidores">' + med + "</div></div></div>" +
        '<div class="rec-por" style="margin-top:22px"><div><h4>Primeiros passos sugeridos</h4><ul>' + passos.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div><div><h4>O que vem no diagnóstico completo</h4><ul><li>Leitura do seu site, Instagram e anúncios</li><li>Os 3 gargalos que mais custam vendas</li><li>Um plano de 90 dias com fases</li></ul></div></div>' +
        '<form class="captura" id="captura" novalidate><h4>Receba o diagnóstico completo no WhatsApp</h4><p>Um sócio da Prompts360 analisa as suas respostas e chama você com o plano e um horário para conversar.</p>' +
        '<div class="tres"><div class="campo"><label for="nome">Seu nome</label><input id="nome" name="nome" autocomplete="name" required><span class="erro">Digite o seu nome.</span></div>' +
        '<div class="campo"><label for="whatsapp">WhatsApp com DDD</label><input id="whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="(81) 90000-0000" required><span class="erro">Digite um WhatsApp com DDD.</span></div>' +
        '<div class="campo"><label for="empresa">Empresa ou @ do Instagram</label><input id="empresa" name="empresa" autocomplete="organization" required><span class="erro">Diga a empresa ou o @.</span></div></div>' +
        '<label class="consent"><input type="checkbox" id="consentimento" required><span>Aceito receber contato da Prompts360 pelo WhatsApp sobre o meu diagnóstico. Veja a <a href="politica-de-privacidade.html" style="text-decoration:underline">política de privacidade</a>.</span></label>' +
        '<div class="acoes"><button type="submit" class="btn principal" id="enviar">Quero o diagnóstico completo</button><button type="button" class="btn vidro" id="refazer">Refazer o diagnóstico</button></div><p class="nota" id="notaErro" role="alert"></p></form>';
      res.hidden = false;
      requestAnimationFrame(function () { res.querySelectorAll(".medidor b").forEach(function (b) { b.style.width = b.getAttribute("data-w"); }); });
      if (window.__lenis) window.__lenis.scrollTo(raiz, { offset: -90 }); else raiz.scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
      res.querySelector("h3").setAttribute("tabindex", "-1"); res.querySelector("h3").focus({ preventScroll: true });
      ligaCaptura();
      enviar(payload(false));
      ev("diagnostico_concluido", { recomendacao: calc.rec.map(function (k) { return F[k].nome; }).join(" + "), nota: calc.nota });
    }

    // Origem: guarda a primeira visita e a atual
    var qs = new URLSearchParams(location.search), CH = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ref"];
    var atual = {}; CH.forEach(function (k) { if (qs.get(k)) atual[k] = qs.get(k); });
    var primeira;
    try { primeira = JSON.parse(localStorage.getItem("p360_origem") || "null"); if (!primeira) { primeira = { campos: atual, entrada: location.pathname + location.search, referencia: document.referrer || "", quando: new Date().toISOString() }; localStorage.setItem("p360_origem", JSON.stringify(primeira)); } }
    catch (e) { primeira = { campos: atual, entrada: location.pathname + location.search, referencia: document.referrer || "" }; }
    function organica() {
      if ((primeira.campos && primeira.campos.utm_source) || atual.utm_source) return null;
      var r = primeira.referencia || document.referrer || "";
      return /instagram/.test(r) ? "instagram" : /google\./.test(r) ? "google" : /facebook|fb\./.test(r) ? "facebook" : /linkedin/.test(r) ? "linkedin" : r ? "referencia" : "direto";
    }
    function payload(comContato) {
      var f = document.getElementById("captura"), r = {};
      P.forEach(function (p) { r[p.id] = texto(p.id); });
      var d = { tipo: comContato ? "lead" : "triagem_concluida", respostas: r, recomendacao: calc.rec.map(function (k) { return F[k].nome; }), afinidade: calc.s, nota: calc.nota,
        origem: { primeira: primeira, atual: atual, organica: organica(), pagina_envio: location.href, aparelho: /Mobi|Android/i.test(navigator.userAgent) ? "celular" : "computador" }, enviado_em: new Date().toISOString() };
      if (comContato && f) { d.nome = f.nome.value.trim(); d.whatsapp = "55" + f.whatsapp.value.replace(/\D/g, ""); d.empresa = f.empresa.value.trim(); d.consentimento = f.consentimento.checked; d.consentimento_texto = "Aceito receber contato da Prompts360 pelo WhatsApp sobre o meu diagnóstico."; }
      return d;
    }
    function enviar(d) {
      if (!window.P360_ENDPOINT) return Promise.resolve(false);
      return fetch(window.P360_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d), keepalive: true }).then(function (r) { return r.ok; }).catch(function () { return false; });
    }
    function linkWhats(d) {
      var t = "Olá! Fiz o diagnóstico de crescimento no site da Prompts360.\n\nNome: " + d.nome + "\nEmpresa: " + d.empresa + "\nRecomendação: " + d.recomendacao.join(" + ") +
        "\nObjetivo: " + d.respostas.objetivo + "\nFaturamento: " + d.respostas.faturamento + "\nQuando: " + d.respostas.urgencia + "\nQuem decide: " + d.respostas.decisor + "\n\nQuero o diagnóstico completo.";
      return "https://wa.me/" + WHATS + "?text=" + encodeURIComponent(t);
    }
    function valida(el, cond) { el.closest(".campo").classList.toggle("invalido", !cond); el.setAttribute("aria-invalid", String(!cond)); return cond; }
    function ligaCaptura() {
      var f = document.getElementById("captura"), tel = f.whatsapp, nota = document.getElementById("notaErro");
      tel.addEventListener("input", function () { var d = tel.value.replace(/\D/g, "").slice(0, 11); tel.value = d.length > 6 ? "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4) : d.length > 2 ? "(" + d.slice(0, 2) + ") " + d.slice(2) : d; });
      document.getElementById("refazer").addEventListener("click", function () { resp = {}; idx = 0; res.hidden = true; res.innerHTML = ""; nav.hidden = false; mostra(); foco(); });
      f.addEventListener("submit", function (ev) {
        ev.preventDefault(); nota.textContent = "";
        var a = valida(f.nome, f.nome.value.trim().length > 1), b = valida(tel, tel.value.replace(/\D/g, "").length >= 10), c = valida(f.empresa, f.empresa.value.trim().length > 1);
        if (!(a && b && c)) { f.querySelector(".invalido input").focus(); return; }
        if (!f.consentimento.checked) { nota.textContent = "Marque a autorização de contato pelo WhatsApp para receber o diagnóstico."; f.consentimento.focus(); return; }
        var d = payload(true), bt = document.getElementById("enviar");
        ev("gerar_lead", { recomendacao: d.recomendacao.join(" + "), nota: d.nota, faturamento: d.respostas.faturamento });
        var fim = function () { res.hidden = true; ok.hidden = false; ok.focus(); };
        if (!window.P360_ENDPOINT) { window.open(linkWhats(d), "_blank", "noopener"); fim(); return; }
        bt.disabled = true; bt.textContent = "Enviando...";
        enviar(d).then(function (sucesso) {
          bt.disabled = false; bt.textContent = "Quero o diagnóstico completo";
          if (sucesso) fim(); else nota.innerHTML = 'Não conseguimos enviar agora. <a href="' + linkWhats(d) + '" target="_blank" rel="noopener" style="text-decoration:underline;color:#F2F5FA">Envie pelo WhatsApp</a> que respondemos em seguida.';
        });
      });
    }
    mostra();
    // Cartão do herói: a primeira resposta já começa o diagnóstico
    document.querySelectorAll("#cartaoDiag [data-obj]").forEach(function (b) {
      b.addEventListener("click", function () {
        resp.objetivo = Number(b.getAttribute("data-obj")); idx = 1; mostra(); ev("diagnostico_inicio", { origem: "topo" });
        var alvo = document.getElementById("diagnostico");
        if (window.__lenis) window.__lenis.scrollTo(raiz, { offset: -110 }); else alvo.scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
        setTimeout(foco, 900);
      });
    });
  }

  /* ===== Contador do caso em destaque ===== */
  (function contador() {
    var el = document.getElementById("contador");
    if (!el || reduz || !("IntersectionObserver" in window)) return;
    var ate = Number(el.getAttribute("data-ate")), feito = false;
    el.textContent = "0";
    new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || feito) return; feito = true;
      var t0 = performance.now(), dur = 1800;
      (function passo(t) { var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(ate * e).toLocaleString("pt-BR"); if (p < 1) requestAnimationFrame(passo); })(t0);
    }, { threshold: .5 }).observe(el);
  })();
})();
