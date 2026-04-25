import re

with open("KreativRoom/index_final (1).html", "r") as f:
    content = f.read()

# 1. Insert VSL Section after Hero Section
vsl_html = """
<!-- VSL Section -->
<section class="py-section-padding px-8 relative z-20">
<div class="max-w-7xl mx-auto flex flex-col items-center">
<div class="text-center mb-12">
<span class="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-bold tracking-widest mb-4">THE BLUEPRINT</span>
<h2 class="font-headline-md text-headline-md text-white">Watch How We Dominate</h2>
</div>
<div class="relative w-full max-w-[360px] md:max-w-[400px] aspect-[9/16] rounded-[32px] overflow-hidden glass-card border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.15)] mx-auto">
    <!-- USER: ADD YOUR 9:16 VIDEO CODE BLOCK HERE -->
    <div class="absolute inset-0 bg-background-secondary flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-white/5 transition-all duration-500">
        <div class="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </div>
        <p class="font-tagline text-tagline text-white mb-2">VSL Placeholder (9:16)</p>
        <p class="text-sm text-text-muted">Insert your video code here</p>
    </div>
    <!-- /USER: ADD YOUR VIDEO CODE BLOCK HERE -->
</div>
</div>
</section>
"""

content = content.replace("</section>\n<!-- The Struggle (Bento Grid) -->", f"</section>\n{vsl_html}\n<!-- The Struggle (Bento Grid) -->")

# 2. Update GSAP animations to be more "Framer-like" (blur, spring ease)
# Replace the current GSAP ScrollTrigger section
old_gsap = """    // Scroll Animations for Bento Grids / Cards
    const sections = gsap.utils.toArray('section:not(:first-of-type)');
    sections.forEach(section => {
        const cards = section.querySelectorAll('.glass-card, .rounded-2xl');
        if(cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }
        
        // title animation
        const titleElements = section.querySelectorAll('span.font-tagline, h2');
        if (titleElements.length > 0) {
           gsap.from(titleElements, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }); 
        }
    });"""

new_gsap = """    // Framer-like Scroll Animations
    const sections = gsap.utils.toArray('section');
    sections.forEach(section => {
        const elements = section.querySelectorAll('.glass-card, .rounded-2xl, .rounded-3xl, img, h2, h3, p, ul');
        if(elements.length > 0) {
            // Apply a slight blur and translate up for a Framer-style spring reveal
            gsap.fromTo(elements, 
                { y: 60, opacity: 0, filter: 'blur(10px)' },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    },
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'expo.out'
                }
            );
        }
    });"""

content = content.replace(old_gsap, new_gsap)

with open("KreativRoom/index_final (1).html", "w") as f:
    f.write(content)

print("Done")
