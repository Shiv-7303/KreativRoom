"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

// Icons 
import { Play, CheckCircle2, Star, CheckSquare, Sparkles } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // Scroll progress for continuous vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Horizontal scroll for 'Our Work'
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(horizontalProgress, [0, 1], ["20%", "-80%"]);
  const opacity = useTransform(horizontalProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-black relative font-sans overflow-hidden" ref={containerRef}>
      
      {/* Continuous Scrolling Line */}
      <div className="absolute left-4 md:left-10 top-0 bottom-0 w-[2px] bg-black/5 z-50 pointer-events-none hidden md:block">
        <motion.div 
          className="w-full bg-grad origin-top"
          style={{ scaleY: scrollYProgress, height: '100%' }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-[900] text-2xl tracking-tighter text-black">KreativRoom</div>
          <div className="hidden md:flex gap-8 font-medium text-black">
             <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
             <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portfolio</a>
             <a href="#proof" className="hover:text-blue-600 transition-colors">Results</a>
             <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          </div>
          <Button className="bg-white text-black border border-black/10 hover:bg-black/5 rounded-full px-6 shadow-sm">
            Email Us
          </Button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-40 pb-20 px-6 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-medium text-black mb-8 leading-tight">
            We are a premium video editing and personal branding agency. We handle the scripting, editing, and strategy so you can focus on closing deals and coaching clients.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
             <Button className="bg-white text-black border border-black/10 hover:bg-black/5 rounded-full px-8 py-6 text-lg shadow-sm font-bold flex items-center gap-2">
               <Sparkles size={20} className="text-blue-600" /> Email Us
             </Button>
             <Button className="bg-grad text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-lg font-bold border-none">
               See Our Work →
             </Button>
          </div>

          {/* Badges from Image 2 */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {['Top Rated Editors On Fiverr', '10 years on industry', 'Fast Delivery', '500+ Videos Delivered', '2x Engagement Boost', '4.9 Stars Rating', 'Top Rated'].map((badge, i) => (
              <div key={i} className="bg-white border border-black/5 text-black px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                <span className="text-blue-600">+</span> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VSL Section */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-2 border border-black/5 shadow-2xl overflow-hidden aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group cursor-pointer">
              <div className="w-20 h-20 bg-grad rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="fill-white w-8 h-8 ml-1" />
              </div>
            </div>
            {/* Placeholder for Video */}
            <div className="w-full h-full bg-black/10 rounded-[1.25rem] object-cover" />
        </div>
      </section>

      {/* 3. Our Work Section (Horizontal Scroll + Fade) */}
      <section id="portfolio" className="py-24 relative overflow-hidden" ref={horizontalScrollRef}>
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="font-bold text-blue-600 tracking-[0.2em] uppercase text-xs">PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 text-black">See It In Action</h2>
        </div>
        
        <div className="h-[70vh] flex items-center overflow-hidden">
          <motion.div 
            style={{ x, opacity }}
            className="flex gap-6 px-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, y: -10 }}
                className="min-w-[300px] md:min-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative group cursor-pointer bg-white border border-black/5 shadow-xl"
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-grad flex items-center justify-center shadow-lg">
                    <Play className="text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white drop-shadow-md">Reel Edit {i}</span>
                    <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">
                      <Star size={10} className="fill-yellow-500 text-yellow-500"/> 100K+
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Proof Section */}
      <section id="proof" className="py-24 px-6 bg-white border-y border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black">Proven Results</h2>
            <p className="text-black/60 mt-4 max-w-2xl mx-auto">We've helped our clients generate millions of views and build loyal communities.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { metric: "50M+", label: "Views Generated" },
               { metric: "100+", label: "Happy Clients" },
               { metric: "3x", label: "Average Growth" },
               { metric: "5k+", label: "Videos Edited" },
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 1.05 }}
                 className="text-center p-8 bg-[#FAFAFA] rounded-3xl border border-black/5 shadow-sm"
               >
                 <div className="text-4xl md:text-5xl font-black text-grad mb-2">{stat.metric}</div>
                 <div className="text-black/60 font-medium">{stat.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section id="services" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Short Form Content", desc: "TikToks, Reels, and Shorts designed for maximum retention." },
              { title: "Long Form YouTube", desc: "Engaging, high-retention edits for long form videos." },
              { title: "Strategy & Scripting", desc: "We don't just edit. We help you plan and script viral ideas." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[32px] border border-black/5 shadow-lg relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-grad mb-6 flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-black/60">{service.desc}</p>
                {/* Floating decorative element */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.2 }}
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-grad opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Process Section (From Image 4) */}
      <section id="process" className="py-24 px-6 bg-[#FAFAFA] relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black">How It Works?</h2>
            <p className="text-black/60 mt-4">A quick overview of how we work together to make your edit best in class!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col relative overflow-hidden">
              <span className="text-black/30 font-medium text-sm absolute top-8 left-8">01</span>
              <div className="h-48 flex items-center justify-center relative mb-4">
                {/* Floating Elements mimicking image 4 */}
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg z-20 left-[40%] top-[30%]">D</motion.div>
                <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute bg-[#ff5a1f] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 left-[55%] top-[40%]"><Sparkles size={20}/></motion.div>
                <div className="absolute bg-blue-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md z-0 left-[35%] top-[20%]">t</div>
                <div className="absolute bg-green-500 w-8 h-8 rounded-lg shadow-md z-0 left-[42%] top-[60%] rotate-12"></div>
                {/* Connecting line */}
                <div className="absolute w-16 h-0.5 bg-black/10 left-[45%] top-[40%] z-0"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black">Drop Your Footage</h3>
                <p className="text-black/60 text-sm">Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col relative overflow-hidden">
              <span className="text-black/30 font-medium text-sm absolute top-8 left-8">02</span>
              <div className="h-48 flex items-center justify-center relative mb-4 gap-4">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-12 h-12 bg-white rounded-2xl shadow-md border border-black/5 flex items-center justify-center font-bold">X</motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="w-14 h-14 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full shadow-md flex items-center justify-center relative">
                   <div className="absolute -bottom-2 bg-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm border border-black/5">Render</div>
                </motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-lg border border-white/20"></motion.div>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-10 h-10 bg-indigo-900 rounded-xl shadow-md flex items-center justify-center text-white text-xs font-bold">Pr</motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black">We Do Our Magic</h3>
                <p className="text-black/60 text-sm">We cut, trim, color-grade, and add engaging transitions.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col relative overflow-hidden">
              <span className="text-black/30 font-medium text-sm absolute top-8 left-8">03</span>
              <div className="h-48 flex flex-col items-center justify-center relative mb-4 gap-3">
                 <motion.div animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4 }} className="bg-white border border-black/10 px-4 py-2 rounded-full shadow-md text-sm font-medium flex items-center gap-2 z-10">
                   <div className="w-4 h-4 bg-gray-200 rounded-full"></div> Requested a Revision
                 </motion.div>
                 <motion.div animate={{ x: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4.5 }} className="bg-[#ff5a1f] text-white px-6 py-2.5 rounded-full shadow-lg text-sm font-bold ml-8 z-20">
                   Revision is in progress!
                 </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black">Feedback? Easy</h3>
                <p className="text-black/60 text-sm">Want something changed? We offer smooth revision rounds to make sure everything.</p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col relative overflow-hidden">
              <span className="text-black/30 font-medium text-sm absolute top-8 left-8">04</span>
              <div className="h-48 flex flex-col items-center justify-center relative mb-4">
                 <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }} className="bg-[#111] text-white px-4 py-2 rounded-xl shadow-md text-sm font-medium absolute top-8 ml-12 z-10 flex items-center gap-2">
                   <span>🎥</span> Final_Cut_v2.mp4
                 </motion.div>
                 <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 3.5 }} className="bg-white px-4 py-2 rounded-xl shadow-md text-sm font-medium absolute top-16 -ml-16 z-10 border border-black/5 flex items-center gap-2 text-black/60">
                   <span>🖼️</span> Thumbnail.png
                 </motion.div>
                 <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="bg-[#ff5a1f] px-8 py-3 rounded-xl shadow-lg shadow-orange-500/20 text-white font-bold absolute bottom-6 ml-8 z-20">
                   Publish
                 </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black">Upload & Grow</h3>
                <p className="text-black/60 text-sm">We deliver your final video in ready-to-upload YouTube format.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Transparent pricing. <br/> No surprises.</h2>
            <p className="text-black/60">All packages are monthly. Choose the plan that fits your growth goals.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Starter */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[32px] bg-white border border-black/5 shadow-sm">
              <h3 className="text-2xl font-bold mb-2 text-black">Starter</h3>
              <p className="text-black/60 text-sm mb-6">The Execution Plan</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-black">$799</span>
                <span className="text-black/60">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['12 Premium Reels (3/week)', 'High-End Animations', 'Custom Captions & B-Roll', 'Hook Optimization', 'Retention Editing', '2 Revision Rounds'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black/80">
                    <CheckCircle2 size={16} className="text-blue-600" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white border border-black/10 hover:bg-black/5 text-black rounded-full py-6 shadow-sm">Get Started</Button>
            </motion.div>

            {/* Growth */}
            <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-[32px] bg-grad border-none shadow-2xl lg:scale-105 z-10 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Recommended</div>
              <h3 className="text-2xl font-bold mb-2 text-white">Growth</h3>
              <p className="text-white/80 text-sm mb-6">The Strategy & Growth Plan</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$1,499</span>
                <span className="text-white/80">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['16 Strategic Reels (4/week)', 'Niche Research', 'Custom Scriptwriting', 'Advanced Hook Strategy', 'Premium Video Editing', 'Unlimited Revisions'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white">
                    <CheckSquare size={16} className="text-white" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white hover:bg-white/90 text-blue-600 rounded-full py-6 font-bold shadow-md">Get Started</Button>
            </motion.div>

            {/* Premium */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[32px] bg-white border border-black/5 shadow-sm">
              <h3 className="text-2xl font-bold mb-2 text-black">Premium</h3>
              <p className="text-black/60 text-sm mb-6">The Full Authority Plan</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-black">$2,499</span>
                <span className="text-black/60">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['25 Authority Reels (6/week)', 'Full Brand Strategy', 'Content Funnel Design', 'Scripting & Premium Editing', '48-Hour Express Delivery', '24/7 Priority Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black/80">
                    <CheckCircle2 size={16} className="text-blue-600" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white border border-black/10 hover:bg-black/5 text-black rounded-full py-6 shadow-sm">Get Started ✦</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-black/5 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-[900] text-2xl tracking-tighter text-black">KreativRoom</div>
            <p className="text-sm text-black/60 max-w-xs">Built by a creator who knows what works.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
             <div className="flex flex-col gap-2">
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">Services</a>
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">Portfolio</a>
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">Pricing</a>
             </div>
             <div className="flex flex-col gap-2">
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">FAQ</a>
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">About</a>
               <a href="#" className="text-black/60 hover:text-blue-600 transition-colors text-sm">Contact</a>
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
