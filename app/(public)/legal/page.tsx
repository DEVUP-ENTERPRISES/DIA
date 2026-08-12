import Link from 'next/link'
import { ShieldCheck, Scale, Users, HeartHandshake } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Legal Services - DIA',
}

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#10172A] mb-6">Our Legal Expertise</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We connect you with specialized legal experts across a wide range of practice areas, ensuring you get the precise representation you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#10172A] mb-2">Family & Domestic Law</h3>
              <p className="text-slate-500 mb-4">Compassionate representation for divorce, child custody, alimony, and domestic violence protection orders.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#10172A] mb-2">Criminal Defense</h3>
              <p className="text-slate-500 mb-4">Fierce advocacy and defense strategies for those facing criminal charges, ensuring your rights are protected.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#10172A] mb-2">Civil Rights & Employment</h3>
              <p className="text-slate-500 mb-4">Fighting workplace discrimination, harassment, and civil rights violations. We stand up for your dignity.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#10172A] mb-2">Immigration Law</h3>
              <p className="text-slate-500 mb-4">Guidance through complex immigration processes, visas, asylum applications, and deportation defense.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#10172A] rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Specialized Help?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">If you don&apos;t see your specific legal need listed, reach out to us. Our network includes experts in almost every field of law.</p>
          <Link href="/signup/civilian" className={cn(buttonVariants({ size: 'lg' }), "bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8")}>
            Match with a Lawyer Now
          </Link>
        </div>
      </div>
    </div>
  )
}
