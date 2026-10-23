(function () {
  var RM = window.RM, D = RM.data, I = RM.ico, E = RM.esc;
  RM.views = RM.views || {};

  /* ---------- Login ---------- */
  RM.views.login = function () {
    RM.rebuildShell();
    RM.$('#app').innerHTML =
      '<div class="login"><div class="art"><img src="' + RM.img('dsc00725') + '" alt="GRM3000T tamper with trailer on track"><div class="cap"><span class="tag tag-y">Equipment intelligence for the field</span><h2>The machine builder, right beside you.</h2><p>Operate, service, troubleshoot and stay qualified on every machine in the fleet, from one tablet.</p></div></div>' +
      '<div class="form"><div class="brand"><div class="logo">' + RM.logo + '</div><div><b>Rail<span style="color:var(--y)">Mate</span></b><small>' + D.railroad.name + '</small></div></div>' +
      '<h1>Sign in</h1><p class="muted" style="margin-bottom:24px">Use your KCR employee ID and PIN.</p>' +
      '<form id="lf"><label class="field"><span>Employee ID</span><input id="lid" value="' + D.user.empId + '" autocomplete="username"></label>' +
      '<label class="field"><span>PIN</span><input id="lpin" type="password" value="482917" autocomplete="current-password"></label>' +
      '<button class="btn pri block" id="lbtn" type="submit">' + I('unlock') + 'Sign in</button></form>' +
      '<div class="hint">' + I('info', 'sm') + 'Demo: fields are prefilled and any credentials work.</div>' +
      '<div class="verify" id="verify"></div>' +
      '<p class="disc">Demonstration only. Keystone Central Railroad is fictional. Not affiliated with or endorsed by Plasser American Corp. or Plasser &amp; Theurer.</p></div></div>';
    RM.$('#lf').onsubmit = function (e) {
      e.preventDefault();
      var btn = RM.$('#lbtn'); btn.disabled = true; btn.innerHTML = 'Verifying…';
      var v = RM.$('#verify'); v.classList.add('on');
      var steps = ['Identity confirmed: ' + D.user.name, 'Roadway Worker Protection: current', 'GRM3000T machine qualification: current', D.user.certs.length + ' of ' + D.user.certs.length + ' certifications valid', 'Loading unit KCR 3412 · GRM3000T'];
      v.innerHTML = steps.map(function (s) { return '<div><span class="dot">' + I('tick') + '</span>' + E(s) + '</div>'; }).join('');
      var rows = RM.$$('div', v);
      rows.forEach(function (r, i) { setTimeout(function () { r.classList.add('show'); }, 120 + i * 330); setTimeout(function () { r.classList.add('done'); }, 380 + i * 330); });
      setTimeout(function () { RM.store.set('session', { at: new Date().toISOString(), id: RM.$('#lid').value }); location.hash = '#/home'; }, 420 + steps.length * 330);
    };
  };

  /* ---------- Dashboard ---------- */
  function greet() { var h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
  RM.route('/home', function (el) {
    var b = RM.briefing(), hist = RM.store.get('clHistory', []), tr = RM.store.get('training', {});
    var todayCl = hist.filter(function (h) { return h.at.slice(0, 10) === new Date().toISOString().slice(0, 10) || RM.fmtDate(h.at) === RM.fmtDate(new Date().toISOString()); });
    var valid = D.user.certs.filter(function (c) { return RM.certStatus(c).valid; }).length;
    var nextSoon = D.user.certs.map(function (c) { return [c, RM.certStatus(c)]; }).filter(function (x) { return x[1].valid; }).sort(function (a, b) { return a[1].days - b[1].days; })[0];
    var trDone = Object.keys(tr).filter(function (k) { return tr[k]; }).length;
    var mi = RM.store.get('momentIdx', new Date().getDate() % D.safetyMoments.length);
    var mch = D.machines[0];
    el.innerHTML = '<div class="view">' +
      '<div class="hello"><div><h1>' + greet() + ', ' + D.user.first + '</h1><p>' + RM.fmtDate(new Date().toISOString(), { weekday: 'long', month: 'long', day: 'numeric' }) + ' · ' + D.railroad.gang + ' · ' + D.railroad.division + '</p></div>' +
      (b ? '<a class="btn" href="#/briefing">' + I('shield') + 'Briefing complete · ' + RM.fmtTime(b.at) + '</a>' : '<a class="btn pri" href="#/briefing">' + I('shield') + 'Start job briefing</a>') + '</div>' +
      '<div class="split">' +
        '<a class="hero" href="#/m/grm3000t"><img src="' + RM.img('dsc00735') + '" alt="GRM3000T work units"><div class="in"><div class="kick">Assigned machine · Unit ' + mch.unit + '</div><h2>Plasser American GRM3000T</h2><p>Production &amp; switch tamping machine</p>' +
        '<div class="stats">' + D.heroStats.map(function (s) { return '<div><b data-count="' + s[0] + '">0</b><span>' + s[1] + ' · ' + s[2] + '</span></div>'; }).join('') + '</div>' +
        '<div class="acts"><span class="btn pri sm">' + I('chev') + 'Open machine</span></div></div></a>' +
        '<div class="stack">' +
          '<div class="moment" id="moment"></div>' +
          (b ? '<div class="card"><div class="row between"><h3 style="margin:0">Today\'s job briefing</h3><span class="tag tag-real">Acknowledged</span></div><div class="kv" style="margin-top:14px"><div>Protection</div><div>' + E(b.protection) + '</div><div>Limits</div><div>' + E(b.limits) + '</div><div>Red zone</div><div>' + E(b.redzone) + ' ft</div><div>Radio</div><div>' + E(b.radio) + '</div></div></div>'
             : '<a class="gate" href="#/briefing" style="display:block"><div class="row" style="gap:16px"><div class="icbox">' + I('shield') + '</div><div><h3>Pre-task job briefing</h3><p class="muted" style="margin:4px 0 0">Required before any on-track work today. Takes about 3 minutes.</p></div></div><span class="btn pri block" style="margin-top:16px">Start briefing</span></a>') +
        '</div>' +
      '</div>' +
      '<div class="grid g4" style="margin-top:18px">' +
        '<a class="metric ringm2" href="#/profile"><span>Certifications</span><div class="rrow"><div class="ring" style="--p:' + Math.round(valid / D.user.certs.length * 100) + '"><div>' + valid + '/' + D.user.certs.length + '</div></div><b>All current</b></div><small>Next renewal: ' + (nextSoon ? RM.fmtDate(nextSoon[1].expires, { month: 'short', year: 'numeric' }) : '—') + '</small></a>' +
        '<a class="metric" href="#/m/grm3000t/service"><span>Next service ' + RM.SAMPLE + '</span><b>5,000 h</b><small>188 h to go · 1,000-hour service</small><div class="bar"><i style="width:81%"></i></div></a>' +
        '<a class="metric" href="#/m/grm3000t/checklists"><span>Checklists today</span><b>' + todayCl.length + '</b><small>' + (hist.length ? 'Last: ' + E(hist[0].title) + ' · ' + RM.fmtTime(hist[0].at) : 'None signed yet') + '</small></a>' +
        '<a class="metric" href="#/m/grm3000t/training"><span>Training</span><b>' + trDone + ' / ' + D.training.length + '</b><small>Operator tutorial lessons</small><div class="bar"><i style="width:' + (trDone / D.training.length * 100) + '%"></i></div></a>' +
      '</div>' +
      '<div class="h-sub">Quick actions</div>' +
      '<div class="grid g4 keep2">' +
        qa('#/m/grm3000t/checklists/startup', 'play', 'Start-up checklist', 'Tap off and sign') +
        qa('#/m/grm3000t/troubleshoot', 'stetho', 'Troubleshoot', 'Guided diagnosis') +
        qa('#/m/grm3000t/ask', 'spark', 'Ask RailMate', 'AI assistant') +
        qa('#/m/grm3000t/parts', 'cog', 'Identify a part', 'Search or tap the photo') +
      '</div>' +
      '<div class="h-sub">Field notices</div>' +
      '<div class="grid g3">' +
        notice('alert', 'tag-o', 'Slow order', 'Middlesex Sub MP 239.1–239.6: 10 mph, soft subgrade after rain.', true) +
        notice('wrench', 'tag-y', 'Service bulletin', 'Check tamping-tool clamp bolts after the first 8 hours on new tines.', true) +
        notice('bulb', 'tag-real', 'Lesson learned', 'FRA Safety Advisory 2024-01: discuss red zones in every job briefing.', false, '#/m/grm3000t/lessons') +
      '</div></div>';
    renderMoment(mi);
    RM.$$('[data-count]', el).forEach(function (n) { countUp(n, +n.getAttribute('data-count')); });
    var timer = setInterval(function () { mi = (mi + 1) % D.safetyMoments.length; renderMoment(mi); }, 9000);
    RM.cleanup.push(function () { clearInterval(timer); });
    function renderMoment(i) {
      var m = D.safetyMoments[i], box = RM.$('#moment'); if (!box) return;
      box.innerHTML = '<div class="kick">' + I('shield', 'sm') + 'Safety moment</div><h3>' + E(m.t) + '</h3><p>' + E(m.b) + '</p><div class="row between"><div class="src">' + I('cfr') + E(m.src) + '</div><div class="nav-dots">' + D.safetyMoments.map(function (_, j) { return '<button data-i="' + j + '" class="' + (j === i ? 'on' : '') + '" aria-label="Safety moment ' + (j + 1) + '"><i></i></button>'; }).join('') + '</div></div>';
      RM.$$('.nav-dots button', box).forEach(function (bt) { bt.onclick = function () { mi = +bt.getAttribute('data-i'); RM.store.set('momentIdx', mi); renderMoment(mi); }; });
    }
    return { crumbs: ['Dashboard'] };
  }, { nav: 'home' });
  function qa(h, i, t, s) { return '<a class="tile" href="' + h + '"><div class="ic">' + I(i) + '</div><div><b>' + t + '</b><br><small>' + s + '</small></div></a>'; }
  function notice(i, tc, t, s, sample, href) { return '<' + (href ? 'a href="' + href + '"' : 'div') + ' class="card"><div class="row between"><span class="tag ' + tc + '">' + t + '</span>' + (sample ? RM.SAMPLE : '') + '</div><p style="margin:12px 0 0">' + E(s) + '</p></' + (href ? 'a' : 'div') + '>'; }
  function countUp(n, to) {
    var t0 = performance.now(), dur = 1100;
    function f(t) { var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); n.textContent = Math.round(to * e).toLocaleString('en-US'); if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  RM.countUp = countUp;

  /* ---------- Equipment picker ---------- */
  var glyphs = {
    reg: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><rect x="22" y="20" width="62" height="22" rx="3"/><path d="M84 28h16l8 14H84M36 20V10h20v10M8 44l14-10"/><circle cx="36" cy="48" r="5"/><circle cx="72" cy="48" r="5"/></svg>',
    dts: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><rect x="14" y="18" width="92" height="22" rx="3"/><path d="M24 18V10h18v8M48 40v6M72 40v6"/><circle cx="26" cy="48" r="5"/><circle cx="94" cy="48" r="5"/><path d="M52 28h16"/></svg>',
    tie: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><rect x="40" y="22" width="44" height="18" rx="3"/><path d="M40 30L18 18l-6 22M84 26h14v14"/><circle cx="50" cy="48" r="5"/><circle cx="76" cy="48" r="5"/></svg>',
    spike: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><rect x="26" y="24" width="60" height="16" rx="3"/><path d="M44 24V12M56 24V12M40 12h20M86 30h12"/><circle cx="36" cy="48" r="5"/><circle cx="76" cy="48" r="5"/></svg>',
    hirail: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><path d="M14 40V26h22l8-10h16v24zM60 30h44v10H60"/><path d="M70 30L96 8l8 4"/><circle cx="26" cy="46" r="6"/><circle cx="88" cy="46" r="6"/></svg>',
    grind: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 50h108"/><rect x="8" y="16" width="104" height="24" rx="4"/><path d="M20 16V8h24v8M40 40v4M60 40v4M80 40v4"/><circle cx="22" cy="48" r="4"/><circle cx="98" cy="48" r="4"/></svg>'
  };
  RM.route('/equipment', function (el) {
    var m = D.machines[0];
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Fleet</div><h1>Select equipment</h1><p>Every machine gets the same toolkit: procedures, service, parts, troubleshooting, checklists, documents, training and an AI assistant.</p></div><div class="search" style="width:min(360px,100%)">' + I('search') + '<input id="eqs" placeholder="Search machines"></div></div>' +
      '<a class="mcard feature-m" href="#/m/grm3000t" data-name="grm3000t plasser tamper kcr 3412"><span class="live tag tag-real" style="background:rgba(10,14,17,.8)">● Live</span><div class="ph"><img src="' + RM.img('dsc00714') + '" alt="GRM3000T"></div><div class="bd"><div class="kicker" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--y);font-weight:750">Plasser American</div><b>GRM3000T</b><span class="muted">Production &amp; switch tamping machine</span>' +
      '<div class="kv" style="margin:10px 0"><div>Assigned unit</div><div>KCR 3412</div><div>Hour meter ' + RM.SAMPLE + '</div><div>4,812 h</div><div>Status</div><div style="color:var(--green)">In service</div></div><span class="btn pri">' + I('chev') + 'Open GRM3000T</span></div></a>' +
      '<div class="h-sub">Coming soon</div><div class="grid g3" id="soon">' +
      D.machines.slice(1).map(function (x) { return '<div class="mcard soon" data-name="' + (x.name + ' ' + x.type).toLowerCase() + '"><div class="ph">' + (glyphs[x.id] || glyphs.reg) + '</div><div class="bd"><div class="row between"><b>' + E(x.name) + '</b><span class="tag tag-mute">Coming soon</span></div><small>' + E(x.type) + '</small></div></div>'; }).join('') +
      '</div><div class="empty" id="eqnone" style="display:none">' + I('search', 'lg') + '<p>No machines match that search. Try "tamper", "regulator" or "GRM3000T".</p></div></div>';
    RM.$('#eqs').oninput = function () { var q = this.value.toLowerCase(); RM.$$('[data-name]', el).forEach(function (c) { c.style.display = !q || c.getAttribute('data-name').indexOf(q) >= 0 ? '' : 'none'; }); var any = RM.$$('[data-name]', el).some(function (c) { return c.style.display !== 'none'; }); RM.$('#eqnone').style.display = any ? 'none' : ''; RM.$$('.h-sub', el).forEach(function (h) { h.style.display = RM.$$('#soon [data-name]', el).some(function (c) { return c.style.display !== 'none'; }) ? '' : 'none'; }); };
    return { crumbs: ['Equipment'] };
  }, { nav: 'equipment' });

  /* ---------- Machine home ---------- */
  RM.route('/m/grm3000t', function (el) {
    var hist = RM.store.get('clHistory', []), lastDaily = hist.filter(function (h) { return h.id === 'daily'; })[0];
    el.innerHTML = '<div class="view"><div class="mhero"><img src="' + RM.img('dsc00714') + '" alt=""><div class="in"><span class="tag tag-y">Production &amp; switch tamper</span><h1 style="margin-top:12px">GRM3000T</h1><p>Plasser American heavy-duty production and switch tamping machine with automatic lifting, lining and cross-leveling, AGGS and ATLAS.</p>' +
      '<div class="unit"><span>Unit <b>KCR 3412</b></span><span>Hours <b>4,812</b> ' + RM.SAMPLE + '</span><span>Daily inspection <b>' + (lastDaily ? RM.fmtTime(lastDaily.at) + ' ' + RM.fmtDate(lastDaily.at, { month: 'short', day: 'numeric' }) : 'Not done today') + '</b></span></div></div></div>' +
      '<div class="grid g-auto">' + D.sections.map(function (s) {
        var a = RM.access(s.requires);
        return '<a class="tile ' + (a.ok ? '' : 'locked') + '" href="#/m/grm3000t/' + s.id + '">' + (a.ok ? '' : '<span class="lockbadge">' + I('lock') + '</span>') + '<div class="ic">' + I(s.icon) + '</div><div><b>' + E(s.label) + '</b><br><small>' + E(s.desc) + '</small></div>' +
          (s.requires.length ? '<small class="dim" style="margin-top:auto;display:flex;gap:6px;align-items:center">' + I(a.ok ? 'shield' : 'lock', 'sm') + s.requires.length + ' cert' + (s.requires.length > 1 ? 's' : '') + ' required · ' + (a.ok ? '<span style="color:var(--green)">verified</span>' : '<span style="color:var(--o)">locked</span>') + '</small>' : '') + '</a>';
      }).join('') + '</div>' +
      '<div class="h-sub">Safety on this machine</div><div class="grid g3">' +
      '<a class="card" href="#/safety"><div class="row">' + I('redzone') + '<b>Red zone: 25 ft ' + RM.SAMPLE + '</b></div><p class="muted" style="margin:8px 0 0">Around work units and buggies. No entry without communication with the operator.</p></a>' +
      '<a class="card" href="#/safety/refuse"><div class="row">' + I('hand') + '<b>Right to refuse</b></div><p class="muted" style="margin:8px 0 0">49 CFR 214.503 good-faith challenge if you believe this machine is unsafe.</p></a>' +
      '<a class="card" href="#/m/grm3000t/checklists/daily"><div class="row">' + I('shield') + '<b>Daily operator inspection</b></div><p class="muted" style="margin:8px 0 0">49 CFR 214.527 requires it at the start of each shift.</p></a></div></div>';
    return { crumbs: [] };
  }, { nav: 'machine', machine: true });

  /* ---------- Overview & specs ---------- */
  RM.route('/m/grm3000t/overview', function (el) {
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Overview &amp; specs</div><h1>Plasser American GRM3000T</h1><p>A heavy-duty, high-performance production and switch tamping machine for high-density and high-tonnage railways, short lines and contractors. Cyclic action, one tie at a time, with a split-head design for switches.</p></div>' + RM.REAL('Official specs') + '</div>' +
      '<div class="grid g4 keep2" style="margin-bottom:18px">' + D.heroStats.map(function (s) { return '<div class="metric"><span>' + s[2] + '</span><b><em style="font-style:normal" data-count="' + s[0] + '">0</em> <small style="font-size:16px;color:var(--y);font-weight:750">' + s[1] + '</small></b></div>'; }).join('') + '</div>' +
      '<div class="split"><div class="card"><div class="row between"><h2 style="margin:0">Technical data</h2>' + RM.REAL() + '</div><div class="kv" style="margin-top:14px">' + D.specs.map(function (r) { return '<div>' + r[0] + '</div><div>' + r[1] + '</div>'; }).join('') + '</div><div class="src">' + I('file') + 'Source: Plasser American GRM3000T product page</div></div>' +
      '<div class="stack"><div class="card"><div class="row between"><h2 style="margin:0">Fluid capacities</h2>' + RM.SAMPLE + '</div><div class="kv" style="margin-top:14px">' + D.capacities.map(function (r) { return '<div>' + r[0] + '</div><div>' + r[1] + '</div>'; }).join('') + '</div><div class="src">' + I('info') + 'Not published by the manufacturer. Values are illustrative.</div></div>' +
      '<div class="card flat"><h3>At a glance</h3><div class="ppe"><span>' + I('tick') + 'AGGS geometry guidance</span><span>' + I('tick') + 'ATLAS tie locating</span><span>' + I('tick') + 'TampLink interface</span><span>' + I('tick') + 'PLC touch-screen diagnostics</span><span>' + I('tick') + 'Road-truck or flat-car transport</span></div></div></div></div>' +
      '<div class="h-sub">Major systems</div><div class="grid g3">' + D.systems.map(function (s) {
        return '<div class="lesson"><div class="ph"><img src="' + RM.img(s.img, true) + '" alt="" loading="lazy"></div><div class="bd"><div class="row">' + '<span class="tag tag-y">' + I(s.icon, 'sm') + '</span><h3 style="margin:0">' + s.t + '</h3></div><ul style="margin-top:10px">' + s.pts.map(function (p) { return '<li>' + I('chev') + '<span>' + E(p) + '</span></li>'; }).join('') + '</ul></div></div>';
      }).join('') + '</div>' +
      '<div class="h-sub">Cab control panels</div><div class="split r"><div class="hot" id="cabhot"><img src="' + RM.img('dsc00745') + '" alt="GRM3000T cab">' +
      '<button class="spot" style="left:73%;top:47%" data-p="B52">1<span class="lab">Touch-screen console</span></button><button class="spot" style="left:34%;top:51%" data-p="B9">2<span class="lab">Indicator display</span></button><button class="spot" style="left:45%;top:25%" data-p="view">3<span class="lab">View to work units</span></button></div>' +
      '<div class="grid g2">' + D.panels.map(function (p) { return '<div class="card flat" style="padding:16px"><div class="row between"><b class="y" style="font-size:20px">' + p.id + '</b><small class="muted">' + p.side + '</small></div><ul style="margin:8px 0 0;padding-left:18px;font-size:14.5px;color:var(--muted)">' + p.items.map(function (i) { return '<li>' + E(i) + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div></div>' +
      '<p class="dim" style="font-size:13px;margin-top:10px">Panel contents from the official Cabin Components and Controls tutorial. Photo callouts are approximate.</p>' +
      '<div class="h-sub">Photo gallery</div><div class="gallery">' + D.gallery.map(function (g) { return '<button data-g="' + g[0] + '" data-c="' + E(g[1]) + '"><img src="' + RM.img(g[0], true) + '" alt="' + E(g[1]) + '" loading="lazy"></button>'; }).join('') + '</div></div>';
    RM.$$('[data-count]', el).forEach(function (n) { countUp(n, +n.getAttribute('data-count')); });
    RM.$$('.gallery button', el).forEach(function (b) { b.onclick = function () { lightbox(b.getAttribute('data-g'), b.getAttribute('data-c')); }; });
    RM.$$('#cabhot .spot', el).forEach(function (b) { b.onclick = function () { RM.$$('#cabhot .spot').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    return { crumbs: ['Overview & Specs'] };
  }, { nav: 'overview', machine: true, section: 'overview' });
  function lightbox(n, c) {
    var l = document.createElement('div'); l.className = 'lightbox';
    l.innerHTML = '<button class="iconbtn x" style="color:#fff">' + I('x') + '</button><img src="' + RM.img(n) + '" alt="' + E(c) + '"><p>' + E(c) + '</p>';
    l.onclick = function () { l.remove(); }; document.body.appendChild(l);
  }
  RM.lightbox = lightbox;

  /* ---------- Profile & certs ---------- */
  RM.route('/profile', function (el) {
    var sim = RM.store.get('simExpired', null);
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Profile</div><h1>' + D.user.name + '</h1><p>' + D.user.title + ' · ' + D.user.empId + ' · ' + D.user.home + '</p></div><div class="row wrap"><span class="tag tag-sample">Demo user</span><button class="btn sm" id="signout">' + I('back', 'sm') + 'Sign out</button></div></div>' +
      '<div class="split"><div class="card"><div class="row between"><h2 style="margin:0">Certifications</h2>' + RM.SAMPLE + '</div><p class="muted" style="font-size:14px;margin-top:6px">Regulatory references are real; names, dates and issuers are demo data.</p><div class="list" style="margin-top:10px">' +
      D.user.certs.map(function (c) {
        var s = RM.certStatus(c);
        return '<div class="list-row" style="min-height:0"><div class="ic" style="color:' + (s.valid ? 'var(--green)' : 'var(--o)') + '">' + I(s.valid ? 'shield' : 'alert') + '</div><div class="tx"><b>' + E(c.name) + '</b><small>' + E(c.ref) + ' · ' + E(c.issuer) + '</small></div><div style="text-align:right;flex:none"><span class="tag ' + (s.valid ? 'tag-real' : 'tag-red') + '">' + (s.valid ? 'Valid' : 'Expired') + '</span><br><small class="muted">' + (s.valid ? 'to ' : '') + RM.fmtDate(s.expires) + (s.valid ? ' · ' + s.days + ' d' : '') + '</small></div></div>';
      }).join('') + '</div></div>' +
      '<div class="stack"><div class="card"><h2>Section access</h2><p class="muted" style="font-size:14px">Each section declares the certifications it needs. A section locks automatically if any are missing or expired.</p><div class="list">' +
      D.sections.map(function (s) {
        var a = RM.access(s.requires);
        return '<div class="list-row" style="min-height:0;align-items:flex-start"><div class="ic" style="width:40px;height:40px;color:' + (a.ok ? 'var(--green)' : 'var(--o)') + '">' + I(a.ok ? 'unlock' : 'lock', 'sm') + '</div><div class="tx"><b style="font-size:15.5px">' + E(s.label) + '</b><div class="row wrap" style="gap:6px;margin-top:6px">' + (s.requires.length ? s.requires.map(function (r) { var ok = RM.userHas(r); return '<span class="tag wrap ' + (ok ? 'tag-mute' : 'tag-red') + '">' + (ok ? '✓ ' : '✕ ') + E(RM.certName(r).replace(/ \(.*\)$/, '')) + '</span>'; }).join('') : '<span class="tag tag-mute" style="text-transform:none;letter-spacing:0">Open to all employees</span>') + '</div></div></div>';
      }).join('') + '</div></div>' +
      '<div class="card flat"><div class="row between"><div><h3 style="margin:0">Presenter: simulate an expired cert</h3><p class="muted" style="font-size:14px;margin:6px 0 0">Shows how RailMate locks sections. Off by default.</p></div></div><label class="field" style="margin:14px 0 0"><select id="simSel"><option value="">Off: all certifications valid</option>' + D.user.certs.map(function (c) { return '<option value="' + c.id + '"' + (sim === c.id ? ' selected' : '') + '>Expire: ' + E(c.name) + '</option>'; }).join('') + '</select></label></div>' +
      '<div class="card flat"><div class="row between" style="gap:14px"><div><h3 style="margin:0">Presenter: reset demo data</h3><p class="muted" style="font-size:14px;margin:6px 0 0">Clears today\'s briefing, checklist drafts and history, near-miss and stop-work logs, training progress and the expired-cert simulation. You stay signed in.</p></div><button class="btn sm" id="resetDemo">' + I('history', 'sm') + 'Reset demo data</button></div></div>' +
      '<div class="card flat"><div class="row between"><div><h3 style="margin:0">Daylight mode</h3><p class="muted" style="font-size:14px;margin:6px 0 0">High-contrast light theme for bright sun.</p></div><button class="switch ' + (document.documentElement.classList.contains('day') ? 'on' : '') + '" id="daySw" aria-label="Daylight mode"><i></i></button></div></div>' +
      '<div class="card flat"><h3>Supervisor</h3><p class="muted" style="margin:0">' + D.user.supervisor + '</p></div></div></div></div>';
    RM.$('#simSel').onchange = function () { var v = this.value || null; if (v) RM.store.set('simExpired', v); else RM.store.del('simExpired'); RM.rebuildShell(); RM.render(); RM.toast(v ? 'Simulating expired: ' + RM.certName(v) : 'All certifications valid again', v ? 'lock' : 'tick'); };
    RM.$('#daySw').onclick = function () { RM.$('#dayBtn').click(); this.classList.toggle('on'); };
    RM.$('#resetDemo').onclick = function () {
      var m = RM.modal('<h2>Reset demo data?</h2><p class="muted">This clears everything saved on this device except your sign-in and theme, so the demo starts fresh.</p><div class="row"><button class="btn danger" id="yesReset">' + I('history') + 'Reset demo data</button><button class="btn ghost" data-close>Cancel</button></div>');
      RM.$('#yesReset', m).onclick = function () {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf('railmate.v1.') === 0 && k !== 'railmate.v1.session' && k !== 'railmate.v1.day') localStorage.removeItem(k); });
        try { sessionStorage.removeItem('rm.next'); } catch (e) {}
        RM.closeModal(); RM.rebuildShell(); RM.render(); RM.toast('Demo data reset. Ready to present', 'tick');
      };
    };
    RM.$('#signout').onclick = function () { RM.store.del('session'); location.hash = '#/login'; };
    return { crumbs: ['Profile & Certifications'] };
  }, { nav: 'profile' });
})();
