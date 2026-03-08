import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Loader2, Menu, X, Youtube } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiX } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContactForm, useSubscribe } from "./hooks/useQueries";

/* ─── Fade-in wrapper ───────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Countdown Timer ───────────────────────────────────────────────────── */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ─── Navbar ────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "The Film", href: "#film" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/5 shadow-noir-md"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" data-ocid="nav.link" className="flex items-center">
          <img
            src="/assets/uploads/Screenshot-2026-02-03-at-2.36.58-PM-1.png"
            alt="Silent Mind Creations"
            className="h-10 w-auto object-contain brightness-100"
          />
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="text-sm tracking-cinema text-white/60 hover:text-white transition-colors duration-300 uppercase font-body font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#newsletter"
            data-ocid="nav.primary_button"
            className="text-sm tracking-cinema uppercase font-body font-semibold border border-white/30 px-5 py-2 text-white/80 hover:text-white hover:border-white/70 hover:bg-white/5 transition-all duration-300"
          >
            Notify Me
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-cinema text-white/60 hover:text-white transition-colors uppercase font-body font-medium py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById("newsletter")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm tracking-cinema uppercase font-body font-semibold border border-white/30 px-5 py-2.5 text-white/80 text-center hover:text-white hover:border-white/70 transition-all duration-300 mt-2"
              >
                Notify Me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden grain bg-black"
    >
      {/* Background: uploaded "IN MY HEAD" title image */}
      <div className="absolute inset-0">
        <img
          src="/assets/uploads/Screenshot-2026-02-03-at-3.07.40-PM-2.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
      {/* Side vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="text-xs tracking-cinema uppercase text-white/50 font-body font-medium mb-6 cinematic-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <span>Silent Mind Creations Presents</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <img
            src="/assets/uploads/Screenshot-2026-02-03-at-3.07.40-PM-2.png"
            alt="In My Head"
            className="w-full max-w-2xl mx-auto object-contain"
            style={{ filter: "brightness(1.1) contrast(1.05)" }}
          />
        </motion.div>

        <motion.p
          className="text-sm tracking-cinema uppercase text-white/40 font-body font-medium mb-12 cinematic-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span>Coming Christmas 2026</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#newsletter"
            data-ocid="hero.primary_button"
            className="inline-block border border-white/50 text-white px-10 py-4 text-xs tracking-cinema uppercase font-body font-semibold hover:bg-white hover:text-black transition-all duration-400 hover:shadow-glow-white"
          >
            Notify Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-white/30 text-[10px] tracking-cinema uppercase font-body">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Countdown Section ─────────────────────────────────────────────────── */
function CountdownSection() {
  const target = new Date("2026-12-25T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(target);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="bg-black py-20 md:py-28 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-center text-[10px] tracking-cinema uppercase text-white/30 font-body mb-12">
            — Releasing In —
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {units.map(({ label, value }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={value}
                      className="font-display text-[clamp(4rem,10vw,8rem)] font-black text-white leading-none block tabular-nums"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-white/[0.015] -z-10 border border-white/[0.04]" />
                </div>
                <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body mt-3">
                  {label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Film Section ──────────────────────────────────────────────────────── */
function FilmSection() {
  const details = [
    { label: "Genre", value: "Psychological Thriller" },
    { label: "Release Date", value: "Christmas Day — December 25, 2026" },
    { label: "Rating", value: "Coming Soon" },
    { label: "Runtime", value: "TBA" },
  ];

  return (
    <section id="film" className="py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body mb-16 text-center">
            — The Film —
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Movie Poster */}
          <FadeIn delay={0.1}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-white/[0.02] to-white/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/assets/uploads/Screenshot-2026-02-03-at-3.07.40-PM-2.png"
                alt="In My Head — Title"
                className="w-full max-w-md mx-auto lg:max-w-full object-contain shadow-noir-lg border border-white/5 bg-black"
              />
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/20" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-white/20" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-white/20" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/20" />
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={0.25}>
            <div className="flex flex-col justify-center lg:pt-8">
              <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body mb-3">
                Silent Mind Creations
              </p>
              <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-black text-white leading-none tracking-tight mb-6">
                IN MY HEAD
              </h2>

              <div className="w-16 h-px bg-white/20 mb-8" />

              <p className="text-white/55 font-body text-base leading-relaxed mb-10 max-w-lg">
                What happens when the mind turns against itself?{" "}
                <em>In My Head</em> is a gripping psychological thriller that
                follows one man's descent into the labyrinth of his own
                consciousness. As reality fractures and memories blur, the line
                between truth and delusion dissolves — and the greatest threat
                may already be inside.
              </p>

              {/* Details Table */}
              <div className="space-y-4 mb-10">
                {details.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-baseline gap-4 border-b border-white/[0.06] pb-4"
                  >
                    <span className="text-[10px] tracking-cinema uppercase text-white/30 font-body min-w-[100px]">
                      {label}
                    </span>
                    <span className="text-sm text-white/75 font-body font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#newsletter"
                data-ocid="film.primary_button"
                className="inline-block self-start border border-white/30 text-white/80 px-8 py-3.5 text-xs tracking-cinema uppercase font-body font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                Get Notified
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-[oklch(0.06_0_0)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-[10px] tracking-cinema uppercase text-white/25 font-body mb-8">
            — About The Studio —
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative inline-block mb-8">
            <img
              src="/assets/uploads/Screenshot-2026-02-03-at-2.36.58-PM-1.png"
              alt="Silent Mind Creations"
              className="h-16 w-auto object-contain opacity-70 mx-auto"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <blockquote className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white/80 leading-relaxed italic mb-12 tracking-wide">
            "Cinema for the Thinking Mind."
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="w-px h-16 bg-white/10 mx-auto mb-12" />
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="font-body text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            Silent Mind Creations is an independent film production company
            founded by Akshath Kumar, dedicated to crafting bold,
            thought-provoking cinema. Founded on the belief that film is the
            most powerful mirror of the human condition, we tell stories that
            linger long after the credits roll.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="font-body text-sm text-white/30 mt-6 max-w-xl mx-auto">
            <a
              href="mailto:silentmindcreations@gmail.com"
              className="hover:text-white/60 transition-colors"
              data-ocid="about.link"
            >
              silentmindcreations@gmail.com
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              { value: "2025", label: "Founded" },
              { value: "1", label: "Production" },
              { value: "0", label: "Awards" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[oklch(0.06_0_0)] py-8 px-6">
                <p className="font-display text-4xl font-black text-white mb-2">
                  {value}
                </p>
                <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Newsletter Section ────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending, isSuccess, isError } = useSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe(email, {
      onSuccess: () => {
        toast.success(
          "You're on the list! We'll notify you when In My Head arrives.",
          {
            style: {
              background: "#111",
              border: "1px solid #333",
              color: "#fff",
            },
          },
        );
        setEmail("");
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.", {
          style: {
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
          },
        });
      },
    });
  };

  return (
    <section
      id="newsletter"
      className="py-24 md:py-32 border-t border-white/5 bg-black relative overflow-hidden"
    >
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-display text-[20vw] font-black text-white/[0.015] leading-none whitespace-nowrap">
          NOTIFY
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body mb-4">
            — Stay Connected —
          </p>
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] font-black text-white mb-4 tracking-tight">
            Be First To Know
          </h2>
          <p className="font-body text-white/45 text-base mb-12 leading-relaxed">
            Be the first to know when <em>In My Head</em> arrives. Early access,
            trailers, and exclusive behind-the-scenes content — straight to your
            inbox.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="newsletter.input"
              className="flex-1 bg-white/[0.03] border-white/15 text-white placeholder:text-white/25 font-body text-sm py-6 px-5 focus:border-white/40 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
            />
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="newsletter.submit_button"
              className="bg-white text-black hover:bg-white/90 font-body text-xs tracking-cinema uppercase font-semibold px-8 py-6 rounded-none border-0 transition-all duration-300 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          {isSuccess && (
            <p
              className="text-white/50 text-sm font-body mt-4"
              data-ocid="newsletter.success_state"
            >
              ✓ You're subscribed. We'll be in touch.
            </p>
          )}
          {isError && (
            <p
              className="text-white/40 text-sm font-body mt-4"
              data-ocid="newsletter.error_state"
            >
              Something went wrong. Please try again.
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Contact Section ───────────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const {
    mutate: submitForm,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(form, {
      onSuccess: () => {
        toast.success(
          "Your message has been sent. We'll be in touch shortly.",
          {
            style: {
              background: "#111",
              border: "1px solid #333",
              color: "#fff",
            },
          },
        );
        setForm({ name: "", email: "", message: "" });
        reset();
      },
      onError: () => {
        toast.error("Failed to send. Please try again.", {
          style: {
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
          },
        });
      },
    });
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[oklch(0.06_0_0)] border-t border-white/5"
    >
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <p className="text-[10px] tracking-cinema uppercase text-white/30 font-body mb-4 text-center">
            — Get In Touch —
          </p>
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] font-black text-white text-center mb-4 tracking-tight">
            Contact Us
          </h2>
          <p className="font-body text-white/40 text-sm text-center mb-4 leading-relaxed">
            For press inquiries, partnerships, or general questions about Silent
            Mind Creations.
          </p>
          <p className="font-body text-white/30 text-sm text-center mb-12">
            <a
              href="mailto:silentmindcreations@gmail.com"
              className="hover:text-white/60 transition-colors"
              data-ocid="contact.link"
            >
              silentmindcreations@gmail.com
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          {isSuccess ? (
            <motion.div
              data-ocid="contact.success_state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 bg-white/[0.02] p-10 text-center"
            >
              <p className="font-display text-2xl font-light text-white mb-3">
                Message Received
              </p>
              <p className="text-white/40 font-body text-sm mb-6">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => reset()}
                data-ocid="contact.secondary_button"
                className="text-xs tracking-cinema uppercase text-white/40 hover:text-white/70 transition-colors font-body"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.panel"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[10px] tracking-cinema uppercase text-white/30 font-body mb-2"
                >
                  Name
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="contact.input"
                  placeholder="Your full name"
                  className="bg-white/[0.02] border-white/10 text-white placeholder:text-white/20 font-body text-sm py-5 px-4 focus:border-white/30 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[10px] tracking-cinema uppercase text-white/30 font-body mb-2"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="contact.input"
                  placeholder="your@email.com"
                  className="bg-white/[0.02] border-white/10 text-white placeholder:text-white/20 font-body text-sm py-5 px-4 focus:border-white/30 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] tracking-cinema uppercase text-white/30 font-body mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.textarea"
                  placeholder="Tell us about your inquiry..."
                  rows={5}
                  className="bg-white/[0.02] border-white/10 text-white placeholder:text-white/20 font-body text-sm py-4 px-4 focus:border-white/30 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full resize-none"
                />
              </div>

              {isError && (
                <p
                  className="text-white/40 text-xs font-body"
                  data-ocid="contact.error_state"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                data-ocid="contact.submit_button"
                className="w-full bg-white text-black hover:bg-white/90 font-body text-xs tracking-cinema uppercase font-semibold py-6 rounded-none border-0 transition-all duration-300 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-black border-t border-white/[0.05] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-10 border-b border-white/[0.05]">
          {/* Logo */}
          <img
            src="/assets/uploads/Screenshot-2026-02-03-at-2.36.58-PM-1.png"
            alt="Silent Mind Creations"
            className="h-10 w-auto object-contain opacity-55"
          />

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            {["Home", "The Film", "About", "Contact"].map((label) => {
              const href = `#${label.toLowerCase().replace("the film", "film")}`;
              return (
                <a
                  key={label}
                  href={href}
                  data-ocid="footer.link"
                  className="text-[10px] tracking-cinema uppercase text-white/25 hover:text-white/60 transition-colors font-body"
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-ocid="footer.link"
              className="text-white/25 hover:text-white/70 transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              data-ocid="footer.link"
              className="text-white/25 hover:text-white/70 transition-colors"
            >
              <SiX size={14} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              data-ocid="footer.link"
              className="text-white/25 hover:text-white/70 transition-colors"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[10px] tracking-cinema uppercase text-white/20 font-body">
            Cinema for the Thinking Mind.
          </p>
          <p className="text-[10px] text-white/15 font-body">
            © {year} Silent Mind Creations. All Rights Reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/15 hover:text-white/30 transition-colors font-body"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Root ──────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-black" style={{ colorScheme: "dark" }}>
      <Toaster position="bottom-right" />
      <Navbar />
      <main>
        <HeroSection />
        <CountdownSection />
        <FilmSection />
        <AboutSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
