import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import { JsonLd, personSchema, websiteSchema } from "@/components/JsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="grid-overlay" /><div className="noise" />
      </div>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <Effects />
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}
