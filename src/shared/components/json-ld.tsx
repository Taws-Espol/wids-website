/**
 * Serialises a structured-data document for embedding in a `<script>`.
 *
 * `<` becomes its unicode escape. This is not cosmetic: every value reaching
 * here comes from the CMS, so without it an editor could type `</script>` into
 * a title and close the tag from inside the payload. Exported so the escaping
 * is covered by a test rather than trusted.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Renders a structured-data document as `application/ld+json`.
 *
 * A native `<script>` rather than `next/script`: JSON-LD is data, not
 * executable code, and Next's guide says so explicitly.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
