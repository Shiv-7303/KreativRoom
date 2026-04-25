import re

content = """<!DOCTYPE html>
<html class="dark" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>KreativRoom - Build a Brand That Commands Attention</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
          "surface-glass-dim": "rgba(17, 8, 32, 0.6)",
          "on-surface": "#ebdef3",
          "error": "#ffb4ab",
          "surface-tint": "#d2bbff",
          "surface-container-highest": "#393241",
          "inverse-on-surface": "#352d3d",
          "tertiary-container": "#a15100",
          "primary-fixed": "#eaddff",
          "secondary": "#ddb8ff",
          "inverse-surface": "#ebdef3",
          "surface-bright": "#3e3646",
          "on-tertiary-fixed-variant": "#713700",
          "surface-variant": "#393241",
          "surface-container-low": "#1f1927",
          "secondary-fixed": "#f0dbff",
          "surface-container-high": "#2e2736",
          "on-secondary": "#490081",
          "text-primary": "#ffffff",
          "error-container": "#93000a",
          "on-secondary-fixed": "#2c0051",
          "accent-active": "#630ed4",
          "on-tertiary": "#4f2500",
          "surface-container": "#241d2b",
          "on-secondary-fixed-variant": "#62259b",
          "tertiary-fixed-dim": "#ffb784",
          "outline": "#958da1",
          "surface-container-lowest": "#120b19",
          "on-primary-container": "#ede0ff",
          "on-secondary-container": "#d1a1ff",
          "text-muted": "#a79fcb",
          "primary-container": "#7c3aed",
          "tertiary-fixed": "#ffdcc6",
          "on-tertiary-container": "#ffe0cd",
          "on-primary-fixed": "#25005a",
          "secondary-container": "#62259b",
          "outline-variant": "#4a4455",
          "on-error-container": "#ffdad6",
          "on-tertiary-fixed": "#301400",
          "on-surface-variant": "#ccc3d8",
          "inverse-primary": "#732ee4",
          "primary": "#d2bbff",
          "on-background": "#ebdef3",
          "surface": "#17111e",
          "on-primary": "#3f008e",
          "background": "#17111e",
          "border-glass": "rgba(255, 255, 255, 0.05)",
          "primary-fixed-dim": "#d2bbff",
          "surface-dim": "#17111e",
          "text-muted-dark": "#8076ac",
          "surface-glass": "rgba(255, 255, 255, 0.03)",
          "background-primary": "#07030e",
          "on-primary-fixed-variant": "#5a00c6",
          "border-subtle": "rgba(255, 255, 255, 0.08)",
          "tertiary": "#ffb784",
          "on-error": "#690005",
          "background-secondary": "#110820",
          "secondary-fixed-dim": "#ddb8ff"
        },
        "fontFamily": {
          "body-lg": ["Inter"],
          "headline-md": ["Montserrat"],
          "headline-lg": ["Montserrat"],
          "tagline": ["Space Grotesk"],
          "body-md": ["Inter"],
          "display-lg": ["Montserrat"]
        }
      }
    }
  }
</script>
<style>
  html { scroll-behavior: smooth; }
  body { 
    background-color: #07030e; 
    color: #ffffff; 
    overflow-x: hidden; 
  }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  
  /* Framer-style Glass & Borders */
  .framer-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
  }
  .framer-card:hover {
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateY(-4px);
  }

  .framer-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
  }

  .framer-button {
    background: #7c3aed;
    color: white;
    border-radius: 9999px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.39);
  }
  .framer-button:hover {
    background: #630ed4;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.5);
  }

  .framer-nav-blur {
    background: rgba(7, 3, 14, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* GSAP initial state to prevent flash of unstyled content */
  .framer-animate {
    opacity: 0;
    visibility: hidden;
  }
  
  /* VSL placeholder styling */
  .vsl-container {
    width: 100%;
    max-width: 400px; /* 9:16 ratio on typical desktop/mobile */
    aspect-ratio: 9/16;
    margin: 0 auto;
    border-radius: 32px;
    overflow: hidden;
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 80px rgba(124, 58, 237, 0.1);
  }

</style>
</head>
<body class="font-body-md selection:bg-primary selection:text-on-primary">

<!-- Navigation -->
<nav class="fixed top-0 w-full z-50 framer-nav-blur">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div class="font-[Montserrat] font-black text-2xl tracking-tighter">KreativRoom</div>
    
    <div class="hidden md:flex items-center gap-8 framer-pill px-6 py-3">
      <a href="#services" class="text-sm font-medium text-[#a79fcb] hover:text-white transition-colors">Services</a>
      <a href="#portfolio" class="text-sm font-medium text-[#a79fcb] hover:text-white transition-colors">Portfolio</a>
      <a href="#results" class="text-sm font-medium text-[#a79fcb] hover:text-white transition-colors">Results</a>
      <a href="#contact" class="text-sm font-medium text-[#a79fcb] hover:text-white transition-colors">Contact</a>
    </div>

    <button class="framer-button px-6 py-2.5 text-sm">Start a Project</button>
  </div>
</nav>

<!-- Hero Section -->
<section class="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center text-center min-h-[90vh]">
  <!-- Glow Effects -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
  
  <div class="relative z-10 max-w-4xl mx-auto framer-animate" data-animation="fade-up">
    <div class="inline-flex items-center px-4 py-2 framer-pill mb-8">
      <span class="font-tagline text-xs font-bold text-primary tracking-[0.2em] uppercase">Ready for Impact</span>
    </div>
    
    <h1 class="font-[Montserrat] text-[56px] md:text-[88px] leading-[1.1] tracking-tight font-black mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
      Build a Brand That<br>Commands Attention
    </h1>
    
    <p class="font-[Inter] text-lg md:text-xl text-[#a79fcb] max-w-2xl mx-auto mb-10 leading-relaxed">
      We engineer high-converting digital ecosystems for creators who demand excellence and authority in their niche.
    </p>
    
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
      <button class="w-full sm:w-auto framer-button px-8 py-4 text-lg">Start a Project</button>
      <button class="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">View Work</button>
    </div>
  </div>

  <!-- VSL Section (9:16) -->
  <div class="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center framer-animate" data-animation="scale-up">
    <!-- VSL VIDEO CODE BLOCK -->
    <div class="vsl-container flex items-center justify-center group cursor-pointer">
      <!-- REPLACE EVERYTHING INSIDE THIS DIV WITH YOUR VIDEO EMBED CODE -->
      <div class="absolute inset-0 flex flex-col items-center justify-center bg-[#110820] z-10 group-hover:bg-[#1a0c30] transition-colors duration-500">
        <div class="w-20 h-20 rounded-full bg-primary-container/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(124,58,237,0.4)]">
          <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </div>
        <p class="font-[Montserrat] font-bold text-lg">Watch The Blueprint</p>
        <p class="text-sm text-[#a79fcb] mt-2">Insert 9:16 Video Here</p>
      </div>
      <!-- /END VSL VIDEO CODE BLOCK -->
    </div>
  </div>
</section>

<!-- The Struggle / Problem Section (Like CreatorFlow's Problem vs Solution) -->
<section class="py-24 px-6 relative z-10">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16 framer-animate" data-animation="fade-up">
      <span class="font-tagline text-xs font-bold text-primary tracking-[0.2em] uppercase">THE STRUGGLE</span>
      <h2 class="font-[Montserrat] text-4xl md:text-5xl font-extrabold mt-4">Stop Leaving Growth to Chance</h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="framer-card p-8 framer-animate" data-animation="fade-up" data-delay="0.1">
        <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <span class="material-symbols-outlined text-primary text-3xl">visibility_off</span>
        </div>
        <h3 class="font-[Montserrat] text-2xl font-bold mb-3">No Brand Identity</h3>
        <p class="text-[#a79fcb] leading-relaxed">Blending into the noise with generic visuals that fail to capture your unique value.</p>
      </div>
      
      <div class="framer-card p-8 framer-animate" data-animation="fade-up" data-delay="0.2">
        <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <span class="material-symbols-outlined text-primary text-3xl">timer</span>
        </div>
        <h3 class="font-[Montserrat] text-2xl font-bold mb-3">Editing Burnout</h3>
        <p class="text-[#a79fcb] leading-relaxed">Spending 40+ hours a week in timelines instead of building your business empire.</p>
      </div>
      
      <div class="framer-card p-8 framer-animate" data-animation="fade-up" data-delay="0.3">
        <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <span class="material-symbols-outlined text-primary text-3xl">trending_down</span>
        </div>
        <h3 class="font-[Montserrat] text-2xl font-bold mb-3">Low Conversions</h3>
        <p class="text-[#a79fcb] leading-relaxed">High traffic but zero retention. Your audience is watching, but they aren't buying.</p>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section id="services" class="py-24 px-6 bg-[#0a0512] relative z-10 border-y border-white/5">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 framer-animate" data-animation="fade-up">
      <div class="max-w-2xl">
        <span class="font-tagline text-xs font-bold text-primary tracking-[0.2em] uppercase">SERVICES</span>
        <h2 class="font-[Montserrat] text-4xl md:text-5xl font-extrabold mt-4">Full-Service Growth Partner</h2>
        <p class="text-[#a79fcb] mt-4 text-lg">We craft scroll-stopping content and identities that keep your audience hooked and your brand looking top-tier.</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Service 1 -->
      <div class="framer-card p-10 flex flex-col h-full framer-animate" data-animation="fade-up" data-delay="0.1">
        <h3 class="font-[Montserrat] text-3xl font-bold mb-4">Identity Design</h3>
        <p class="text-[#a79fcb] mb-8 flex-grow">Bespoke visual languages including logos, color systems, and typography that define your legacy.</p>
        <ul class="space-y-4">
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Logo & Iconography</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Brand Style Guides</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Social Kit Design</li>
        </ul>
      </div>
      
      <!-- Service 2 -->
      <div class="framer-card p-10 flex flex-col h-full bg-gradient-to-b from-[#1a0c30] to-transparent framer-animate" data-animation="fade-up" data-delay="0.2">
        <h3 class="font-[Montserrat] text-3xl font-bold mb-4">High-Impact Editing</h3>
        <p class="text-[#a79fcb] mb-8 flex-grow">Retention-focused video editing for YouTube, Reels, and TikTok that keeps eyes glued to the screen.</p>
        <ul class="space-y-4">
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Viral Hook Strategy</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Sound Design & FX</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> 4K Professional Color</li>
        </ul>
      </div>
      
      <!-- Service 3 -->
      <div class="framer-card p-10 flex flex-col h-full framer-animate" data-animation="fade-up" data-delay="0.3">
        <h3 class="font-[Montserrat] text-3xl font-bold mb-4">Conversion Funnels</h3>
        <p class="text-[#a79fcb] mb-8 flex-grow">Turning views into revenue with high-speed landing pages and strategic lead magnets.</p>
        <ul class="space-y-4">
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> UI/UX Design</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Copywriting</li>
          <li class="flex items-center gap-3 text-sm font-medium"><span class="material-symbols-outlined text-primary">check_circle</span> Tech Stack Setup</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Results / Stats (Like CreatorFlow's numbers) -->
<section id="results" class="py-24 px-6 relative z-10">
  <div class="max-w-7xl mx-auto framer-animate" data-animation="fade-up">
    <div class="framer-card p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-[#0a0512] to-[#1a0c30]">
      <!-- Background Glow -->
      <div class="absolute -left-40 top-0 w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div class="relative z-10 max-w-lg">
        <span class="font-tagline text-xs font-bold text-primary tracking-[0.2em] uppercase mb-4 block">PROVEN RESULTS</span>
        <h2 class="font-[Montserrat] text-4xl md:text-5xl font-extrabold mb-6">Dominating the Feed</h2>
        <p class="text-[#a79fcb] text-lg">Our strategies have catapulted dozens of creators into the top 1% of their categories. Data doesn't lie.</p>
      </div>
      
      <div class="relative z-10 flex flex-col gap-6 w-full md:w-auto">
        <div class="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 w-full min-w-[280px]">
          <div class="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">visibility</span>
          </div>
          <div>
            <div class="font-[Space Grotesk] text-3xl font-bold text-white">5M+</div>
            <div class="text-sm text-[#a79fcb] uppercase tracking-wider font-bold">Organic Views</div>
          </div>
        </div>
        
        <div class="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 w-full min-w-[280px]">
          <div class="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">group_add</span>
          </div>
          <div>
            <div class="font-[Space Grotesk] text-3xl font-bold text-white">218K+</div>
            <div class="text-sm text-[#a79fcb] uppercase tracking-wider font-bold">Followers Gained</div>
          </div>
        </div>
        
        <div class="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 w-full min-w-[280px]">
          <div class="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">payments</span>
          </div>
          <div>
            <div class="font-[Space Grotesk] text-3xl font-bold text-white">142%</div>
            <div class="text-sm text-[#a79fcb] uppercase tracking-wider font-bold">Revenue Increase</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Portfolio / Hall of Fame -->
<section id="portfolio" class="py-24 px-6 bg-[#0a0512] relative z-10 border-t border-white/5 overflow-hidden">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16 framer-animate" data-animation="fade-up">
      <span class="font-tagline text-xs font-bold text-primary tracking-[0.2em] uppercase">PORTFOLIO</span>
      <h2 class="font-[Montserrat] text-4xl md:text-5xl font-extrabold mt-4">Work That Speaks Louder Than Words</h2>
    </div>
    
    <div class="flex flex-col gap-12">
      <!-- Project 1 -->
      <div class="framer-card p-4 md:p-6 flex flex-col md:flex-row gap-8 items-center framer-animate" data-animation="fade-up">
        <div class="w-full md:w-[60%] aspect-video rounded-2xl overflow-hidden relative group">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGD-IKRU1937yHt13HUO-wxI8ubAvLVwE9ZcgraigwtaNsx3I0t--CSPSCx7foIHnuANjWXZsdl1Z-4Dznvmzfzpq86N-g1f3QpbNIphN6MPCMi5TmbrwKNg1QLMmBElRaMxCFXDiECYUhAmKeyk_D9p8hAQ0YTCxe6sp4TO_dzSBseLXmKoEdbB-sdjfc14HAw6Y9N3pOE-KF4dQs8PTYgSaSnsEeibBvccIyq1Dg-rQ4tdDbRNP8AgKYLw_vgWV2431kOyKkFZo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Project 1">
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[40%] px-4 md:px-8 py-4">
          <span class="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest mb-6">CASE STUDY</span>
          <h3 class="font-[Montserrat] text-3xl font-bold mb-4">The Futurist Landing Page</h3>
          <p class="text-[#a79fcb] mb-8">From tech reviews to gameplay breakdowns — here’s a glimpse of how we turn raw footage into binge-worthy content that resonates.</p>
          <button class="framer-button px-6 py-3 rounded-full text-sm flex items-center gap-2">View Project <span class="material-symbols-outlined text-sm">arrow_forward</span></button>
        </div>
      </div>
      
      <!-- Project 2 -->
      <div class="framer-card p-4 md:p-6 flex flex-col md:flex-row-reverse gap-8 items-center framer-animate" data-animation="fade-up">
        <div class="w-full md:w-[60%] aspect-video rounded-2xl overflow-hidden relative group">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6vFz16VD70epnQDT8I9th0CmQDXoYV7SR6Fbbx2VpSi8kIhinsoBee2ohYkY-1x4w5EzcrSbJnkDHRIxTOALrU4XPH1mEjAVejfdHODGjpmyqAa2Rc9yalfJc1TqWicMOIBdXUy9EAbjpyVd_fio5puZEX6jOFCDSwTSnPs0tru64SY5hw8Ld2LbdnoLm-MxmdlXoy3KFy12lV34KyQAOQb22oSi0rsRPZbi8E_pKIH7J5cHxSFyZ4oPJo2CcM-46LocgKRBabPw" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Project 2">
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[40%] px-4 md:px-8 py-4">
          <span class="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest mb-6">MOTION DESIGN</span>
          <h3 class="font-[Montserrat] text-3xl font-bold mb-4">Techno Core Showreel</h3>
          <p class="text-[#a79fcb] mb-8">High energy, retention-driven motion graphics designed to keep the viewer hooked from second zero to the end screen.</p>
          <button class="framer-button px-6 py-3 rounded-full text-sm flex items-center gap-2">View Project <span class="material-symbols-outlined text-sm">arrow_forward</span></button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-32 px-6 relative z-10 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary-container/10"></div>
  <div class="max-w-4xl mx-auto text-center relative z-10 framer-animate" data-animation="scale-up">
    <h2 class="font-[Montserrat] text-5xl md:text-7xl font-extrabold mb-8">Ready to Level Up?</h2>
    <p class="text-xl text-[#a79fcb] mb-10 max-w-2xl mx-auto">Whether it’s a one-off edit or a full channel transformation, we’re ready when you are. Let’s talk ideas.</p>
    <button class="framer-button px-10 py-5 text-lg font-bold">Book a Call</button>
    
    <div class="flex flex-wrap justify-center gap-4 mt-12">
      <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">Conversion Boost</span>
      <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">No Editor? No Problem</span>
      <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">Watch Time Wins</span>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py-12 px-6 bg-[#07030e] border-t border-white/10 relative z-10">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    <div class="flex flex-col items-center md:items-start gap-2">
      <div class="font-[Montserrat] font-black text-2xl">KreativRoom</div>
      <p class="text-sm text-[#a79fcb]">© 2024 KreativRoom. Engineered for high-impact creators.</p>
    </div>
    <div class="flex gap-6">
      <a href="#" class="text-[#a79fcb] hover:text-white transition-colors text-sm font-medium">Instagram</a>
      <a href="#" class="text-[#a79fcb] hover:text-white transition-colors text-sm font-medium">LinkedIn</a>
      <a href="#" class="text-[#a79fcb] hover:text-white transition-colors text-sm font-medium">Twitter</a>
      <a href="#" class="text-[#a79fcb] hover:text-white transition-colors text-sm font-medium">Contact</a>
    </div>
  </div>
</footer>

<!-- Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // Make elements visible right before animating them
  gsap.set('.framer-animate', { autoAlpha: 1 });

  // Framer-style reveal animations
  const animatedElements = document.querySelectorAll('.framer-animate');
  
  animatedElements.forEach(el => {
    const animationType = el.getAttribute('data-animation');
    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
    
    if (animationType === 'fade-up') {
      gsap.fromTo(el, 
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: delay,
          ease: 'expo.out'
        }
      );
    } else if (animationType === 'scale-up') {
      gsap.fromTo(el, 
        { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: delay,
          ease: 'expo.out'
        }
      );
    }
  });

  // Nav blur effect on scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('border-white/10');
      nav.classList.remove('border-transparent');
    } else {
      nav.classList.remove('border-white/10');
      nav.classList.add('border-transparent');
    }
  });
</script>
</body>
</html>"""

with open("KreativRoom/index_final (1).html", "w") as f:
    f.write(content)
print("Updated successfully")
