import { Link } from "react-router";
import {
   Link2, ArrowRight, Shield, Zap, Users, BarChart3,
   CheckCircle2, Star, Sparkles, Globe, Clock, CreditCard,
   ChevronDown, Send, Eye, Wallet, Play, Menu, X,
   MessageCircle, Mail, Instagram, Smartphone, Bell, Check,
   TrendingUp, Download, Share2, Wifi, Battery, Signal, Plus,
   CreditCard as CardIcon, ArrowUpRight, DollarSign, Euro, PoundSterling,
   Briefcase, GraduationCap, Store, Music, Video,
   ArrowDownLeft, Building2, Heart, Dumbbell, Calendar, Laptop, Palette
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import Logo from "~/components/logo";
import OrbitingCircles from "~/components/magicui/orbiting-circles";
import ProcessSteps from "~/components/process-steps";
import TypingAnimation from "~/components/magicui/typing-animation";
import { PaymentWorkflowVisual } from "~/components/payment-workflow-visual";
import { InfinitePossibilities } from "~/components/infinite-possibilities";

// export function meta({ }: Route.MetaArgs) {
//    return [
//       { title: "Paylink — Payment collection reimagined." },
//       { name: "description", content: "Collect payments with a single link. No coding, no hassle." },
//    ];
// }

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function GridPattern({ width = 40, height = 40, x = -1, y = -1, strokeDasharray = "0", className, ...props }: any) {
   const id = "grid-pattern-landing";
   return (
      <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30", className)} {...props}>
         <defs>
            <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
               <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
            </pattern>
         </defs>
         <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
   );
}

function RealIphone15({ children, className }: { children: React.ReactNode; className?: string }) {
   return (
      <div className={cn("relative mx-auto h-[500px] md:h-[600px] w-[260px] md:w-[300px] rounded-[45px] md:rounded-[55px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] ring-1 ring-gray-900/5", className)}>
         {/* Titanium Frame */}
         <div className="absolute inset-0 rounded-[45px] md:rounded-[55px] bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#1a1a1a] p-[6px]">
            {/* Inner Bezel */}
            <div className="absolute inset-[6px] rounded-[38px] md:rounded-[48px] bg-black border-[3px] border-black overflow-hidden">
               {children}
            </div>
         </div>

         {/* Dynamic Island Area */}
         <div className="absolute top-[6px] left-1/2 -translate-x-1/2 h-[35px] w-[120px] bg-black rounded-b-[20px] z-50 flex items-center justify-center pointer-events-none">
            {/* Camera & Sensors */}
            <div className="h-2 w-2 rounded-full bg-[#1a1a1a] ml-16 opacity-60"></div>
         </div>
      </div>
   );
}

function FloatingTestimonial({ testimonials, delay = 0, className }: { testimonials: { q: string, n: string, r: string }[], delay?: number, className?: string }) {
   const [index, setIndex] = useState(0);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Initial show
      const startTimeout = setTimeout(() => {
         setIsVisible(true);
      }, delay * 1000);

      // Cycle loop
      const cycleInterval = setInterval(() => {
         setIsVisible(false); // Hide
         setTimeout(() => {
            setIndex((prev) => (prev + 1) % testimonials.length); // Switch Content
            setIsVisible(true); // Show
         }, 1000); // Wait 1s before showing next
      }, 8000 + (delay * 1000)); // Every 8s + offset

      return () => {
         clearTimeout(startTimeout);
         clearInterval(cycleInterval);
      };
   }, [delay, testimonials.length]);

   const current = testimonials[index];

   return (
      <AnimatePresence mode="wait">
         {isVisible && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: -20 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className={cn("absolute bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 max-w-[280px] z-10", className)}
            >
               {/* Clean Content Style */}
               <div className="flex items-center gap-3 mb-3">
                  <div className={cn("h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs", index % 2 === 0 ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600")}>
                     {current.n.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                     <div className="text-sm font-bold text-gray-900">{current.n}</div>
                     <div className="text-[10px] text-gray-400">{current.r}</div>
                  </div>
               </div>
               <p className="text-[13px] text-gray-600 leading-relaxed font-medium">"{current.q}"</p>
            </motion.div>
         )}
      </AnimatePresence>
   );
}

/* ═══════════════════════════════════════════
   HERO ITEMS: NEW CARDS
   ═══════════════════════════════════════════ */

function TransactionPill({ icon: Icon, name, amount, type }: { icon: any, name: string, amount: string, type: 'credit' | 'debit' }) {
   return (
      <div className="flex items-center gap-3 px-1 py-1">
         <div className={cn("h-9 w-9 rounded-full flex items-center justify-center shrink-0", type === 'credit' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
            <Icon size={16} />
         </div>
         <div className="text-left">
            <div className="text-[12px] font-bold text-gray-900 leading-tight">{name}</div>
            <div className={cn("text-[10px] font-bold", type === 'credit' ? "text-green-600" : "text-red-600")}>{amount}</div>
         </div>
      </div>
   );
}

function FloatingCard({ x, y, rotate, delay = 0, className, children }: { x: any, y: any, rotate?: number, delay?: number, className?: string, children: React.ReactNode }) {
   return (
      <motion.div
         style={{ x, y, rotate: rotate || 0 }}
         initial={{ opacity: 0, scale: 0.8, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ delay, duration: 0.8, type: "spring" }}
         className={cn("absolute bg-white p-2 pr-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-20 flex items-center gap-3 w-max", className)}
      >
         {children}
      </motion.div>
   )
}

/* ═══════════════════════════════════════════
   NAVBAR: FLOATING CLEAN
   ═══════════════════════════════════════════ */
function NavbarFloating() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <nav className="fixed top-6 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
            <div className="pointer-events-auto h-[60px] pl-6 pr-2 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg shadow-gray-200/20 flex items-center justify-between w-full max-w-[1000px] transition-all duration-300 ease-in-out">

               {/* Logo */}
               <div className="flex items-center mr-auto" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <Logo size="default" />
               </div>

               {/* Desktop Links */}
               <div className="hidden md:flex items-center gap-1">
                  {["How it works", "Use Cases", "Reviews", "FAQ"].map(item => (
                     <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 text-[14px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">
                        {item}
                     </a>
                  ))}
               </div>

               {/* Mobile Menu Toggle */}
               <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
               </button>

               {/* Actions */}
               <div className="flex items-center gap-2 ml-4">
                  <Link to="/login" className="hidden sm:block px-4 py-2 text-[14px] font-bold text-gray-900 hover:text-blue-600 transition-colors">
                     Log in
                  </Link>
                  <Link to="/signup">
                     <button className="h-[44px] px-6 rounded-full bg-gray-900 text-white text-[14px] font-bold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-200">
                        Get Started
                     </button>
                  </Link>
               </div>
            </div>
         </nav>

         {/* Mobile Menu Overlay */}
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-[90px] inset-x-4 z-40 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 md:hidden"
               >
                  <div className="flex flex-col gap-4">
                     {["How it works", "Use Cases", "Reviews", "FAQ"].map(item => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-medium text-gray-700 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors px-2 rounded-lg" onClick={() => setIsOpen(false)}>
                           {item}
                        </a>
                     ))}
                     <div className="flex flex-col gap-3 mt-2">
                        <Link to="/login" className="w-full py-3 text-center font-bold text-gray-900 bg-gray-50 rounded-xl">Log in</Link>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   )
}

function FAQItem({ item, index }: { item: { q: string, a: string }, index: number }) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1, duration: 0.5 }}
         className="mb-4"
      >
         <div
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
               "cursor-pointer bg-white rounded-2xl border p-6 transition-all duration-300 shadow-sm hover:shadow-md",
               isOpen ? "border-blue-200 ring-4 ring-blue-50" : "border-gray-100"
            )}
         >
            <div className="flex justify-between items-center gap-4">
               <h4 className={cn("font-bold text-[17px] transition-colors", isOpen ? "text-blue-600" : "text-gray-900")}>
                  {item.q}
               </h4>
               <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("shrink-0", isOpen ? "text-blue-600" : "text-gray-400")}
               >
                  <ChevronDown size={20} />
               </motion.div>
            </div>

            <AnimatePresence>
               {isOpen && (
                  <motion.div
                     initial={{ height: 0, opacity: 0, marginTop: 0 }}
                     animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                     exit={{ height: 0, opacity: 0, marginTop: 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                     className="overflow-hidden"
                  >
                     <p className="text-[15px] text-gray-500 leading-relaxed">
                        {item.a}
                     </p>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   );
}

function HeroBrand() {
   const ref = useRef<HTMLDivElement>(null);
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   const springConfig = { damping: 30, stiffness: 100 };
   const springX = useSpring(mouseX, springConfig);
   const springY = useSpring(mouseY, springConfig);

   const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 45);
      mouseY.set((clientY - innerHeight / 2) / 45);
   };

   // Very subtle parallax
   const x1 = useTransform(springX, (x) => x * 1.0);
   const y1 = useTransform(springY, (y) => y * 1.0);
   const x2 = useTransform(springX, (x) => x * -1.2);
   const y2 = useTransform(springY, (y) => y * -1.2);

   return (
      <section
         ref={ref}
         onMouseMove={handleMouseMove}
         className="relative pt-[160px] pb-0 overflow-hidden bg-white flex flex-col items-center justify-end min-h-[90vh]"
      >
         {/* Background - Brand Cleanliness with Depth */}
         <div className="absolute inset-0 pointer-events-none">
            {/* Subtle Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_50%)]"></div>
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-50/30 blur-[120px] rounded-full mix-blend-multiply"></div>
            <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/30 blur-[120px] rounded-full mix-blend-multiply"></div>

            <GridPattern width={50} height={50} className="text-gray-200/60 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]" />
         </div>

         <div className="relative z-10 w-full max-w-[1200px] px-6 text-center mb-16 overflow-hidden">

            {/* FLOATING REALISTIC TRANSACTIONS (Desktop Only) */}
            <FloatingCard x={x1} y={y1} rotate={-6} className="-top-24 left-0 md:top-0 md:left-[10%] scale-90 md:scale-100 origin-top-left">
               <TransactionPill icon={ArrowDownLeft} name="Design Freelance" amount="+₦150,000" type="credit" />
            </FloatingCard>

            <FloatingCard x={x2} y={y2} rotate={6} delay={0.2} className="-top-12 right-0 md:top-10 md:right-[10%] scale-90 md:scale-100 origin-top-right">
               <TransactionPill icon={ArrowDownLeft} name="Trip Contribution" amount="+₦5,000" type="credit" />
            </FloatingCard>

            <FloatingCard x={x2} y={y2} rotate={-3} delay={0.4} className="bottom-40 left-0 md:bottom-[180px] md:left-[5%] scale-90 md:scale-100 origin-bottom-left z-10 md:z-20">
               <TransactionPill icon={Briefcase} name="Consulting Fee" amount="+₦85,000" type="credit" />
            </FloatingCard>

            <FloatingCard x={x1} y={y1} rotate={4} delay={0.6} className="bottom-60 right-0 md:bottom-[220px] md:right-[5%] scale-90 md:scale-100 origin-bottom-right z-10 md:z-20">
               <TransactionPill icon={Store} name="Store Sale #402" amount="+₦12,500" type="credit" />
            </FloatingCard>

            {/* MAIN TYPOGRAPHY - BRAND ALIGNED */}
            <h1 className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[1.1] md:leading-[0.95] text-gray-900 relative z-30 select-none drop-shadow-sm mb-6 md:mb-12">
               <span className="hidden md:block">
                  <TypingAnimation text="The simplest way" className="inline-block" />
               </span>
               <span className="md:hidden">The simplest way</span>
               <br className="hidden md:block" />
               <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="relative inline-block text-blue-600"
               >
                  to accept payments.
               </motion.span>
            </h1>

            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="text-[16px] md:text-[20px] text-gray-500 max-w-[320px] md:max-w-[600px] mx-auto font-medium leading-relaxed mb-14 md:mb-16"
            >
               <span className="text-gray-900 font-semibold">Create a custom link, share it, and get paid instantly.</span> <br className="hidden md:block" />
               No coding, no websites, no hassle.
            </motion.p>

            {/* PEEKING PHONE - REALISTIC RENDER & TRANSACTION FEED */}
            <motion.div
               initial={{ y: 200 }}
               animate={{ y: 0 }}
               transition={{ duration: 1.2, delay: 0.1, type: "spring", stiffness: 50 }}
               className="relative z-20"
            >
               <RealIphone15>
                  <div className="bg-gray-50 h-full w-full pt-14 flex flex-col origin-top">

                     {/* Header */}
                     <div className="px-6 flex justify-between items-center mb-6">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm"><UserIconInitials /></div>
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm"><Bell size={14} className="text-gray-600" /></div>
                     </div>

                     {/* Total Processed Card */}
                     <div className="px-6 mb-8">
                        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                           <div className="relative z-10">
                              <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1">Total Received Today</div>
                              <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-4">₦ 245,000</div>
                              <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                                 <TrendingUp size={12} /> +12% vs yesterday
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Transaction Feed */}
                     <div className="flex-1 bg-white rounded-t-[32px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] p-5 md:p-6">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-bold text-gray-900 text-sm">Recent Incoming</h3>
                           <button className="text-blue-600 text-[11px] font-bold">View All</button>
                        </div>

                        <div className="space-y-4 md:space-y-5">
                           {[
                              { n: "Sarah Jenkins", t: "Just now", a: "₦ 50,000", s: "Success" },
                              { n: "Design Project A...", t: "24 mins ago", a: "₦ 125,000", s: "Success" },
                              { n: "Monthly Dues", t: "1 hour ago", a: "₦ 10,000", s: "Success" },
                              { n: "Michael B.", t: "3 hours ago", a: "₦ 25,000", s: "Success" },
                           ].map((tx, i) => (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 whileInView={{ opacity: 1, x: 0 }}
                                 transition={{ delay: 0.5 + (i * 0.1) }}
                                 className="flex items-center gap-3 md:gap-4"
                              >
                                 <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                                    {tx.n[0]}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                       <div className="text-xs md:text-sm font-bold text-gray-900 truncate pr-2">{tx.n}</div>
                                       <div className="text-xs md:text-sm font-bold text-green-600 whitespace-nowrap">+{tx.a}</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <div className="text-[10px] md:text-[11px] text-gray-400">{tx.t}</div>
                                       <div className="text-[9px] md:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{tx.s}</div>
                                    </div>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </div>
               </RealIphone15>

               {/* Fade Overlay at Bottom */}
               <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-white via-white/80 to-transparent z-30 pointer-events-none"></div>
            </motion.div>

         </div>
      </section>
   );
}

function UserIconInitials() {
   return <div className="text-[10px] font-bold text-gray-900">JD</div>
}


/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════ */
export default function Landing() {
   return (
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

         {/* ── FLOATING NAVBAR (User Preferred Modern Look) ────── */}
         <NavbarFloating />

         {/* ── HERO SECTION (Brand Aligned) ─────────────────────── */}
         <HeroBrand />

         {/* ── PROBLEM / CHAOS VISUAL ────────────────────────────── */}
         <section className="py-24 bg-gray-50 overflow-hidden border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6">
               <div className="text-center max-w-[800px] mx-auto mb-16">
                  <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-red-500 uppercase bg-red-50 rounded-full">The Problem</div>
                  <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 tracking-tight mb-6">Getting paid should be simple.<br />It is not.</h2>
                  <p className="text-[18px] text-gray-500 max-w-[600px] mx-auto">
                     Sharing account numbers. Asking for screenshots. Manually confirming transfers. <span className="text-gray-900 font-semibold">Every extra step is friction.</span> And friction loses you money.
                  </p>
               </div>

               <div className="relative mx-auto max-w-[340px] md:max-w-[900px] h-[300px] md:h-[400px] bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
                  <GridPattern width={30} height={30} className="text-gray-100" />
                  <div className="absolute inset-0 flex items-end justify-center pb-20">
                     <div className="text-[60px] md:text-[140px] font-bold text-gray-100 tracking-tighter select-none">FRICTION</div>
                  </div>

                  {/* Animated Chaos Elements - Responsive Positioning */}
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-[5%] md:left-[10%] bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-md">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><MessageCircle size={16} /></div>
                        <div className="text-xs md:text-sm text-gray-600">"Pls send receipt screenshot"</div>
                     </div>
                  </motion.div>

                  <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-24 right-[5%] md:right-[15%] bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-md max-w-[180px] md:max-w-[220px]">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500"><X size={16} /></div>
                        <div>
                           <div className="text-xs md:text-sm font-bold text-gray-900">What's your acct #?</div>
                           <div className="text-[10px] text-gray-400">Can't copy it...</div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── WHO IS PAYLINK FOR? (Responsive Minimalist) ──────── */}
         <section id="use-cases" className="py-24 bg-gray-50 border-t border-gray-100">
            {/* Infinite Possibilities Component */}
            <InfinitePossibilities />
         </section>

         {/* ── HOW IT WORKS (Responsive Flow) ──────────────────────── */}
         <section id="how-it-works" className="bg-white py-24 border-t border-gray-100">
            <ProcessSteps />
         </section>

         {/* ── TESTIMONIALS (Problem Style Visual With Blinking Messages) ────────── */}
         <section id="testimonials" className="py-24 bg-white border-t border-gray-100">
            <div className="w-full px-4 md:px-6">
               <div className="text-center mb-16">
                  <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 tracking-tight mb-4">Loved by people like you.</h2>
                  <p className="text-gray-500 text-lg">Join thousands of creators, freelancers, and businesses.</p>
               </div>

               <div className="relative mx-auto w-full max-w-[1400px] h-[600px] md:h-[700px] bg-gray-50/50 rounded-[40px] border border-gray-200/60 overflow-hidden shadow-sm">
                  <GridPattern width={40} height={40} className="text-gray-200" />

                  {/* Background Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                     <div className="text-[120px] md:text-[350px] font-black tracking-tighter text-gray-900 select-none">TRUST</div>
                  </div>

                  {/* Center Glow */}
                  <motion.div
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-0 opacity-40 md:opacity-100"
                  >
                     <div className="relative h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 blur-[80px]"></div>
                  </motion.div>

                  {/* DYNAMIC FLOATING TESTIMONIALS */}
                  <FloatingTestimonial
                     className="top-[5%] left-[5%] md:left-[10%]"
                     delay={0}
                     testimonials={[
                        { q: "Paylink changed how I handle payments. It is so fast and simple.", n: "Adewale S.", r: "Event Planner" },
                        { q: "Finally, a payment tool that actually works for creators.", n: "Tobi A.", r: "Digital Artist" }
                     ]}
                  />

                  <FloatingTestimonial
                     className="top-[10%] right-[5%] md:right-[15%] hidden md:block" // Hidden on Mobile
                     delay={2.5}
                     testimonials={[
                        { q: "My customers love the experience. No more DMing account details.", n: "Chioma K.", r: "Fashion Brand" },
                        { q: "The best decision I made for my small business this year.", n: "Yusuf M.", r: "Merchant" }
                     ]}
                  />

                  <FloatingTestimonial
                     className="top-[40%] left-[2%] md:left-[15%]"
                     delay={1.2}
                     testimonials={[
                        { q: "Settlements are instant. Best payment platform I've used.", n: "Sarah J.", r: "Freelancer" },
                        { q: "I can focus on my work now, not on chasing payments.", n: "David B.", r: "Consultant" }
                     ]}
                  />

                  <FloatingTestimonial
                     className="bottom-[30%] right-[2%] md:right-[10%]"
                     delay={3.8}
                     testimonials={[
                        { q: "The dashboard is incredibly clean. I see my money in real-time.", n: "David M.", r: "Developer" },
                        { q: "I set it up in 2 minutes. Literally 2 minutes.", n: "Grace P.", r: "Baker" }
                     ]}
                  />

                  <FloatingTestimonial
                     className="bottom-[10%] left-[5%] md:left-[25%] hidden md:block" // Hidden on Mobile
                     delay={5.0}
                     testimonials={[
                        { q: "We process millions daily. It's safe, fast, and simple.", n: "Paylink Team", r: "Verified" },
                        { q: "Support is top-notch. They actually reply!", n: "Kola O.", r: "Startup Founder" }
                     ]}
                  />

                  <FloatingTestimonial
                     className="top-[50%] right-[30%] hidden md:block"
                     delay={6.5}
                     testimonials={[
                        { q: "Seamless integration with my workflow.", n: "Anita R.", r: "Designer" },
                        { q: "Love the instant notifications on my phone.", n: "Paul G.", r: "Contractor" }
                     ]}
                  />

               </div>
            </div>
         </section>

         {/* ── FAQ SECTION ───────────────────────────────────────── */}
         <section id="faq" className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-[1000px] mx-auto px-6">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[32px] font-bold text-center text-gray-900 mb-16"
               >
                  Questions? We've got answers.
               </motion.h2>
               <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                     hidden: { opacity: 0 },
                     visible: {
                        opacity: 1,
                        transition: {
                           staggerChildren: 0.1
                        }
                     }
                  }}
               >
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                     {[
                        { q: "Is Paylink free to use?", a: "Unless you collect money, Paylink is 100% free. We charge a tiny 1.5% fee on successful transactions." },
                        { q: "Do people need an app to pay?", a: "No! That's the best part. They just click the link and pay with their card or bank transfer." },
                        { q: "When do I get my money?", a: "Funds settles to your bank account within 24 hours. Instant settlement available for Pro users." },
                        { q: "Is it secure?", a: "Yes. We use bank-grade encryption and are PCI-DSS compliant. Your money is safe." },
                        { q: "Can I use it for my business?", a: "Absolutely. Thousands of freelancers and small businesses use Paylink for invoicing." },
                        { q: "What if I get stuck?", a: "Our support team is available 24/7 via chat or email." }
                     ].map((item, i) => (
                        <FAQItem key={i} item={item} index={i} />
                     ))}
                  </div>
               </motion.div>
            </div>
         </section >

         {/* ── FOOTER (Very Clean & Soft) ───────────────────────── */}
         <footer className="relative pt-32 pb-20 font-sans bg-white border-t border-blue-100/50">
            <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>

            <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">

               {/* Newsletter CTA */}
               <div className="mb-24">
                  <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-6 tracking-tight">Stay updated.</h2>
                  <p className="text-gray-500 max-w-[500px] mx-auto mb-10 text-lg">
                     Join our community of productive users. No spam, ever.
                  </p>

                  <div className="max-w-[440px] mx-auto relative flex items-center">
                     <div className="w-full bg-white rounded-full p-1.5 pl-6 pr-1.5 flex items-center border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all hover:border-gray-300">
                        <input
                           type="email"
                           placeholder="me@example.com"
                           className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 flex-1 h-[40px] text-sm"
                        />
                        <button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 h-[40px] text-sm font-bold transition-all shadow-md active:scale-95">
                           Subscribe
                        </button>
                     </div>
                  </div>
               </div>

               {/* Simple Clean Links */}
               <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-sm font-medium text-gray-500">
                  <a href="#" className="hover:text-blue-600 transition-colors">Product</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Safety</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
               </div>

               <div className="text-xs text-gray-400">
                  © 2026 Paylink Inc. All rights reserved.
               </div>
            </div>
         </footer >
      </div >
   );
}
