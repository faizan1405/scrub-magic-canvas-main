import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, o as motion, r as useTransform, s as AnimatePresence, t as useInView } from "../_libs/framer-motion.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BzBZZaDF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
gsapWithCSS.registerPlugin(ScrollTrigger);
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis({
			duration: .9,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});
		lenis.on("scroll", ScrollTrigger.update);
		const tickerCb = (time) => lenis.raf(time * 1e3);
		gsapWithCSS.ticker.add(tickerCb);
		gsapWithCSS.ticker.lagSmoothing(0);
		return () => {
			gsapWithCSS.ticker.remove(tickerCb);
			lenis.destroy();
		};
	}, []);
	return null;
}
function CustomCursor() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [hover, setHover] = (0, import_react.useState)(false);
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const sx = useSpring(x, {
		damping: 35,
		stiffness: 500,
		mass: .2
	});
	const sy = useSpring(y, {
		damping: 35,
		stiffness: 500,
		mass: .2
	});
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		setVisible(true);
		let raf = 0;
		let lastTarget = null;
		const move = (e) => {
			x.set(e.clientX);
			y.set(e.clientY);
			const el = e.target;
			if (el !== lastTarget) {
				lastTarget = el;
				if (!raf) raf = requestAnimationFrame(() => {
					raf = 0;
					setHover(!!el.closest("a, button, [data-cursor='hover']"));
				});
			}
		};
		window.addEventListener("mousemove", move, { passive: true });
		return () => {
			window.removeEventListener("mousemove", move);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [x, y]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: {
			x: sx,
			y: sy,
			willChange: "transform"
		},
		className: "pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f1e8] transition-transform duration-200",
			style: {
				width: 10,
				height: 10,
				transform: `translate(-50%, -50%) scale(${hover ? 2.2 : 1})`
			}
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function MagneticButton({ children, className, variant = "solid", onClick, strength = .35 }) {
	const ref = (0, import_react.useRef)(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		damping: 15,
		stiffness: 200,
		mass: .3
	});
	const sy = useSpring(y, {
		damping: 15,
		stiffness: 200,
		mass: .3
	});
	const handleMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		x.set((e.clientX - cx) * strength);
		y.set((e.clientY - cy) * strength);
	};
	const handleLeave = () => {
		x.set(0);
		y.set(0);
	};
	const styles = {
		solid: "bg-ink text-cream hover:bg-cocoa border border-ink",
		outline: "bg-transparent text-ink hover:bg-ink hover:text-cream border border-ink/60",
		ghost: "bg-cream/60 backdrop-blur border border-beige text-ink hover:bg-cream"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		style: {
			x: sx,
			y: sy
		},
		onMouseMove: handleMove,
		onMouseLeave: handleLeave,
		onClick,
		whileTap: { scale: .96 },
		className: cn("group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500", styles, className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10 flex items-center gap-3",
			children
		})
	});
}
function Navigation() {
	const [solid, setSolid] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("about");
	const links = [
		{
			href: "#about",
			label: "About"
		},
		{
			href: "#services",
			label: "Services"
		},
		{
			href: "#projects",
			label: "Projects"
		},
		{
			href: "#process",
			label: "Process"
		},
		{
			href: "#contact",
			label: "Contact"
		}
	];
	(0, import_react.useEffect)(() => {
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const s = window.scrollY > window.innerHeight * 3.5;
				setSolid((prev) => prev === s ? prev : s);
				ticking = false;
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const ids = links.map((l) => l.href.slice(1));
		const obs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) setActive(e.target.id);
			});
		}, { rootMargin: "-40% 0px -55% 0px" });
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		});
		return () => obs.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
		initial: {
			y: -30,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: 1,
			delay: .4,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-cream/95 backdrop-blur-md border-b border-beige/60" : "bg-transparent"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 md:py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: `text-display text-2xl tracking-tight transition-colors duration-700 ${solid ? "text-ink" : "text-cream"}`,
					children: ["Atelier", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-clay",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						className: `group relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${solid ? "text-ink/80 hover:text-ink" : "text-cream/80 hover:text-cream"}`,
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${solid ? "bg-ink" : "bg-cream"} ${active === l.href.slice(1) ? "scale-x-100" : ""}` })]
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: solid ? "solid" : "ghost",
							className: "!px-6 !py-3 !text-[10px]",
							children: "Book Consultation"
						})
					})
				})
			]
		})
	});
}
var hero_mp4_asset_default = {
	version: 1,
	asset_id: "cf422929-7259-429e-b5ea-132ed02a16cc",
	project_id: "28c7daa7-efd9-4c6f-b4ac-07dab832254b",
	url: "/__l5e/assets-v1/cf422929-7259-429e-b5ea-132ed02a16cc/hero.mp4",
	r2_key: "a/v1/28c7daa7-efd9-4c6f-b4ac-07dab832254b/cf422929-7259-429e-b5ea-132ed02a16cc/hero.mp4",
	original_filename: "hero.mp4",
	size: 3089726,
	content_type: "video/mp4",
	created_at: "2026-07-22T13:44:22Z"
};
gsapWithCSS.registerPlugin(ScrollTrigger);
var phases = [
	{
		heading: "Spaces That Tell Your Story",
		sub: "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship."
	},
	{
		heading: "Where Vision Meets Precision",
		sub: "Every material, proportion, and detail is carefully curated to create spaces that inspire everyday living."
	},
	{
		heading: "Designed Around Your Lifestyle",
		sub: "From intimate residences to large commercial environments, every project reflects individuality and purpose."
	},
	{
		heading: "Experience Modern Luxury",
		sub: "Minimal aesthetics, premium finishes, intelligent layouts, and unforgettable experiences brought together beautifully."
	},
	{
		heading: "Let's Build Something Extraordinary",
		sub: "Transform your vision into an architectural masterpiece with Atelier's design expertise."
	}
];
function Hero() {
	const containerRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const [phase, setPhase] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		const container = containerRef.current;
		if (!video || !container) return;
		let videoReady = false;
		const state = {
			target: 0,
			current: 0,
			duration: 0
		};
		const setDur = () => {
			if (video.duration && !isNaN(video.duration)) state.duration = video.duration;
		};
		video.addEventListener("loadedmetadata", setDur);
		video.preload = "metadata";
		video.pause();
		const st = ScrollTrigger.create({
			trigger: container,
			start: "top top",
			end: "bottom bottom",
			scrub: true,
			onUpdate: (self) => {
				if (state.duration > 0) state.target = Math.min(state.duration - .001, self.progress * state.duration);
				const p = Math.min(4, Math.floor(self.progress * 5));
				setPhase((prev) => prev === p ? prev : p);
			}
		});
		let rafId = 0;
		const tick = () => {
			const diff = state.target - state.current;
			if (Math.abs(diff) > .005 && state.duration > 0) {
				state.current = diff > state.duration * .25 ? state.target : state.current + diff * .25;
				if (video.readyState >= 2) try {
					video.currentTime = state.current;
				} catch {}
			}
			rafId = requestAnimationFrame(tick);
		};
		const inViewObserver = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !videoReady) {
				videoReady = true;
				video.load();
				rafId = requestAnimationFrame(tick);
				inViewObserver.disconnect();
			}
		}, { threshold: .01 });
		inViewObserver.observe(container);
		return () => {
			inViewObserver.disconnect();
			cancelAnimationFrame(rafId);
			st.kill();
			video.removeEventListener("loadedmetadata", setDur);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: containerRef,
		id: "top",
		className: "relative",
		style: { height: "500vh" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen w-full overflow-hidden bg-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: hero_mp4_asset_default.url,
					muted: true,
					playsInline: true,
					preload: "none",
					disablePictureInPicture: true,
					className: "absolute inset-0 h-full w-full object-cover",
					style: {
						willChange: "transform",
						transform: "translateZ(0)",
						backfaceVisibility: "hidden"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-6 top-24 md:left-12 md:top-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-cream/70",
								children: "Atelier — Est. 2008"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-6 top-24 md:right-12 md:top-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-cream/70",
								children: "Milano · New York · Tokyo"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-8 flex items-center justify-between px-6 md:px-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-eyebrow text-cream/60",
									children: [String(phase + 1).padStart(2, "0"), " / 05"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: phases.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-px w-8 md:w-12 transition-all duration-500 ${i <= phase ? "bg-cream" : "bg-cream/25"}` }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow text-cream/60 hidden md:block",
									children: "Scroll"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 flex h-full items-center justify-center px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-4xl text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -12
								},
								transition: {
									duration: .5,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								style: { willChange: "transform, opacity" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-eyebrow mb-8 text-cream/70",
										children: ["Chapter ", String(phase + 1).padStart(2, "0")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-display text-cream text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
										children: phases[phase].heading
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-8 max-w-2xl text-base text-cream/80 md:text-lg font-light leading-relaxed",
										children: phases[phase].sub
									})
								]
							}, phase)
						})
					})
				})
			]
		})
	});
}
function AnimatedCounter({ to, suffix = "", duration = 2 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-20%"
	});
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		let start = 0;
		const step = (t) => {
			if (!start) start = t;
			const p = Math.min(1, (t - start) / (duration * 1e3));
			const eased = 1 - Math.pow(1 - p, 3);
			setN(Math.floor(eased * to));
			if (p < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}, [
		inView,
		to,
		duration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: [n, suffix]
	});
}
function Reveal({ children, delay = 0, y = 24, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-10%"
		},
		transition: {
			duration: .6,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		style: { willChange: "transform, opacity" },
		className,
		children
	});
}
var about_default = "/assets/about-DEls3RqU.jpg";
var founder_default = "/assets/founder-BNYafmE9.jpg";
var project_1_default = "/assets/project-1-BNG_MFXK.jpg";
var project_2_default = "/assets/project-2-ksWwTWZM.jpg";
var project_3_default = "/assets/project-3-BGEAU38W.jpg";
var project_4_default = "/assets/project-4-Dpw-Y8ig.jpg";
var project_5_default = "/assets/project-5-BAcnX9GX.jpg";
var project_6_default = "/assets/project-6-Dg6HskuA.jpg";
var About = (0, import_react.memo)(function About() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		ref,
		className: "relative overflow-hidden bg-cream py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-5 md:sticky md:top-32 md:h-fit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[4/5] overflow-hidden rounded-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: about_default,
						alt: "Travertine architectural detail",
						style: { y },
						className: "absolute inset-0 h-[120%] w-full object-cover",
						width: 1400,
						height: 1700,
						loading: "lazy",
						decoding: "async"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-clay",
						children: "01 — The Studio"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-8 text-display text-5xl text-ink md:text-7xl",
							children: [
								"A studio devoted to ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-clay",
									children: "quiet luxury"
								}),
								" and lasting form."
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 max-w-xl text-lg leading-relaxed text-cocoa font-light",
							children: "Founded in 2008, Atelier is an international architecture and interior design studio guided by restraint, craft and the belief that great spaces reveal themselves slowly. Our work spans private residences, boutique hospitality and cultural landmarks across three continents."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline my-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4",
						children: [
							{
								n: 240,
								s: "+",
								l: "Projects"
							},
							{
								n: 16,
								s: "",
								l: "Years"
							},
							{
								n: 42,
								s: "",
								l: "Awards"
							},
							{
								n: 18,
								s: "",
								l: "Countries"
							}
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * .05,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-display text-5xl text-ink md:text-6xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
									to: s.n,
									suffix: s.s
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-eyebrow text-cocoa/70",
								children: s.l
							})] })
						}, s.l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline my-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-8 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: founder_default,
							alt: "Elena Marchetti, founder",
							className: "h-20 w-20 rounded-full object-cover grayscale",
							width: 1200,
							height: 1500,
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base italic text-cocoa font-serif leading-relaxed",
							children: "\"We don't design rooms. We design the moments that unfold inside them — the morning light, the pause, the quiet reveal.\""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-eyebrow text-clay",
							children: "Elena Marchetti — Founder & Principal Architect"
						})] })]
					})
				]
			})]
		})
	});
});
var services = [
	{
		n: "01",
		t: "Residential Architecture",
		d: "Private residences that respond to landscape, light and lifestyle.",
		img: project_2_default
	},
	{
		n: "02",
		t: "Interior Design",
		d: "Considered interiors where every material earns its place.",
		img: project_4_default
	},
	{
		n: "03",
		t: "Commercial Spaces",
		d: "Workplaces and retail environments that elevate the everyday.",
		img: project_5_default
	},
	{
		n: "04",
		t: "Renovation & Remodeling",
		d: "Reawakening heritage buildings with contemporary sensitivity.",
		img: project_6_default
	},
	{
		n: "05",
		t: "Landscape Design",
		d: "Gardens, courtyards and terraces conceived as living architecture.",
		img: project_1_default
	},
	{
		n: "06",
		t: "Turnkey Execution",
		d: "End-to-end delivery from concept sketch to final key handover.",
		img: project_3_default
	}
];
var Services = (0, import_react.memo)(function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "relative bg-sand py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "02 — Services"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl",
						children: "A single studio. Six disciplines. One coherent language."
					})
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0 md:divide-x",
				children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceRow, {
					...s,
					even: i % 2 === 1
				}, s.n))
			})]
		})
	});
});
function ServiceRow({ n, t, d, img }) {
	const [hover, setHover] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		className: "group relative flex flex-col justify-between overflow-hidden p-10 md:min-h-[360px] md:p-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: false,
				animate: { opacity: hover ? 1 : 0 },
				className: "pointer-events-none absolute inset-0 bg-ink"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-eyebrow transition-colors duration-500 ${hover ? "text-cream/60" : "text-clay"}`,
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: false,
						animate: {
							opacity: hover ? 1 : .85,
							scale: hover ? 1.03 : 1
						},
						transition: {
							duration: .6,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "relative h-16 w-24 overflow-hidden rounded-sm md:h-20 md:w-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: t,
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
						animate: {
							rotate: hover ? 45 : 0,
							color: hover ? "#f5f1e8" : "#2a2118"
						},
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 19L19 5M19 5H8M19 5V16" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: `text-display text-3xl transition-colors duration-500 md:text-5xl ${hover ? "text-cream" : "text-ink"}`,
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-4 max-w-sm text-sm leading-relaxed transition-colors duration-500 ${hover ? "text-cream/70" : "text-cocoa"}`,
					children: d
				})]
			})
		]
	});
}
var projects = [
	{
		img: project_1_default,
		t: "Casa Lumen",
		cat: "Residential",
		loc: "Como, Italy"
	},
	{
		img: project_3_default,
		t: "Hotel Aureus",
		cat: "Hospitality",
		loc: "Kyoto, Japan"
	},
	{
		img: project_2_default,
		t: "Villa Serena",
		cat: "Residential",
		loc: "Provence, France"
	},
	{
		img: project_5_default,
		t: "Meridian HQ",
		cat: "Commercial",
		loc: "New York, USA"
	},
	{
		img: project_4_default,
		t: "Cucina Nera",
		cat: "Residential",
		loc: "Milan, Italy"
	},
	{
		img: project_6_default,
		t: "Suite Verona",
		cat: "Hospitality",
		loc: "Amalfi, Italy"
	}
];
var filters = [
	"All",
	"Residential",
	"Commercial",
	"Hospitality"
];
var Projects = (0, import_react.memo)(function Projects() {
	const [f, setF] = (0, import_react.useState)("All");
	const list = f === "All" ? projects : projects.filter((p) => p.cat === f);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "relative bg-cream py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "03 — Selected Work"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl",
						children: "Featured projects"
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: filters.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setF(x),
						className: `rounded-full border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-all ${f === x ? "border-ink bg-ink text-cream" : "border-border bg-transparent text-cocoa hover:border-ink hover:text-ink"}`,
						children: x
					}, x))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layout: true,
				className: "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "popLayout",
					children: list.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						layout: true,
						initial: {
							opacity: 0,
							y: 40
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						transition: {
							duration: .7,
							delay: i * .05,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: `group relative overflow-hidden rounded-sm ${i % 3 === 0 ? "md:col-span-2" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/3] overflow-hidden bg-beige md:aspect-[16/10]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.img,
									alt: p.t,
									loading: "lazy",
									decoding: "async",
									width: 1600,
									height: 1200,
									className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-x-8 bottom-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
										variant: "ghost",
										className: "!bg-cream !text-ink !border-cream",
										children: ["View Project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "→"
										})]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-display text-2xl text-ink md:text-3xl",
								children: p.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-eyebrow text-cocoa/70",
								children: [
									p.cat,
									" · ",
									p.loc
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-eyebrow text-clay",
								children: String(i + 1).padStart(2, "0")
							})]
						})]
					}, p.t))
				})
			})]
		})
	});
});
var steps = [
	{
		n: "01",
		t: "Consultation",
		d: "We listen. We visit the site. We understand your rhythm of life."
	},
	{
		n: "02",
		t: "Concept Development",
		d: "Moodboards, sketches and a directional narrative for the project."
	},
	{
		n: "03",
		t: "Design Planning",
		d: "Technical drawings, materials, lighting and every joinery detail."
	},
	{
		n: "04",
		t: "Execution",
		d: "On-site supervision with our trusted network of master artisans."
	},
	{
		n: "05",
		t: "Final Delivery",
		d: "The moment we hand you the key — and the story truly begins."
	}
];
var Process = (0, import_react.memo)(function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "process",
		className: "relative bg-ink py-32 text-cream md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "04 — Process"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 max-w-3xl text-display text-5xl text-cream md:text-7xl",
						children: "Five deliberate movements from first thought to final key."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-24 grid grid-cols-1 gap-0 md:grid-cols-5",
					children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-10%"
						},
						transition: {
							duration: .8,
							delay: i * .12,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "relative border-t border-cream/15 py-10 md:border-l md:border-t-0 md:pl-8 md:pr-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 top-0 h-px w-0 bg-clay md:h-full md:w-px",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										scaleX: 0,
										scaleY: 0
									},
									whileInView: {
										scaleX: 1,
										scaleY: 1
									},
									viewport: { once: true },
									transition: {
										duration: 1.4,
										delay: i * .12,
										ease: [
											.22,
											1,
											.36,
											1
										]
									},
									className: "h-full w-full origin-left bg-clay md:origin-top"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-display text-6xl text-clay md:text-7xl",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-display text-2xl text-cream md:text-3xl",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-cream/60",
								children: s.d
							})
						]
					}, s.n))
				})
			]
		})
	});
});
var why = [
	"Bespoke Designs",
	"Premium Materials",
	"Experienced Architects",
	"Timeless Aesthetics",
	"On-Time Delivery",
	"Personalized Approach"
];
var whyDesc = {
	"Bespoke Designs": "Every project begins with a blank page. No templates, no repeats.",
	"Premium Materials": "Marble, oak, brass, linen — sourced from ateliers we've known for decades.",
	"Experienced Architects": "A tight-knit team with 15+ years designing across three continents.",
	"Timeless Aesthetics": "We design for the year 2050, not for next season's trend.",
	"On-Time Delivery": "Transparent scheduling and weekly reporting on every milestone.",
	"Personalized Approach": "One principal architect, personally, from day one to handover."
};
var Why = (0, import_react.memo)(function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-cream py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "05 — Why Atelier"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl",
						children: "Details others overlook are the details we begin with."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8",
					children: why.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-10%"
						},
						transition: {
							duration: .7,
							delay: i * .06
						},
						whileHover: { y: -4 },
						className: "group relative overflow-hidden rounded-lg border border-border bg-sand/50 p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-12 h-10 w-10 rounded-full border border-clay/40 transition-transform duration-500 group-hover:rotate-45",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "m-1 h-7 w-7 rounded-full bg-clay/10" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-display text-2xl text-ink md:text-3xl",
								children: w
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-cocoa",
								children: whyDesc[w]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-8 top-8 text-eyebrow text-clay/60",
								children: String(i + 1).padStart(2, "0")
							})
						]
					}, w))
				})
			]
		})
	});
});
var quotes = [
	{
		q: "Atelier turned a shell of a building into the most soulful home I've ever lived in. Every corner has intention.",
		a: "Sofia R.",
		r: "Private Client, Milan"
	},
	{
		q: "Working with Elena's team is like watching a symphony rehearse. Everything, eventually, resolves in beauty.",
		a: "James H.",
		r: "Hotelier, Kyoto"
	},
	{
		q: "They understood our brand better than we did. The office speaks for us before we ever open our mouths.",
		a: "Amara O.",
		r: "Creative Director, New York"
	},
	{
		q: "Rare to find a studio that speaks the language of restraint. Rarer still that they deliver on time.",
		a: "Luca B.",
		r: "Developer, Rome"
	}
];
var Testimonials = (0, import_react.memo)(function Testimonials() {
	const [i, setI] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden bg-sand py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-6 text-center md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "06 — In Their Words"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-16 min-h-[280px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.blockquote, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -12
							},
							transition: {
								duration: .5,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "mx-auto max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto mb-8 text-display text-8xl text-clay/40 leading-none",
									children: "\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-display text-3xl italic text-ink md:text-4xl leading-tight",
									children: quotes[i].q
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-10 text-eyebrow text-cocoa",
									children: [
										quotes[i].a,
										" — ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-clay",
											children: quotes[i].r
										})
									]
								})
							]
						}, i)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 flex items-center justify-center gap-3",
					children: quotes.map((_, x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setI(x),
						"aria-label": `Testimonial ${x + 1}`,
						className: `h-px transition-all duration-500 ${x === i ? "w-16 bg-ink" : "w-8 bg-ink/30 hover:bg-ink/60"}`
					}, x))
				})
			]
		})
	});
});
var StyleGuide = (0, import_react.memo)(function StyleGuide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-cream py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "07 — Brand Language"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 max-w-3xl text-display text-5xl text-ink md:text-7xl",
						children: "The palette behind the practice."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow text-cocoa/70",
							children: "Typography"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-display text-7xl text-ink leading-none",
								children: "Aa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-eyebrow text-clay",
								children: "Cormorant · Serif Display"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-6xl font-light text-ink",
								children: "Aa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-eyebrow text-clay",
								children: "Inter · Sans Body"
							})] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: .1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-cocoa/70",
								children: "Palette"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-3 gap-3",
								children: [
									{
										name: "Cream",
										v: "#f5f1e8"
									},
									{
										name: "Sand",
										v: "#ece5d5"
									},
									{
										name: "Beige",
										v: "#d9cdb5"
									},
									{
										name: "Clay",
										v: "#b6906a"
									},
									{
										name: "Cocoa",
										v: "#5a4636"
									},
									{
										name: "Ink",
										v: "#2a2118"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-square rounded-sm border border-border",
										style: { backgroundColor: s.v }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[10px] uppercase tracking-widest text-cocoa",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-cocoa/60",
										children: s.v
									})
								] }, s.name))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: .2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-cocoa/70",
								children: "Materials"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-2 gap-3",
								children: [
									"Travertine",
									"Oak",
									"Linen",
									"Brass"
								].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-square rounded-sm bg-gradient-to-br from-beige to-clay/60 p-4 flex items-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-eyebrow text-ink",
										children: m
									})
								}, m))
							})]
						})
					]
				})
			]
		})
	});
});
var faqs = [
	{
		q: "What is your typical project timeline?",
		a: "Residential projects generally run 12–24 months from consultation through handover. Commercial and hospitality timelines are quoted after the first site visit."
	},
	{
		q: "Do you take on projects outside your listed cities?",
		a: "Yes. Roughly a third of our portfolio is international. We travel to the site as often as the project requires — no additional fee."
	},
	{
		q: "How is the fee structure organised?",
		a: "We work either on a percentage of construction cost or a fixed studio fee, agreed transparently after the concept phase. There are no hidden markups."
	},
	{
		q: "Can Atelier handle full turnkey delivery?",
		a: "Absolutely. We can lead the entire process — design, procurement, construction supervision and final styling — under a single point of contact."
	},
	{
		q: "Do you collaborate with existing architects?",
		a: "Frequently. We're comfortable joining a project mid-stream and adapting to the workflow already in place."
	}
];
var FAQ = (0, import_react.memo)(function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-sand py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: "08 — Questions"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 text-display text-5xl text-ink md:text-7xl",
						children: "Frequently asked."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 divide-y divide-border border-y border-border",
					children: faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(open === i ? null : i),
						className: "group flex w-full items-center justify-between gap-8 py-8 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display text-2xl text-ink md:text-3xl",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							animate: { rotate: open === i ? 45 : 0 },
							transition: { duration: .4 },
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/30 text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" })
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: {
								duration: .5,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pb-8 pr-16 text-base leading-relaxed text-cocoa",
								children: f.a
							})
						})
					})] }, i))
				})
			]
		})
	});
});
function Field({ label, type = "text", area = false }) {
	const [v, setV] = (0, import_react.useState)("");
	const [focus, setFocus] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: `pointer-events-none absolute left-0 transition-all duration-300 ${focus || v.length > 0 ? "top-0 text-[10px] uppercase tracking-[0.24em] text-clay" : "top-6 text-base text-cocoa/70"}`,
			children: label
		}), area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 4,
			value: v,
			onChange: (e) => setV(e.target.value),
			onFocus: () => setFocus(true),
			onBlur: () => setFocus(false),
			className: "w-full resize-none border-0 border-b border-border bg-transparent pb-3 pt-6 text-base text-ink outline-none transition-colors focus:border-ink"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value: v,
			onChange: (e) => setV(e.target.value),
			onFocus: () => setFocus(true),
			onBlur: () => setFocus(false),
			className: "w-full border-0 border-b border-border bg-transparent pb-3 pt-6 text-base text-ink outline-none transition-colors focus:border-ink"
		})]
	});
}
var Contact = (0, import_react.memo)(function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative bg-cream py-32 md:py-48",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "100px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1600px] px-6 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-32 overflow-hidden rounded-2xl bg-ink px-8 py-24 text-center md:px-16 md:py-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grain-bg opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative text-eyebrow text-clay",
						children: "Begin the Journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "relative mt-8 text-display text-5xl text-cream md:text-8xl",
						children: [
							"Ready to design your ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-clay",
								children: "dream space"
							}),
							"?"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-14 flex flex-wrap items-center justify-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
								variant: "ghost",
								className: "!bg-cream !text-ink !border-cream",
								children: "Book Consultation →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
								variant: "outline",
								className: "!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink",
								children: "Start Your Project"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
								variant: "outline",
								className: "!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink",
								children: "Get Free Quote"
							})
						]
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-clay",
						children: "09 — Contact"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-8 text-display text-5xl text-ink md:text-6xl",
							children: "Let's talk."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 max-w-md text-base text-cocoa leading-relaxed",
							children: "Share a few details about your project. A principal architect will respond personally within two working days."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-16 space-y-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-10 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email address",
									type: "email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-10 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									type: "tel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Project location" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Tell us about your project",
								area: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
									variant: "solid",
									children: ["Send Enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										children: "→"
									})]
								})
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-sand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Studio location",
								src: "https://www.openstreetmap.org/export/embed.html?bbox=9.180%2C45.462%2C9.200%2C45.478&layer=mapnik&marker=45.4700%2C9.1900",
								className: "h-full w-full grayscale",
								loading: "lazy"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-10 md:grid-cols-2",
							children: [
								{
									l: "Studio",
									v: "Via della Spiga 12\n20121 Milano, Italy"
								},
								{
									l: "Email",
									v: "studio@atelier.design"
								},
								{
									l: "Phone",
									v: "+39 02 4000 1200"
								},
								{
									l: "Hours",
									v: "Mon — Fri\n09:00 — 19:00 CET"
								}
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-clay",
								children: c.l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 whitespace-pre-line text-base text-ink",
								children: c.v
							})] }, c.l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-4",
							children: [
								"Instagram",
								"Pinterest",
								"LinkedIn",
								"Are.na"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-eyebrow text-cocoa transition-colors hover:text-ink",
								children: s
							}, s))
						})
					]
				})]
			})]
		})
	});
});
var Footer = (0, import_react.memo)(function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-ink pt-24 pb-8 text-cream md:pt-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grain-bg opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1600px] px-6 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-12 md:grid-cols-5 md:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-display text-4xl text-cream",
							children: ["Atelier", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-clay",
								children: "."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-sm text-sm text-cream/60 leading-relaxed",
							children: "Receive a quarterly journal of our latest work, material studies and travel notes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-8 flex items-center border-b border-cream/25 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "Your email",
								className: "w-full bg-transparent text-sm text-cream placeholder:text-cream/40 outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-eyebrow text-clay hover:text-cream",
								children: "Subscribe →"
							})]
						})
					]
				}), [
					{
						t: "Studio",
						l: [
							"About",
							"Philosophy",
							"Team",
							"Journal"
						]
					},
					{
						t: "Work",
						l: [
							"Residential",
							"Commercial",
							"Hospitality",
							"Archive"
						]
					},
					{
						t: "Contact",
						l: [
							"Milano",
							"New York",
							"Tokyo",
							"Press"
						]
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-clay",
					children: c.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: c.l.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "text-sm text-cream/70 transition-colors hover:text-cream",
						children: x
					}) }, x))
				})] }, c.t))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-cream/50",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Atelier Architecture & Interior Design. All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-cream/50",
					children: "Crafted in Milano."
				})]
			})]
		})]
	});
});
function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 80,
		damping: 25,
		restDelta: .01
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: { scaleX },
		className: "fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-clay"
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative bg-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleGuide, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { Index as component };
