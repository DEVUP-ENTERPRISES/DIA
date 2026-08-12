export const metadata = {
  title: 'About DIA',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#10172A] mb-8">About Digital Inclusive Aid</h1>
        
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-6 leading-relaxed">
            Digital Inclusive Aid (DIA) is dedicated to bridging the gap between those in need of legal support and the professionals who can provide it. We believe that access to justice should not be a privilege, but a fundamental right.
          </p>

          <h2 className="text-2xl font-bold text-[#10172A] mt-12 mb-4">Our Mission</h2>
          <p className="text-slate-600 mb-6">
            Our mission is to empower women, vulnerable communities, and everyday citizens by providing a secure, confidential, and highly accessible platform to demand justice. We strive to create an ecosystem where top-tier legal defense is just a few clicks away.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#10172A] mb-3">Integrity First</h3>
              <p className="text-slate-500">Every lawyer on our platform is meticulously vetted to ensure the highest standards of professional conduct and empathy.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#10172A] mb-3">Uncompromising Security</h3>
              <p className="text-slate-500">We utilize bank-grade encryption and privacy-first design to ensure that your sensitive information remains entirely confidential.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
