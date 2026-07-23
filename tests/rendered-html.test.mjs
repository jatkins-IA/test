import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: {
        accept: "text/html",
        host: "localhost",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Patchbay demo", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Patchbay — A live lab for site changes<\/title>/i);
  assert.match(html, /Make changes\./);
  assert.match(html, /See them land\./);
  assert.match(html, /GitHub-backed demo/);
  assert.match(html, /Interaction playground/);
  assert.match(html, /data-testid="run-patch"/);
  assert.match(html, /public\/og\.jpg|\/og\.jpg/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("removes starter-only assets and keeps project metadata", async () => {
  const [page, layout, packageJson, hosting, socialImage] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    stat(new URL("../public/og.jpg", import.meta.url)),
  ]);

  assert.match(page, /^"use client";/);
  assert.match(page, /data-testid="run-patch"/);
  assert.match(page, /aria-pressed=/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /new URL\("\/og\.jpg", baseUrl\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"name": "patchbay-demo"/);
  assert.match(hosting, /"project_id": "appgprj_/);
  assert.ok(socialImage.size > 100_000);

  await assert.rejects(
    access(new URL("../app/_sites-preview", templateRoot)),
  );
});
