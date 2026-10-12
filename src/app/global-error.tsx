"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, background: "#12150a", color: "#f5f5f5" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ letterSpacing: "0.35em", color: "#A8B38A", fontSize: "0.75rem" }}>
            DRIPTHROAT
          </p>
          <h1 style={{ fontWeight: 300, fontSize: "1.75rem", marginTop: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", maxWidth: "24rem", marginTop: "1rem" }}>
            Restart the dev server with a clean cache:{" "}
            <code style={{ color: "#A8B38A" }}>npm run dev:clean</code>
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              border: "1px solid #A8B38A",
              background: "transparent",
              color: "#A8B38A",
              padding: "0.75rem 2rem",
              cursor: "pointer",
              letterSpacing: "0.15em",
              fontSize: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
