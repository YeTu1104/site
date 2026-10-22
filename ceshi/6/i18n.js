/* =========================================================
   多语言切换：中文 / English / 日本語
   用的是现成的开源翻译插件 translate.js（机翻，不用自己写译文）
   插件官网与文档：https://translate.zvo.cn
   ---------------------------------------------------------
   本文件只做三件事，不自己翻译任何字：
     1. 从 CDN 加载 translate.js 插件（第一个地址失败会自动换备用地址）；
     2. 告诉插件：原文是简体中文，翻译通道用 client.edge（微软提供，免费、无每日字数上限）；
     3. 在页面角落放一个 中文 / English / 日本語 的切换按钮。

   页面里这样引入（路径按页面所在位置调整，一般放在 </body> 前面）：
     <script src="i18n.js" data-lang-pos="br"></script>

   可选属性：
     data-lang-pos="tl|tr|bl|br|bc"   按钮位置：左上/右上/左下/右下/底部居中，默认 br
     data-lang-z="900"                按钮层级，数字越大越靠上
     data-lang-listen="off"           关闭"文字变化就自动翻译"（打字机效果的页面用这个）

   注意：翻译是联网机翻，第一次切换会有 1~5 秒延迟，之后会走浏览器缓存，
         再切换同一批文字就很快。断网时页面保持中文，不影响其它功能。
   ========================================================= */
(function () {
  "use strict";

  if (window.i18n) { return; }

  /* ---------------- 1. 基本设置 ---------------- */

  var STORE_KEY = "yetu-lang";        // 记住访客选过的语言
  var LANGS = ["zh", "en", "ja"];

  var LABEL = { zh: "中文", en: "English", ja: "日本語" };
  // translate.js 的语种代码
  var CODE = { zh: "chinese_simplified", en: "english", ja: "japanese" };

  var SOURCES = [
    "https://res.zvo.cn/translate/translate.js",
    "https://cdn.staticfile.net/translate.js/3.2.1/translate.js"
  ];

  var scriptEl = document.currentScript;
  var POS = (scriptEl && scriptEl.getAttribute("data-lang-pos")) || "tl";
  var Z = (scriptEl && scriptEl.getAttribute("data-lang-z")) || "";
  var LISTEN = !(scriptEl && scriptEl.getAttribute("data-lang-listen") === "off");

  var listeners = [];

  /* ---------------- 2. 记住 / 读取语言 ---------------- */

  function readLang() {
    var fromQuery = null;
    try {
      var m = /[?&]lang=([A-Za-z_-]+)/.exec(location.search);
      if (m) { fromQuery = String(m[1]).toLowerCase(); }
    } catch (e) { fromQuery = null; }

    if (LANGS.indexOf(fromQuery) >= 0) { writeLang(fromQuery); return fromQuery; }

    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (LANGS.indexOf(saved) >= 0) { return saved; }
    } catch (e) {}
    return "zh";
  }

  function writeLang(code) {
    try { localStorage.setItem(STORE_KEY, code); } catch (e) {}
  }

  var lang = readLang();

  function warn(message) {
    if (window.console && console.warn) { console.warn("[i18n]", message); }
  }

  /* ---------------- 3. 切换到某个语言 ---------------- */

  function paint() {
    var bar = document.getElementById("yetu-lang");
    if (!bar) { return; }
    var btns = bar.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-lang") === lang;
      if (on) { btns[i].classList.add("on"); } else { btns[i].classList.remove("on"); }
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function fire() {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](lang); } catch (err) { warn(err); }
    }
  }

  function applyLang(code) {
    if (LANGS.indexOf(code) < 0) { return; }

    lang = code;
    writeLang(code);
    document.documentElement.setAttribute("data-lang", code);
    document.documentElement.lang = (code === "zh" ? "zh-CN" : code);
    paint();

    if (window.translate && window.translate.changeLanguage) {
      try { window.translate.changeLanguage(CODE[code]); } catch (e) { warn(e); }
    }

    fire();
  }

  /* 同一个网站里其它页面（iframe、父页面）切换时，本页跟着切换 */
  window.addEventListener("storage", function (e) {
    if (e.key !== STORE_KEY) { return; }
    if (LANGS.indexOf(e.newValue) < 0) { return; }
    if (e.newValue === lang) { return; }
    applyLang(e.newValue);
  });

  /* ---------------- 4. 切换按钮 ---------------- */

  var CSS = [
    "#yetu-lang{position:fixed;display:flex;gap:3px;padding:4px;margin:0;",
    "border:2px solid #f6d36b;background:rgba(22,17,9,.9);",
    "box-shadow:0 0 0 2px rgba(0,0,0,.45),0 0 14px rgba(246,211,107,.38),3px 3px 0 rgba(0,0,0,.5);",
    "font:700 15px/1.1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;",
    "transition:opacity .18s ease,transform .18s ease;user-select:none;z-index:900}",
    "#yetu-lang:hover{transform:translateY(-1px)}",
    "#yetu-lang button{all:unset;cursor:pointer;padding:7px 13px;color:#ffe9a6;",
    "letter-spacing:.5px;white-space:nowrap;text-align:center;border-radius:2px}",
    "#yetu-lang button:hover{background:rgba(255,215,94,.22);color:#fff8dd}",
    "#yetu-lang button.on{background:#ffd75e;color:#2b1d05;box-shadow:0 0 10px rgba(255,215,94,.6)}",
    "@media (max-width:480px){#yetu-lang{font-size:14px;padding:3px}#yetu-lang button{padding:6px 10px}}",
    "#yetu-lang.pos-tl{left:10px;top:10px}",
    "#yetu-lang.pos-tr{right:10px;top:10px}",
    "#yetu-lang.pos-bl{left:10px;bottom:10px}",
    "#yetu-lang.pos-br{right:10px;bottom:10px}",
    "#yetu-lang.pos-bc{left:50%;bottom:10px;transform:translateX(-50%)}"
  ].join("");

  function buildBar() {
    if (!document.body || document.getElementById("yetu-lang")) { return; }

    /* 页面被别的页面用 iframe 套着显示时（比如电脑桌里的「个人档案」「价格表」），
       不再重复放一个按钮条——外层页面已经有一个，点它两边会同步切换。 */
    if (window.self !== window.top) { return; }

    if (!document.getElementById("yetu-lang-style")) {
      var style = document.createElement("style");
      style.id = "yetu-lang-style";
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
    }

    var bar = document.createElement("div");
    bar.id = "yetu-lang";
    /* class="ignore" 是 translate.js 默认跳过的 class，避免按钮自己被翻译 */
    bar.className = "ignore pos-" + POS;
    bar.setAttribute("data-yetu-skip", "1");
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Language");
    if (Z) { bar.style.zIndex = Z; }

    for (var i = 0; i < LANGS.length; i++) {
      (function (code) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-lang", code);
        btn.textContent = LABEL[code];
        btn.addEventListener("click", function () { applyLang(code); });
        bar.appendChild(btn);
      })(LANGS[i]);
    }

    document.body.appendChild(bar);
    paint();
  }

  /* ---------------- 5. 加载插件并启动 ---------------- */

  function boot() {
    if (!window.translate) {
      warn("翻译插件没有加载成功，页面会保持中文。请检查网络或 CDN 是否可访问。");
      return;
    }

    var T = window.translate;

    try { T.language.setLocal("chinese_simplified"); } catch (e) { warn(e); }
    try { T.selectLanguageTag.show = false; } catch (e) {}
    try { T.service.use("client.edge"); } catch (e) { warn(e); }

    /* 访客之前选过英文/日文，进来就直接显示那个语言 */
    if (lang !== "zh") {
      try { T.language.setDefaultTo(CODE[lang]); } catch (e) {}
    }

    /* 页面里 JS 动态生成的文字也一起翻译（打字机页面自己控制时机） */
    if (LISTEN) {
      try { T.listener.start(); } catch (e) { warn(e); }
    }

    try { T.execute(); } catch (e) { warn(e); }

    /* 兜底：刚进页面时插件偶尔会先按「原文语言」渲染一遍，
       这里再明确切到访客选过的语言，保证换页后语言不退回中文。 */
    if (lang !== "zh") {
      try { T.changeLanguage(CODE[lang]); } catch (e) { warn(e); }
    }
  }

  function loadPlugin(index) {
    index = index || 0;

    if (index >= SOURCES.length) {
      warn("所有翻译插件地址都加载失败，页面会保持中文。");
      return;
    }

    var s = document.createElement("script");
    s.src = SOURCES[index];
    s.onload = function () { boot(); };
    s.onerror = function () { loadPlugin(index + 1); };
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------------- 6. 对外接口 ---------------- */

  window.i18n = {
    lang: function () { return lang; },
    set: applyLang,
    /* 手动让插件重新翻译一次（打字机页面在文字全部出现后调用） */
    refresh: function () {
      if (window.translate && window.translate.execute) {
        try { window.translate.execute(); } catch (e) { warn(e); }
      }

      /* 页面里后来才生成的文字（首页的交互点名字之类），插件有时赶不上，
         过一会儿再明确切一次语言，保证换页后依然是访客选的语言 */
      setTimeout(function () {
        var want = (window.i18n && typeof window.i18n.lang === "function") ? window.i18n.lang() : lang;
        if (!want || want === "zh") { return; }
        if (window.translate && window.translate.changeLanguage) {
          try { window.translate.changeLanguage(CODE[want]); } catch (e) { warn(e); }
        }
      }, 700);
    },
    onChange: function (fn) {
      if (typeof fn === "function") { listeners.push(fn); }
    }
  };

  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.lang = (lang === "zh" ? "zh-CN" : lang);

  function init() {
    buildBar();
    loadPlugin(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
