'use client'

import Link from 'next/link'
import { Scale, ShieldCheck, Users, Clock, Award, Globe, MessageSquare, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="flex flex-col relative overflow-hidden bg-white">
      {/* Floating Chat Widget */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="hidden lg:flex fixed left-6 top-1/3 flex-col bg-white p-3 rounded-2xl shadow-xl z-40 border border-slate-100 max-w-[200px]"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-teal-100 p-1.5 rounded-full text-teal-600">
            <MessageSquare className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-slate-700">Need help?</span>
        </div>
        <button className="bg-black text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors">
          START A CHAT
          <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
        </button>
        <div className="text-[9px] text-slate-400 mt-2 text-center">Powered by DIA Assistance</div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 flex flex-col items-center text-center">
        {/* Soft Background Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-pink-50/30 to-white -z-10" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[100px] -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-pink-100"
        >
          <span className="text-pink-500">✨</span> Empowering Women Through Unwavering Legal Support
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#10172A] max-w-4xl leading-tight mb-6"
        >
          Justice, <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-pink-500">
            Accessible & Secure
          </span>
        </motion.h1>
        
        <motion.p 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed"
        >
          Digital Inclusive Aid provides confidential, high-tier legal support tailored for women and vulnerable communities. Because everyone deserves an elite defense.
        </motion.p>
        
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Link href="/signup/civilian" className={cn(buttonVariants({ size: 'lg' }), "bg-[#10172A] hover:bg-slate-800 text-white rounded-full px-8 py-6 text-base shadow-xl flex items-center gap-2")}>
            Get Legal Help
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 py-8 max-w-5xl mx-auto w-full relative z-10 -mt-10"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 flex flex-wrap justify-between gap-8 border border-slate-100">
          <div className="text-center flex-1 min-w-[150px]">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">10,000+</div>
            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">People Helped</div>
          </div>
          <div className="text-center flex-1 min-w-[150px]">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">200+</div>
            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">Legal Experts</div>
          </div>
          <div className="text-center flex-1 min-w-[150px]">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">24/7</div>
            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">Support Uptime</div>
          </div>
          <div className="text-center flex-1 min-w-[150px]">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">98%</div>
            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">Case Success Rate</div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#10172A] mb-4">Why Choose DIA?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We&apos;re meticulously engineered to make legal support accessible, deeply secure, and relentlessly effective.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50", title: "Secure & Confidential", desc: "Bank-grade encryption protecting your sensitive information and case details at every step." },
              { icon: Users, color: "text-pink-500", bg: "bg-pink-50", title: "Expert Legal Network", desc: "Connect with highly-vetted, verified lawyers specializing in your exact case type." },
              { icon: Clock, color: "text-teal-600", bg: "bg-teal-50", title: "24/7 Availability", desc: "Emergency legal assistance and comprehensive support available around the clock." },
              { icon: Scale, color: "text-pink-500", bg: "bg-pink-50", title: "Accessible Justice", desc: "Breaking down systemic barriers to provide premium legal support for everyone." },
              { icon: Award, color: "text-teal-600", bg: "bg-teal-50", title: "Proven Results", desc: "Thousands of successful case resolutions and deeply satisfied, empowered clients." },
              { icon: Globe, color: "text-pink-500", bg: "bg-pink-50", title: "Inclusive Platform", desc: "Multi-language support paired with a culturally sensitive, trauma-informed approach." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feature.bg)}>
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="text-xl font-bold text-[#10172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#10172A] py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-white/10 text-slate-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-white/10"
          >
            Take the First Step Today
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Ready to Demand <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">Justice?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed"
          >
            Join thousands who have found their voice and achieved resolution through our premium platform. Your case matters, and we&apos;re here to win it.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup/civilian" className={cn(buttonVariants({ size: 'lg' }), "bg-white text-[#10172A] hover:bg-slate-100 rounded-full px-8 w-full sm:w-auto font-semibold")}>
              Find Your Legal Expert
            </Link>
            <Link href="/signup/lawyer" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "border-slate-700 text-white hover:bg-slate-800 hover:text-white rounded-full px-8 w-full sm:w-auto font-semibold")}>
              Join Our Community
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
