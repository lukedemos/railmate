# RailMate: GRM3000T equipment companion (demo)

Static demo for the fictional Keystone Central Railroad (KCR). Plain HTML/CSS/JS with no build step, no CDNs, and hash routing. It needs to be online only to open external links.

## Publish on GitHub Pages
1. Create a new GitHub repository, for example `railmate-demo`.
2. Upload **the contents of this folder** to the repo root: `index.html`, `assets/`, `docs/`, `.nojekyll` and this README. Use **Add file → Upload files** and drag everything in. Hidden `.nojekyll` may need `git` or the "create new file" option.
3. Go to **Settings → Pages**, then set **Source: Deploy from a branch**, **Branch: main / (root)**, and Save.
4. After about a minute the site is live at `https://<user>.github.io/railmate-demo/`.

Any other static host works too (Netlify drop, S3, an internal web server). Everything uses relative paths.

## Preview locally
```
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

## Demo notes
- Login is simulated, and any credentials work. The demo user is fully certified.
- **Profile** has two presenter cards. **Presenter: simulate an expired cert** locks the sections that need that cert. **Presenter: reset demo data** clears briefings, checklists, logs and training progress before a run, but keeps you signed in.
- Checklist sign-offs, briefings, near-miss reports and training progress are kept in the browser's localStorage only.
- "Ask RailMate" is scripted, not a live AI. Videos are placeholders.
- Items tagged **SAMPLE DATA** are illustrative. Part numbers, stock, fault codes, KCR contacts (555 numbers; 911 and the Plasser American parts hotline are real) and most service intervals are not real.
- Not affiliated with or endorsed by Plasser American. Not for operational use.
