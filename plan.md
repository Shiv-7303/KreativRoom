1. **Initialize Next.js project with shadcn/ui**:
   - Create a new Next.js project using `npx create-next-app@latest .` with TypeScript and Tailwind CSS.
   - Initialize shadcn/ui using `npx shadcn-ui@latest init` to set up the default component path (`/components/ui`).
   - Install required dependencies for the video player: `lucide-react`, `framer-motion`, `@radix-ui/react-slot`, `class-variance-authority`.

2. **Add required components**:
   - Create `components/ui/button.tsx` with the provided button component code.
   - Create `components/ui/video-player.tsx` with the provided video player component code.
   - Set up the primary color (`#ffffff`) and secondary gradient color (`#1400ff` to `#796eff`) in `tailwind.config.ts` or `globals.css`.

3. **Recreate the Landing Page (based on `kreativroom.com` and provided images)**:
   - Extract exact text content, structure, and original layout logic from the original website.
   - Use font: `Plus Jakarta Sans`, `Plus Jakarta Sans Placeholder`, sans-serif.
   - **Hero Section**:
     - Exact content from the website ("Build Your Premium Personal Brand With Us").
     - Animate the fading text (referencing 1st image description).
   - **Video/VSL Section**:
     - Use the provided `VideoPlayer` component directly after the 'Watch This First' (Hero) section. Use a placeholder video URL.
   - **Stats Section**:
     - Add the section matching the 2nd image layout ("1,200+ Videos Delivered", "300+ Creators Served", "450M+ Total Views").
   - **Services Section**:
     - Recreate the 'Services' section matching the 3rd image with animations. Extract services text from the original website.
   - **How it Works Section**:
     - Use the 4th image layout exactly (with similar icons, padding, spacing).
   - **Our Works Section**:
     - Add a horizontal scroll animation for the portfolio items (taken from the original website data).
   - **Pricing Section**:
     - Take actual pricing from the original website and design it according to the first instruction.
   - **Footer/Other sections**:
     - Extract remaining essential sections (FAQ, About Founder) from the original website.

4. **Verify Frontend**:
   - Ensure the Next.js app runs correctly.
   - Start the Next.js server locally and use Playwright to take a screenshot.

5. **Commit and Submit**:
   - Complete pre-commit checks.
   - Push to `update-design-react` branch.
