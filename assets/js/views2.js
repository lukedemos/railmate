(function () {
  var RM = window.RM, D = RM.data, I = RM.ico, E = RM.esc;
  var CL = { redzone: 'Red zone', loto: 'Lockout / tagout', cfr: 'Regulation', tip: 'Operator tip', hot: 'Hot surface', energy: 'Stored energy', pinch: 'Pinch point', adjacent: 'Adjacent track', spacing: 'Machine spacing', elec: 'Electrical', hyd: 'Hydraulic pressure' };
  function callouts(c) {
    if (!c) return '';
    var list = Array.isArray(c[0]) ? c : [c];
    return list.map(function (x) { return '<div class="callout ' + x[0] + '">' + I(x[0]) + '<div><b>' + (CL[x[0]] || 'Note') + '</b>' + E(x[1]) + '</div></div>'; }).join('');
  }
  RM.callouts = callouts;
  function ppeRow(ppe, hz) {
    return '<div class="row wrap" style="gap:14px;align-items:flex-start"><div><div class="h-sub" style="margin:0 0 8px">PPE</div><div class="ppe">' + (ppe || []).map(function (p) { return '<span>' + I(p) + E(D.ppe[p]) + '</span>'; }).join('') + '</div></div>' +
      ((hz && hz.length) ? '<div><div class="h-sub" style="margin:0 0 8px">Hazards</div><div class="ppe hz">' + hz.map(function (h) { return '<span>' + I(h) + E(D.hazards[h]) + '</span>'; }).join('') + '</div></div>' : '') + '</div>';
  }
  RM.ppeRow = ppeRow;
  function proc(id) { return D.procedures.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- Operate ---------- */
  RM.route('/m/grm3000t/operate', function (el) {
    var done = RM.store.get('procDone', {}), cats = [];
    D.procedures.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Operate</div><h1>Operating procedures</h1><p>Step-by-step, from the official GRM3000T operator tutorials, with on-track safety built into each step.</p></div>' + RM.REAL('Official tutorials') + '</div>' +
      (RM.briefing() ? '' : '<div class="callout redzone" style="margin:0 0 18px">' + I('shield') + '<div><b>Job briefing due</b>Travel and work procedures open after today\'s pre-task job briefing. <a class="y inl" href="#/briefing" style="font-weight:700">Start briefing →</a></div></div>') +
      cats.map(function (c) {
        return '<div class="h-sub">' + E(c) + '</div><div class="grid g2">' + D.procedures.filter(function (p) { return p.cat === c; }).map(function (p) {
          var a = RM.access(p.requires);
          return '<a class="list-row" href="#/m/grm3000t/operate/' + p.id + '"><div class="ic">' + I(a.ok ? (done[p.id] ? 'tick' : 'play') : 'lock') + '</div><div class="tx"><b>' + E(p.title) + '</b><small>' + p.steps.length + ' steps · ~' + p.mins + ' min · Tutorial Part ' + p.part + (p.brief ? ' · briefing required' : '') + '</small></div>' + (done[p.id] ? '<span class="tag tag-real">Done</span>' : '') + '<span class="chev">' + I('chev') + '</span></a>';
        }).join('') + '</div>';
      }).join('') + '</div>';
    return { crumbs: ['Operate'] };
  }, { nav: 'operate', machine: true, section: 'operate' });

  RM.route('/m/grm3000t/operate/:id', function (el, id) {
    var p = proc(id); if (!p) { RM.go('#/m/grm3000t/operate'); return; }
    var crumbs = [['Operate', '#/m/grm3000t/operate'], p.title];
    var a = RM.access(p.requires);
    if (!a.ok) { el.innerHTML = RM.lockView(p.title, a.missing); return { crumbs: crumbs }; }
    var refOnly = false, i = 0, seen = {};
    function gate() {
      el.innerHTML = '<div class="view"><div class="gate" style="max-width:760px;margin:20px auto"><div class="row" style="gap:18px;align-items:flex-start"><div class="icbox">' + I('shield', 'lg') + '</div><div><div class="kicker y" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:750">Before you start</div><h2 style="margin:6px 0 8px">' + E(p.title) + ' needs today\'s job briefing</h2><p class="muted">This procedure puts the machine on or near live track. 49 CFR 214.315 requires a job briefing on the on-track safety in place before work begins.</p></div></div>' +
        '<div class="row wrap" style="margin-top:18px"><a class="btn pri" href="#/briefing" id="gb">' + I('shield') + 'Start job briefing</a><button class="btn ghost" id="ro">' + I('eye') + 'Read as reference only</button></div></div></div>';
      RM.$('#gb').onclick = function () { sessionStorage.setItem('rm.next', location.hash); };
      RM.$('#ro').onclick = function () { refOnly = true; draw(); };
    }
    function draw() {
      seen[i] = 1;
      var s = p.steps[i], last = i === p.steps.length - 1;
      el.innerHTML = '<div class="view">' + (refOnly ? '<div class="callout loto" style="margin:0 0 14px">' + I('eye') + '<div><b>Reference only</b>Complete the job briefing before doing this procedure on track.</div></div>' : '') +
        '<div class="proc-head"><div><div class="kicker y" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:750">' + E(p.cat) + ' · ~' + p.mins + ' min</div><h1 style="margin-top:4px">' + E(p.title) + '</h1><div class="src">' + I('file') + 'GRM3000T Operator Tutorial, Part ' + p.part + ' ' + RM.REAL() + '</div></div>' + ppeRow(p.ppe, p.hz) + '</div>' +
        '<div class="progress">' + p.steps.map(function (_, j) { return '<i class="' + (j < i ? 'done' : j === i ? 'cur' : '') + '"></i>'; }).join('') + '</div>' +
        '<div class="split"><div><div class="stepcard"><div class="n">Step ' + (i + 1) + ' of ' + p.steps.length + '</div><h2>' + E(s.t) + '</h2><p>' + E(s.d) + '</p>' + callouts(s.c) + '</div>' +
        '<div class="stepnav"><button class="btn" id="prev"' + (i === 0 ? ' disabled' : '') + '>' + I('back') + 'Back</button><button class="btn pri" id="next">' + (last ? I('tick') + 'Complete procedure' : 'Next step' + I('chev')) + '</button></div></div>' +
        '<div class="card"><h3>All steps</h3><div class="steplist">' + p.steps.map(function (st, j) { return '<button data-j="' + j + '" class="' + (j === i ? 'cur' : seen[j] ? 'done' : '') + '"><i>' + (seen[j] && j !== i ? '✓' : j + 1) + '</i><span>' + E(st.t) + '</span>' + (st.c && (st.c[0] === 'redzone' || st.c[0] === 'loto') ? '<span class="flag">' + I(st.c[0], 'sm') + '</span>' : '') + '</button>'; }).join('') + '</div></div></div></div>';
      RM.$('#prev').onclick = function () { i--; draw(); };
      RM.$('#next').onclick = function () { if (last) finish(); else { i++; draw(); } };
      RM.$$('.steplist button', el).forEach(function (b) { b.onclick = function () { i = +b.getAttribute('data-j'); draw(); }; });
    }
    function finish() {
      var d = RM.store.get('procDone', {}); d[p.id] = new Date().toISOString(); RM.store.set('procDone', d);
      var related = { startup: 'startup', shutdown: 'shutdown', travel: 'pretravel' }[p.id];
      el.innerHTML = '<div class="view"><div class="fixcard" style="max-width:720px;margin:30px auto;text-align:center"><div style="width:84px;height:84px;border-radius:50%;background:var(--green);color:#0b0e11;display:grid;place-items:center;margin:0 auto 14px">' + I('tick', 'xl') + '</div><h1>Procedure complete</h1><p class="muted">' + E(p.title) + ' · ' + RM.fmtTime(new Date().toISOString()) + '</p>' +
        '<div class="row wrap" style="justify-content:center;margin-top:20px">' + (related ? '<a class="btn pri" href="#/m/grm3000t/checklists/' + related + '">' + I('check') + 'Sign the ' + E(D.checklists.filter(function (c) { return c.id === related; })[0].title.toLowerCase()) + ' checklist</a>' : '') + '<a class="btn" href="#/m/grm3000t/operate">' + I('back') + 'All procedures</a></div></div></div>';
    }
    if (p.brief && !RM.briefing()) gate(); else draw();
    return { crumbs: crumbs };
  }, { nav: 'operate', machine: true, section: 'operate' });

  /* ---------- Service ---------- */
  RM.route('/m/grm3000t/service', function (el) {
    var sel = RM.store.get('svcTab', 'daily'), hrs = D.machines[0].hours;
    function draw() {
      var iv = D.service.filter(function (s) { return s.id === sel; })[0] || D.service[0];
      el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Service</div><h1>Maintenance schedule</h1><p>Daily checks through the 1000-hour service. Tasks marked <span class="tag tag-real">Source</span> come from Plasser American material and the operator tutorials; the rest are sample tasks.</p></div></div>' +
        '<div class="callout loto" style="margin:0 0 18px">' + I('loto') + '<div><b>Before any service work</b>Engine off and key removed, battery master OFF, your personal lock and tag applied, work units lowered or pinned, and hydraulic pressure relieved. Never work under a raised unit held only by hydraulics.</div></div>' +
        '<div class="pills scroll" style="margin-bottom:18px">' + D.service.map(function (s) { return '<button class="pill ' + (s.id === iv.id ? 'on' : '') + '" data-s="' + s.id + '">' + E(s.label) + '</button>'; }).join('') + '</div>' +
        '<div class="split"><div class="card"><div class="row between"><h2 style="margin:0">' + E(iv.label) + ' service</h2>' + (iv.hrs ? '<span class="tag tag-y">Next at ' + (Math.ceil(hrs / iv.hrs) * iv.hrs).toLocaleString() + ' h</span>' : '<span class="tag tag-y">Every shift</span>') + '</div>' +
        '<div class="cl-items" style="margin-top:14px">' + iv.tasks.map(function (t) { return '<div class="cl-item" style="min-height:58px"><span class="box" style="color:var(--dim)">' + I('wrench', 'sm') + '</span><span class="tx">' + E(t.t) + '</span>' + (t.real ? '<span class="tag tag-real">Source</span>' : '<span class="tag tag-sample">Sample</span>') + '</div>'; }).join('') + '</div>' +
        (iv.id === 'h50' ? '<a class="btn pri" style="margin-top:16px" href="#/m/grm3000t/checklists/m50">' + I('check') + 'Open 50-hour checklist</a>' : '') + (iv.id === 'daily' ? '<a class="btn pri" style="margin-top:16px" href="#/m/grm3000t/checklists/daily">' + I('check') + 'Open daily inspection</a>' : '') + (iv.id === 'h1000' ? '<a class="btn" style="margin-top:16px" href="docs/plasser-american-1000-hour-oem-filter-kit.pdf" target="_blank" rel="noopener">' + I('file') + '1000-hour OEM filter kit (PDF)</a>' : '') + '</div>' +
        '<div class="stack"><div class="card"><div class="row between"><h3 style="margin:0">Hour meter</h3>' + RM.SAMPLE + '</div><b style="font-size:40px;display:block;margin-top:6px">' + hrs.toLocaleString() + ' h</b>' +
        D.service.filter(function (s) { return s.hrs; }).map(function (s) { var next = Math.ceil(hrs / s.hrs) * s.hrs, left = next - hrs, pct = 100 - left / s.hrs * 100; return '<div style="margin-top:12px"><div class="row between" style="font-size:14px"><span class="muted">' + s.label + '</span><b>' + left + ' h to go</b></div><div class="bar"><i style="width:' + pct + '%"></i></div></div>'; }).join('') + '</div>' +
        '<div class="card"><div class="row between"><h3 style="margin:0">Hydraulic oil &amp; analysis</h3>' + RM.REAL() + '</div><div class="kv" style="margin-top:12px">' + D.oilLimits.map(function (r) { return '<div>' + E(r[0]) + '</div><div>' + E(r[1]) + '</div>'; }).join('') + '</div><div class="src">' + I('file') + 'Plasser American Filter Technology brochure</div></div>' +
        '<div class="card"><div class="row between"><h3 style="margin:0">Lubrication</h3>' + RM.SAMPLE + '</div><div class="kv" style="margin-top:12px">' + D.lube.map(function (r) { return '<div>' + E(r[0]) + '</div><div>' + E(r[2]) + ' · ' + E(r[3]) + '</div>'; }).join('') + '</div></div></div></div></div>';
      RM.$$('[data-s]', el).forEach(function (b) { b.onclick = function () { sel = b.getAttribute('data-s'); RM.store.set('svcTab', sel); draw(); }; });
    }
    draw();
    return { crumbs: ['Service'] };
  }, { nav: 'service', machine: true, section: 'service' });

  /* ---------- Parts (lookup & identification only) ---------- */
  function partsView(el, openId) {
    var q = '', cat = '', area = '';
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Parts</div><h1>Parts lookup &amp; identification</h1><p>Search by name, number or location, or tap the machine photo to identify a part. Lookup only: ordering stays with your stores process.</p></div>' + RM.SAMPLE + '</div>' +
      '<div class="search" style="margin-bottom:14px">' + I('search') + '<input id="pq" placeholder="Search parts, e.g. tine, filter, roller, S-4410"></div>' +
      '<div class="pills scroll" id="pc" style="margin-bottom:18px"><button class="pill on" data-c="">All</button>' + D.partCats.map(function (c) { return '<button class="pill" data-c="' + c[0] + '">' + E(c[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="split r"><div class="stack stick"><div class="hot" id="hot"><img src="' + RM.img('dsc00714') + '" alt="GRM3000T side view">' + D.hotspots.map(function (h, n) { return '<button class="spot' + (h.x < 25 ? ' edge-l' : h.x > 70 ? ' edge-r' : '') + '" aria-label="' + E(h.label) + '" data-a="' + h.id + '" style="left:' + h.x + '%;top:' + h.y + '%">' + (n + 1) + '<span class="lab">' + E(h.label) + '</span></button>'; }).join('') + '</div>' +
      '<div class="row between"><small class="dim">Tap a number to identify parts in that area. Callout positions are approximate.</small><button class="btn sm ghost" id="clr" style="display:none">' + I('x', 'sm') + 'Clear</button></div></div>' +
      '<div><div class="row between" style="margin-bottom:10px"><b id="pcount"></b><small class="dim">Part numbers are illustrative</small></div><div class="stack" id="plist" style="--g:8px"></div></div></div></div>';
    function draw() {
      var ql = q.toLowerCase();
      var list = D.parts.filter(function (p) { return (!cat || p.cat === cat) && (!area || p.area === area) && (!ql || (p.name + ' ' + p.pn + ' ' + p.loc + ' ' + p.desc).toLowerCase().indexOf(ql) >= 0); });
      RM.$('#pcount').textContent = list.length + ' part' + (list.length === 1 ? '' : 's') + (area ? ' · ' + D.hotspots.filter(function (h) { return h.id === area; })[0].label : '');
      RM.$('#plist').innerHTML = list.length ? list.map(function (p) {
        return '<button class="list-row part-row" style="width:100%;text-align:left;margin-top:8px" data-p="' + p.id + '"><div class="tx"><b>' + E(p.name) + '</b><small>' + E(p.loc) + '</small></div><span class="pn">' + p.pn + '</span>' + stock(p.stock) + '</button>';
      }).join('') : '<div class="empty">No parts match. Try another word, or <a class="y inl" href="#/m/grm3000t/ask">ask RailMate</a>.</div>';
      RM.$$('[data-p]', el).forEach(function (b) { b.onclick = function () { detail(b.getAttribute('data-p')); }; });
      RM.$$('.spot', el).forEach(function (s) { s.classList.toggle('on', s.getAttribute('data-a') === area); });
      RM.$('#clr').style.display = area ? '' : 'none';
    }
    RM.$('#pq').oninput = function () { q = this.value; draw(); };
    RM.$$('#pc .pill', el).forEach(function (b) { b.onclick = function () { cat = b.getAttribute('data-c'); RM.$$('#pc .pill').forEach(function (x) { x.classList.toggle('on', x === b); }); draw(); }; });
    RM.$$('.spot', el).forEach(function (s) { s.onclick = function () { var a = s.getAttribute('data-a'); area = area === a ? '' : a; draw(); if (area && innerWidth < 980) RM.$('#plist').scrollIntoView({ behavior: 'smooth' }); }; });
    RM.$('#clr').onclick = function () { area = ''; draw(); };
    draw();
    if (openId) detail(openId);
  }
  function stock(n) { return '<span class="stock ' + (n > 3 ? 'in' : n > 0 ? 'low' : 'out') + '">' + (n > 0 ? n + ' at Altoona' : 'Out of stock') + '</span>'; }
  function detail(id) {
    var p = D.parts.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var cat = D.partCats.filter(function (c) { return c[0] === p.cat; })[0];
    var hs = D.hotspots.filter(function (h) { return h.id === p.area; })[0];
    RM.modal('<div class="modal-h"><div><span class="tag tag-y">' + E(cat ? cat[1] : '') + '</span><h2 style="margin:10px 0 4px">' + E(p.name) + '</h2><span class="pn">' + p.pn + '</span> ' + RM.SAMPLE + '</div><button class="iconbtn" data-close aria-label="Close">' + I('x') + '</button></div>' +
      '<div class="split"><div><p>' + E(p.desc) + '</p><div class="kv"><div>Location</div><div>' + E(p.loc) + '</div><div>Qty on machine</div><div>' + p.qty + '</div><div>Machine area</div><div>' + E(hs ? hs.label : '—') + '</div><div>Stores (Altoona MOW)</div><div>' + stock(p.stock) + '</div></div></div>' +
      '<div><div class="hot" style="pointer-events:none"><img src="' + RM.img('dsc00714', true) + '" alt="">' + (hs ? '<span class="spot on" style="left:' + hs.x + '%;top:' + hs.y + '%">' + I('search', 'sm') + '</span>' : '') + '</div><small class="dim">Approximate location</small></div></div>' +
      '<div class="h-sub">Interchange notes</div>' + (p.sub && p.sub.length ? '<ul style="margin:0;padding-left:20px">' + p.sub.map(function (s) { return '<li>' + E(s) + '</li>'; }).join('') + '</ul>' : '<p class="muted" style="margin:0">No approved interchange on file. Use the OEM part.</p>') +
      '<div class="callout cfr">' + I('info') + '<div><b>Identification only</b>RailMate does not place orders. Quote this number to KCR Stores or the Plasser American parts hotline, (877) 577-2444.</div></div>' +
      '<div class="row wrap" style="margin-top:18px"><a class="btn" href="#/m/grm3000t/ask" data-close>' + I('spark') + 'Ask RailMate about substitutes</a><button class="btn ghost" data-close>Close</button></div>', 'wide');
  }
  RM.route('/m/grm3000t/parts', function (el) { partsView(el); return { crumbs: ['Parts'] }; }, { nav: 'parts', machine: true, section: 'parts' });
  RM.route('/m/grm3000t/parts/:id', function (el, id) { partsView(el, id); return { crumbs: [['Parts', '#/m/grm3000t/parts'], 'Part detail'] }; }, { nav: 'parts', machine: true, section: 'parts' });

  /* ---------- Troubleshooting ---------- */
  RM.route('/m/grm3000t/troubleshoot', function (el) {
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Troubleshoot</div><h1>Guided troubleshooting</h1><p>Answer a few questions and RailMate walks you to the likely cause and the fix, the way an experienced mechanic would.</p></div></div>' +
      '<div class="callout redzone" style="margin:0 0 18px">' + I('redzone') + '<div><b>Before you diagnose</b>Machine stopped, parking brake set, work units raised and locked, and your RWIC informed. Lock and tag out before reaching into any work unit, buggy or clamp.</div></div>' +
      '<div class="grid g2">' + D.trees.map(function (t) {
        return '<a class="list-row" href="#/m/grm3000t/troubleshoot/' + t.id + '"><div class="ic">' + I('stetho') + '</div><div class="tx"><b>' + E(t.title) + '</b><small>' + E(t.sys) + ' · ' + Object.keys(t.nodes).filter(function (k) { return t.nodes[k].q; }).length + ' questions</small></div>' + (t.real ? '<span class="tag tag-real">Tutorial-based</span>' : RM.SAMPLE) + '<span class="chev">' + I('chev') + '</span></a>';
      }).join('') + '</div>' +
      '<div class="h-sub">Fault codes</div><div class="card" style="padding:8px"><div class="row between" style="padding:10px 12px"><b>PLC fault code lookup</b>' + RM.SAMPLE + '</div>' + D.faults.map(function (f) {
        return '<a class="list-row" style="border:0;min-height:60px" href="#/m/grm3000t/troubleshoot/' + f[3] + '"><span class="pn">' + f[0] + '</span><div class="tx"><b>' + E(f[1]) + '</b><small>' + E(f[2]) + '</small></div><span class="chev">' + I('chev') + '</span></a>';
      }).join('') + '</div></div>';
    return { crumbs: ['Troubleshoot'] };
  }, { nav: 'troubleshoot', machine: true, section: 'troubleshoot' });

  RM.route('/m/grm3000t/troubleshoot/:id', function (el, id) {
    var t = D.trees.filter(function (x) { return x.id === id; })[0]; if (!t) { RM.go('#/m/grm3000t/troubleshoot'); return; }
    var path = [{ n: t.start }];
    function draw() {
      var cur = path[path.length - 1], node = t.nodes[cur.n];
      var trail = path.slice(0, -1).map(function (p) { return '<span>' + I('tick', 'sm') + '<b>' + E(p.a) + '</b></span>'; }).join('');
      var head = '<div class="view"><div class="proc-head" style="margin-bottom:16px"><div><div class="kicker y" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:750">' + E(t.sys) + '</div><h1 style="margin-top:4px">' + E(t.title) + '</h1></div>' + (t.real ? RM.REAL('Tutorial-based') : RM.SAMPLE) + '</div>' + (trail ? '<div class="trail">' + trail + '</div>' : '');
      var body;
      if (node.q) {
        body = '<div class="qcard"><div class="n">Question ' + path.length + '</div><h2>' + E(node.q) + '</h2><div class="opts">' + node.o.map(function (o, k) { return '<button class="opt" data-k="' + k + '"><span class="k">' + 'ABCD'[k] + '</span>' + E(o[0]) + '</button>'; }).join('') + '</div></div>';
      } else {
        body = '<div class="fixcard"><div class="n" style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:750">Likely cause</div><h2 style="font-size:28px;margin:8px 0 4px">' + E(node.fix) + '</h2>' + (node.sample ? RM.SAMPLE : '') + '<ol>' + node.steps.map(function (s) { return '<li>' + E(s) + '</li>'; }).join('') + '</ol>' + RM.callouts(node.c) +
          (node.src ? '<div class="src">' + I('file') + 'Source: GRM3000T Operator ' + E(node.src) + '</div>' : '') +
          '<div class="row wrap" style="margin-top:20px"><button class="btn pri" id="fixed">' + I('tick') + 'Fixed it</button>' + (node.link ? (function () { var lp = proc(node.link); return lp ? '<a class="btn" href="#/m/grm3000t/operate/' + lp.id + '">' + I('chev') + 'Open procedure: ' + E(lp.title) + '</a>' : ''; })() : '') + '<button class="btn ghost" id="esc">' + I('phone') + 'Not fixed: call mechanical</button></div></div>';
      }
      el.innerHTML = head + body + '<div class="row wrap" style="margin-top:16px"><button class="btn sm ghost" id="bk"' + (path.length < 2 ? ' disabled' : '') + '>' + I('back', 'sm') + 'Back one step</button><button class="btn sm ghost" id="rs">' + I('history', 'sm') + 'Start over</button><a class="btn sm ghost" href="#/m/grm3000t/ask">' + I('spark', 'sm') + 'Ask RailMate</a></div></div>';
      RM.$$('.opt', el).forEach(function (b) { b.onclick = function () { var o = node.o[+b.getAttribute('data-k')]; cur.a = o[0]; path.push({ n: o[1] }); draw(); }; });
      RM.$('#bk').onclick = function () { path.pop(); delete path[path.length - 1].a; draw(); };
      RM.$('#rs').onclick = function () { path = [{ n: t.start }]; draw(); };
      if (RM.$('#fixed')) RM.$('#fixed').onclick = function () { var log = RM.store.get('tsLog', []); log.unshift({ at: new Date().toISOString(), tree: t.title, fix: node.fix }); RM.store.set('tsLog', log); RM.toast('Logged: ' + node.fix + ' · resolved'); RM.go('#/m/grm3000t/troubleshoot'); };
      if (RM.$('#esc')) RM.$('#esc').onclick = function () { RM.modal('<div class="modal-h"><h2>Escalate to mechanical</h2><button class="iconbtn" data-close>' + I('x') + '</button></div><p class="muted">Share this summary with the mechanic:</p><div class="card flat" style="font-size:15px"><b>' + E(t.title) + '</b><br>' + path.slice(0, -1).map(function (p) { return '• ' + E(t.nodes[p.n].q) + ' → ' + E(p.a); }).join('<br>') + '<br>Likely: ' + E(node.fix) + '</div><div class="grid g2" style="margin-top:14px">' + D.contacts.filter(function (c) { return /Mechanical|Parts/.test(c.t); }).map(RM.contactRow).join('') + '</div>'); };
      RM.$('.main').scrollTop = 0;
    }
    draw();
    return { crumbs: [['Troubleshoot', '#/m/grm3000t/troubleshoot'], t.title] };
  }, { nav: 'troubleshoot', machine: true, section: 'troubleshoot' });

  /* ---------- Checklists ---------- */
  function cl(id) { return D.checklists.filter(function (c) { return c.id === id; })[0]; }
  RM.route('/m/grm3000t/checklists', function (el) {
    function draw() {
      var hist = RM.store.get('clHistory', []);
      el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Checklists</div><h1>Checklists</h1><p>Tap items off, flag defects, and sign. Signed checklists are saved on this device.</p></div></div>' +
        '<div class="grid g-auto">' + D.checklists.map(function (c) {
          var last = hist.filter(function (h) { return h.id === c.id; })[0], draft = RM.store.get('clDraft.' + c.id, null);
          var n = draft ? Object.keys(draft.s || {}).length : 0;
          return '<a class="tile" href="#/m/grm3000t/checklists/' + c.id + '"><div class="row between"><div class="ic">' + I(c.icon) + '</div>' + (c.real ? '<span class="tag tag-real">Source-based</span>' : RM.SAMPLE) + '</div><div><b>' + E(c.title) + '</b><br><small>' + c.items.length + ' items · ' + E(c.src) + '</small></div><small class="dim" style="margin-top:auto">' + (n ? '<span class="y">In progress: ' + n + '/' + c.items.length + '</span>' : last ? 'Last signed ' + RM.fmtDate(last.at, { month: 'short', day: 'numeric' }) + ' ' + RM.fmtTime(last.at) : 'Not yet signed') + '</small></a>';
        }).join('') + '</div>' +
        '<div class="row between" style="margin:28px 0 12px"><div class="h-sub" style="margin:0">History · ' + hist.length + ' signed</div>' + (hist.length ? '<button class="btn sm ghost" id="clear">' + I('trash', 'sm') + 'Clear history</button>' : '') + '</div>' +
        (hist.length ? '<div class="stack" style="--g:8px">' + hist.map(function (h, k) {
          return '<button class="list-row" style="width:100%;text-align:left;margin-top:8px" data-h="' + k + '"><div class="ic" style="color:' + (h.defects ? 'var(--red)' : 'var(--green)') + '">' + I(h.defects ? 'alert' : 'tick') + '</div><div class="tx"><b>' + E(h.title) + '</b><small>' + RM.fmtDate(h.at) + ' · ' + RM.fmtTime(h.at) + ' · ' + E(h.by) + ' · ' + h.okCount + '/' + h.items.length + ' OK' + (h.defects ? ' · ' + h.defects + ' defect' + (h.defects > 1 ? 's' : '') : '') + '</small></div><span class="chev">' + I('chev') + '</span></button>';
        }).join('') + '</div>' : '<div class="empty">' + I('history', 'lg') + '<p>No signed checklists yet. Signed checklists appear here.</p></div>') + '</div>';
      RM.$$('[data-h]', el).forEach(function (b) { b.onclick = function () { showRecord(hist[+b.getAttribute('data-h')]); }; });
      if (RM.$('#clear')) RM.$('#clear').onclick = function () {
        var m = RM.modal('<h2>Clear checklist history?</h2><p class="muted">This removes all ' + hist.length + ' signed checklists from this device. It can\'t be undone.</p><div class="row"><button class="btn danger" id="yes">' + I('trash') + 'Clear history</button><button class="btn ghost" data-close>Cancel</button></div>');
        RM.$('#yes', m).onclick = function () { RM.store.del('clHistory'); RM.closeModal(); RM.toast('Checklist history cleared', 'trash'); draw(); };
      };
    }
    draw();
    return { crumbs: ['Checklists'] };
  }, { nav: 'checklists', machine: true, section: 'checklists' });

  function showRecord(h) {
    RM.modal('<div class="modal-h"><div><span class="tag ' + (h.defects ? 'tag-red' : 'tag-real') + '">' + (h.defects ? h.defects + ' defect(s)' : 'All OK') + '</span><h2 style="margin:10px 0 4px">' + E(h.title) + '</h2><p class="muted" style="margin:0">' + RM.fmtDate(h.at) + ' · ' + RM.fmtTime(h.at) + ' · Unit ' + E(h.unit) + ' · ' + E(h.hours) + ' h</p></div><button class="iconbtn" data-close aria-label="Close">' + I('x') + '</button></div>' +
      '<div class="cl-items">' + h.items.map(function (it) { return '<div class="cl-item ' + (it.s === 'bad' ? 'bad' : it.s === 'ok' ? 'ok' : '') + '" style="min-height:52px;font-size:15.5px"><span class="box" style="width:28px;height:28px">' + I(it.s === 'bad' ? 'x' : 'tick', 'sm') + '</span><span class="tx">' + E(it.t) + (it.note ? '<small>' + E(it.note) + '</small>' : '') + '</span></div>'; }).join('') + '</div>' +
      (h.comments ? '<div class="h-sub">Comments</div><p>' + E(h.comments) + '</p>' : '') +
      '<div class="h-sub">Signed by ' + E(h.by) + '</div>' + (h.sigType === 'draw' ? '<img class="sig-img" src="' + h.sig + '" alt="Signature">' : '<div class="sigtyped" style="padding:6px 0;min-height:0">' + E(h.sig) + '</div>'), 'wide');
  }

  RM.route('/m/grm3000t/checklists/:id', function (el, id) {
    var c = cl(id); if (!c) { RM.go('#/m/grm3000t/checklists'); return; }
    var dk = 'clDraft.' + c.id, draft = RM.store.get(dk, { s: {}, n: {} }), sigMode = 'draw', drawn = false, pad;
    function save() { RM.store.set(dk, draft); }
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Checklist · Unit KCR 3412</div><h1>' + E(c.title) + '</h1><p>' + E(c.src) + ' ' + (c.real ? RM.REAL('Source-based') : RM.SAMPLE) + '</p></div><div class="row wrap"><button class="btn sm ghost" id="allok">' + I('tick', 'sm') + 'Mark rest OK</button><button class="btn sm ghost" id="reset">' + I('history', 'sm') + 'Reset</button></div></div>' +
      '<div class="progress" id="prog"></div><div class="row between" style="margin:-8px 0 14px"><b id="cnt"></b><small class="dim">Tap to check · ' + I('flag', 'sm') + ' to flag a defect · progress auto-saves</small></div>' +
      '<div class="split"><div class="cl-items" id="items"></div><div class="stack stick">' +
      (c.id === 'daily' ? '<div class="callout cfr" style="margin:0">' + I('cfr') + '<div><b>49 CFR 214.527</b>Inspect the machine\'s required safety devices at the start of each shift. Report defects; a machine with a non-complying item is tagged, and some items must be repaired before further use.</div></div>' : '') +
      '<div class="card"><h3>Sign-off</h3><label class="field"><span>Name</span><input id="sname" value="' + E(D.user.name) + '"></label><div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Hour meter</span><input id="shrs" inputmode="numeric" value="' + D.machines[0].hours + '"></label><label class="field" style="flex:1"><span>Unit</span><input id="sunit" value="KCR 3412"></label></div>' +
      '<label class="field"><span>Comments (optional)</span><textarea id="scom" placeholder="Anything the next shift should know"></textarea></label>' +
      '<div class="pills" style="margin-bottom:10px"><button class="pill on" data-m="draw">' + I('pen', 'sm') + 'Draw</button><button class="pill" data-m="type">Type</button></div>' +
      '<div id="sigbox"></div><button class="btn pri block" id="sign" style="margin-top:14px">' + I('tick') + 'Sign &amp; save</button><p class="dim" id="signhint" style="font-size:13.5px;margin:10px 0 0;text-align:center"></p></div></div></div></div>';
    function draw() {
      var s = draft.s, done = 0, bad = 0;
      RM.$('#items').innerHTML = c.items.map(function (t, k) {
        var st = s[k]; if (st) done++; if (st === 'bad') bad++;
        return '<div class="cl-item ' + (st || '') + '" data-k="' + k + '" role="button" tabindex="0"><span class="box">' + I(st === 'bad' ? 'x' : 'tick') + '</span><span class="tx">' + E(t) + (st === 'bad' && draft.n[k] ? '<small>Defect: ' + E(draft.n[k]) + '</small>' : '') + '</span><button class="def" data-d="' + k + '" aria-label="Flag defect">' + I('flag') + '</button></div>';
      }).join('');
      RM.$('#prog').innerHTML = c.items.map(function (_, k) { return '<i class="' + (s[k] === 'ok' ? 'done' : s[k] === 'bad' ? 'cur' : '') + '" style="' + (s[k] === 'bad' ? 'background:var(--red)' : '') + '"></i>'; }).join('');
      RM.$('#cnt').innerHTML = done + ' of ' + c.items.length + ' checked' + (bad ? ' · <span style="color:var(--red)">' + bad + ' defect' + (bad > 1 ? 's' : '') + '</span>' : '');
      RM.$$('.cl-item', RM.$('#items')).forEach(function (r) {
        r.onclick = function (e) { if (e.target.closest('.def')) return; var k = r.getAttribute('data-k'); if (s[k] === 'ok') delete s[k]; else { s[k] = 'ok'; delete draft.n[k]; } save(); draw(); };
      });
      RM.$$('.def', el).forEach(function (b) { b.onclick = function () { defect(+b.getAttribute('data-d')); }; });
      hint();
    }
    function defect(k) {
      var m = RM.modal('<div class="modal-h"><div><span class="tag tag-red">Flag defect</span><h2 style="margin:10px 0 0">' + E(c.items[k]) + '</h2></div><button class="iconbtn" data-close>' + I('x') + '</button></div><label class="field"><span>What is wrong?</span><textarea id="dn" placeholder="e.g. Left work light inoperative">' + E(draft.n[k] || '') + '</textarea></label><div class="row wrap"><button class="btn danger" id="dsave">' + I('flag') + 'Flag defect</button>' + (draft.s[k] === 'bad' ? '<button class="btn ghost" id="dclr">Remove flag</button>' : '') + '<button class="btn ghost" data-close>Cancel</button></div>');
      setTimeout(function () { RM.$('#dn', m).focus(); }, 50);
      RM.$('#dsave', m).onclick = function () { draft.s[k] = 'bad'; draft.n[k] = RM.$('#dn', m).value.trim() || 'Defect noted'; save(); RM.closeModal(); draw(); };
      if (RM.$('#dclr', m)) RM.$('#dclr', m).onclick = function () { delete draft.s[k]; delete draft.n[k]; save(); RM.closeModal(); draw(); };
    }
    function sigUI() {
      var box = RM.$('#sigbox');
      if (sigMode === 'type') { box.innerHTML = '<label class="field" style="margin:0"><span>Type your full name to sign</span><input id="styped" placeholder="' + E(D.user.name) + '"></label><div class="sigtyped" id="sprev" style="padding:10px 4px;min-height:70px"></div>'; RM.$('#styped').oninput = function () { RM.$('#sprev').textContent = this.value; hint(); }; drawn = false; hint(); return; }
      box.innerHTML = '<div class="sigpad"><canvas id="cv"></canvas><div class="ln"></div><div class="ph" id="sph">Sign here with your finger</div></div><button class="btn sm ghost" id="sclr" style="margin-top:8px">' + I('x', 'sm') + 'Clear signature</button>';
      var cv = RM.$('#cv'), r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      cv.width = r.width * dpr; cv.height = r.height * dpr; var g = cv.getContext('2d'); g.scale(dpr, dpr);
      g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = document.documentElement.classList.contains('day') ? '#111' : '#ffc400';
      var down = false, lx, ly; drawn = false;
      function pt(e) { var b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }
      cv.onpointerdown = function (e) { down = true; cv.setPointerCapture(e.pointerId); var p = pt(e); lx = p[0]; ly = p[1]; RM.$('#sph').style.display = 'none'; };
      cv.onpointermove = function (e) { if (!down) return; var p = pt(e); g.beginPath(); g.moveTo(lx, ly); g.lineTo(p[0], p[1]); g.stroke(); lx = p[0]; ly = p[1]; if (!drawn) { drawn = true; hint(); } };
      cv.onpointerup = cv.onpointercancel = function () { down = false; };
      RM.$('#sclr').onclick = function () { g.clearRect(0, 0, cv.width, cv.height); drawn = false; RM.$('#sph').style.display = ''; hint(); };
      pad = cv;
    }
    function ready() {
      var all = c.items.every(function (_, k) { return draft.s[k]; });
      var sig = sigMode === 'draw' ? drawn : !!(RM.$('#styped') && RM.$('#styped').value.trim());
      return { all: all, sig: sig, ok: all && sig && RM.$('#sname').value.trim() };
    }
    function hint() {
      var r = ready(), left = c.items.filter(function (_, k) { return !draft.s[k]; }).length;
      RM.$('#sign').disabled = !r.ok;
      RM.$('#signhint').textContent = !r.all ? left + ' item' + (left > 1 ? 's' : '') + ' still to check' : !r.sig ? 'Add your signature to finish' : 'Ready to sign';
    }
    RM.$$('[data-m]', el).forEach(function (b) { b.onclick = function () { sigMode = b.getAttribute('data-m'); RM.$$('[data-m]').forEach(function (x) { x.classList.toggle('on', x === b); }); sigUI(); }; });
    RM.$('#sname').oninput = hint;
    RM.$('#allok').onclick = function () { c.items.forEach(function (_, k) { if (!draft.s[k]) draft.s[k] = 'ok'; }); save(); draw(); };
    RM.$('#reset').onclick = function () { draft = { s: {}, n: {} }; save(); draw(); };
    RM.$('#sign').onclick = function () {
      var items = c.items.map(function (t, k) { return { t: t, s: draft.s[k], note: draft.n[k] || '' }; });
      var defects = items.filter(function (x) { return x.s === 'bad'; }).length;
      var rec = { id: c.id, title: c.title, at: new Date().toISOString(), by: RM.$('#sname').value.trim(), unit: RM.$('#sunit').value, hours: RM.$('#shrs').value, comments: RM.$('#scom').value.trim(), items: items, okCount: items.length - defects, defects: defects, sigType: sigMode, sig: sigMode === 'draw' ? pad.toDataURL('image/png') : RM.$('#styped').value.trim() };
      var hist = RM.store.get('clHistory', []); hist.unshift(rec); if (hist.length > 60) hist.length = 60; RM.store.set('clHistory', hist); RM.store.del(dk); draft = { s: {}, n: {} }; RM.$('#scom').value = ''; draw(); sigUI();
      var m = RM.modal('<div style="text-align:center"><div style="width:84px;height:84px;border-radius:50%;background:' + (defects ? 'var(--o)' : 'var(--green)') + ';color:#0b0e11;display:grid;place-items:center;margin:0 auto 14px">' + I(defects ? 'flag' : 'tick', 'xl') + '</div><h2>' + E(c.title) + ' signed</h2><p class="muted">' + RM.fmtTime(rec.at) + ' · ' + E(rec.by) + ' · saved to history on this device</p>' +
        (defects ? '<div class="callout loto" style="text-align:left">' + I('alert') + '<div><b>' + defects + ' defect' + (defects > 1 ? 's' : '') + ' reported</b>Your supervisor and the mechanical desk would be notified (simulated). Do not operate if a defect affects safe operation.</div></div>' : '') +
        '<div class="row wrap" style="justify-content:center;margin-top:18px"><button class="btn pri" id="vr">' + I('eye') + 'View record</button><a class="btn" href="#/m/grm3000t/checklists" data-close>' + I('history') + 'All checklists</a></div></div>');
      RM.$('#vr', m).onclick = function () { showRecord(rec); };
    };
    draw(); sigUI();
    return { crumbs: [['Checklists', '#/m/grm3000t/checklists'], c.title] };
  }, { nav: 'checklists', machine: true, section: 'checklists' });
})();
