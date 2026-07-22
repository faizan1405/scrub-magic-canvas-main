import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, memo } from "react";
import { Reveal, AnimatedCounter } from "./reveal";
import { MagneticButton } from "./magnetic-button";
import aboutImg from "@/assets/about.jpg";
import founderImg from "@/assets/founder.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

/* ==================== ABOUT ==================== */
export const About = memo(function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-cream py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-12">
        <div className="md:col-span-5 md:sticky md:top-32 md:h-fit">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              src={aboutImg}
              alt="Travertine architectural detail"
              style={{ y }}
              className="absolute inset-0 h-[120%] w-full object-cover"
              width={1400}
              height={1700}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-eyebrow text-clay">01 — The Studio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-display text-5xl text-ink md:text-7xl">
              A studio devoted to <em className="text-clay">quiet luxury</em> and lasting form.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-cocoa font-light">
              Founded in 2008, Atelier is an international architecture and interior
              design studio guided by restraint, craft and the belief that great
              spaces reveal themselves slowly. Our work spans private residences,
              boutique hospitality and cultural landmarks across three continents.
            </p>
          </Reveal>

          <div className="hairline my-16" />

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {[
              { n: 240, s: "+", l: "Projects" },
              { n: 16, s: "", l: "Years" },
              { n: 42, s: "", l: "Awards" },
              { n: 18, s: "", l: "Countries" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.05}>
                <div>
                  <div className="text-display text-5xl text-ink md:text-6xl">
                    <AnimatedCounter to={s.n} suffix={s.s} />
                  </div>
                  <p className="mt-3 text-eyebrow text-cocoa/70">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="hairline my-16" />

          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <img
              src={founderImg}
              alt="Elena Marchetti, founder"
              className="h-20 w-20 rounded-full object-cover grayscale"
              width={1200}
              height={1500}
              loading="lazy"
            />
            <div>
              <p className="text-base italic text-cocoa font-serif leading-relaxed">
                "We don't design rooms. We design the moments that unfold inside them —
                the morning light, the pause, the quiet reveal."
              </p>
              <p className="mt-3 text-eyebrow text-clay">Elena Marchetti — Founder & Principal Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ==================== SERVICES ==================== */
const services = [
  { n: "01", t: "Residential Architecture", d: "Private residences that respond to landscape, light and lifestyle.", img: p2 },
  { n: "02", t: "Interior Design", d: "Considered interiors where every material earns its place.", img: p4 },
  { n: "03", t: "Commercial Spaces", d: "Workplaces and retail environments that elevate the everyday.", img: p5 },
  { n: "04", t: "Renovation & Remodeling", d: "Reawakening heritage buildings with contemporary sensitivity.", img: p6 },
  { n: "05", t: "Landscape Design", d: "Gardens, courtyards and terraces conceived as living architecture.", img: p1 },
  { n: "06", t: "Turnkey Execution", d: "End-to-end delivery from concept sketch to final key handover.", img: p3 },
];

export const Services = memo(function Services() {
  return (
    <section id="services" className="relative bg-sand py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-eyebrow text-clay">02 — Services</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl">
                A single studio. Six disciplines. One coherent language.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0 md:divide-x">
          {services.map((s, i) => (
            <ServiceRow key={s.n} {...s} even={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
});

function ServiceRow({ n, t, d, img }: { n: string; t: string; d: string; img: string; even?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col justify-between overflow-hidden p-10 md:min-h-[360px] md:p-14"
    >
      <motion.div
        initial={false}
        animate={{ opacity: hover ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 bg-ink"
      />
      <div className="relative z-10 flex items-start justify-between">
        <span
          className={`text-eyebrow transition-colors duration-500 ${
            hover ? "text-cream/60" : "text-clay"
          }`}
        >
          {n}
        </span>
        <div className="flex items-center gap-6">
          <motion.div
            initial={false}
            animate={{ opacity: hover ? 1 : 0.85, scale: hover ? 1.03 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-16 w-24 overflow-hidden rounded-sm md:h-20 md:w-32"
          >
            <img
              src={img}
              alt={t}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.svg
          animate={{ rotate: hover ? 45 : 0, color: hover ? "#f5f1e8" : "#2a2118" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M5 19L19 5M19 5H8M19 5V16" />
        </motion.svg>
        </div>
      </div>
      <div className="relative z-10 mt-16">
        <h3
          className={`text-display text-3xl transition-colors duration-500 md:text-5xl ${
            hover ? "text-cream" : "text-ink"
          }`}
        >
          {t}
        </h3>
        <p
          className={`mt-4 max-w-sm text-sm leading-relaxed transition-colors duration-500 ${
            hover ? "text-cream/70" : "text-cocoa"
          }`}
        >
          {d}
        </p>
      </div>
    </motion.div>
  );
}

/* ==================== PROJECTS ==================== */
const projects = [
  { img: p1, t: "Casa Lumen", cat: "Residential", loc: "Como, Italy" },
  { img: p3, t: "Hotel Aureus", cat: "Hospitality", loc: "Kyoto, Japan" },
  { img: p2, t: "Villa Serena", cat: "Residential", loc: "Provence, France" },
  { img: p5, t: "Meridian HQ", cat: "Commercial", loc: "New York, USA" },
  { img: p4, t: "Cucina Nera", cat: "Residential", loc: "Milan, Italy" },
  { img: p6, t: "Suite Verona", cat: "Hospitality", loc: "Amalfi, Italy" },
];
const filters = ["All", "Residential", "Commercial", "Hospitality"];

export const Projects = memo(function Projects() {
  const [f, setF] = useState("All");
  const list = f === "All" ? projects : projects.filter((p) => p.cat === f);
  return (
    <section id="projects" className="relative bg-cream py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-eyebrow text-clay">03 — Selected Work</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl">
                Featured projects
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x}
                onClick={() => setF(x)}
                className={`rounded-full border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-all ${
                  f === x
                    ? "border-ink bg-ink text-cream"
                    : "border-border bg-transparent text-cocoa hover:border-ink hover:text-ink"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.t}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-sm ${
                  i % 3 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-beige md:aspect-[16/10]">
                  <img
                    src={p.img}
                    alt={p.t}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1200}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-8 bottom-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <MagneticButton variant="ghost" className="!bg-cream !text-ink !border-cream">
                      View Project <span aria-hidden>→</span>
                    </MagneticButton>
                  </div>
                </div>
                <div className="flex items-baseline justify-between pt-6">
                  <div>
                    <h3 className="text-display text-2xl text-ink md:text-3xl">{p.t}</h3>
                    <p className="mt-1 text-eyebrow text-cocoa/70">
                      {p.cat} · {p.loc}
                    </p>
                  </div>
                  <span className="text-eyebrow text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

/* ==================== PROCESS ==================== */
const steps = [
  { n: "01", t: "Consultation", d: "We listen. We visit the site. We understand your rhythm of life." },
  { n: "02", t: "Concept Development", d: "Moodboards, sketches and a directional narrative for the project." },
  { n: "03", t: "Design Planning", d: "Technical drawings, materials, lighting and every joinery detail." },
  { n: "04", t: "Execution", d: "On-site supervision with our trusted network of master artisans." },
  { n: "05", t: "Final Delivery", d: "The moment we hand you the key — and the story truly begins." },
];

export const Process = memo(function Process() {
  return (
    <section id="process" className="relative bg-ink py-32 text-cream md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow text-clay">04 — Process</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-display text-5xl text-cream md:text-7xl">
            Five deliberate movements from first thought to final key.
          </h2>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-0 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-t border-cream/15 py-10 md:border-l md:border-t-0 md:pl-8 md:pr-6"
            >
              <div className="absolute left-0 top-0 h-px w-0 bg-clay md:h-full md:w-px">
                <motion.div
                  initial={{ scaleX: 0, scaleY: 0 }}
                  whileInView={{ scaleX: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full origin-left bg-clay md:origin-top"
                />
              </div>
              <p className="text-display text-6xl text-clay md:text-7xl">{s.n}</p>
              <h3 className="mt-6 text-display text-2xl text-cream md:text-3xl">{s.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/60">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==================== WHY ==================== */
const why = [
  "Bespoke Designs",
  "Premium Materials",
  "Experienced Architects",
  "Timeless Aesthetics",
  "On-Time Delivery",
  "Personalized Approach",
];
const whyDesc: Record<string, string> = {
  "Bespoke Designs": "Every project begins with a blank page. No templates, no repeats.",
  "Premium Materials": "Marble, oak, brass, linen — sourced from ateliers we've known for decades.",
  "Experienced Architects": "A tight-knit team with 15+ years designing across three continents.",
  "Timeless Aesthetics": "We design for the year 2050, not for next season's trend.",
  "On-Time Delivery": "Transparent scheduling and weekly reporting on every milestone.",
  "Personalized Approach": "One principal architect, personally, from day one to handover.",
};

export const Why = memo(function Why() {
  return (
    <section className="relative bg-cream py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow text-clay">05 — Why Atelier</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl">
            Details others overlook are the details we begin with.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {why.map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-sand/50 p-10"
            >
              <div className="mb-12 h-10 w-10 rounded-full border border-clay/40 transition-transform duration-500 group-hover:rotate-45">
                <div className="m-1 h-7 w-7 rounded-full bg-clay/10" />
              </div>
              <h3 className="text-display text-2xl text-ink md:text-3xl">{w}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cocoa">{whyDesc[w]}</p>
              <span className="absolute right-8 top-8 text-eyebrow text-clay/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==================== TESTIMONIALS ==================== */
const quotes = [
  { q: "Atelier turned a shell of a building into the most soulful home I've ever lived in. Every corner has intention.", a: "Sofia R.", r: "Private Client, Milan" },
  { q: "Working with Elena's team is like watching a symphony rehearse. Everything, eventually, resolves in beauty.", a: "James H.", r: "Hotelier, Kyoto" },
  { q: "They understood our brand better than we did. The office speaks for us before we ever open our mouths.", a: "Amara O.", r: "Creative Director, New York" },
  { q: "Rare to find a studio that speaks the language of restraint. Rarer still that they deliver on time.", a: "Luca B.", r: "Developer, Rome" },
];

export const Testimonials = memo(function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section className="relative overflow-hidden bg-sand py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <Reveal>
          <p className="text-eyebrow text-clay">06 — In Their Words</p>
        </Reveal>

        <div className="relative mt-16 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl"
            >
              <div className="mx-auto mb-8 text-display text-8xl text-clay/40 leading-none">"</div>
              <p className="text-display text-3xl italic text-ink md:text-4xl leading-tight">
                {quotes[i].q}
              </p>
              <p className="mt-10 text-eyebrow text-cocoa">
                {quotes[i].a} — <span className="text-clay">{quotes[i].r}</span>
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          {quotes.map((_, x) => (
            <button
              key={x}
              onClick={() => setI(x)}
              aria-label={`Testimonial ${x + 1}`}
              className={`h-px transition-all duration-500 ${
                x === i ? "w-16 bg-ink" : "w-8 bg-ink/30 hover:bg-ink/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==================== STYLE GUIDE ==================== */
export const StyleGuide = memo(function StyleGuide() {
  const swatches = [
    { name: "Cream", v: "#f5f1e8" },
    { name: "Sand", v: "#ece5d5" },
    { name: "Beige", v: "#d9cdb5" },
    { name: "Clay", v: "#b6906a" },
    { name: "Cocoa", v: "#5a4636" },
    { name: "Ink", v: "#2a2118" },
  ];
  return (
    <section className="relative bg-cream py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow text-clay">07 — Brand Language</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl">
            The palette behind the practice.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3">
          <Reveal>
            <p className="text-eyebrow text-cocoa/70">Typography</p>
            <div className="mt-6 space-y-8">
              <div>
                <p className="text-display text-7xl text-ink leading-none">Aa</p>
                <p className="mt-3 text-eyebrow text-clay">Cormorant · Serif Display</p>
              </div>
              <div>
                <p className="text-6xl font-light text-ink">Aa</p>
                <p className="mt-3 text-eyebrow text-clay">Inter · Sans Body</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-eyebrow text-cocoa/70">Palette</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {swatches.map((s) => (
                <div key={s.name}>
                  <div
                    className="aspect-square rounded-sm border border-border"
                    style={{ backgroundColor: s.v }}
                  />
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-cocoa">{s.name}</p>
                  <p className="text-[10px] text-cocoa/60">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-eyebrow text-cocoa/70">Materials</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Travertine", "Oak", "Linen", "Brass"].map((m) => (
                <div
                  key={m}
                  className="aspect-square rounded-sm bg-gradient-to-br from-beige to-clay/60 p-4 flex items-end"
                >
                  <p className="text-eyebrow text-ink">{m}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
});

/* ==================== FAQ ==================== */
const faqs = [
  { q: "What is your typical project timeline?", a: "Residential projects generally run 12–24 months from consultation through handover. Commercial and hospitality timelines are quoted after the first site visit." },
  { q: "Do you take on projects outside your listed cities?", a: "Yes. Roughly a third of our portfolio is international. We travel to the site as often as the project requires — no additional fee." },
  { q: "How is the fee structure organised?", a: "We work either on a percentage of construction cost or a fixed studio fee, agreed transparently after the concept phase. There are no hidden markups." },
  { q: "Can Atelier handle full turnkey delivery?", a: "Absolutely. We can lead the entire process — design, procurement, construction supervision and final styling — under a single point of contact." },
  { q: "Do you collaborate with existing architects?", a: "Frequently. We're comfortable joining a project mid-stream and adapting to the workflow already in place." },
];

export const FAQ = memo(function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-sand py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow text-clay">08 — Questions</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 text-display text-5xl text-ink md:text-7xl">
            Frequently asked.
          </h2>
        </Reveal>

        <div className="mt-20 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="group flex w-full items-center justify-between gap-8 py-8 text-left"
              >
                <span className="text-display text-2xl text-ink md:text-3xl">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/30 text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pr-16 text-base leading-relaxed text-cocoa">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==================== CONTACT ==================== */
function Field({ label, type = "text", area = false }: { label: string; type?: string; area?: boolean }) {
  const [v, setV] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || v.length > 0;
  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          active
            ? "top-0 text-[10px] uppercase tracking-[0.24em] text-clay"
            : "top-6 text-base text-cocoa/70"
        }`}
      >
        {label}
      </label>
      {area ? (
        <textarea
          rows={4}
          value={v}
          onChange={(e) => setV(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full resize-none border-0 border-b border-border bg-transparent pb-3 pt-6 text-base text-ink outline-none transition-colors focus:border-ink"
        />
      ) : (
        <input
          type={type}
          value={v}
          onChange={(e) => setV(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full border-0 border-b border-border bg-transparent pb-3 pt-6 text-base text-ink outline-none transition-colors focus:border-ink"
        />
      )}
    </div>
  );
}

export const Contact = memo(function Contact() {
  return (
    <section id="contact" className="relative bg-cream py-32 md:py-48" style={{ contentVisibility: "auto", containIntrinsicSize: "100px" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* CTA Banner */}
        <Reveal>
          <div className="relative mb-32 overflow-hidden rounded-2xl bg-ink px-8 py-24 text-center md:px-16 md:py-32">
            <div className="absolute inset-0 grain-bg opacity-40" />
            <p className="relative text-eyebrow text-clay">Begin the Journey</p>
            <h2 className="relative mt-8 text-display text-5xl text-cream md:text-8xl">
              Ready to design your <em className="text-clay">dream space</em>?
            </h2>
            <div className="relative mt-14 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="ghost" className="!bg-cream !text-ink !border-cream">
                Book Consultation →
              </MagneticButton>
              <MagneticButton variant="outline" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink">
                Start Your Project
              </MagneticButton>
              <MagneticButton variant="outline" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink">
                Get Free Quote
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal>
              <p className="text-eyebrow text-clay">09 — Contact</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-display text-5xl text-ink md:text-6xl">Let's talk.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-base text-cocoa leading-relaxed">
                Share a few details about your project. A principal architect will
                respond personally within two working days.
              </p>
            </Reveal>

            <form className="mt-16 space-y-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <Field label="Full name" />
                <Field label="Email address" type="email" />
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <Field label="Phone" type="tel" />
                <Field label="Project location" />
              </div>
              <Field label="Tell us about your project" area />
              <div className="pt-4">
                <MagneticButton variant="solid">
                  Send Enquiry <span aria-hidden>→</span>
                </MagneticButton>
              </div>
            </form>
          </div>

          <div className="space-y-12">
            <Reveal>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-sand">
                <iframe
                  title="Studio location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.180%2C45.462%2C9.200%2C45.478&layer=mapnik&marker=45.4700%2C9.1900"
                  className="h-full w-full grayscale"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {[
                { l: "Studio", v: "Via della Spiga 12\n20121 Milano, Italy" },
                { l: "Email", v: "studio@atelier.design" },
                { l: "Phone", v: "+39 02 4000 1200" },
                { l: "Hours", v: "Mon — Fri\n09:00 — 19:00 CET" },
              ].map((c) => (
                <Reveal key={c.l}>
                  <p className="text-eyebrow text-clay">{c.l}</p>
                  <p className="mt-3 whitespace-pre-line text-base text-ink">{c.v}</p>
                </Reveal>
              ))}
            </div>

            <div className="flex gap-4">
              {["Instagram", "Pinterest", "LinkedIn", "Are.na"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-eyebrow text-cocoa transition-colors hover:text-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ==================== FOOTER ==================== */
export const Footer = memo(function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 pb-8 text-cream md:pt-32">
      <div className="absolute inset-0 grain-bg opacity-30" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5 md:gap-8">
          <div className="col-span-2 md:col-span-2">
            <p className="text-display text-4xl text-cream">Atelier<span className="text-clay">.</span></p>
            <p className="mt-6 max-w-sm text-sm text-cream/60 leading-relaxed">
              Receive a quarterly journal of our latest work, material studies and
              travel notes.
            </p>
            <form className="mt-8 flex items-center border-b border-cream/25 pb-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 outline-none"
              />
              <button className="text-eyebrow text-clay hover:text-cream">Subscribe →</button>
            </form>
          </div>

          {[
            { t: "Studio", l: ["About", "Philosophy", "Team", "Journal"] },
            { t: "Work", l: ["Residential", "Commercial", "Hospitality", "Archive"] },
            { t: "Contact", l: ["Milano", "New York", "Tokyo", "Press"] },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-eyebrow text-clay">{c.t}</p>
              <ul className="mt-6 space-y-3">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="text-sm text-cream/70 transition-colors hover:text-cream">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} Atelier Architecture & Interior Design. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">Crafted in Milano.</p>
        </div>
      </div>
    </footer>
  );
});
