import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const pages = ['index.html', 'application.html'];
const read = (page) => readFileSync(new URL(`../${page}`, import.meta.url), 'utf8');

// Picks link and script tags that load external (http) assets.
const externalAssetTags = (html) =>
  [...html.matchAll(/<(?:link|script)\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => /(?:href|src)="https?:/.test(tag));

for (const page of pages) {
  test(`${page}: cdn css and js have SRI and crossorigin`, () => {
    const tags = externalAssetTags(read(page));
    assert.ok(tags.length > 0);
    for (const tag of tags) {
      assert.match(tag, /integrity="sha384-[A-Za-z0-9+/=]+"/, tag);
      assert.match(tag, /crossorigin="anonymous"/, tag);
    }
  });

  test(`${page}: local css files exist`, () => {
    const hrefs = [...read(page).matchAll(/href="\.\/([^"]+\.css)"/g)].map(([, href]) => href);
    assert.ok(hrefs.length > 0);
    for (const href of hrefs) {
      assert.ok(existsSync(new URL(`../${href}`, import.meta.url)), href);
    }
  });

  test(`${page}: no Bootstrap 4 leftovers such as ml-auto and data-toggle`, () => {
    const html = read(page);
    assert.doesNotMatch(html, /\b(?:ml|mr|pl|pr)-(?:auto|\d)\b/);
    assert.doesNotMatch(html, /\sdata-(?:toggle|display)=/);
  });

  test(`${page}: headings start with one h1 and do not skip levels`, () => {
    const levels = [...read(page).matchAll(/<h([1-6])\b/g)].map(([, level]) => Number(level));
    assert.equal(levels.filter((level) => level === 1).length, 1);
    assert.equal(levels[0], 1);
    levels.reduce((previous, level) => {
      assert.ok(level <= previous + 1, `h${previous} -> h${level}`);
      return level;
    });
  });
}

// Spacing classes are tuned per page, so this compares the contents without the opening tag.
test('nav and footer contents are common among pages', () => {
  const part = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`))?.[1];
  const [first, ...rest] = pages.map(read);
  for (const tag of ['nav', 'footer']) {
    assert.ok(part(first, tag), tag);
    for (const html of rest) {
      assert.equal(part(html, tag), part(first, tag), tag);
    }
  }
});
