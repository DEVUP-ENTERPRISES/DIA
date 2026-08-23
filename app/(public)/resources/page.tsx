import { FileText, BookOpen, Scale, Search, ChevronRight, HelpCircle, Users, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Legal Knowledge Hub | DIA',
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header & Search */}
      <section className="pt-24 pb-16 px-4 bg-muted/30 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Legal Knowledge Hub</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Access clear, actionable legal information, guides, and community resources to help you understand your rights and options.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-11 pr-4 py-4 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
              placeholder="Search guides, rights, or FAQs..." 
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 px-4 flex-1">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar / Topic Filters */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">Categories</h3>
              <ul className="space-y-2">
                {[
                  { name: "Know Your Rights", icon: BookOpen, count: 24, active: true },
                  { name: "Legal Guides", icon: FileText, count: 18 },
                  { name: "Understanding Processes", icon: Scale, count: 12 },
                  { name: "Frequently Asked Questions", icon: HelpCircle, count: 45 },
                  { name: "Community Resources", icon: Users, count: 9 }
                ].map((cat, i) => (
                  <li key={i}>
                    <button className={cn("w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors", cat.active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        <span className="text-sm">{cat.name}</span>
                      </div>
                      <span className={cn("text-xs", cat.active ? "text-primary-foreground/80" : "text-muted-foreground/60")}>{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">Filter by Topic</h3>
              <div className="flex flex-wrap gap-2">
                {['Family Law', 'Employment', 'Housing', 'Immigration', 'Domestic Violence', 'Civil Rights'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border hover:border-primary/50 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* Featured Guides */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Bookmark className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Featured Guides</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="text-xs font-semibold text-primary mb-3">KNOW YOUR RIGHTS</div>
                  <h3 className="text-xl font-bold mb-3">Navigating Workplace Harassment</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    A step-by-step guide on identifying workplace harassment, documenting incidents, and legally protecting yourself before filing a formal complaint.
                  </p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Read Full Guide <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="text-xs font-semibold text-primary mb-3">LEGAL PROCESS</div>
                  <h3 className="text-xl font-bold mb-3">Understanding the Eviction Process</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    What happens after you receive an eviction notice? Learn about your legal rights as a tenant, timelines, and how to file a defense in court.
                  </p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Read Full Guide <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recently Updated */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Recently Updated</h2>
              <div className="space-y-4">
                {[
                  { title: "Filing for a Protection Order: What You Need to Know", category: "Domestic Violence", time: "Updated 2 days ago" },
                  { title: "How to Document Evidence for a Custody Dispute", category: "Family Law", time: "Updated 1 week ago" },
                  { title: "Understanding Severance Agreements", category: "Employment", time: "Updated 2 weeks ago" },
                  { title: "Tenant Rights Regarding Security Deposits", category: "Housing", time: "Updated 1 month ago" }
                ].map((article, i) => (
                  <Link key={i} href="#" className="block bg-card border rounded-lg p-5 hover:border-primary/50 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{article.title}</h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="font-medium px-2 py-0.5 bg-muted rounded-sm">{article.category}</span>
                          <span>{article.time}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className={cn(buttonVariants({ variant: 'outline' }))}>
                  Load More Resources
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
