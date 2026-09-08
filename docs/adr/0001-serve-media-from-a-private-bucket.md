# 1. Serve media from a private bucket through the app

Date: 2026-09-07

Status: Accepted

## Context

Media files lived in a public S3-compatible bucket fronted by
`cdn.taws.espol.edu.ec`, and `media.url` rows held absolute URLs pointing at it.

The bucket was world-readable. Anyone with a filename could fetch any uploaded
file directly, so the media collection's `read` access rule governed the
document but not the bytes. There was no way for the application to restrict a
file, because the canonical URL was not ours to gate.

The CDN hostname had also leaked into the codebase: sixteen page components and
twelve `seed.ts` entries hardcoded it, in files that have nothing to do with
storage.

## Decision

**The bucket is private.** It blocks all public access and has no public URL.

**Files are served by the application.** The `s3Storage` plugin runs *without*
`disablePayloadAccessControl`, so Payload serves the bytes from its own route
and applies the media collection's `read` access to them.

**The URL is relative** — `/api/media/file/<filename>` — rather than an absolute
URL pointing at our own domain. Relative means same origin, no hostname compiled
into the application, and `next/image` treating it as a local path in every
environment (local, preview, production) without per-environment configuration.

## Consequences

### The application now pays the egress the CDN used to absorb

This is the real cost of the decision. Every image byte is streamed by the app
process from object storage instead of being served by a CDN edge. Latency and
bandwidth move onto the origin.

Two things reduce the blast radius, neither of which eliminates it:

- `upload.modifyResponseHeaders` on the media collection sets
  `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`. The S3
  adapter sets `Content-Type`, `ETag` and range headers but no `Cache-Control`
  at all, so without this every view would revalidate against the origin.
- The TTL is deliberately short. Payload reuses filenames when an editor
  replaces an image, so a long immutable TTL would pin stale bytes in caches we
  cannot purge.

If image traffic becomes a problem, the options are a CDN in front of the app
(not the bucket), or `signedDownloads` — which was rejected here because it
reintroduces absolute, expiring URLs into rendered HTML.

### `media.url` is not the source of truth

The cloud-storage plugin attaches an `afterRead` hook to the `url` field that
recomputes the value from `generateFileURL` on every read whenever the document
has a filename. The stored column is ignored. It survives only as a fallback for
documents with no filename.

Migration `20260907_120000_relative_media_urls` normalises the column anyway, so
that anything reading the database directly — raw SQL, a dump, an export,
another service — is not told a lie. That migration is cleanup, not the fix.

### Media read access must keep returning a boolean

`checkFileAccess` only looks up a document when read access returns a
where-clause *object* or the request carries a `?prefix=` param. Because media
`read` returns boolean `true`, the file route serves any object in the bucket
without requiring a matching document.

The static page images depend on this: `about-hero.webp` and its siblings are
objects in the bucket with no media document, and they are now referenced as
`/api/media/file/about-hero.webp`.

**Tightening media read access to a query constraint would 403 exactly those
images**, while document-backed media kept working — a confusing partial
failure. If read access ever needs to become conditional, those files must first
be given real media documents or moved into `public/`.

### Objects sit at the bucket root, with no prefix

The `wids/` prefix existed only to namespace a shared public bucket. The private
bucket holds nothing else, so the prefix earns nothing and is dropped: objects
are copied to the root, and the collection's `prefix` is `""`.

This makes the `prefix` column load-bearing in a way `url` is not. Storage keys
are built as `docPrefix || collectionPrefix`, and `getFilePrefix` resolves
`docPrefix` from the stored column when no `?prefix=` param is present. Rows
holding the old `'wids'` would win over the empty collection prefix and keep
pointing at a path that no longer exists, so the migration clears them and
resets the column default.

`prefix` is kept as an explicit `""` rather than removed. The plugin only
injects the `prefix` field when the option is defined, so omitting it would drop
`media.prefix` from the schema while the column still exists in the database.
Worse, during a deploy `payload migrate` runs before the new container takes
over, so a dropped column would break media reads in the still-running old
release. An empty prefix keeps schema and database aligned and resolves keys to
the root.

Removing the column outright is a reasonable follow-up once the cutover has
settled, when it can be done on its own rather than during a bucket switch.

## Alternatives considered

**Keep the bucket public, only change the URL to relative.** Rejected: files
stay readable directly from the bucket, so nothing is secured — it only hides
the CDN hostname.

**Signed URLs via `signedDownloads`.** Rejected: reintroduces absolute, expiring
URLs, which breaks `next/image` caching and puts a hostname back into the
rendered HTML. Worth revisiting if egress becomes painful.

**Absolute URLs built from `APP_URL`.** Rejected: needs correct per-environment
configuration to avoid preview deployments serving production URLs, and buys
nothing over a relative path for same-origin assets.

**Move the sixteen static page images into `public/assets/images/`.** Rejected:
they are large photographic assets that belong in object storage rather than the
git repository, and serving them through the same media route keeps one
mechanism rather than two.
