import Link from 'next/link'
import { FileText, BookOpen, Scale } from 'lucide-react'

export const metadata = {
  title: 'Legal Resources - DIA',
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#10172A] mb-6">Legal Resources & Guides</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Empower yourself with knowledge. Explore our curated collection of guides, templates, and articles designed to help you navigate the legal landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Know Your Rights", desc: "A comprehensive guide to understanding your fundamental rights in various legal scenarios.", link: "#" },
            { icon: FileText, title: "Document Templates", desc: "Access free, standardized legal templates for common agreements and notices.", link: "#" },
            { icon: Scale, title: "Navigating Court", desc: "Step-by-step walkthroughs on what to expect during different types of court hearings.", link: "#" },
            { icon: FileText, title: "Domestic Violence Support", desc: "Resources, immediate actions, and legal protections available for survivors.", link: "#" },
            { icon: BookOpen, title: "Workplace Rights", desc: "Understanding harassment, discrimination, and your rights as an employee.", link: "#" },
            { icon: Scale, title: "Family Law Basics", desc: "Guides covering child custody, divorce, and family dispute resolutions.", link: "#" },
          ].map((resource, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 text-teal-600">
                <resource.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#10172A] mb-2">{resource.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{resource.desc}</p>
              <Link href={resource.link} className="text-teal-600 text-sm font-semibold hover:underline">Read more &rarr;</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
