"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion";
import { 
  Play, Sparkles, TrendingUp, CheckCircle2, ChevronRight, 
  Video, Users, Activity, MousePointerClick, 
  Scissors, PenTool, LayoutDashboard, BadgeCheck, Check
} from "lucide-react";
import { cn } from "@/lib/utils";


// Reusable Components
const Button = ({ 
  children, variant = 'primary', className, ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const base = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--foreground)] text-white hover:bg-slate-800 focus:ring-slate-900 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-0.5",
    secondary: "bg-[var(--accent-color)] text-white hover:opacity-90 focus:ring-[var(--accent-color)] shadow-xl shadow-[var(--accent-color)]/25 hover:shadow-2xl hover:shadow-[var(--accent-color)]/40 hover:-translate-y-0.5",
    outline: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-200 shadow-sm"
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ badge, title, subtitle }: { badge?: string, title: React.ReactNode, subtitle?: string }) => (
  <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
    {badge && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-block py-1.5 px-4 rounded-full bg-slate-100/80 backdrop-blur-sm text-slate-600 text-xs font-bold tracking-widest uppercase mb-6 border border-slate-200 shadow-sm"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      className="text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="mt-6 text-lg md:text-3xl text-slate-500 leading-relaxed max-w-2xl text-grad-subtitle font-medium"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// Number animation component
const AnimatedNumber = ({ value }: { value: number }) => {
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

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};


export default function Page() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  
  const { scrollYProgress: portfolioScroll } = useScroll({
    target: portfolioRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(portfolioScroll, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(portfolioScroll, [0, 1], ["-20%", "10%"]);

  return (
    <main ref={containerRef} className="min-h-screen relative bg-transparent selection:bg-[var(--accent-color)]/30 selection:text-[var(--accent-color)]">

      {/* Animated Scroll Progress Line */}
      <div className="fixed left-4 md:left-8 top-0 bottom-0 w-[2px] bg-slate-200/50 z-50 pointer-events-none hidden md:block">
        <motion.div 
          className="w-full bg-[var(--accent-gradient)] origin-top shadow-[0_0_10px_var(--accent-color)]"
          style={{ scaleY, height: '100%' }}
        />
      </div>


      {/* Modern Floating Header */}
      <motion.header 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className="glass px-6 py-3 rounded-full flex items-center justify-between w-full max-w-5xl shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-2 font-black text-3xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)] flex items-center justify-center text-white">K</div>
            KreativRoom.
          </div>
          <div className="hidden md:flex items-center gap-8 text-base font-semibold text-slate-600">
            {['Services', 'Results', 'Portfolio', 'Process'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <Button variant="primary" className="px-5 py-2.5 text-base h-10">
            Book a Call <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </nav>
      </motion.header>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative z-10 pt-40 pb-20 px-4 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-slate-200/50 text-[var(--accent-color)] text-base font-semibold mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" /> The Premium Editing Agency
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-8xl font-black tracking-tighter text-balance leading-[1.05] mb-8"
          >
            Build Your <span className="text-gradient">Premium</span> <br className="hidden md:block"/> Personal Brand.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-3xl text-slate-500 max-w-3xl mx-auto mb-10 text-balance leading-relaxed text-grad-subtitle font-medium"
          >
            We handle the scripting, editing, and strategy so you can focus on closing deals and coaching clients.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto">
              See Our Work <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto bg-transparent border-slate-300">
              Book Discovery Call
            </Button>
          </motion.div>

          {/* Social Proof Marquee under Hero */}
          <div className="mt-20 overflow-hidden relative w-full flex items-center h-20"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
          >
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex whitespace-nowrap gap-8 w-max opacity-70 hover:opacity-100 transition-opacity duration-500"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  {['Top Rated on Fiverr', '10+ Years Experience', '500+ Delivered', '4.9/5 Average Rating', 'Fast Delivery', 'High Retention Rates', 'Premium Quality', 'Global Clients'].map((badge, j) => (
                    <div key={j} className="flex items-center gap-2 text-base font-bold text-slate-800">
                      <BadgeCheck className="w-5 h-5 text-[var(--accent-color)]" /> {badge}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VSL / VIDEO SECTION */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            badge="The Blueprint" 
            title={<>Watch How We <span className="italic text-slate-400">Dominate</span></>} 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[2.5rem] p-4 glass-card mx-auto max-w-4xl"
          >
            <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-900 group cursor-pointer shadow-2xl">
              {/* Fake Video Thumbnail / Abstract Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 opacity-80" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 rounded-full glass flex items-center justify-center border border-white/20 shadow-[0_0_80px_rgba(20,0,255,0.3)] group-hover:shadow-[0_0_100px_rgba(20,0,255,0.5)] transition-shadow duration-500"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-8 h-8 text-[var(--accent-color)] fill-[var(--accent-color)] ml-1" />
                  </div>
                </motion.div>
              </div>

              {/* Video UI Elements */}
              <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-white font-medium">KreativRoom Strategy Breakdown.mp4</div>
                <div className="flex gap-2">
                  <div className="w-10 h-1 rounded-full bg-white/30" />
                  <div className="w-32 h-1 rounded-full bg-white" />
                  <div className="w-10 h-1 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PORTFOLIO / HORIZONTAL MARQUEE */}
      <section id="portfolio" ref={portfolioRef} className="relative z-10 py-16 overflow-hidden">
        <SectionHeading 
          badge="Our Work" 
          title="See it in action." 
        />
        
        {/* Added padding and mask image for fade in/out effect */}
        <div 
          className="flex flex-col gap-8 w-full py-8"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
          {/* Row 1 */}
          <motion.div style={{ x: x1 }} className="flex gap-6 w-max px-[10vw]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden glass-card group cursor-pointer shadow-xl shadow-slate-200/50">
                <div className="absolute inset-0 bg-slate-100">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                     <Play className="w-6 h-6 text-white fill-white ml-1" />
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-xs font-bold tracking-wider mb-1 opacity-80 uppercase">Reel Style {i}</div>
                  <div className="flex items-center gap-1 text-base font-semibold">
                    <TrendingUp className="w-4 h-4 text-[var(--accent-color)]" /> 100k+ Views
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          
        </div>
      </section>

      {/* 4. PROOF / STATS SECTION */}
      <section id="results" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Views Generated", value: 450, suffix: "M+", icon: <Activity className="w-6 h-6" /> },
              { label: "Creators Served", value: 300, suffix: "+", icon: <Users className="w-6 h-6" /> },
              { label: "Videos Delivered", value: 1200, suffix: "+", icon: <Video className="w-6 h-6" /> },
              { label: "Average Growth", value: 3, suffix: "x", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <h3 className="text-5xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix}
                </h3>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES / BENTO GRID */}
      <section id="services" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Capabilities" 
            title="Everything you need to scale." 
            subtitle="We don't just edit videos. We build content ecosystems designed for high retention and conversion."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Bento Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 glass-card p-10 rounded-[2rem] relative overflow-hidden group border border-slate-200"
            >
              <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-8 shadow-xl">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Premium Short Form</h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-8">
                TikToks, Reels, and Shorts edited with high-end motion graphics, engaging B-roll, and perfect pacing to maximize retention.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Motion Graphics', 'Color Grading', 'Sound Design', 'Hook Optimization'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="glass-card p-10 rounded-[2rem] relative overflow-hidden flex flex-col group border border-slate-200"
            >
              <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-[var(--accent-color)]/5 rounded-full blur-3xl" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-[var(--accent-color)] flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-500">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Scripting & Strategy</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  We write high-converting scripts tailored to your niche, focusing on viral frameworks and strong calls to action.
                </p>
              </div>
            </motion.div>

            {/* Bento Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass-card p-10 rounded-[2rem] relative overflow-hidden group border border-slate-200"
            >
               <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-[var(--accent-color)] flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-500">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Content Funnels</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Converting views into leads. We structure your content strategy to drive traffic where it matters.
                </p>
            </motion.div>

            {/* Bento Item 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-2 glass-card p-10 rounded-[2rem] relative overflow-hidden group border border-slate-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-[var(--accent-color)] flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-500">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Long Form YouTube</h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                Documentary-style editing, podcast cuts, and educational content designed to build deep parasocial relationships and authority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS SECTION - REDESIGNED */}
      <section id="process" className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            badge="Workflow" 
            title="How it works." 
            subtitle="A streamlined, friction-free process designed to save you time."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { step: "01", title: "Drop Footage", desc: "Upload your raw files to your dedicated portal." },
              { step: "02", title: "We Edit", desc: "Our team applies premium edits, graphics, and color." },
              { step: "03", title: "Review", desc: "Leave frame-accurate feedback via Frame.io." },
              { step: "04", title: "Publish", desc: "Receive final files ready for all platforms." },
            ].map((process, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 z-10"
              >
                <div className="text-7xl md:text-8xl font-black text-slate-50 mb-6 group-hover:text-[var(--accent-color)]/5 transition-colors duration-300">
                  {process.step}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">{process.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed">{process.desc}</p>
                
                {/* Connecting Line (Desktop Only) - Passes between cards */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-[24px] w-[48px] h-[1px] bg-slate-200 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
           <SectionHeading 
            badge="Investment" 
            title="Transparent pricing." 
            subtitle="Choose the plan that fits your growth goals. No hidden fees."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            
            {/* Starter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card p-10 rounded-[2.5rem] flex flex-col border border-slate-200"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Starter</h3>
              <p className="text-slate-500 text-base mb-6 pb-6 border-b border-slate-100">The Execution Plan</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">$<AnimatedNumber value={799} /></span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['12 Premium Reels (3/week)', 'High-End Animations', 'Custom Captions', '2 Revision Rounds'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-[var(--accent-color)] shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-14 text-base">Get Started</Button>
            </motion.div>

            {/* Growth (Featured) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="bg-slate-900 text-white p-10 rounded-[2.5rem] flex flex-col relative shadow-2xl shadow-slate-900/20 md:-translate-y-4 md:scale-105 z-10 border border-slate-800"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent-gradient)] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Recommended
              </div>
              <h3 className="text-3xl font-bold mb-2 mt-2 text-white">Growth</h3>
              <p className="text-slate-400 text-base mb-6 pb-6 border-b border-slate-800">The Strategy & Growth Plan</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">$<AnimatedNumber value={1499} /></span>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['16 Strategic Reels (4/week)', 'Niche Research & Hooks', 'Custom Scriptwriting', 'Premium Video Editing', 'Unlimited Revisions'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-slate-300 font-medium">
                    <Check className="w-5 h-5 text-[var(--accent-color)] shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full h-14 text-base bg-white text-slate-900 hover:bg-slate-100">Start Growing</Button>
            </motion.div>

            {/* Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] flex flex-col border border-slate-200"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Authority</h3>
              <p className="text-slate-500 text-base mb-6 pb-6 border-b border-slate-100">The Full Funnel Plan</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">$<AnimatedNumber value={2499} /></span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['25 Authority Reels (6/week)', 'Full Brand Strategy', 'Content Funnel Design', '48-Hour Delivery', 'Priority Slack Support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-[var(--accent-color)] shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-14 text-base">Apply Now</Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-200/60 glass-card">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-3xl tracking-tighter">
            <div className="w-6 h-6 rounded-md bg-[var(--accent-color)] flex items-center justify-center text-white text-xs">K</div>
            KreativRoom.
          </div>
          <p className="text-slate-500 text-base font-medium text-center md:text-left">
            © {new Date().getFullYear()} KreativRoom. All rights reserved.
          </p>
          <div className="flex gap-6 text-base font-semibold text-slate-600">
            <a href="#" className="hover:text-slate-900">Twitter</a>
            <a href="#" className="hover:text-slate-900">Instagram</a>
            <a href="#" className="hover:text-slate-900">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
