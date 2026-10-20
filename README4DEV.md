Page mock
===

https://user-images.githubusercontent.com/28250432/154175414-28294cef-3086-4e24-b87a-148a1310f89d.mp4

## Main htmls

- index.html
- application.html

## Dependencies

- Bootstrap 5.1.3 (Now, htmls import cdn with SRI)
- Font Awesome 5.15.4 (Same as above)
- Some css files such as common.css and overwrite-*.css (They are in this repository)

## Run

```bash
docker compose up --build web
# Open http://localhost:8080
```

## Lint and test

Tools run on Node.js 24 in Docker.

```bash
docker compose run --rm tools npm ci
docker compose run --rm tools npm run lint
docker compose run --rm tools npm test
```

- Lint: html-validate (htmls) and stylelint (css)
- Test: node:test checks the html structure (SRI of cdn assets, local assets exist, common `nav` and `footer`, no Bootstrap 4 leftovers)

## CI and deployment

- `.github/workflows/ci.yml` runs lint, test and docker build on push to main and pull request.
- `.github/workflows/pages.yml` deploys GitHub Pages only when it is run manually (workflow_dispatch).
- The Pages source of this repository is "GitHub Actions", so pushes do not deploy.

## Comments

- Html body contains three parts, `nav`, `main` and `footer`. `nav` and `footer` are common among two htmls.
- No additional JavaScript.
