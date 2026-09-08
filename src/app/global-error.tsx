"use client";

/**
 * Last resort: this only renders when the root layout itself fails, and it
 * *replaces* that layout.
 *
 * So it declares its own `<html>` and `<body>`, and it cannot rely on anything
 * the app provides — global styles never reach it, which rules out Tailwind
 * classes and the design system, and the i18n provider is gone, which rules out
 * translations. Hence inline styles and English-only copy: this screen has to
 * work when everything else did not.
 *
 * `<title>` is set through React rather than the metadata API, which error
 * boundaries do not support because they are Client Components.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          display: "flex",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <title>WiDS Guayaquil</title>

        <main style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>

          <p style={{ color: "#555", marginBottom: "1.5rem" }}>
            The page could not be loaded. Please try again.
          </p>

          <button
            onClick={retry}
            style={{
              background: "#111",
              border: 0,
              borderRadius: "9999px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "0.6rem 1.4rem",
            }}
          >
            Try again
          </button>

          {error.digest && (
            <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "2rem" }}>
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
