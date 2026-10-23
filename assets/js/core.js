/* RailMate core: icons, helpers, storage, access control, router, shell */
(function () {
  var RM = window.RM, D = RM.data;

  /* ---------- Icons (inline SVG, stroke) ---------- */
  var P = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    train: '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14"/><circle cx="9" cy="13" r=".5"/><circle cx="15" cy="13" r=".5"/><path d="M8 20l-2 2M16 20l2 2M8 16l-1 4h10l-1-4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
    playf: '<path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8z" transform="rotate(0)"/><path d="M14.5 6.5L17 4a5 5 0 0 1 3 3l-2.5 2.5"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    stetho: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a5 5 0 0 0 10 0v-2"/><circle cx="21" cy="12" r="2"/>',
    check: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 12l2.5 2.5L16 9"/>',
    tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/><path d="M22 9v6"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    stop: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/><path d="M9 9l6 6M15 9l-6 6"/>',
    hand: '<path d="M7 11V5a1.5 1.5 0 0 1 3 0v5M10 10V3.5a1.5 1.5 0 0 1 3 0V10M13 10V4.5a1.5 1.5 0 0 1 3 0V11M16 11V7.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3 14.5a1.5 1.5 0 0 1 2.4-1.8L7 14"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    chev: '<path d="M9 5l7 7-7 7"/>', back: '<path d="M15 5l-7 7 7 7"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/><path d="M11.5 13.5L20 4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>', ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>', trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 8v4l3 2"/>', flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', tamp: '<path d="M7 3v8M17 3v8M5 11h14M8 11l-2 8M16 11l2 8M10 11l-1 8M14 11l1 8"/><path d="M3 21h18"/>',
    clamp: '<path d="M6 4h12M6 4v6a6 6 0 0 0 12 0V4"/><circle cx="12" cy="16" r="3"/><path d="M3 21h18"/>', ruler: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    cab: '<rect x="4" y="5" width="16" height="12" rx="2"/><path d="M4 11h16M9 5v6"/><circle cx="8" cy="19" r="2"/><circle cx="16" cy="19" r="2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    hat: '<path d="M4 16a8 8 0 0 1 16 0"/><path d="M2 16h20v2H2zM10 8V5h4v3"/>', glasses: '<circle cx="7" cy="14" r="3.5"/><circle cx="17" cy="14" r="3.5"/><path d="M10.5 14h3M3.5 14L5 8M20.5 14L19 8"/>',
    vest: '<path d="M8 3l-4 3v15h6V9M16 3l4 3v15h-6V9M8 3l4 6 4-6"/><path d="M4 15h6M14 15h6"/>', boots: '<path d="M6 3h5v10l8 3v5H6z"/><path d="M6 17h13"/>',
    ears: '<path d="M6 14V9a6 6 0 0 1 12 0v5"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/>', gloves: '<path d="M7 21v-6L4 11V6a1.5 1.5 0 0 1 3 0v3V4a1.5 1.5 0 0 1 3 0v5V3a1.5 1.5 0 0 1 3 0v6V5a1.5 1.5 0 0 1 3 0v10l-2 6z"/>',
    pinch: '<path d="M4 8h7l2 4-2 4H4M20 8h-4M20 16h-4"/><path d="M14 12h6"/>', moving: '<rect x="3" y="7" width="13" height="9" rx="2"/><path d="M16 10h3l2 3v3h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    hot: '<path d="M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>', hyd: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    energy: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', adjacent: '<path d="M6 2v20M18 2v20M6 6h12M6 11h12M6 16h12"/>', fall: '<circle cx="13" cy="4" r="2"/><path d="M4 21l5-6 3 2 3-5-4-3-3 3"/>',
    noise: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>', elec: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    redzone: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>', loto: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>',
    cfr: '<path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0zM8 21h8"/>', tip: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    spacing: '<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>', power: '<path d="M12 3v9"/><path d="M6.3 7a8 8 0 1 0 11.4 0"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    radio: '<rect x="6" y="7" width="12" height="15" rx="2"/><path d="M9 7L16 2M9 12h6M9 16h6"/>', map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    regulator: '<path d="M2 17h20"/><rect x="5" y="9" width="12" height="6" rx="1"/><path d="M17 11h3l1 4M8 9V6h4v3M3 15l3-4"/><circle cx="8" cy="17" r="1.6"/><circle cx="15" cy="17" r="1.6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  RM.ico = function (n, cls) { return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || P.info) + '</svg>'; };
  RM.logo = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L5 28M23 4l4 24"/><path d="M7.8 10h16.4M6.9 16h18.2M6 22h20"/></svg>';

  /* ---------- Helpers ---------- */
  RM.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  RM.$ = function (s, r) { return (r || document).querySelector(s); };
  RM.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  RM.SAMPLE = '<span class="tag tag-sample" title="Realistic demo data, not real">Sample data</span>';
  RM.REAL = function (t) { return '<span class="tag tag-real">' + (t || 'Verified source') + '</span>'; };
  RM.SIM = '<span class="tag tag-sim">Simulated</span>';
  RM.img = function (n, sm) { return 'assets/img/' + n + (sm ? '-sm' : '') + '.jpg'; };
  RM.fmtDate = function (iso, opts) { var d = new Date(iso.length <= 10 ? iso + 'T12:00:00' : iso); return d.toLocaleDateString('en-US', opts || { month: 'short', day: 'numeric', year: 'numeric' }); };
  RM.fmtTime = function (iso) { return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); };
  RM.today = function () { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  /* Very small markdown: **bold**, *em*, lists, paragraphs */
  RM.md = function (s) {
    var out = [], lines = String(s).split('\n'), list = null;
    function inline(t) { return RM.esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'); }
    function close() { if (list) { out.push('</' + list + '>'); list = null; } }
    lines.forEach(function (l) {
      var m;
      if ((m = l.match(/^\s*\d+\.\s+(.*)/))) { if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; } out.push('<li>' + inline(m[1]) + '</li>'); }
      else if ((m = l.match(/^\s*-\s+(.*)/))) { if (list !== 'ul') { close(); out.push('<ul>'); list = 'ul'; } out.push('<li>' + inline(m[1]) + '</li>'); }
      else if (!l.trim()) { close(); }
      else { close(); out.push('<p>' + inline(l) + '</p>'); }
    });
    close(); return out.join('');
  };

  /* ---------- Storage ---------- */
  var KEY = 'railmate.v1.';
  RM.store = {
    get: function (k, d) { try { var v = localStorage.getItem(KEY + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { RM.toast('Storage is full or blocked on this device', 'alert'); } },
    del: function (k) { try { localStorage.removeItem(KEY + k); } catch (e) {} }
  };

  /* ---------- Access control: sections declare required certs ---------- */
  RM.certStatus = function (c) {
    var sim = RM.store.get('simExpired', null);
    var exp = sim === c.id ? '2026-09-30' : c.expires;
    var days = Math.round((new Date(exp + 'T23:59:59') - new Date()) / 864e5);
    return { expires: exp, days: days, valid: days >= 0, soon: days >= 0 && days <= 60 };
  };
  RM.userHas = function (certId) { var c = D.user.certs.filter(function (x) { return x.id === certId; })[0]; return !!c && RM.certStatus(c).valid; };
  RM.access = function (requires) {
    var missing = (requires || []).filter(function (r) { return !RM.userHas(r); });
    return { ok: missing.length === 0, missing: missing };
  };
  RM.section = function (id) { return D.sections.filter(function (s) { return s.id === id; })[0]; };
  RM.certName = function (id) { var c = D.user.certs.filter(function (x) { return x.id === id; })[0]; return c ? c.name : id; };
  RM.lockView = function (title, missing) {
    return '<div class="lockview"><div class="ic">' + RM.ico('lock', 'xl') + '</div><h2>' + RM.esc(title) + ' is locked</h2>' +
      '<p class="muted" style="margin-top:10px">Your profile is missing a required, current certification:</p><div class="list" style="margin:16px 0 22px;text-align:left">' +
      missing.map(function (m) { return '<div class="list-row"><div class="ic">' + RM.ico('alert') + '</div><div class="tx"><b>' + RM.esc(RM.certName(m)) + '</b><small>Expired or not on file</small></div></div>'; }).join('') +
      '</div><p class="muted" style="font-size:14px">Contact your supervisor or KCR Safety Training to renew. Until then, RailMate keeps this section closed.</p>' +
      '<a class="btn" href="#/profile">' + RM.ico('user') + 'View my certifications</a></div>';
  };

  /* ---------- Briefing state ---------- */
  RM.briefing = function () { var b = RM.store.get('briefing', null); return b && b.date === RM.today() ? b : null; };

  /* ---------- Toast & modal ---------- */
  RM.toast = function (msg, icon) {
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = RM.ico(icon || 'tick') + RM.esc(msg);
    document.body.appendChild(t); setTimeout(function () { t.style.transition = 'opacity .3s'; t.style.opacity = 0; setTimeout(function () { t.remove(); }, 300); }, 2600);
  };
  RM.modal = function (html, cls) {
    RM.closeModal();
    var s = document.createElement('div'); s.className = 'scrim'; s.id = 'scrim';
    s.innerHTML = '<div class="modal ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    s.addEventListener('click', function (e) { if (e.target === s || e.target.closest('[data-close]')) RM.closeModal(); });
    document.body.appendChild(s); return s.firstChild;
  };
  RM.closeModal = function () { var s = document.getElementById('scrim'); if (s) s.remove(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { RM.closeModal(); var l = RM.$('.lightbox'); if (l) l.remove(); } });

  RM.stopWork = function () {
    var log = RM.store.get('stopwork', []);
    var m = RM.modal(
      '<div class="big"><div class="sq">' + RM.ico('hand', 'xl') + '</div><div><div class="tag tag-red" style="background:rgba(255,255,255,.1);color:#fff">Stop-work authority</div><h1 style="color:#fff;margin-top:8px">STOP WORK</h1><p style="color:#ffc9c3;margin:4px 0 0">Every employee has the authority and the duty to stop unsafe work.</p></div></div>' +
      '<ol><li>Bring the machine to a stop. <b>Emergency stop is on B52.</b></li><li>Warn everyone nearby: voice, radio, horn.</li><li>Get people out of the red zone and clear of the track.</li><li>Notify your RWIC / employee in charge.</li><li>Do not restart until the hazard is resolved and the crew is re-briefed.</li></ol>' +
      '<div class="grid g2" style="margin-bottom:16px">' + D.contacts.slice(0, 2).map(contactRow).join('') + '</div>' +
      '<div class="row wrap"><button class="btn danger" id="sw-log">' + RM.ico('flag') + 'Log stop-work event</button><a class="btn ghost" href="#/safety" data-close style="color:#fff;border-color:rgba(255,255,255,.25)">Emergency contacts</a><button class="btn ghost" data-close style="color:#fff;border-color:rgba(255,255,255,.25)">Close</button></div>' +
      '<p style="color:#ff9e94;font-size:13px;margin:14px 0 0">' + (log.length ? log.length + ' stop-work event(s) logged on this device. ' : '') + 'Simulated: in production this notifies the RWIC, dispatcher and safety desk.</p>', 'stopwork');
    RM.$('#sw-log', m).onclick = function () { log.unshift({ at: new Date().toISOString(), by: D.user.name, machine: 'GRM3000T · KCR 3412' }); RM.store.set('stopwork', log); RM.closeModal(); RM.toast('Stop-work logged · RWIC & dispatcher notified (simulated)', 'flag'); };
  };
  function contactRow(c) {
    return '<a class="contact ' + (c.tone === 'red' ? 'red' : '') + '" href="tel:' + c.n.replace(/[^\d]/g, '') + '"><div class="ic">' + RM.ico('phone') + '</div><div class="tx"><b>' + RM.esc(c.t) + '</b><span>' + RM.esc(c.n) + '</span></div>' + (c.real ? '' : '<span class="tag tag-sample">Sample</span>') + '</a>';
  }
  RM.contactRow = contactRow;

  /* ---------- Router ---------- */
  RM.routes = [];
  RM.route = function (pattern, fn, meta) { RM.routes.push({ re: new RegExp('^' + pattern.replace(/:(\w+)/g, '([^/]+)') + '$'), fn: fn, meta: meta || {} }); };
  RM.go = function (h) { location.hash = h; };
  RM.cleanup = [];

  function render() {
    RM.cleanup.forEach(function (f) { try { f(); } catch (e) {} }); RM.cleanup = [];
    RM.closeModal();
    var hash = location.hash.replace(/^#/, '') || '/';
    var authed = RM.store.get('session', null);
    if (!authed && hash !== '/login') { location.replace('#/login'); return; }
    if (authed && (hash === '/' || hash === '/login')) { location.replace('#/home'); return; }
    if (hash === '/login') { RM.views.login(); return; }
    var match = null, params = [];
    for (var i = 0; i < RM.routes.length; i++) { var m = hash.match(RM.routes[i].re); if (m) { match = RM.routes[i]; params = m.slice(1).map(decodeURIComponent); break; } }
    if (!match) { location.replace('#/home'); return; }
    shell(match.meta);
    var main = RM.$('#view');
    var meta = match.meta;
    if (meta.section) {
      var sec = RM.section(meta.section), acc = RM.access(sec.requires);
      if (!acc.ok) { main.innerHTML = RM.lockView(sec.label, acc.missing); setCrumbs(meta, [sec.label]); return; }
    }
    var res = match.fn.apply(null, [main].concat(params)) || {};
    setCrumbs(meta, res.crumbs || []);
    RM.$('.main').scrollTop = 0;
  }
  RM.render = render;
  window.addEventListener('hashchange', render);

  /* ---------- Shell ---------- */
  var shellBuilt = false;
  function navLink(href, icon, label, key, locked) {
    return '<a href="' + href + '" data-k="' + key + '" data-t="' + RM.esc(label) + '">' + RM.ico(icon) + '<span>' + RM.esc(label) + '</span>' + (locked ? '<span class="lock">' + RM.ico('lock', 'sm') + '</span>' : '') + '</a>';
  }
  function shell(meta) {
    if (!shellBuilt || !RM.$('.shell')) {
      var secs = D.sections.map(function (s) { return navLink('#/m/grm3000t/' + s.id, s.icon, s.label, s.id, !RM.access(s.requires).ok); }).join('');
      RM.$('#app').innerHTML =
        '<div class="shell"><aside class="side" id="side"><div class="brand"><div class="logo">' + RM.logo + '</div><div><b>Rail<span>Mate</span></b><small>' + D.railroad.name + '</small></div></div>' +
        '<nav class="nav">' + navLink('#/home', 'home', 'Dashboard', 'home') + navLink('#/equipment', 'train', 'Equipment', 'equipment') + navLink('#/safety', 'shield', 'Safety Center', 'safety') +
        '<div class="lbl">Current machine</div><a class="mch" href="#/m/grm3000t" data-k="machine" data-t="GRM3000T"><img src="' + RM.img('dsc00735', true) + '" alt=""><div class="t"><b>GRM3000T</b><small>Unit KCR 3412</small></div></a>' + secs +
        '<div class="lbl">Account</div>' + navLink('#/profile', 'user', 'Profile & Certs', 'profile') + '</nav>' +
        '<div class="side-foot">Demo application. Not affiliated with or endorsed by Plasser American or Plasser &amp; Theurer. Keystone Central Railroad is fictional. For demonstration only.</div></aside>' +
        '<header class="top"><button class="iconbtn menu-btn" id="menuBtn" aria-label="Menu">' + RM.ico('menu') + '</button><div class="crumbs" id="crumbs"></div><div class="sp"></div>' +
        '<a class="chip-brief" id="briefChip" href="#/briefing"></a>' +
        '<button class="iconbtn" id="dayBtn" aria-label="Toggle daylight mode" title="Daylight mode">' + RM.ico('sun') + '</button>' +
        '<button class="btn-stop" id="stopBtn">' + RM.ico('hand') + '<span class="t">STOP WORK</span></button>' +
        '<a class="avatar" href="#/profile" title="' + D.user.name + '">' + D.user.initials + '<i></i></a></header>' +
        '<main class="main"><div id="view"></div><footer class="foot">RailMate demo · ' + D.railroad.name + ' (fictional) · Not affiliated with Plasser American. Machine facts are drawn from public Plasser American material and official operator tutorials; items tagged <span class="tag tag-sample">Sample data</span> are illustrative only. Not for operational use.</footer></main>' +
        '<nav class="tabbar">' + tab('#/home', 'home', 'Home', 'home') + tab('#/m/grm3000t', 'train', 'Machine', 'machine') + tab('#/m/grm3000t/ask', 'spark', 'Ask', 'ask') + tab('#/m/grm3000t/checklists', 'check', 'Checklists', 'checklists') + tab('#/safety', 'shield', 'Safety', 'safety') + '</nav></div>';
      shellBuilt = true;
      RM.$('#stopBtn').onclick = RM.stopWork;
      RM.$('#dayBtn').onclick = function () { var on = !document.documentElement.classList.contains('day'); document.documentElement.classList.toggle('day', on); RM.store.set('day', on); this.innerHTML = RM.ico(on ? 'moon' : 'sun'); };
      RM.$('#dayBtn').innerHTML = RM.ico(document.documentElement.classList.contains('day') ? 'moon' : 'sun');
      RM.$('#menuBtn').onclick = function () { var s = RM.$('#side'); s.classList.add('open'); var sc = document.createElement('div'); sc.className = 'scrim-side'; sc.onclick = closeSide; document.body.appendChild(sc); };
      RM.$('#side').addEventListener('click', function (e) { if (e.target.closest('a')) closeSide(); });
    }
    var k = meta.nav || '';
    RM.$$('.nav a, .tabbar a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-k') === k); });
    var b = RM.briefing(), chip = RM.$('#briefChip');
    chip.className = 'chip-brief ' + (b ? 'ok' : 'need');
    chip.innerHTML = RM.ico(b ? 'shield' : 'alert', 'sm') + '<span class="t">' + (b ? 'Briefed ' + RM.fmtTime(b.at) : 'Job briefing due') + '</span>';
  }
  RM.rebuildShell = function () { shellBuilt = false; };
  function closeSide() { RM.$('#side') && RM.$('#side').classList.remove('open'); var s = RM.$('.scrim-side'); if (s) s.remove(); }
  function tab(h, i, l, k) { return '<a href="' + h + '" data-k="' + k + '">' + RM.ico(i) + l + '</a>'; }
  function setCrumbs(meta, extra) {
    var c = RM.$('#crumbs'); if (!c) return;
    var parts = [];
    if (meta.machine) parts.push('<a class="c-hide" href="#/equipment">Equipment</a>', '<span class="sep c-hide">/</span>', extra.length ? '<a href="#/m/grm3000t">GRM3000T</a>' : '<b>GRM3000T</b>');
    extra.forEach(function (e, i) {
      if (parts.length) parts.push('<span class="sep">/</span>');
      var last = i === extra.length - 1;
      if (Array.isArray(e)) parts.push(last ? '<b>' + RM.esc(e[0]) + '</b>' : '<a class="' + (i < extra.length - 2 ? 'c-hide' : '') + '" href="' + e[1] + '">' + RM.esc(e[0]) + '</a>');
      else parts.push(last ? '<b>' + RM.esc(e) + '</b>' : '<span>' + RM.esc(e) + '</span>');
    });
    c.innerHTML = parts.join('');
  }

  RM.boot = function () {
    if (RM.store.get('day', false)) document.documentElement.classList.add('day');
    render();
  };
})();
