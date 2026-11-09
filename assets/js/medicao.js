/* Medição da Prompts360: consentimento (LGPD e Consent Mode v2), GTM, GA4, Meta Pixel, eventos de conversão,
   Core Web Vitals e erros. Preencha os IDs abaixo; sem ID, a ferramenta não carrega. */
(function () {
  "use strict";
  var CONFIG = {
    gtm: "",          // ex.: "GTM-XXXXXXX"  (com GTM, configure GA4 e Pixel dentro dele e deixe os dois abaixo vazios)
    ga4: "",          // ex.: "G-XXXXXXXXXX"
    metaPixel: "",    // ex.: "123456789012345"
    clarity: ""       // ex.: "abcd1234ef" (Microsoft Clarity: mapas de calor e gravações)
  };
  var CHAVE = "p360_consentimento";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode v2: tudo negado até a pessoa escolher
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });

  function lerConsentimento() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function salvarConsentimento(v) { try { localStorage.setItem(CHAVE, v); localStorage.setItem(CHAVE + "_em", new Date().toISOString()); } catch (e) {} }

  function carregar(src, attrs) { var s = document.createElement("script"); s.async = true; s.src = src; if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); }); document.head.appendChild(s); }

  var carregado = false;
  function ativar() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    if (carregado) return; carregado = true;
    if (CONFIG.gtm) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      carregar("https://www.googletagmanager.com/gtm.js?id=" + CONFIG.gtm);
    }
    if (CONFIG.ga4) {
      carregar("https://www.googletagmanager.com/gtag/js?id=" + CONFIG.ga4);
      gtag("js", new Date());
      gtag("config", CONFIG.ga4, { anonymize_ip: true });
    }
    if (CONFIG.metaPixel) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", CONFIG.metaPixel);
      window.fbq("track", "PageView");
    }
    if (CONFIG.clarity) {
      (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", CONFIG.clarity);
    }
  }

  /* ===== Eventos =====
     Uso: p360Evento("nome", { ... }). Vai para o dataLayer (GTM e GA4) e, nos eventos de conversão, para o Pixel. */
  var PIXEL = { gerar_lead: "Lead", diagnostico_concluido: "CompleteRegistration", contato_whatsapp: "Contact", diagnostico_inicio: "ViewContent" };
  window.p360Evento = function (nome, dados) {
    dados = dados || {};
    window.dataLayer.push(Object.assign({ event: nome }, dados));
    if (CONFIG.ga4 && carregado) gtag("event", nome, dados);
    if (window.fbq && PIXEL[nome]) window.fbq("track", PIXEL[nome], dados.valor ? { value: dados.valor, currency: "BRL" } : {});
  };

  // Cliques em CTAs, WhatsApp e links externos
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a,button");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (/wa\.me|whatsapp/.test(href)) window.p360Evento("contato_whatsapp", { local: a.textContent.trim().slice(0, 60) });
    else if (href === "#diagnostico") window.p360Evento("cta_diagnostico", { texto: a.textContent.trim().slice(0, 60) });
    else if (/^https?:/.test(href) && href.indexOf(location.host) < 0) window.p360Evento("link_externo", { destino: href });
  }, true);

  // Profundidade de rolagem
  var marcos = [25, 50, 75, 90], vistos = {};
  window.addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - innerHeight; if (h <= 0) return;
    var p = Math.round(scrollY / h * 100);
    marcos.forEach(function (m) { if (p >= m && !vistos[m]) { vistos[m] = 1; window.p360Evento("rolagem", { porcentagem: m }); } });
  }, { passive: true });

  // Core Web Vitals (LCP, CLS, INP aproximado)
  try {
    var lcp = 0, cls = 0, inp = 0;
    new PerformanceObserver(function (l) { var e = l.getEntries(); lcp = e[e.length - 1].startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(function (l) { l.getEntries().forEach(function (e) { if (!e.hadRecentInput) cls += e.value; }); }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(function (l) { l.getEntries().forEach(function (e) { if (e.interactionId && e.duration > inp) inp = e.duration; }); }).observe({ type: "event", buffered: true, durationThreshold: 40 });
    var enviado = false;
    var envia = function () { if (enviado) return; enviado = true; window.p360Evento("web_vitals", { lcp_ms: Math.round(lcp), cls: Math.round(cls * 1000) / 1000, inp_ms: Math.round(inp) }); };
    addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") envia(); });
    addEventListener("pagehide", envia);
  } catch (e) {}

  // Erros de JavaScript
  addEventListener("error", function (e) { window.p360Evento("erro_js", { mensagem: String(e.message || "").slice(0, 150), arquivo: String(e.filename || "").split("/").pop(), linha: e.lineno || 0 }); });
  addEventListener("unhandledrejection", function (e) { window.p360Evento("erro_js", { mensagem: String(e.reason && e.reason.message || e.reason || "").slice(0, 150), arquivo: "promise" }); });

  /* ===== Aviso de cookies (LGPD) ===== */
  function aviso() {
    var atual = lerConsentimento();
    if (atual === "aceito") { ativar(); return; }
    if (atual === "recusado") return;
    var d = document.createElement("div");
    d.className = "aviso-cookies vidro";
    d.setAttribute("role", "dialog"); d.setAttribute("aria-live", "polite"); d.setAttribute("aria-label", "Aviso de cookies");
    d.innerHTML = '<p>Usamos cookies para medir o site e melhorar os nossos anúncios. Você escolhe. <a href="/politica-de-privacidade.html">Política de privacidade</a></p><div><button type="button" class="btn vidro" data-c="recusado">Só o essencial</button><button type="button" class="btn principal" data-c="aceito">Aceitar</button></div>';
    document.body.appendChild(d);
    d.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-c"); if (!v) return;
      salvarConsentimento(v); window.p360Evento("consentimento", { escolha: v });
      if (v === "aceito") ativar();
      d.remove();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", aviso); else aviso();
})();
