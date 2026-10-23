(function () {
  var RM = window.RM, D = RM.data, I = RM.ico, E = RM.esc;

  var RZ = '<svg viewBox="0 0 640 300" style="width:100%;height:auto;display:block" font-family="inherit" aria-label="Red zone diagram">' +
    '<defs><pattern id="hz" width="12" height="12" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="rgba(255,77,61,.10)"/><rect width="5" height="12" fill="rgba(255,77,61,.20)"/></pattern></defs>' +
    '<rect x="0" y="0" width="640" height="300" fill="none"/>' +
    '<g stroke="#5b6672" stroke-width="2">' + (function () { var s = ''; for (var x = 8; x < 640; x += 22) { s += '<line x1="' + x + '" y1="118" x2="' + x + '" y2="182" stroke="#3a434d" stroke-width="7"/>'; } return s; })() + '</g>' +
    '<line x1="0" y1="132" x2="640" y2="132" stroke="#9aa6b2" stroke-width="4"/><line x1="0" y1="168" x2="640" y2="168" stroke="#9aa6b2" stroke-width="4"/>' +
    '<line x1="0" y1="104" x2="640" y2="104" stroke="#ffc400" stroke-width="1.5" stroke-dasharray="8 6"/><line x1="0" y1="196" x2="640" y2="196" stroke="#ffc400" stroke-width="1.5" stroke-dasharray="8 6"/>' +
    '<text x="8" y="98" fill="#ffc400" font-size="12" font-weight="700">FOUL LINE · 4 FT FROM RAIL (49 CFR 214.7)</text>' +
    '<rect x="170" y="40" width="300" height="220" rx="28" fill="url(#hz)" stroke="#ff4d3d" stroke-width="2.5" stroke-dasharray="10 6"/>' +
    '<text x="182" y="62" fill="#ff4d3d" font-size="13" font-weight="800">RED ZONE · 25 FT AROUND WORK UNITS</text>' +
    '<rect x="228" y="122" width="184" height="56" rx="8" fill="#151b21" stroke="#ffc400" stroke-width="2.5"/>' +
    '<rect x="380" y="126" width="28" height="48" rx="4" fill="#ffc400"/><text x="320" y="155" fill="#e8edf2" font-size="14" font-weight="800" text-anchor="middle">GRM3000T</text>' +
    '<path d="M560 150h-60" stroke="#ff7a00" stroke-width="3" marker-end="url(#ar)"/><defs><marker id="ar" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a00"/></marker></defs>' +
    '<text x="566" y="146" fill="#ff7a00" font-size="12" font-weight="700">WORK</text><text x="566" y="160" fill="#ff7a00" font-size="12" font-weight="700">DIRECTION</text>' +
    '<g transform="translate(96 240)"><circle r="12" fill="#2fd27a"/><text x="20" y="5" fill="#2fd27a" font-size="12.5" font-weight="700">Safe position: clear, visible</text></g>' +
    '<g transform="translate(330 222)"><circle r="12" fill="#ff4d3d"/><text x="-12" y="5" fill="#fff" font-size="13" font-weight="800">!</text></g>' +
    '<text x="350" y="252" fill="#ff9e94" font-size="12">Entry only after contact with the operator</text></svg>';

  /* ---------- Safety center ---------- */
  RM.route('/safety', function (el) {
    var nm = RM.store.get('nearMiss', []), sw = RM.store.get('stopwork', []), gf = RM.store.get('challenges', []), b = RM.briefing();
    var refs = [['214.7', 'Definitions: fouling a track, roadway maintenance machine'], ['214.341', 'Roadway maintenance machines: on-track safety and spacing'], ['214.343', 'Training and qualification for roadway workers'], ['214.355', 'Operator qualification for roadway maintenance machines'], ['214.503', 'Good-faith challenges to unsafe machines'], ['214.505', 'Required environmental control and protection systems'], ['214.507', 'Required safety equipment on new machines'], ['214.527', 'Daily operator inspection; repair schedule']];
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Safety Center</div><h1>Safety Center</h1><p>Everything you need when it matters: stop work, call for help, brief the crew, and report what almost happened.</p></div></div>' +
      '<div class="sos"><button class="tile" id="sw" style="text-align:left;border-color:rgba(255,77,61,.45)"><div class="ic">' + I('hand') + '</div><div><b>Stop work</b><br><small>Any employee, any time. One tap.</small></div></button>' +
      '<a class="tile" href="#/briefing"><div class="ic" style="background:var(--yglow);color:var(--y)">' + I('shield') + '</div><div><b>Job briefing</b><br><small>' + (b ? 'Completed ' + RM.fmtTime(b.at) + ' today' : 'Due before on-track work') + '</small></div></a>' +
      '<a class="tile" href="#/safety/near-miss"><div class="ic" style="background:rgba(255,122,0,.14);color:var(--o)">' + I('flag') + '</div><div><b>Report a near miss</b><br><small>Takes a minute. Anonymous option.</small></div></a></div>' +
      '<div class="split" style="margin-top:18px"><div class="stack"><div class="card"><div class="row between"><h2 style="margin:0">The red zone</h2><span class="tag tag-sample">KCR distance: sample</span></div><p class="muted" style="margin:8px 0 14px">FRA Safety Advisory 2024-01 asks railroads to set machine-specific red zones, discuss them in every job briefing, and forbid entry without communication with the operator.</p>' + RZ + '</div>' +
      '<a class="card" href="#/safety/refuse" style="display:block;border-color:rgba(74,168,255,.35)"><div class="row" style="gap:16px"><div class="icbox blue">' + I('hand') + '</div><div style="flex:1"><h3 style="margin:0">Right to refuse an unsafe machine</h3><p class="muted" style="margin:4px 0 0">Under 49 CFR 214.503 you may refuse to operate a machine you believe in good faith is unsafe or non-compliant. Start a good-faith challenge.</p></div>' + I('chev') + '</div></a>' +
      '<div class="card"><div class="row between"><h3 style="margin:0">Federal references</h3>' + RM.REAL('eCFR') + '</div><div class="stack" style="margin-top:6px">' + refs.map(function (r) { return '<a class="list-row" style="min-height:58px;margin-top:8px" href="docs/49-cfr-214-selected-sections.html#s' + r[0] + '" target="_blank" rel="noopener"><span class="pn">§' + r[0] + '</span><div class="tx"><b style="font-size:15.5px">' + E(r[1]) + '</b></div><span class="chev">' + I('ext', 'sm') + '</span></a>'; }).join('') + '</div></div></div>' +
      '<div class="stack"><div class="card" id="contacts"><h2>Emergency contacts</h2><div class="stack" style="--g:8px">' + D.contacts.map(function (c) { return '<div style="margin-top:8px">' + RM.contactRow(c) + '</div>'; }).join('') + '</div><p class="dim" style="font-size:13px;margin:12px 0 0">Tap to call. 911 and the Plasser American parts hotline are real numbers; KCR numbers are samples.</p></div>' +
      '<div class="card"><h3>Your safety log</h3><div class="kv"><div>Near misses reported</div><div>' + nm.length + '</div><div>Stop-work events</div><div>' + sw.length + '</div><div>Good-faith challenges</div><div>' + gf.length + '</div></div>' +
      (nm.length ? '<div class="h-sub">Recent reports</div>' + nm.slice(0, 4).map(function (n) { return '<div class="list-row" style="min-height:0;margin-top:8px"><div class="tx"><b style="font-size:15px">' + E(n.type) + ' · ' + E(n.ref) + '</b><small>' + RM.fmtDate(n.at) + ' · ' + (n.anon ? 'Anonymous' : E(n.by)) + '</small></div></div>'; }).join('') : '') +
      '<p class="dim" style="font-size:13px;margin:12px 0 0">Stored on this device only (demo).</p></div></div></div></div>';
    RM.$('#sw').onclick = RM.stopWork;
    return { crumbs: ['Safety Center'] };
  }, { nav: 'safety' });

  /* ---------- Near-miss report ---------- */
  function nearMiss(el) {
    var types = ['Red zone intrusion', 'Close call with a train', 'Struck-by / caught-between', 'Slip, trip or fall', 'Equipment defect', 'Communication breakdown', 'Other'];
    var sel = '', anon = false;
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Safety Center</div><h1>Report a near miss</h1><p>A near miss is a free lesson. Reporting is non-punitive and helps every gang on the railroad.</p></div>' + RM.SIM + '</div>' +
      '<div class="split"><div class="card"><div class="field"><span>What happened?</span><div class="pills" id="nt">' + types.map(function (t) { return '<button class="pill" data-t="' + E(t) + '">' + E(t) + '</button>'; }).join('') + '</div></div>' +
      '<div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Location</span><input id="nl" value="Middlesex Sub, Track 1, MP 238.6"></label><label class="field" style="flex:1"><span>When</span><input id="nw" value="' + RM.fmtDate(new Date().toISOString()) + ', ' + RM.fmtTime(new Date().toISOString()) + '"></label></div>' +
      '<label class="field"><span>Describe it</span><textarea id="nd" placeholder="What happened, who was involved, what could have happened?"></textarea></label>' +
      '<label class="field"><span>What would prevent it?</span><textarea id="np" style="min-height:80px" placeholder="Optional"></textarea></label>' +
      '<div class="row between" style="margin-bottom:16px"><div><b>Report anonymously</b><br><small class="muted">Your name is removed from the report.</small></div><button class="switch" id="na" aria-label="Anonymous"><i></i></button></div>' +
      '<button class="btn pri block" id="ns" disabled>' + I('send') + 'Submit report</button></div>' +
      '<div class="stack"><div class="callout redzone" style="margin:0">' + I('alert') + '<div><b>Someone hurt or in danger?</b>Stop work and call 911 first. Report the near miss after everyone is safe.</div></div><div class="card flat"><h3>What happens next</h3><ol style="margin:0;padding-left:20px;color:var(--muted)"><li>Your supervisor and KCR Safety get the report.</li><li>The gang discusses it at the next job briefing.</li><li>Lessons are shared in RailMate Lessons Learned.</li></ol><p class="dim" style="font-size:13px;margin:12px 0 0">Demo: the report is saved on this device only.</p></div></div></div></div>';
    function chk() { RM.$('#ns').disabled = !(sel && RM.$('#nd').value.trim().length > 4); }
    RM.$$('#nt .pill', el).forEach(function (b) { b.onclick = function () { sel = b.getAttribute('data-t'); RM.$$('#nt .pill').forEach(function (x) { x.classList.toggle('on', x === b); }); chk(); }; });
    RM.$('#nd').oninput = chk;
    RM.$('#na').onclick = function () { anon = !anon; this.classList.toggle('on', anon); };
    RM.$('#ns').onclick = function () {
      var ref = 'NM-' + String(Date.now()).slice(-5), list = RM.store.get('nearMiss', []);
      list.unshift({ ref: ref, at: new Date().toISOString(), type: sel, loc: RM.$('#nl').value, desc: RM.$('#nd').value, prevent: RM.$('#np').value, anon: anon, by: D.user.name }); RM.store.set('nearMiss', list);
      RM.modal('<div style="text-align:center"><div style="width:84px;height:84px;border-radius:50%;background:var(--green);color:#0b0e11;display:grid;place-items:center;margin:0 auto 14px">' + I('tick', 'xl') + '</div><h2>Thank you for reporting</h2><p class="muted">Reference <b class="y">' + ref + '</b>. Sent to your supervisor and KCR Safety (simulated).</p><a class="btn pri" href="#/safety" data-close>Back to Safety Center</a></div>');
    };
    return { crumbs: [['Safety Center', '#/safety'], 'Near-miss report'] };
  }
  RM.route('/safety/near-miss', nearMiss, { nav: 'safety' });
  RM.route('/near-miss', nearMiss, { nav: 'safety' });

  /* ---------- Right to refuse / good-faith challenge ---------- */
  RM.route('/safety/refuse', function (el) {
    var items = ['Brakes or parking brake', 'Horn or warning devices', 'Lights, beacons or reflectors', 'Seat, seat belt or operator controls', 'Windshield, wipers or visibility', 'Fire extinguisher', 'Hydraulic leak or hose damage', 'Machine does not respond correctly', 'Other unsafe condition'];
    var picked = {};
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Safety Center</div><h1>Good-faith challenge</h1><p>You have the right to refuse to operate a machine you believe is unsafe.</p></div>' + RM.SIM + '</div>' +
      '<div class="split"><div class="card"><div class="kv" style="margin-bottom:16px"><div>Machine</div><div>GRM3000T · KCR 3412</div><div>Operator</div><div>' + E(D.user.name) + '</div><div>Designated official ' + RM.SAMPLE + '</div><div>Dana Whitfield, Roadmaster</div></div>' +
      '<div class="field"><span>What is the concern?</span><div class="pills" id="gi">' + items.map(function (t, k) { return '<button class="pill" data-k="' + k + '">' + E(t) + '</button>'; }).join('') + '</div></div>' +
      '<label class="field"><span>Details</span><textarea id="gd" placeholder="Describe the condition and why it is unsafe"></textarea></label>' +
      '<button class="btn pri block" id="gs" disabled>' + I('hand') + 'Submit challenge &amp; tag machine</button></div>' +
      '<div class="stack"><div class="card" style="border-color:rgba(74,168,255,.35)"><div class="row between"><h3 style="margin:0">49 CFR 214.503</h3>' + RM.REAL('Federal rule') + '</div><p style="margin:10px 0 0;font-size:15.5px">An operator <b>may refuse to operate</b> a roadway maintenance machine if they make a good-faith determination that it does not comply with Subpart D or has a condition that inhibits its safe operation. <b>The employer shall not require the employee to operate it until the challenge is resolved.</b></p><p class="muted" style="font-size:14.5px;margin:10px 0 0">Employers must have written procedures to investigate and resolve challenges promptly and equitably, including the title and location of the designated official.</p><a class="src" href="docs/49-cfr-214-selected-sections.html#s214.503" target="_blank" rel="noopener">' + I('ext') + 'Read the full section</a></div>' +
      '<div class="callout tip" style="margin:0">' + I('shield') + '<div><b>No retaliation</b>Raising a safety concern in good faith is protected. The machine stays parked until the challenge is resolved.</div></div></div></div></div>';
    function chk() { RM.$('#gs').disabled = !Object.keys(picked).length; }
    RM.$$('#gi .pill', el).forEach(function (b) { b.onclick = function () { var k = b.getAttribute('data-k'); if (picked[k]) delete picked[k]; else picked[k] = 1; b.classList.toggle('on', !!picked[k]); chk(); }; });
    RM.$('#gs').onclick = function () {
      var ref = 'GFC-' + String(Date.now()).slice(-5), list = RM.store.get('challenges', []);
      list.unshift({ ref: ref, at: new Date().toISOString(), items: Object.keys(picked).map(function (k) { return items[k]; }), d: RM.$('#gd').value }); RM.store.set('challenges', list);
      RM.modal('<div style="text-align:center"><div style="width:84px;height:84px;border-radius:50%;background:var(--blue);color:#0b0e11;display:grid;place-items:center;margin:0 auto 14px">' + I('hand', 'xl') + '</div><h2>Challenge ' + ref + ' filed</h2><p class="muted">KCR 3412 is tagged <b style="color:var(--o)">DO NOT OPERATE</b> pending resolution. The designated official has been notified (simulated). You will not be required to operate this machine until it is resolved.</p><a class="btn pri" href="#/safety" data-close>Back to Safety Center</a></div>');
    };
    return { crumbs: [['Safety Center', '#/safety'], 'Right to refuse'] };
  }, { nav: 'safety' });

  /* ---------- Pre-task job briefing ---------- */
  RM.route('/briefing', function (el) {
    var done = RM.briefing();
    if (done) {
      el.innerHTML = '<div class="view"><div class="fixcard" style="max-width:820px;margin:10px auto"><div class="row between"><div><div class="n" style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:750">Job briefing complete</div><h1 style="margin:6px 0 0">Today\'s on-track safety</h1></div><span class="tag tag-real">' + RM.fmtTime(done.at) + '</span></div>' +
        '<div class="kv" style="margin-top:18px"><div>Work</div><div>' + E(done.job) + '</div><div>Limits</div><div>' + E(done.limits) + '</div><div>Protection</div><div>' + E(done.protection) + '</div><div>Authority</div><div>' + E(done.authority) + '</div><div>RWIC</div><div>' + E(done.rwic) + '</div><div>Adjacent track</div><div>' + E(done.adjacent) + '</div><div>Red zone</div><div>' + E(done.redzone) + ' ft</div><div>Radio</div><div>' + E(done.radio) + '</div><div>Hazards</div><div>' + E(done.hazards.join(', ') || 'None noted') + '</div><div>Crew</div><div>' + done.crew.length + ' acknowledged</div></div>' +
        '<div class="row wrap" style="margin-top:20px"><a class="btn pri" href="#/home">' + I('home') + 'Dashboard</a><button class="btn" id="rb">' + I('history') + 'Re-brief (conditions changed)</button></div></div></div>';
      RM.$('#rb').onclick = function () { RM.store.del('briefing'); RM.render(); };
      return { crumbs: ['Job briefing'] };
    }
    var S = { job: 'Production surfacing', protection: '', adjacent: '', hz: {}, ppe: {}, crew: {} };
    var prot = [['Exclusive track occupancy', '214.321'], ['Foul time', '214.323'], ['Train coordination', '214.325'], ['Inaccessible track', '214.327']];
    var crew = [[D.user.name, 'Machine operator (you)'], ['J. Ortega', 'RWIC / foreman'], ['T. Brennan', 'Regulator operator'], ['A. Kowalski', 'Trackman / spotter']];
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Pre-task</div><h1>Job briefing</h1><p>Confirm today\'s on-track safety with the crew before the machine fouls the track. 49 CFR 214.315 requires a job briefing before work begins.</p></div><span class="tag tag-sample">Sample work details</span></div>' +
      '<div class="progress" id="bp"></div>' +
      '<div class="split"><div class="stack">' +
      sec(1, 'Work &amp; limits', '<div class="field"><span>Today\'s work</span><div class="pills" id="bj">' + ['Production surfacing', 'Switch tamping', 'Spot tamping'].map(function (j, k) { return '<button class="pill ' + (k === 0 ? 'on' : '') + '">' + j + '</button>'; }).join('') + '</div></div><div class="row" style="gap:12px"><label class="field" style="flex:2"><span>Track &amp; limits</span><input id="bl" value="Middlesex Sub, Track 1, MP 237.4 to 241.0"></label><label class="field" style="flex:1"><span>RWIC</span><input id="br" value="J. Ortega"></label></div>') +
      sec(2, 'On-track protection', '<div class="opts" id="bpro">' + prot.map(function (p) { return '<button class="opt" data-v="' + p[0] + '"><span class="k">' + I('shield', 'sm') + '</span><span>' + p[0] + '<br><small class="dim" style="font-weight:600">49 CFR ' + p[1] + '</small></span></button>'; }).join('') + '</div><label class="field" style="margin:14px 0 0"><span>Authority / permit number</span><input id="ba" value="EC-1 No. 4471"></label>') +
      sec(3, 'Adjacent tracks', '<div class="pills" id="badj">' + ['No adjacent track', 'Adjacent track protected', 'Adjacent track NOT protected'].map(function (a) { return '<button class="pill" data-v="' + a + '">' + a + '</button>'; }).join('') + '</div><div id="adjwarn"></div>') +
      sec(4, 'Machine, red zone &amp; communication', '<div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Red zone (ft)</span><input id="bz" inputmode="numeric" value="25"></label><label class="field" style="flex:1"><span>Travel spacing (ft)</span><input id="bsp" inputmode="numeric" value="300"></label><label class="field" style="flex:1"><span>Radio</span><input id="bra" value="Channel 2"></label></div><div class="callout redzone" style="margin:0">' + I('redzone') + '<div><b>Red zone rule</b>No one enters the red zone of a working machine without first making contact with the operator and getting acknowledgment.</div></div>') +
      sec(5, 'Hazards today', '<div class="pills" id="bh">' + Object.keys(D.hazards).map(function (h) { return '<button class="pill" data-v="' + h + '">' + I(h, 'sm') + E(D.hazards[h]) + '</button>'; }).concat(['<button class="pill" data-v="wx">' + I('sun', 'sm') + 'Weather / heat</button>']).join('') + '</div>') +
      sec(6, 'PPE check', '<div class="pills" id="bppe">' + Object.keys(D.ppe).map(function (p) { return '<button class="pill" data-v="' + p + '">' + I(p, 'sm') + E(D.ppe[p]) + '</button>'; }).join('') + '</div><small class="dim">Tap each item once everyone on the crew has it.</small>') +
      sec(7, 'Crew acknowledgment', '<div class="stack" id="bc">' + crew.map(function (c, k) { return '<button class="cl-item" style="margin-top:8px" data-k="' + k + '"><span class="box">' + I('tick') + '</span><span class="tx"><b>' + E(c[0]) + '</b><small style="color:var(--muted)">' + E(c[1]) + '</small></span><span class="tag tag-mute">Tap to acknowledge</span></button>'; }).join('') + '</div><p class="muted" style="font-size:14px;margin:12px 0 0">Every crew member understands the protection, limits and red zone, and knows they can stop work at any time.</p>') +
      '</div><div class="stack stick"><div class="card"><h3>Briefing status</h3><div id="bstat"></div><button class="btn pri block" id="bgo" style="margin-top:14px" disabled>' + I('shield') + 'Complete briefing</button></div>' +
      '<div class="card flat"><h3>Emergency plan</h3><div class="kv"><div>Nearest ER</div><div>Altoona, 6 mi ' + RM.SAMPLE + '</div><div>Meet EMS at</div><div>Grade crossing MP 238.2</div><div>First aid kit</div><div>Cab, behind seat</div></div><a class="btn sm" style="margin-top:12px" href="#/safety">' + I('phone', 'sm') + 'Emergency contacts</a></div></div></div></div>';
    function sec(n, t, body) { return '<div class="card"><div class="row" style="margin-bottom:14px"><span class="pn" style="font-size:15px">' + n + '</span><h3 style="margin:0">' + t + '</h3></div>' + body + '</div>'; }
    function single(id, key, cb) { RM.$$('#' + id + ' [data-v], #' + id + ' .pill', el).forEach(function (b) { b.onclick = function () { RM.$$('#' + id + ' > *').forEach(function (x) { x.classList.remove('on'); x.style.borderColor = ''; }); b.classList.add('on'); if (b.classList.contains('opt')) b.style.borderColor = 'var(--y)'; S[key] = b.getAttribute('data-v') || b.textContent; if (cb) cb(); upd(); }; }); }
    function multi(id, key) { RM.$$('#' + id + ' [data-v]', el).forEach(function (b) { b.onclick = function () { var v = b.getAttribute('data-v'); if (S[key][v]) delete S[key][v]; else S[key][v] = 1; b.classList.toggle('on', !!S[key][v]); upd(); }; }); }
    single('bj', 'job'); single('bpro', 'protection');
    single('badj', 'adjacent', function () { RM.$('#adjwarn').innerHTML = /NOT/.test(S.adjacent) ? '<div class="callout adjacent">' + I('adjacent') + '<div><b>Adjacent track not protected</b>Keep machine components and people clear of the adjacent track. Assign a watchman/lookout and stop work and clear when a train approaches (49 CFR 214.336, 214.341).</div></div>' : ''; });
    multi('bh', 'hz'); multi('bppe', 'ppe');
    RM.$$('#bc [data-k]', el).forEach(function (b) { b.onclick = function () { var k = b.getAttribute('data-k'); if (S.crew[k]) delete S.crew[k]; else S.crew[k] = new Date().toISOString(); b.classList.toggle('ok', !!S.crew[k]); b.querySelector('.tag').textContent = S.crew[k] ? 'Acknowledged ' + RM.fmtTime(S.crew[k]) : 'Tap to acknowledge'; b.querySelector('.tag').className = 'tag ' + (S.crew[k] ? 'tag-real' : 'tag-mute'); upd(); }; });
    function upd() {
      var checks = [['Protection selected', !!S.protection], ['Adjacent tracks discussed', !!S.adjacent], ['Hazards reviewed', Object.keys(S.hz).length > 0], ['PPE confirmed', Object.keys(S.ppe).length === Object.keys(D.ppe).length], ['Crew acknowledged', Object.keys(S.crew).length === crew.length]];
      var n = checks.filter(function (c) { return c[1]; }).length;
      RM.$('#bp').innerHTML = checks.map(function (c) { return '<i class="' + (c[1] ? 'done' : '') + '"></i>'; }).join('');
      RM.$('#bstat').innerHTML = checks.map(function (c) { return '<div class="row" style="padding:7px 0;color:' + (c[1] ? 'var(--text)' : 'var(--dim)') + '"><span style="color:' + (c[1] ? 'var(--green)' : 'var(--dim)') + '">' + I(c[1] ? 'tick' : 'clock', 'sm') + '</span>' + c[0] + '</div>'; }).join('');
      RM.$('#bgo').disabled = n < checks.length;
    }
    upd();
    RM.$('#bgo').onclick = function () {
      var rec = { date: RM.today(), at: new Date().toISOString(), job: S.job, limits: RM.$('#bl').value, rwic: RM.$('#br').value, protection: S.protection, authority: RM.$('#ba').value, adjacent: S.adjacent, redzone: RM.$('#bz').value, spacing: RM.$('#bsp').value, radio: RM.$('#bra').value, hazards: Object.keys(S.hz).map(function (h) { return D.hazards[h] || 'Weather / heat'; }), crew: Object.keys(S.crew).map(function (k) { return crew[k][0]; }) };
      RM.store.set('briefing', rec);
      var next = sessionStorage.getItem('rm.next'); sessionStorage.removeItem('rm.next');
      RM.toast('Job briefing complete · crew acknowledged', 'shield');
      location.hash = next || '#/home';
    };
    return { crumbs: ['Job briefing'] };
  }, { nav: 'safety' });
})();
