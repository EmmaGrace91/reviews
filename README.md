# Reviews — Emma Stephenson

A one-page site at **https://reviews.emmastephensonmusic.com** where people can
leave a review of a performance or of a Songtales song, and where the approved
reviews are shown.

It is deliberately separate from the Songtales site and from the Linktree: it
has its own repo, its own subdomain, and neither of the others is touched.

## Run it locally

```bash
npm install
npm run dev     # http://localhost:4330
npm run build   # writes dist/
```

## The two review forms

Both are Tally forms. The URLs live in one place, `src/site.ts`:

| Form | URL |
| --- | --- |
| Performance review | https://tally.so/r/QoM1Y8 |
| Song review | https://tally.so/r/RWdx54 |

Each form asks for a star rating, the review, the occasion, whether the review
may be published, and whether to credit the reviewer by name or anonymously.

## Publishing a review

Reviews are **not** pulled from Tally automatically. They are copied across by
hand, on purpose: it means nothing is ever published unless the reviewer ticked
*"Yes — on my website and social media"*, and only with the credit they chose.

1. Open the form's Submissions tab in Tally.
2. Check the reviewer answered **yes** to "May I share this publicly?".
3. Add an entry to `REVIEWS` in `src/reviews.ts`, newest first. Set `name` to
   `null` if they chose "Keep me anonymous", and `occasion` to `null` if they
   left it blank.
4. Commit and push. The site rebuilds and deploys itself.

The reviews section does not appear at all while `REVIEWS` is empty, and the
All / Performances / Songs filter only appears once both kinds are present.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

### One-time setup

1. **Settings → Pages → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** `reviews.emmastephensonmusic.com`,
   then tick **Enforce HTTPS** once the certificate is issued (can take an hour).
3. **DNS, at Namecheap** — add one record and change nothing else:

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | CNAME | `reviews` | `emmagrace91.github.io.` | Automatic |

`public/CNAME` already holds the domain, so step 2 should fill itself in.

## Structure

| Path | What it is |
| --- | --- |
| `src/site.ts` | Form URLs, Linktree URL, page metadata |
| `src/reviews.ts` | The reviews themselves, and their types |
| `src/pages/index.astro` | The whole page and its styles |
| `src/layouts/Layout.astro` | `<head>`, meta tags |
| `src/styles/global.css` | Design tokens shared with the Songtales site |
