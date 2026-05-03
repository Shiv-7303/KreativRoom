"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, HTMLMotionProps, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Star, X, Check, Play, Menu, Eye, Users, Clock, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";




// --- Icons ---
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- Components ---

type ButtonProps = HTMLMotionProps<"button"> & { variant?: 'primary' | 'accent' | 'outline' | 'icon' };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children, variant = 'primary', className, ...props
}, ref) => {
  const base = "inline-flex items-center justify-center font-bold transition-colors duration-300 focus:outline-none";
  const variants = {
    primary: "bg-[#1a1a1a] text-white hover:bg-[#1400FF] hover:text-white rounded-full px-6 py-3",
    accent: "bg-gradient-to-r from-[#1400FF] to-[#796eff] text-white hover:opacity-90 shadow-[0_0_20px_rgba(20,0,255,0.3)] rounded-full px-6 py-3",
    outline: "bg-white text-[#1a1a1a] border border-[#e0e0e0] hover:bg-[#1400FF] hover:text-white hover:border-[#1400FF] rounded-full px-6 py-3",
    icon: "bg-[#1a1a1a] text-white hover:bg-[#1400FF] hover:text-white rounded-full w-14 h-14 flex items-center justify-center group"
  };
  return (
    <motion.button
      ref={ref}
      className={cn(base, variants[variant], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = "Button";

const SectionReveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};



// ─── Pricing Toggle Component ────────────────────────────────────────────────
const PLANS = {
  monthly: [
    {
      name: 'Basic',
      tagline: 'For beginners & small brands who need execution, not strategy.',
      price: 899,
      reels: '10 Reels',
      ytVideos: '',
      features: [
        'Premium editing only',
        'Hook optimization',
        'Subtitles + reel covers',
        '2-platform repurposing (IG → Shorts)',
        'Fast delivery & revisions',
      ],
      cta: 'Get Basic Plan',
      highlight: false,
      badge: null,
    },
    {
      name: 'Advanced',
      tagline: 'For personal brands, coaches & businesses who want reach + positioning.',
      price: 1699,
      reels: '16 Reels',
      ytVideos: '+ 2 YT videos',
      features: [
        'Content & hook strategy',
        'Structured scripting support',
        'Premium video editing',
        'IG & YouTube management',
        '4 Platforms repurposing',
        'YouTube SEO optimization',
        'Up to 1M+ views (90 days)',
      ],
      cta: 'Get Advanced Plan',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Premium',
      tagline: 'For founders, coaches, consultants & high-ticket businesses.',
      price: 2899,
      reels: '25 Reels',
      ytVideos: '+ 4 YT videos',
      features: [
        'Full personal brand strategy',
        'Done-for-you scripting',
        'Premium editing on all videos',
        'Multi-platform management',
        'YouTube SEO + channel growth',
        'Monthly strategy call',
        'Up to 5M+ views (90 days)',
      ],
      cta: 'Get Premium Plan',
      highlight: false,
      badge: null,
    },
  ],
  yearly: [
    {
      name: 'Basic',
      tagline: 'For beginners & small brands who need execution, not strategy.',
      price: 800,
      reels: '15 Reels',
      ytVideos: '',
      features: [
        'Premium editing only',
        'Hook optimization',
        'Subtitles + reel covers',
        '2-platform repurposing (IG → Shorts)',
        'Fast delivery & revisions',
      ],
      cta: 'Get Basic Plan',
      highlight: false,
      badge: null,
    },
    {
      name: 'Advanced',
      tagline: 'For personal brands, coaches & businesses who want reach + positioning.',
      price: 1529,
      reels: '20 Reels',
      ytVideos: '+ 3 YT videos',
      features: [
        'Content & hook strategy',
        'Structured scripting support',
        'Premium video editing',
        'IG & YouTube management',
        '4 Platforms repurposing',
        'YouTube SEO optimization',
        'Up to 1M+ views (90 days)',
      ],
      cta: 'Get Advanced Plan',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Premium',
      tagline: 'For founders, coaches, consultants & high-ticket businesses.',
      price: 2600,
      reels: '30 Reels',
      ytVideos: '+ 6 YT videos',
      features: [
        'Full personal brand strategy',
        'Done-for-you scripting',
        'Premium editing on all videos',
        'Multi-platform management',
        'YouTube SEO + channel growth',
        'Monthly strategy call',
        'Up to 5M+ views (90 days)',
      ],
      cta: 'Get Premium Plan',
      highlight: false,
      badge: null,
    },
  ],
};

// Animated price that counts up/down on plan change
const AnimatedPrice = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;

    const duration = 500;
    const steps = 30;
    const stepTime = duration / steps;
    const diff = to - from;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + diff * eased));
      if (step >= steps) { setDisplay(to); clearInterval(timer); }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
};

// Animated reel count that counts up/down
const AnimatedReelCount = ({ value, label }: { value: number; label: string }) => {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;

    const duration = 500;
    const steps = 25;
    const stepTime = duration / steps;
    const diff = to - from;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + diff * eased));
      if (step >= steps) { setDisplay(to); clearInterval(timer); }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{display} {label}</>;
};

const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? PLANS.yearly : PLANS.monthly;

  // Parse reel count from string like "15 Reels"
  const getReelCount = (reelStr: string) => parseInt(reelStr.split(' ')[0], 10);
  const getYTCount = (ytStr: string) => {
    if (!ytStr) return 0;
    const m = ytStr.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  };
  const monthlyPlans = PLANS.monthly;

  return (
    <>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`font-bold text-base transition-colors ${!isYearly ? 'text-[#1A1A1A]' : 'text-[#888]'}`}>Monthly</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1400FF] ${isYearly ? 'bg-[#1400FF]' : 'bg-[#D0D0D0]'}`}
          aria-label="Toggle billing period"
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
            style={{ left: isYearly ? '34px' : '2px' }}
          />
        </button>
        <span className={`font-bold text-base transition-colors flex items-center gap-2 ${isYearly ? 'text-[#1A1A1A]' : 'text-[#888]'}`}>
          Yearly
          <span className="text-xs font-black text-white bg-[#1400FF] px-2 py-0.5 rounded-full">10% OFF</span>
        </span>
      </div>

      {isYearly && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-[#555] font-medium mb-8 -mt-6"
        >
          More content = more visibility = faster results. That&apos;s why our long-term clients grow faster.
        </motion.p>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => {
          const mPlan = monthlyPlans[i];
          const reelVal = getReelCount(plan.reels);
          const mReelVal = getReelCount(mPlan.reels);
          const ytVal = getYTCount(plan.ytVideos);
          const mYtVal = getYTCount(mPlan.ytVideos);

          if (plan.highlight) {
            return (
              <div key={plan.name} className="bg-[#1A1A1A] text-white p-10 rounded-[40px] border border-[#1400FF] shadow-[0_0_40px_rgba(20,0,255,0.4)] relative hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1400FF] to-[#796eff] text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg whitespace-nowrap">{plan.badge}</div>
                <h3 className="text-3xl font-black mb-2 text-[#1400FF]">{plan.name}</h3>
                <p className="text-white/60 font-medium mb-6 pb-6 border-b border-white/20 text-sm leading-relaxed">{plan.tagline}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-black text-white">$</span>
                  <span className="text-6xl font-black text-white"><AnimatedPrice value={plan.price} /></span>
                  <span className="text-white/50 font-bold">/mo</span>
                </div>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-start gap-3 font-medium text-white text-sm">
                    <Check className="w-4 h-4 text-[#1400FF] shrink-0 mt-0.5" />
                    <AnimatedReelCount value={reelVal} label="Reels" />
                    {ytVal > 0 && <>&nbsp;+&nbsp;<AnimatedReelCount value={ytVal} label="YT videos" /></>}
                  </li>
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 font-medium text-white text-sm">
                      <Check className="w-4 h-4 text-[#1400FF] shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20${plan.name}%20Plan`, '_blank')}
                  className="w-full h-14 text-base font-black rounded-full bg-gradient-to-r from-[#1400FF] to-[#796eff] text-white hover:opacity-90 transition-opacity"
                >
                  {plan.cta}
                </button>
              </div>
            );
          }

          return (
            <DottedContainer key={plan.name} as="div" className="bg-white p-10 rounded-[40px] border border-[#E0E0E0] shadow-xl hover:shadow-[0_0_20px_rgba(20,0,255,0.15)] transition-shadow duration-300 h-full">
              <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
              <p className="text-[#4A4A4A] font-medium mb-6 pb-6 border-b border-[#E0E0E0] text-sm leading-relaxed">{plan.tagline}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-black">$</span>
                <span className="text-6xl font-black"><AnimatedPrice value={plan.price} /></span>
                <span className="text-[#4A4A4A] font-bold">/mo</span>
              </div>
              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3 font-medium text-[#1A1A1A] text-sm">
                  <Check className="w-4 h-4 text-[#1400FF] shrink-0 mt-0.5" />
                  <AnimatedReelCount value={reelVal} label="Reels" />
                  {ytVal > 0 && <>&nbsp;+&nbsp;<AnimatedReelCount value={ytVal} label="YT videos" /></>}
                </li>
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 font-medium text-[#1A1A1A] text-sm">
                    <Check className="w-4 h-4 text-[#1400FF] shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20${plan.name}%20Plan`, '_blank')}
                className="w-full h-14 text-base font-black rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                {plan.cta}
              </button>
            </DottedContainer>
          );
        })}
      </div>
    </>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const DottedContainer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }>(({ children, className, as: Component = "section", ...props }, ref) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    e.currentTarget.style.setProperty('--bg-x', `${xPos * 30}px`);
    e.currentTarget.style.setProperty('--bg-y', `${yPos * 30}px`);
  };

  return (
    <Component
      ref={ref}
      className={cn("relative group", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.setProperty('--bg-x', `0px`);
        e.currentTarget.style.setProperty('--bg-y', `0px`);
      }}
      {...props}
    >
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-[-50px] bg-[radial-gradient(#1400ff_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.08] transition-transform duration-200 ease-out"
          style={{ transform: 'translate(var(--bg-x, 0px), var(--bg-y, 0px))' }}
        />
      </div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
});
DottedContainer.displayName = "DottedContainer";

const InteractiveGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Hover Glow Mask */}
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20,0,255,0.15), transparent 80%)`
        }}
      />
    </div>
  );
};

type ProcessStep = {
  num: string;
  title: string;
  desc: string;
};

const ProcessCard = ({ index, step, scrollYProgress, mobileMode = false }: { index: number, step: ProcessStep, scrollYProgress?: ReturnType<typeof useScroll>["scrollYProgress"], mobileMode?: boolean }) => {
  const ranges = [
    [0.10, 0.20],
    [0.20, 0.30],
    [0.30, 0.40],
    [0.40, 0.50]
  ];

  const start = ranges[index]?.[0] ?? 0;
  const end = ranges[index]?.[1] ?? 1;

  // Always call hooks (Rules of Hooks) — safe dummy fallback when mobileMode
  const { scrollYProgress: dummyScroll } = useScroll();
  const prog = scrollYProgress ?? dummyScroll;

  // 4-point range: locked at 0 before start, animates start→end, locked at 1 after end
  // This prevents framer-motion extrapolating past the end point (which causes y to go
  // negative and cards to fly off-screen under overflow-hidden)
  const opacity = useTransform(prog, [0, start, end, 1], [0, 0, 1, 1]);
  const y = useTransform(prog, [0, start, end, 1], [40, 40, 0, 0]);

  const c = { border: 'border-[#1400FF]/30', shadow: 'shadow-[0_0_20px_rgba(20,0,255,0.15)]', iconBg: 'bg-[#1400FF]/10', text: 'text-[#1400FF]', ring: 'border-[#1400FF]', shadowRing: 'shadow-[0_0_15px_#1400FF]' };

  if (mobileMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`glass-card p-6 rounded-3xl w-full border ${c.border} ${c.shadow} bg-gradient-to-b from-white to-[#F9F9F9] relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1400FF] to-[#796eff] flex items-center justify-center font-black text-xl text-white mb-4 relative z-10 shadow-md">
          {step.num}
        </div>
        <h3 className="text-2xl font-black text-[#1A1A1A] mb-2 relative z-10">{step.title}</h3>
        <p className="text-[#1A1A1A] font-medium leading-relaxed relative z-10">{step.desc}</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col relative pt-16 md:pt-20">
      <motion.div
        style={{ opacity, scale: opacity }}
        className={`hidden md:block absolute top-[24px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 ${c.ring} rounded-full ${c.shadowRing} z-10`}
      />
      <motion.div style={{ opacity, y }} className={`glass-card p-6 md:p-8 rounded-3xl w-full border ${c.border} ${c.shadow} bg-gradient-to-b from-white to-[#F9F9F9] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-[#1400FF] to-[#796eff] flex items-center justify-center font-black text-xl text-white mb-6 relative z-10 shadow-md`}>
          {step.num}
        </div>
        <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 relative z-10">{step.title}</h3>
        <p className="text-[#1A1A1A] font-medium leading-relaxed relative z-10">{step.desc}</p>
      </motion.div>
    </div>
  );
};

// --- HeroFormPanel ---

const HERO_STEPS = [
  { label: "On Boarding", desc: "Client intake & creative brief", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  { label: "We Research", desc: "Niche, hooks & script strategy", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
  { label: "You Shoot", desc: "Raw footage — phone is enough", color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" },
  { label: "We Edit", desc: "Premium post-production magic", color: "#1400FF", bg: "rgba(20,0,255,0.15)" },
  { label: "You Grow 🚀", desc: "Content goes live & converts", color: "#10B981", bg: "rgba(16,185,129,0.15)" },
];

const HeroFormPanel = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let step = 0;

    const advance = () => {
      step += 1;
      if (step <= HERO_STEPS.length) {
        setVisibleCount(step);
        timers.push(setTimeout(advance, 1000));
      } else {
        // All steps visible — pause 2s then reset
        timers.push(setTimeout(() => {
          setVisibleCount(0);
          setCycleKey(k => k + 1);
        }, 2000));
      }
    };

    // Brief initial pause before first step
    timers.push(setTimeout(advance, 700));
    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  const progress = Math.round((visibleCount / HERO_STEPS.length) * 100);

  return (
    <>
      {/* ── DESKTOP form card (hidden < lg) ── */}
      <div className="hidden lg:flex items-center justify-end w-full" style={{ minHeight: '520px' }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(10,10,40,0.55)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1.5px solid rgba(255,255,255,0.28)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(100,80,255,0.15)',
        }}>
          {/* macOS-style title bar */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            padding: '14px 20px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <div style={{ display: 'flex', gap: '7px' }}>
              {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}` }} />
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', marginLeft: '8px' }}>
              KreativRoom · Dashboard
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '22px 22px 22px' }}>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Your Content Journey
            </div>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '18px' }}>
              Workflow in Progress
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>...</motion.span>
            </div>

            {/* Step rows — FIXED height to prevent layout shift (5 × 62px + 4 × 10px gap = 350px, +10px buffer) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '360px', overflow: 'hidden' }}>
              <AnimatePresence>
                {HERO_STEPS.slice(0, visibleCount).map((step, i) => {
                  const isDone = i < visibleCount - 1;
                  return (
                    <motion.div
                      key={`${cycleKey}-${i}`}
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        background: isDone ? 'rgba(255,255,255,0.05)' : step.bg,
                        border: `1px solid ${isDone ? 'rgba(255,255,255,0.14)' : step.color + '80'}`,
                        transition: 'background 0.4s, border-color 0.4s',
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                        background: isDone ? 'rgba(16,185,129,0.18)' : step.bg,
                        border: `1.5px solid ${isDone ? '#10B981' : step.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isDone ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8l3.5 3.5L13 5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
                            style={{
                              width: 15, height: 15, borderRadius: '50%',
                              border: `2.5px solid ${step.color}`,
                              borderTopColor: 'transparent',
                            }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: isDone ? 'rgba(255,255,255,0.5)' : 'white', fontSize: '13.5px', fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {step.label}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {step.desc}
                        </div>
                      </div>

                      {/* Badge */}
                      {isDone ? (
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '3px 9px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}>
                          Done ✓
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 800, color: step.color, background: step.bg, padding: '3px 9px', borderRadius: '20px', border: `1px solid ${step.color}50`, whiteSpace: 'nowrap' }}>
                          <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: 5, height: 5, borderRadius: '50%', background: step.color }} />
                          Active
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Empty placeholder rows — always rendered to keep height stable */}
              {HERO_STEPS.slice(visibleCount).map((_, i) => (
                <div key={`ph-${cycleKey}-${i}`} style={{ height: '62px', flexShrink: 0, borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.18)' }} />
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em' }}>PROGRESS</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: 800 }}>{progress}%</span>
              </div>
              <div style={{ height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #1400FF, #796eff, #10B981)', boxShadow: '0 0 10px rgba(100,80,255,0.6)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE compact version (visible < lg) ── */}
      <div className="lg:hidden w-full">
        <div style={{
          background: 'rgba(10,10,40,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,255,255,0.28)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,80,255,0.12)',
        }}>
          {/* Mini title bar */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />
            ))}
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 700, marginLeft: '6px', letterSpacing: '0.04em' }}>KreativRoom · Dashboard</span>
          </div>
          <div style={{ padding: '16px 16px 18px' }}>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Your Content Journey</div>
            <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Workflow in Progress
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>...</motion.span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '292px', overflow: 'hidden' }}>
              <AnimatePresence>
                {HERO_STEPS.slice(0, visibleCount).map((step, i) => {
                  const isDone = i < visibleCount - 1;
                  return (
                    <motion.div key={`mob-${cycleKey}-${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', background: isDone ? 'rgba(255,255,255,0.05)' : step.bg, border: `1px solid ${isDone ? 'rgba(255,255,255,0.14)' : step.color + '80'}` }}>
                      <div style={{ width: 28, height: 28, borderRadius: '8px', background: isDone ? 'rgba(16,185,129,0.18)' : step.bg, border: `1.5px solid ${isDone ? '#10B981' : step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {isDone ? <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          : <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }} style={{ width: 11, height: 11, borderRadius: '50%', border: `2.5px solid ${step.color}`, borderTopColor: 'transparent' }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: isDone ? 'rgba(255,255,255,0.5)' : 'white', fontSize: '12px', fontWeight: 700 }}>{step.label}</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '1px' }}>{step.desc}</div>
                      </div>
                      {isDone
                        ? <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.18)', padding: '3px 8px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}>Done ✓</span>
                        : <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, color: step.color, whiteSpace: 'nowrap' }}><motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: 5, height: 5, borderRadius: '50%', background: step.color }} />Active</div>}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {/* Empty placeholder rows — always rendered to keep height stable */}
              {HERO_STEPS.slice(visibleCount).map((_, i) => (
                <div key={`mph-${cycleKey}-${i}`} style={{ height: '50px', flexShrink: 0, borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.18)' }} />
              ))}
            </div>
            {/* Mini progress */}
            <div style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em' }}>PROGRESS</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '10px', fontWeight: 800 }}>{progress}%</span>
              </div>
              <div style={{ height: '5px', borderRadius: '99px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #1400FF, #796eff, #10B981)', boxShadow: '0 0 8px rgba(100,80,255,0.5)' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Main Page ---

const VideoCard = ({ project }: { project: { title: string, videoId: string, views: string } }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const marquee = document.getElementById('portfolio-marquee');
    if (marquee) {
      if (isPlaying) {
        marquee.classList.add('marquee-paused');
      } else {
        marquee.classList.remove('marquee-paused');
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="group relative w-[300px] h-[533px] md:w-[350px] md:h-[622px] rounded-[40px] overflow-hidden shrink-0 bg-[#1A1A1A] shadow-xl cursor-pointer pointer-events-auto"
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <img
            src={`https://i.ytimg.com/vi/${project.videoId}/maxresdefault.jpg`}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`; }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]">
            <div className="w-10 h-10 border-4 border-[#1400FF]/20 border-t-[#1400FF] rounded-full animate-spin" />
          </div>
          {/* The iframe is scaled up by 15% to push the YouTube UI (top title, bottom logo) outside the hidden overflow box */}
          <iframe
            src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&loop=1&playlist=${project.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title={`KreativeRoom Work - ${project.title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-[116%] h-[116%] -top-[8%] -left-[8%] object-cover pointer-events-auto"
          />
          <div className="absolute top-0 left-0 right-0 h-24 bg-transparent z-20 pointer-events-auto" />
          <div className="absolute bottom-0 right-0 w-full h-24 bg-transparent z-20 pointer-events-auto" />

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
            className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Bottom Views Display */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center w-max max-w-[90%]">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <Eye className="w-5 h-5 text-[#1400FF]" />
          <span className="font-bold text-sm text-[#1A1A1A] whitespace-nowrap">{project.title} &nbsp;•&nbsp; {project.views}</span>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const containerRef = useRef<HTMLElement>(null);
  const harderRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [vslStarted, setVslStarted] = useState(false);

  const { scrollYProgress: harderScroll } = useScroll({
    target: harderRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"]
  });

  // lineScale: locked at 0 before 0.10, fills to 1 by 0.55, stays at 1 till end
  const lineScale = useTransform(processScroll, [0, 0.10, 0.55, 1], [0, 0, 1, 1]);

  // Parallax values for the floating cards in "Harder" section
  const y1 = useTransform(harderScroll, [0, 1], [100, -100]);
  const y2 = useTransform(harderScroll, [0, 1], [150, -150]);
  const rotate1 = useTransform(harderScroll, [0, 1], [-5, 10]);
  const rotate2 = useTransform(harderScroll, [0, 1], [5, -10]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#F2F2F2] text-[#1A1A1A] overflow-x-clip font-sans">

      {/* ===== GLOBAL PAGE BACKGROUND LAYER ===== */}
      {/* Logo watermarks + geometric shapes — fixed to the full page, pointer-events-none */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">

        {/* ── LOGO WATERMARKS — replace /logo.png with your actual logo file in /public ── */}

        {/* Logo #1 — Top-left */}
        {/* TODO: place your logo PNG at /public/logo.png */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[6%] left-[3%] w-72 h-72 object-contain opacity-[0.05]"
          style={{ filter: 'grayscale(20%)' }}
        />

        {/* Logo #2 — Mid-right (largest) */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[30%] right-[2%] w-96 h-96 object-contain opacity-[0.04]"
          style={{ filter: 'grayscale(20%)' }}
        />

        {/* Logo #3 — Center-left */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[54%] left-[1%] w-80 h-80 object-contain opacity-[0.05]"
          style={{ filter: 'grayscale(20%)' }}
        />

        {/* Logo #4 — Lower-right */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[70%] right-[5%] w-72 h-72 object-contain opacity-[0.04]"
          style={{ filter: 'grayscale(20%)' }}
        />

        {/* Logo #5 — Bottom-center-left */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[86%] left-[16%] w-64 h-64 object-contain opacity-[0.04]"
          style={{ filter: 'grayscale(20%)' }}
        />

        {/* Logo #6 — Mid-center (most subtle) */}
        <img src="/logo.png" alt="" aria-hidden="true"
          className="absolute top-[42%] left-[44%] w-[420px] h-[420px] object-contain opacity-[0.03]"
          style={{ filter: 'grayscale(10%)' }}
        />


        {/* ── GEOMETRIC SHAPES ── */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Large dashed ring — top right */}
          <circle cx="92%" cy="12%" r="180" fill="none" stroke="#1400ff" strokeWidth="1" strokeDasharray="8 10" opacity="0.05" />
          <circle cx="92%" cy="12%" r="120" fill="none" stroke="#796eff" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.04" />

          {/* Large circle outline — mid left */}
          <circle cx="0%" cy="50%" r="220" fill="none" stroke="#1400ff" strokeWidth="1" opacity="0.04" />
          <circle cx="0%" cy="50%" r="160" fill="none" stroke="#796eff" strokeWidth="0.6" strokeDasharray="6 8" opacity="0.03" />

          {/* Small solid circle — upper mid */}
          <circle cx="62%" cy="22%" r="60" fill="none" stroke="#1400ff" strokeWidth="1.2" opacity="0.05" />
          <circle cx="62%" cy="22%" r="35" fill="none" stroke="#796eff" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.04" />

          {/* Rotated rectangle — lower left */}
          <rect x="-80" y="68%" width="300" height="300" rx="40" fill="none" stroke="#1400ff" strokeWidth="1" transform="rotate(25,-80,68%)" opacity="0.04" />
          <rect x="-40" y="70%" width="220" height="220" rx="30" fill="none" stroke="#796eff" strokeWidth="0.7" transform="rotate(25,-40,70%)" opacity="0.03" />

          {/* Cross/plus — upper left area */}
          <line x1="22%" y1="16%" x2="22%" y2="26%" stroke="#1400ff" strokeWidth="1.2" opacity="0.06" />
          <line x1="17%" y1="21%" x2="27%" y2="21%" stroke="#1400ff" strokeWidth="1.2" opacity="0.06" />

          {/* Cross/plus — bottom right */}
          <line x1="82%" y1="78%" x2="82%" y2="88%" stroke="#796eff" strokeWidth="1.2" opacity="0.06" />
          <line x1="77%" y1="83%" x2="87%" y2="83%" stroke="#796eff" strokeWidth="1.2" opacity="0.06" />

          {/* Triangle — right side mid */}
          <polygon points="97%,42% 90%,55% 104%,55%" fill="none" stroke="#1400ff" strokeWidth="1" opacity="0.05" />

          {/* Tiny circle dots scattered */}
          <circle cx="35%" cy="8%" r="5" fill="#1400ff" opacity="0.05" />
          <circle cx="78%" cy="35%" r="4" fill="#796eff" opacity="0.04" />
          <circle cx="12%" cy="78%" r="6" fill="#1400ff" opacity="0.04" />
          <circle cx="55%" cy="90%" r="4" fill="#796eff" opacity="0.05" />

          {/* Horizontal dashed line — mid page */}
          <line x1="5%" y1="60%" x2="30%" y2="60%" stroke="#1400ff" strokeWidth="0.8" strokeDasharray="6 8" opacity="0.05" />

          {/* Small rotated rect — top center */}
          <rect x="44%" y="5%" width="80" height="80" rx="12" fill="none" stroke="#796eff" strokeWidth="1" transform="rotate(20,44%,5%)" opacity="0.05" />
        </svg>
      </div>

      {/* 1. NAVBAR */}
      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className="glass px-6 py-3 rounded-full flex items-center justify-between w-full max-w-6xl">
          <div onClick={() => window.location.reload()} className="flex items-center gap-1 md:gap-2 font-black text-xl md:text-2xl tracking-tighter cursor-pointer shrink-0">
            {/* TODO: replace /logo.png with your actual logo file in /public */}
            <img src="/logo.png" alt="KreativRoom" className="w-8 h-10 md:w-10 md:h-12 object-contain" />
            <span>KreativRoom</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#1A1A1A]">
            {['Projects', 'Services', 'About', 'Testimonials'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#1400FF] transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
            <Button onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20Book%20a%20Call&body=Hi%20KreativRoom%20Team,%0A%0AI%20would%20like%20to%20book%20a%20call%20to%20discuss%20how%20we%20can%20grow%20together.%0A%0AThanks!', '_blank')} variant="primary" className="text-xs px-3 py-2 md:text-sm md:px-6 md:py-3 whitespace-nowrap">
              Book a call
            </Button>
            <button
              className="md:hidden flex items-center justify-center p-1.5 text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-2 p-6 glass rounded-3xl flex flex-col items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-50 md:hidden"
            >
              {['Projects', 'Services', 'About', 'Testimonials'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#1A1A1A] font-black text-xl hover:text-[#1400FF] transition-colors"
                >
                  {item}
                </a>
              ))}
              <Button variant="primary" className="w-full text-sm mt-2" onClick={() => { setIsMobileMenuOpen(false); window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20Book%20a%20Call&body=Hi%20KreativRoom%20Team,%0A%0AI%20would%20like%20to%20book%20a%20call%20to%20discuss%20how%20we%20can%20grow%20together.%0A%0AThanks!', '_blank'); }}>
                Book a call
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 2. HERO SECTION */}
      <section
        className="relative z-20 flex flex-col min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1400ff 0%, #796eff 100%)' }}
      >

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* ── Geometric background shapes ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Concentric circles — top right */}
          <motion.div className="absolute -top-24 -right-24 opacity-[0.12] origin-center" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
            <svg width="500" height="500" viewBox="0 0 500 500">
              <circle cx="250" cy="250" r="240" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="12 12" />
              <circle cx="250" cy="250" r="180" fill="none" stroke="white" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="250" cy="250" r="120" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="4 8" />
            </svg>
          </motion.div>
          {/* Rotated rectangle — bottom left */}
          <motion.div className="absolute -bottom-16 -left-16 opacity-[0.08] origin-center" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
            <svg width="400" height="400" viewBox="0 0 400 400">
              <rect x="20" y="20" width="360" height="360" rx="40" fill="none" stroke="white" strokeWidth="1.5" transform="rotate(20 200 200)" strokeDasharray="10 10" />
              <rect x="60" y="60" width="280" height="280" rx="30" fill="none" stroke="white" strokeWidth="1" transform="rotate(20 200 200)" strokeDasharray="6 6" />
            </svg>
          </motion.div>
          {/* Dashed circle — mid left */}
          <motion.div className="absolute top-1/4 left-[5%] opacity-[0.1] origin-center" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="55" fill="none" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
            </svg>
          </motion.div>
          {/* Small dashed circle — right mid */}
          <motion.div className="absolute bottom-1/3 right-[8%] opacity-[0.1] origin-center" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </motion.div>
          {/* Triangle */}
          <motion.div className="absolute top-10 left-[20%] opacity-[0.07] origin-center" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <polygon points="100,10 190,170 10,170" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" />
            </svg>
          </motion.div>
          {/* Cross/plus */}
          <motion.div className="absolute bottom-20 right-[15%] opacity-[0.1] origin-center" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </motion.div>
          {/* Subtle grid */}
          <motion.div
            className="absolute inset-[-100px] opacity-[0.04]"
            animate={{ x: [0, -60], y: [0, -60] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
          </motion.div>

          {/* ── Concentric arc lines ("sunrise") — bottom center ── */}
          <svg
            className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.08] pointer-events-none"
            width="1200" height="600" viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMax meet"
          >
            <motion.path d="M 600,600 m -120,0 a 120,120 0 0 1 240,0" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="12 12" animate={{ strokeDashoffset: [0, -24] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} />
            <motion.path d="M 600,600 m -260,0 a 260,260 0 0 1 520,0" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="8 8" animate={{ strokeDashoffset: [0, -16] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} />
            <motion.path d="M 600,600 m -420,0 a 420,420 0 0 1 840,0" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -12] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
            <motion.path d="M 600,600 m -580,0 a 580,580 0 0 1 1160,0" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -8] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
            <motion.path d="M 600,600 m -740,0 a 740,740 0 0 1 1200,0" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 4" animate={{ strokeDashoffset: [0, -6] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
          </svg>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-5 md:px-10 pt-36 md:pt-40 pb-28 md:pb-36 gap-10 lg:gap-16">

          {/* ══ LEFT COLUMN — Text content ══ */}
          <div className="flex flex-col justify-center w-full lg:w-[48%] shrink-0 text-center lg:text-left items-center lg:items-start">

            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-[17px] font-bold uppercase tracking-[0.2em] mb-3"
            >
              India&apos;s leading
            </motion.p>

            {/* Headline — two visual lines */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tighter text-white mb-5 md:mb-6"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
            >
              {/* Line 1: "Personal Branding [Agency]" — all inline, no wrap on desktop */}
              <span className="flex items-center flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-x-3 gap-y-2 text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[2.8rem] leading-[1.08]">
                <span className="whitespace-nowrap">Personal Branding</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.22)',
                    borderRadius: '0.3em',
                    padding: '0.08em 0.38em 0.12em 0.38em',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'inline',
                      background: 'linear-gradient(135deg, #1400FF 0%, #796eff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 900,
                      paddingRight: '2px',
                      paddingBottom: '13px'
                    }}
                  >
                    Agency
                  </span>
                </motion.span>
              </span>

              {/* Line 2: "for Smart Founders" */}
              <span
                className="block text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.4rem] leading-[1.08] mt-3 text-center lg:text-left"
                style={{ opacity: 0.88 }}
              >
                for Smart Founders
              </span>
            </motion.h1>

            {/* Stacked avatars + client count */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-6 md:mb-8"
            >
              <div className="flex -space-x-2.5">
                {['/q1.png', '/q2.png', '/q3.png', '/q4.jpg', '/q5.jpg'].map((src, i) => (
                  <img key={i} src={src} alt={`client-${i + 1}`} className="w-10 h-10 rounded-full border-2 border-white/50 shrink-0 object-cover" />
                ))}
              </div>
              <span className="text-white font-bold text-sm opacity-90">20+ Satisfied Clients</span>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20Book%20a%20Call&body=Hi%20KreativRoom%20Team,%0A%0AI%20would%20like%20to%20book%20a%20call%20to%20discuss%20how%20we%20can%20grow%20together.%0A%0AThanks!', '_blank')} className="inline-flex items-center gap-3 bg-white text-[#1400FF] font-black px-8 py-4 rounded-full text-base hover:bg-white/90 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 group">
                Book a Call
                <span className="w-7 h-7 rounded-full bg-[#1400FF] flex items-center justify-center group-hover:bg-[#0c00cc] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN — Animated Form Panel ══ */}
          <div className="w-full lg:flex-1 lg:self-stretch flex items-center">
            <HeroFormPanel />
          </div>{/* end right col */}

        </div>

        {/* ── Cloud Fade — bottom blend into next section ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
          style={{ height: '220px', background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
        />
      </section>



      {/* Brand bar — overlaps hero from below */}
      <DottedContainer className="py-8 bg-white overflow-hidden relative z-10 -mt-48 pt-52">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="text-sm font-bold uppercase tracking-widest text-[#4A4A4A] shrink-0">
            30+ Brands leveled up
          </div>
          <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
              initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex items-center gap-16 w-max opacity-50 grayscale"
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['Forbes', 'TechCrunch', 'Vogue', 'GQ', 'WIRED', 'FastCompany'].map((brand, j) => (
                    <div key={j} className="text-2xl font-black text-[#1A1A1A]">{brand}</div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </DottedContainer>
      {/* 2.5 VSL SECTION (Moved after Hero) */}
      <DottedContainer id="services" className="py-16 px-4 bg-white relative z-20">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <SectionReveal>
            <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-4">Watch Our Process</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.2] text-[#1A1A1A] mb-8 text-balance">
              See How We Help You <span className="text-[#1400FF]">Grow.</span>
            </h2>
          </SectionReveal>
        </div>

        {/* Video Embed — YouTube Shorts, fully branded overlay */}
        <div className="max-w-6xl mx-auto mb-12 px-4">
          <SectionReveal>
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#0f0f0f',
              border: '1px solid #E5E5E5',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}>
              {/* iframe — autoplay only after user clicks our branded button */}
              <iframe
                src={`https://www.youtube.com/embed/omumCDeiuw0?rel=0&modestbranding=1&controls=1&playsinline=1&loop=1&playlist=omumCDeiuw0${vslStarted ? '&autoplay=1' : ''}`}
                title="KreativRoom — See How We Help You Grow"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />

              {/* Branded overlay — hides ALL YouTube UI until user clicks */}
              {!vslStarted && (
                <div
                  onClick={() => setVslStarted(true)}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.45)',
                  }}
                >
                  {/* Brand play button */}
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: '#1400FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 16px rgba(20,0,255,0.18), 0 10px 40px rgba(20,0,255,0.5)',
                    transition: 'transform 0.2s',
                  }}>
                    <Play className="w-8 h-8 text-white" fill="white" style={{ marginLeft: '4px' }} />
                  </div>
                </div>
              )}

              {/* Permanent masks for YouTube top/bottom chrome when playing */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '13%', background: '#0f0f0f', zIndex: 15, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '14%', background: '#0f0f0f', zIndex: 15, pointerEvents: 'none' }} />
            </div>
          </SectionReveal>
        </div>



        {/* Stat Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: 100, suffix: "M+", label: "Views Generated", icon: Eye },
            { value: 20, suffix: "+", label: "Coaches Scaled", icon: Users },
            { value: 20, suffix: "+", label: "Hours Saved/Mo", icon: Clock },
            { value: 198, suffix: "%", label: "Avg Rev Increase", icon: BarChart3 }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="glass p-5 md:p-8 rounded-3xl text-left border border-[#1400FF]/15 bg-white transition-colors duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(20,0,255,0.15)] group relative overflow-hidden flex flex-col h-full">

                  {/* Decorative hover gradient */}
                  <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-[#1400FF]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F2F2] text-[#1400FF] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#1400FF] group-hover:to-[#796eff] group-hover:text-white group-hover:shadow-lg transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Statistic */}
                  <div className="text-4xl md:text-5xl font-black mb-1 md:mb-2 tracking-tighter bg-gradient-to-r from-[#1400FF] to-[#796eff] bg-clip-text text-transparent w-max">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <div className="text-[#7A7A7A] font-bold text-xs md:text-sm uppercase tracking-widest leading-snug">
                    {stat.label}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </DottedContainer>

      {/* 2.5 CLIENT MARQUEE */}
      <section className="py-12 bg-white relative z-20 overflow-hidden border-t border-[#E5E5E5]">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#7A7A7A]">Trusted by </span>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1400FF]">20+ Clients</span>
        </div>
        <div className="flex overflow-hidden w-full relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex gap-6 px-4 items-center"
          >
            {/* Duplicate set for seamless loop — 9 unique images x2 */}
            {[...Array(2)].map((_, pass) => (
              <React.Fragment key={pass}>
                {[
                  { src: '/q1.png' },
                  { src: '/q2.png' },
                  { src: '/q3.png' },
                  { src: '/q4.jpg' },
                  { src: '/q5.jpg' },
                  { src: '/q6.jpg' },
                  { src: '/q8.jpg' },
                  { src: '/q9.jpg' },
                  { src: '/q10.jpg' },
                ].map((item, i) => (
                  <div key={`${pass}-${i}`} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md flex-shrink-0 overflow-hidden">
                    <img src={item.src} alt={`client-${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2.6 OUR WORK (Video Marquee) */}
      <section id="projects" className="py-20 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <SectionReveal>
              <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-4">Our Work</div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A]">Work We&apos;re Proud Of</h2>
            </SectionReveal>
            <Button variant="outline" className="hidden md:flex">See More Works</Button>
          </div>
        </div>

        {/* Continuous Scrolling Marquee */}
        <div className="relative w-full overflow-hidden pb-10 pt-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <style>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-scroll {
              animation: marquee-scroll 60s linear infinite;
            }
            .animate-marquee-scroll:hover {
              animation-play-state: paused;
            }
            .marquee-paused {
              animation-play-state: paused !important;
            }
          `}</style>
          <div
            id="portfolio-marquee"
            className="flex gap-8 w-max px-4 animate-marquee-scroll"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  { title: "T-1", videoId: "iW1HnCLVBOU", views: "470K Views" },
                  { title: "T-2", videoId: "FAyKJokKxLM", views: "1.2M Views" },
                  { title: "T-3", videoId: "jZ7KVAXmkCU", views: "890K Views" },
                  { title: "T-4", videoId: "yOTEq-N6FGg", views: "350K Views" },
                  { title: "T-5", videoId: "mdsys7exdZE", views: "2.1M Views" },
                  { title: "T-6", videoId: "b0IvW-YvS4Q", views: "540K Views" },
                  { title: "T-7", videoId: "FrF_1sJcoEw", views: "920K Views" },
                  { title: "T-8", videoId: "7ItGsIcytac", views: "1.5M Views" },
                  { title: "T-9", videoId: "oZlCUzal3js", views: "780K Views" },
                  { title: "T-10", videoId: "jUiAs0jTaKo", views: "2.4M Views" }
                ].map((project, j) => (
                  <VideoCard key={`${i}-${j}`} project={project} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center md:hidden px-4">
          <Button variant="outline">See More Works</Button>
        </div>
      </section>

      {/* 2.75 ABOUT FOUNDER */}
      <section className="py-24 bg-white relative z-20 overflow-hidden" id="about">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left Image */}
            <SectionReveal>
              <div className="relative max-w-sm mx-auto md:max-w-none">
                {/* Purple Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#1400FF]/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
                {/* Image Placeholder */}
                <div className="aspect-[4/5] w-full rounded-[40px] overflow-hidden bg-[#F2F2F2] relative border-8 border-white shadow-[0_20px_60px_rgba(20,0,255,0.1)] group">
                  {/* TODO: Add actual founder image to /public */}
                  <img src="/nakua.png" alt="Founder" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" onError={(e) => e.currentTarget.style.opacity = '0'} />
                  {/* Fallback pattern if image is missing */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1400FF]/5 to-transparent -z-10 flex items-center justify-center">
                    <span className="text-[#1A1A1A] font-bold opacity-20">Founder Image</span>
                  </div>

                  {/* Social Icons Overlay */}
                  <a href="https://www.instagram.com/diptimaisahoo4/?hl=en" target="_blank" rel="noopener noreferrer" className="absolute top-6 left-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#1400FF] hover:text-white transition-all duration-300 shadow-lg hover:scale-110">
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/kreativroom2" target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#1400FF] hover:text-white transition-all duration-300 shadow-lg hover:scale-110">
                    <LinkedinIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </SectionReveal>

            {/* Right Content */}
            <SectionReveal delay={0.2}>
              <div className="text-sm font-bold uppercase tracking-widest text-[#7A7A7A] mb-4">
                About the Founder
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-[#1A1A1A] mb-8 text-balance">
                Built by a creator who <span className="bg-gradient-to-r from-[#1400FF] to-[#796eff] bg-clip-text text-transparent">knows what works</span>
              </h2>

              <div className="space-y-6 text-[#4A4A4A] font-medium leading-relaxed text-base md:text-lg">
                <p>
                  Hi, I&apos;m Diptimai Sahoo, a Digital Income Coach, Canva Expert, and the founder of KreativRoom. I built this agency because I lived the creator struggle myself.
                </p>
                <p>
                  I grew my own Instagram to 218K followers, generated 5M+ views in the last 90 days, and learned exactly what kind of editing makes content go viral vs. what gets ignored by the algorithm.
                </p>
                <p>
                  KreativRoom is built on that experience. We&apos;re not just editors, we&apos;re creators who understand the psychology of scroll-stopping content.
                </p>
              </div>

              <div className="w-full h-px bg-[#E5E5E5] my-10" />

              <div className="flex flex-wrap items-center gap-8 md:gap-16">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-[#1400FF] mb-1">218K+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7A7A7A]">Followers</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-[#1400FF] mb-1">5M+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7A7A7A]">Views Last 90 Days</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-[#1400FF] mb-1">500+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7A7A7A]">Videos</div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION ("Harder") (Moved after VSL) */}
      <section ref={harderRef} className="min-h-[70vh] md:min-h-[85vh] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#F2F2F2]">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full mb-16">
          <SectionReveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-[#1A1A1A]">
              Social media feels harder than it should be.
            </h2>
          </SectionReveal>
        </div>

        {/* Floating Cards mapped to scroll */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ y: y1, rotate: rotate1 }} className="absolute top-[15%] md:top-[25%] left-[2%] md:left-[10%] pointer-events-auto">
            <motion.div whileHover={{ scale: 1.1, y: -10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="glass-card p-4 rounded-3xl flex items-center gap-3 shadow-[0_0_20px_rgba(20,0,255,0.15)] cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#FFB800] flex items-center justify-center text-white"><X className="w-5 h-5" /></div>
              <div className="font-bold text-sm">Low engagement</div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ y: y2, rotate: rotate2 }} className="absolute bottom-[20%] md:bottom-[30%] right-[2%] md:right-[5%] pointer-events-auto">
            <motion.div whileHover={{ scale: 1.1, y: -10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="glass-card p-4 rounded-3xl flex items-center gap-3 shadow-[0_0_20px_rgba(20,0,255,0.15)] cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#FF4444] flex items-center justify-center text-white"><X className="w-5 h-5" /></div>
              <div className="font-bold text-sm">Content looks nice, no sales</div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ y: y1, rotate: rotate2 }} className="absolute bottom-[10%] left-[10%] md:left-[20%] pointer-events-auto hidden md:block">
            <motion.div whileHover={{ scale: 1.1, y: -10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="glass-card p-4 rounded-3xl flex items-center gap-3 shadow-[0_0_20px_rgba(20,0,255,0.15)] cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#FF4444] flex items-center justify-center text-white"><X className="w-5 h-5" /></div>
              <div className="font-bold text-sm">Campaigns feel forced</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF (Moved) */}


      {/* 4. PROCESS — Mobile: vertical stack; Desktop: sticky animated */}

      {/* ── MOBILE version (hidden on md+) ── */}
      <section className="md:hidden bg-white rounded-t-[60px] -mt-10 z-20 relative px-5 py-16">
        <div className="max-w-xl mx-auto">
          <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-3">Process</div>
          <h2 className="text-3xl font-black tracking-tighter leading-[1.2] text-[#1A1A1A] mb-10">
            Simple. Fast. <span className="text-[#1400FF]">Stress-free.</span>
          </h2>
          {/* Vertical connector line */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1400FF] to-[#796eff] opacity-20 rounded-full" />
            <div className="flex flex-col gap-6 pl-16 relative">
              {[
                { num: "01", title: "We Research", desc: "We craft high-converting, tailored scripts." },
                { num: "02", title: "You Shoot", desc: "Just follow the script on your phone." },
                { num: "03", title: "We Edit", desc: "We add hooks, captions, and animations." },
                { num: "04", title: "You Grow", desc: "Post consistently and watch your audience grow." }
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Step dot on the line */}
                  <motion.div
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute -left-[52px] top-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#1400FF] to-[#796eff] flex items-center justify-center text-white text-xs font-black shadow-md"
                  >
                    {index + 1}
                  </motion.div>
                  <ProcessCard key={index} index={index} step={step} mobileMode />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESKTOP version (hidden below md) ── */}
      <DottedContainer ref={processRef} className="hidden md:block h-[300vh] relative bg-white rounded-t-[80px] -mt-10 z-20">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-4">
          <div className="max-w-7xl mx-auto w-full mb-16 md:mb-24">
            <SectionReveal>
              <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-4">Process</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.2] text-[#1A1A1A] mb-4 text-balance">
                Simple. Fast. <span className="text-[#1400FF]">Stress-free.</span>
              </h2>
            </SectionReveal>
          </div>

          <div className="max-w-7xl mx-auto w-full relative">
            {/* Background Horizontal Line */}
            <div className="absolute top-[40px] -translate-y-1/2 left-0 right-0 h-2 bg-[#F2F2F2] rounded-full overflow-hidden z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1400FF] to-[#796eff] origin-left shadow-[0_0_15px_rgba(20,0,255,0.8)]"
                style={{ scaleX: lineScale, width: "100%" }}
              />
            </div>

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {[
                { num: "01", title: "We Research", desc: "We craft high-converting, tailored scripts." },
                { num: "02", title: "You Shoot", desc: "Just follow the script on your phone." },
                { num: "03", title: "We Edit", desc: "We add hooks, captions, and animations." },
                { num: "04", title: "You Grow", desc: "Post consistently and watch your audience grow." }
              ].map((step, index) => (
                <ProcessCard key={index} index={index} step={step} scrollYProgress={processScroll} />
              ))}
            </div>
          </div>
        </div>
      </DottedContainer>


      {/* 8. TESTIMONIALS */}
      <DottedContainer id="testimonials" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionReveal className="text-center mb-10">
            <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-4">Testimonials</div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A]">Trusted by 15+ Clients</h2>
          </SectionReveal>
        </div>

        {/* Continuous Scrolling Marquee */}
        <div className="relative w-full overflow-hidden pb-10 pt-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div
            className="flex gap-6 w-max px-4 hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  {
                    title: "We increased our audience by 25%!", quote: "We can bring in real-life problems and have the coaches give specific examples and solutions to help guide us and remove any roadblocks.", author: "Aftab Khan", role: "mrminertech", stars: 5
                  },
                  {
                    title: "Our engagement went up fast", quote: "KreativRoom helped us understand what content actually works. Our engagement grew and posting finally feels intentional.", author: "Louis Gleeson", role: "louisgson", stars: 4
                  },
                  { title: "We finally have a clear content direction", quote: "Before them we were posting randomly. Now we have clear ideas clear messaging and a plan that makes sense.", author: "Adam Stewart", role: "adamstewartmarketing", stars: 5 },
                  { title: "Social media feels less stressful now", quote: "They break things down in a simple way. We know what to post why we post it and how it helps our brand grow.", author: "VinMatano", role: "vinmatano", stars: 4 },
                  { title: "We saw real growth not just likes", quote: "Our audience grew and so did the quality of conversations. They helped us focus on connection not just numbers.", author: "Sayan", role: "sayanify", stars: 5 },
                ].map((item, j) => (
                  <div key={`${i}-${j}`} className="group relative w-[350px] md:w-[450px] rounded-[32px] overflow-hidden shrink-0 bg-gradient-to-br from-white to-[#F9F9F9] p-8 border border-[#1400FF]/30 shadow-[0_0_15px_rgba(20,0,255,0.1)] hover:shadow-[0_0_30px_rgba(20,0,255,0.2)] hover:-translate-y-2 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1400FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="flex gap-1 mb-6 relative z-10">
                      {[...Array(5)].map((_, k) => <Star key={k} className={cn("w-4 h-4", k < item.stars ? "fill-[#FFB800] text-[#FFB800]" : "fill-gray-200 text-gray-200")} />)}
                    </div>
                    <h4 className="text-xl font-black text-[#1A1A1A] mb-4 relative z-10">{item.title}</h4>
                    <p className="text-[#4A4A4A] font-medium leading-relaxed mb-8 relative z-10">{item.quote}</p>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-2 border-[#E0E0E0]">
                        <img src={['/q6.jpg', '/q8.jpg', '/q9.jpg', '/q10.jpg', '/q4.jpg'][j % 5]} alt={item.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1A1A]">{item.author}</div>
                        <div className="text-sm text-[#4A4A4A]">{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </DottedContainer>

      {/* 9. PRICING */}
      <section className="py-20 px-4 bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-10">
            <div className="text-sm font-bold uppercase tracking-widest text-[#1400FF] mb-4">Pricing</div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A]">Flexible pricing for every stage</h2>
          </SectionReveal>

          {/* Monthly / Yearly Toggle */}
          <PricingToggle />
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="px-4 pb-20 bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="relative bg-[#111111] rounded-[60px] p-12 md:p-24 text-center text-white overflow-hidden shadow-2xl">

            {/* Interactive Grid Background */}
            <InteractiveGrid />

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1400FF]/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1400FF]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 pointer-events-none">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-10 text-balance mx-auto max-w-4xl">
                Let&apos;s grow through content!
              </h2>
              <div className="pointer-events-auto inline-block">
                <Button onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@kreativroom.com&su=Inquiry:%20Book%20a%20Call&body=Hi%20KreativRoom%20Team,%0A%0AI%20would%20like%20to%20book%20a%20call%20to%20discuss%20how%20we%20can%20grow%20together.%0A%0AThanks!', '_blank')} variant="accent" className="h-16 px-10 text-lg">
                  Book a call
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-gradient-to-r from-[#1400FF] to-[#796eff] px-4 pt-24 md:pt-32 pb-10 mt-16 rounded-t-[60px] md:rounded-t-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-12">
            {/* Left side: Brand and Links */}
            <div className="text-white">
              <div className="text-3xl font-black mb-8 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-lg font-black border border-white/30">K</div>
                KreativRoom.
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="text-white/70 uppercase tracking-widest text-xs font-bold mb-6">Navigation</div>
                  <div><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1A1A1A] font-bold transition-colors">Home</a></div>
                  <div><a href="#projects" className="hover:text-[#1A1A1A] font-bold transition-colors">Projects</a></div>
                  <div><a href="#services" className="hover:text-[#1A1A1A] font-bold transition-colors">Services</a></div>
                  <div><a href="#about" className="hover:text-[#1A1A1A] font-bold transition-colors">About</a></div>
                  <div><a href="#testimonials" className="hover:text-[#1A1A1A] font-bold transition-colors">Testimonials</a></div>
                </div>
                <div className="space-y-4">
                  <div className="text-white/70 uppercase tracking-widest text-xs font-bold mb-6">Connect</div>
                  <div><a href="https://www.instagram.com/diptimaisahoo4/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] font-bold transition-colors">Instagram</a></div>
                  <div><a href="https://www.linkedin.com/in/kreativroom2" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] font-bold transition-colors">LinkedIn</a></div>
                </div>
              </div>
              <div className="space-y-1 text-white/90 font-medium">
                <div>contact@kreativroom.com</div>
                <div>+91 98765 43210</div>
              </div>
            </div>

            {/* Right side: Newsletter Card */}
            <div className="flex flex-col justify-center">
              <DottedContainer as="div" className="bg-white p-8 md:p-12 rounded-[40px] text-[#1A1A1A] shadow-2xl">
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Stay ahead of the curve.</h3>
                <p className="text-[#4A4A4A] font-medium mb-8 relative z-10">Get exclusive insights on content strategy, social growth, and editing tips delivered to your inbox weekly.</p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <input type="email" placeholder="Your email address" className="flex-1 bg-[#F2F2F2] rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#1400FF] transition-all font-medium" />
                  <Button variant="primary" className="py-4 px-8 shrink-0">Subscribe</Button>
                </div>
              </DottedContainer>
            </div>
          </div>

          <div className="mt-20 border-t border-white/20 pt-16 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
              {/* TODO: replace /logo.png with your actual logo file in /public */}
              <h1 className="text-[12vw] md:text-[10vw] font-black tracking-tighter text-white leading-none text-center select-none drop-shadow-lg lowercase">
                KreativRoom
              </h1>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center text-white font-bold text-sm gap-4">
              <div>© {new Date().getFullYear()} KreativRoom. All Rights Reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
