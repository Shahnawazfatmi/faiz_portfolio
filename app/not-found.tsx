import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <div>
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 800 }}>This page went <span className="grad-text">off-camera.</span></h1>
        <p style={{ color: "var(--text-2)", margin: "16px 0 28px" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary">Back to home</Link>
      </div>
    </main>
  );
}
