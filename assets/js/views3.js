(function () {
  var RM = window.RM, D = RM.data, I = RM.ico, E = RM.esc;

  /* ---------- Documents ---------- */
  RM.route('/m/grm3000t/docs', function (el) {
    var f = 'all';
    function draw() {
      var list = D.docs.filter(function (d) { return f === 'all' || (f === 'real' ? d.real : !d.real); });
      el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Documents</div><h1>Documentation library</h1><p>Public manufacturer documents and federal regulations, plus placeholder entries showing where the owner\'s manuals live in the full product.</p></div></div>' +
        '<div class="pills" style="margin-bottom:18px">' + [['all', 'All documents'], ['real', 'Public documents'], ['sample', 'Sample entries']].map(function (p) { return '<button class="pill ' + (f === p[0] ? 'on' : '') + '" data-f="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>' +
        '<div class="grid g2">' + list.map(function (d) {
          var cv = d.cover ? '<img src="assets/img/' + d.cover + '.jpg" alt="" loading="lazy">' : '<span>' + I(d.kind === 'Regulation' ? 'cfr' : d.kind === 'Schematic' ? 'bolt' : 'book', 'lg') + '</span>';
          var meta = d.real ? d.fmt + ' · ' + d.size : (d.pages ? d.pages + ' pages · ' : '') + 'Placeholder';
          var inner = '<div class="cv">' + cv + '<span class="fmt">' + (d.fmt || 'PDF') + '</span></div><div class="tx"><div class="row wrap" style="gap:6px"><span class="tag tag-mute">' + E(d.kind) + '</span>' + (d.real ? RM.REAL('Public') : RM.SAMPLE) + '</div><b>' + E(d.title) + '</b><p>' + E(d.desc) + '</p><div class="meta">' + E(meta) + (d.real ? ' · opens in new tab' : '') + '</div></div>';
          return d.real ? '<a class="doc" href="' + d.href + '" target="_blank" rel="noopener">' + inner + '</a>' : '<button class="doc" data-d="' + d.id + '">' + inner + '</button>';
        }).join('') + '</div>' +
        '<div class="h-sub">Manufacturer links</div><div class="grid g2">' + D.links.map(function (l) { return '<a class="list-row" href="' + l[1] + '" target="_blank" rel="noopener"><div class="ic">' + I('ext') + '</div><div class="tx"><b>' + E(l[0]) + '</b><small>' + E(l[1].replace(/^https?:\/\//, '').split('/')[0]) + '</small></div></a>'; }).join('') + '</div></div>';
      RM.$$('[data-f]', el).forEach(function (b) { b.onclick = function () { f = b.getAttribute('data-f'); draw(); }; });
      RM.$$('[data-d]', el).forEach(function (b) { b.onclick = function () { sampleDoc(b.getAttribute('data-d')); }; });
    }
    draw();
    return { crumbs: ['Documents'] };
  }, { nav: 'docs', machine: true, section: 'docs' });
  function sampleDoc(id) {
    var d = D.docs.filter(function (x) { return x.id === id; })[0];
    RM.modal('<div class="modal-h"><div><div class="row wrap" style="gap:6px"><span class="tag tag-mute">' + E(d.kind) + '</span>' + RM.SAMPLE + '</div><h2 style="margin:10px 0 0">' + E(d.title) + '</h2></div><button class="iconbtn" data-close aria-label="Close">' + I('x') + '</button></div>' +
      '<div class="callout cfr" style="margin:0 0 16px">' + I('info') + '<div><b>Placeholder entry</b>' + E(d.desc) + ' In production, the railroad\'s licensed copy opens here, searchable and bookmarked.</div></div>' +
      (d.toc ? '<div class="h-sub" style="margin-top:0">Contents (illustrative)</div><div class="stack" style="--g:6px">' + d.toc.map(function (t, k) { return '<div class="list-row" style="min-height:52px;margin-top:6px"><span class="pn">' + (k + 1) + '</span><div class="tx"><b style="font-size:15.5px">' + E(t) + '</b></div><small class="dim">p. ' + (k * 38 + 3) + '</small></div>'; }).join('') + '</div>' : '') +
      '<div class="row" style="margin-top:18px"><button class="btn ghost" data-close>Close</button></div>', 'wide');
  }

  /* ---------- Training ---------- */
  RM.route('/m/grm3000t/training', function (el) {
    var tr = RM.store.get('training', {}), done = D.training.filter(function (t) { return tr[t.n]; }).length;
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Training</div><h1>GRM3000T operator tutorials</h1><p>The ten official operator tutorial topics, with lesson outlines and a quick knowledge check. Video players are placeholders in this demo.</p></div><div class="metric" style="min-width:220px"><span>Your progress</span><b>' + done + ' / ' + D.training.length + '</b><div class="bar"><i style="width:' + done * 10 + '%"></i></div></div></div>' +
      '<div class="grid g3">' + D.training.map(function (t) {
        return '<a class="vcard" href="#/m/grm3000t/training/' + t.n + '"><div class="ph"><img src="' + RM.img(t.img, true) + '" alt="" loading="lazy"><span class="num">PART ' + t.n + '</span>' + (tr[t.n] ? '<span class="done">' + I('tick', 'sm') + '</span>' : '') + '<span class="play"><span>' + I('playf') + '</span></span><span class="len">' + t.len + '</span></div><div class="bd"><b>' + E(t.title) + '</b><small>' + t.outline.length + ' topics · ' + t.quiz.length + '-question check</small></div></a>';
      }).join('') + '</div></div>';
    return { crumbs: ['Training'] };
  }, { nav: 'training', machine: true, section: 'training' });

  RM.route('/m/grm3000t/training/:n', function (el, n) {
    var t = D.training.filter(function (x) { return String(x.n) === n; })[0]; if (!t) { RM.go('#/m/grm3000t/training'); return; }
    var tr = RM.store.get('training', {}), answers = {};
    el.innerHTML = '<div class="view"><div class="split"><div><div class="player" id="pl"><img src="' + RM.img(t.img) + '" alt=""><div class="ov"><button class="play" id="pb" aria-label="Play">' + I('playf', 'xl') + '</button><b style="font-size:20px">Part ' + t.n + ': ' + E(t.title) + '</b><span class="tag tag-sample" style="background:rgba(0,0,0,.5)">Video placeholder</span><small style="color:#c9d1d8;max-width:440px">In the live version the official operator tutorial plays here. No video is included in this demo.</small></div><div class="scrub"><i id="sc"></i></div></div>' +
      '<div class="row between" style="margin-top:16px"><div><div class="kicker y" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:750">Operator tutorial · Part ' + t.n + ' of 10 · ' + t.len + '</div><h1 style="margin-top:4px">' + E(t.title) + '</h1></div>' + (tr[t.n] ? '<span class="tag tag-real">Completed</span>' : '') + '</div>' +
      '<div class="card" style="margin-top:14px"><h3>Knowledge check</h3><div class="quiz" id="qz">' + t.quiz.map(function (q, qi) { return '<div class="q"><b>' + (qi + 1) + '. ' + E(q[0]) + '</b><div class="a">' + q[1].map(function (o, oi) { return '<button data-q="' + qi + '" data-o="' + oi + '">' + E(o) + '</button>'; }).join('') + '</div></div>'; }).join('') + '</div><button class="btn pri" id="comp" disabled>' + I('grad') + 'Mark lesson complete</button></div></div>' +
      '<div class="stack"><div class="card"><div class="row between"><h3 style="margin:0">Lesson outline</h3>' + RM.REAL('From tutorial') + '</div><div class="steplist" style="margin-top:12px">' + t.outline.map(function (o, k) { return '<div class="sl' + (tr[t.n] ? ' done' : '') + '" role="listitem"><i>' + (k + 1) + '</i><span>' + E(o) + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="row">' + (t.n > 1 ? '<a class="btn block" href="#/m/grm3000t/training/' + (t.n - 1) + '">' + I('back') + 'Part ' + (t.n - 1) + '</a>' : '') + (t.n < 10 ? '<a class="btn block" href="#/m/grm3000t/training/' + (t.n + 1) + '">Part ' + (t.n + 1) + I('chev') + '</a>' : '') + '</div></div></div></div>';
    var timer;
    RM.$('#pb').onclick = function () {
      var sc = RM.$('#sc'), w = 0; RM.$('#pb').style.display = 'none';
      timer = setInterval(function () { w += 1.2; sc.style.width = Math.min(w, 100) + '%'; if (w >= 100) { clearInterval(timer); RM.$('#pb').style.display = ''; RM.toast('Placeholder playback finished', 'play'); } }, 60);
    };
    RM.cleanup.push(function () { clearInterval(timer); });
    RM.$$('#qz button', el).forEach(function (b) {
      b.onclick = function () {
        var qi = +b.getAttribute('data-q'), oi = +b.getAttribute('data-o'), right = t.quiz[qi][2] === oi;
        RM.$$('[data-q="' + qi + '"]', el).forEach(function (x) { x.classList.remove('right', 'wrong'); });
        b.classList.add(right ? 'right' : 'wrong'); answers[qi] = right;
        RM.$('#comp').disabled = !(t.quiz.every(function (_, k) { return answers[k]; }));
      };
    });
    RM.$('#comp').onclick = function () { tr[t.n] = new Date().toISOString(); RM.store.set('training', tr); RM.toast('Part ' + t.n + ' complete · ' + Object.keys(tr).length + ' of 10', 'grad'); RM.render(); };
    return { crumbs: [['Training', '#/m/grm3000t/training'], 'Part ' + t.n] };
  }, { nav: 'training', machine: true, section: 'training' });

  /* ---------- Lessons learned ---------- */
  RM.route('/m/grm3000t/lessons', function (el) {
    el.innerHTML = '<div class="view"><div class="sec-head"><div><div class="kicker">Lessons learned</div><h1>Lessons learned</h1><p>Real public investigations alongside sample crew write-ups, showing how field experience gets shared across gangs.</p></div></div>' +
      '<div class="grid g3">' + D.lessons.map(function (l) {
        return '<div class="lesson"><div class="ph ' + (l.img ? '' : 'noimg') + '">' + (l.img ? '<img src="' + RM.img(l.img, true) + '" alt="" loading="lazy">' : I(l.real ? 'alert' : 'bulb', 'xl')) + '</div><div class="bd"><div class="row wrap" style="gap:6px"><span class="tag tag-mute">' + E(l.sys) + '</span>' + (l.real ? RM.REAL('Public record') : RM.SAMPLE) + '</div><h3>' + E(l.title) + '</h3><small class="dim">' + E(l.date) + '</small><p style="margin-top:8px">' + E(l.body) + '</p><div class="h-sub" style="margin:8px 0 2px">Take-aways</div><ul>' + l.take.map(function (x) { return '<li>' + I('tick') + '<span>' + E(x) + '</span></li>'; }).join('') + '</ul>' + (l.src ? '<div class="src" style="margin-top:auto;padding-top:12px">' + I('file') + E(l.src) + '</div>' : '') + '</div></div>';
      }).join('') + '</div></div>';
    return { crumbs: ['Lessons learned'] };
  }, { nav: 'lessons', machine: true, section: 'lessons' });

  /* ---------- Ask RailMate (simulated AI) ---------- */
  function match(text) {
    var s = ' ' + text.toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').replace(/\s+/g, ' ') + ' ';
    var stop = { the: 1, a: 1, i: 1, do: 1, what: 1, is: 1, how: 1, can: 1, my: 1, to: 1, of: 1, and: 1, it: 1, on: 1, if: 1, for: 1, in: 1, use: 1, me: 1, does: 1, should: 1, when: 1, why: 1, t: 1, don: 1, have: 1, with: 1, from: 1, an: 1, i: 1, be: 1, are: 1, will: 1, you: 1, this: 1, that: 1, or: 1, at: 1, up: 1, there: 1, any: 1 };
    var best = null, bs = 0;
    D.ai.forEach(function (a) {
      var sc = 0;
      a.k.forEach(function (k) { if (s.indexOf(' ' + k.toLowerCase()) >= 0) sc += 3 + k.split(' ').length; });
      a.q.toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').split(' ').forEach(function (w) { if (w.length > 2 && !stop[w] && s.indexOf(' ' + w + ' ') >= 0) sc += 1; });
      if (sc > bs) { bs = sc; best = a; }
    });
    return bs >= 3 ? best : null;
  }
  RM.aiMatch = match;
  RM.route('/m/grm3000t/ask', function (el) {
    var cats = []; D.ai.forEach(function (a) { if (cats.indexOf(a.cat) < 0) cats.push(a.cat); });
    var busy = false, log = [];
    el.innerHTML = '<div class="view" style="padding-bottom:20px"><div class="chat"><div class="chat-main"><div class="chat-log" id="log"><div class="chat-welcome" id="welcome"><div class="orb">' + I('spark', 'xl') + '</div><h2>Ask RailMate</h2><p>Your GRM3000T expert on call. Ask about operation, faults, parts and substitutions, or safety rules.</p><span class="tag tag-sim">Simulated assistant · scripted answers</span></div></div>' +
      '<form class="chat-in" id="cf"><input id="ci" placeholder="Ask about the GRM3000T…" autocomplete="off"><button class="btn pri" aria-label="Send">' + I('send') + '</button></form></div>' +
      '<aside class="chat-side"><div class="h-sub" style="margin:4px 0 0">Try asking</div><div class="sugg">' + D.ai.map(function (a, k) { return '<button data-a="' + k + '"><small>' + E(a.cat) + (a.sim ? ' · simulated' : '') + '</small>' + E(a.q) + '</button>'; }).join('') + '</div>' +
      '<div class="card flat" style="font-size:14px"><b>About this demo</b><p class="muted" style="margin:6px 0 0">RailMate AI is simulated here: answers are pre-written from the public sources cited under each reply. Part substitution answers are illustrative only. Always follow the OEM manual and your supervisor.</p></div></aside></div></div>';
    var logEl = RM.$('#log');
    function scroll() { logEl.scrollTop = logEl.scrollHeight; }
    function ask(text, forced) {
      if (busy || !text.trim()) return; busy = true;
      var w = RM.$('#welcome'); if (w) w.remove();
      logEl.insertAdjacentHTML('beforeend', '<div class="msg me">' + E(text) + '</div>');
      logEl.insertAdjacentHTML('beforeend', '<div class="msg bot" id="pending"><div class="av">' + I('spark') + '</div><div class="bub"><span class="typing"><i></i><i></i><i></i></span></div></div>');
      scroll();
      var a = forced || match(text);
      var to = setTimeout(function () {
        var bub = RM.$('#pending .bub'); if (!bub) { busy = false; return; }
        var full = a ? a.a : D.aiFallback, i = 0;
        var t = setInterval(function () {
          i = Math.min(full.length, i + 4 + Math.floor(Math.random() * 4));
          bub.innerHTML = '<div class="caret-wrap">' + RM.md(full.slice(0, i)) + '</div>'; var lastEl = bub.querySelector('.caret-wrap > :last-child'); if (lastEl) lastEl.classList.add('caret');
          scroll();
          if (i >= full.length) {
            clearInterval(t); bub.innerHTML = RM.md(full);
            var extra = '';
            if (a && a.sim) extra += '<div class="callout cfr" style="font-size:14px">' + I('info') + '<div><b>Simulated answer</b>Substitution and stock details are illustrative. Confirm with the OEM spare parts catalog or the Plasser American parts hotline.</div></div>';
            if (a && a.go) extra += '<a class="btn sm" style="margin-top:12px" href="' + a.go[1] + '">' + I('chev', 'sm') + E(a.go[0]) + '</a>';
            extra += '<div class="srcs">' + (a ? a.src : ['No verified source']).map(function (s) { return '<span>' + I('file', 'sm') + ' ' + E(s) + '</span>'; }).join('') + (a && a.sim ? '<span class="tag tag-sim">Simulated</span>' : '') + '</div>';
            bub.insertAdjacentHTML('beforeend', extra);
            RM.$('#pending').removeAttribute('id'); busy = false; scroll();
          }
        }, 22);
        RM.cleanup.push(function () { clearInterval(t); });
      }, 650 + Math.random() * 500);
      RM.cleanup.push(function () { clearTimeout(to); });
    }
    RM.$('#cf').onsubmit = function (e) { e.preventDefault(); var v = RM.$('#ci').value; RM.$('#ci').value = ''; ask(v); };
    RM.$$('.sugg button', el).forEach(function (b) { b.onclick = function () { var a = D.ai[+b.getAttribute('data-a')]; ask(a.q, a); if (innerWidth < 980) RM.$('.chat-main').scrollIntoView({ behavior: 'smooth' }); }; });
    return { crumbs: ['Ask RailMate'] };
  }, { nav: 'ask', machine: true, section: 'ask' });
})();
