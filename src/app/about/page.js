import Link from "next/link";
import { Shield, Sparkles, Target, Compass, Award, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Credmax Finserve",
  description: "Learn more about Credmax Finserve. We are a customer-first financial services facilitation company helping you secure the best loan rates with minimal paperwork.",
};

export default function About() {
  const stats = [
    { value: "₹250 Cr+", label: "Loan Volume Facilitated" },
    { value: "500+", label: "Happy Customers" },
    { value: "25+", label: "Bank & NBFC Partners" },
    { value: "15+", label: "Cities Covered" },
  ];

  const values = [
    {
      title: "Integrity First",
      desc: "We stand for absolute transparency. Zero hidden margins, zero unexpected fee surprises.",
      icon: Shield,
    },
    {
      title: "Customer Centricity",
      desc: "We prioritize your convenience, tailoring our facilitation to get rates fitting your financial capacity.",
      icon: Users,
    },
    {
      title: "Digital Acceleration",
      desc: "Say goodbye to bulky paper piles. We leverage secure APIs to keep processing fast and electronic.",
      icon: Sparkles,
    },
  ];

  const comparison = [
    {
      feature: "Interest Rate Comparison",
      bank: "Offers only their standard, non-negotiable bank rates.",
      credmax: "Compares 25+ lenders to fetch you the lowest available rate.",
    },
    {
      feature: "Documentation Time",
      bank: "Physical forms, sign-offs, and multi-day document validation.",
      credmax: "100% Digital soft-copy verification done in hours.",
    },
    {
      feature: "Processing & Follow-ups",
      bank: "Customer visits branch repeatedly; slow and tedious communication.",
      credmax: "Dedicated relationship manager handles all bank follow-ups for you.",
    },
    {
      feature: "Approval Success Rate",
      bank: "Rigid filters; high rejection rate if your profile has minor deviations.",
      credmax: "Multiple lender options mean we route your profile to banks most likely to approve.",
    },
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="bg-brand-neutralLight text-brand-neutralDark pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center relative border-b border-gray-150">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Who We Are
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-primary">
            Empowering Your Financial Future
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Credmax Finserve is India's leading loan sourcing referral partner, connecting borrowers with the nation's most trusted banks and NBFCs.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold text-brand-neutralDark">
              The Credmax Finserve Story
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              Founded by a team of veteran bankers, Credmax Finserve emerged from a simple observation: borrowers in India often struggle with confusing interest rates, endless documentation, and rigid approval rules of traditional lenders. We believed the system should be simpler, faster, and customer-first.
            </p>
            <p className="text-gray-500 font-medium leading-relaxed">
              We set out to construct a bridge: a digital facilitation platform that merges state-of-the-art fintech with personal relationship management. We don't just pass your files to a computer program; we evaluate your profile, run calculations, and represent your case to multiple tier-1 banks and RBI-compliant NBFCs to pull down the borrowing rate.
            </p>
            <p className="text-gray-500 font-medium leading-relaxed">
              Today, Credmax stands as a symbol of trust and efficiency. We are not a direct lender, which makes us completely objective: our target is simply to align you with the financial product that makes sense for your budget and growth.
            </p>
          </div>

          {/* Philosophy Box */}
          <div className="lg:col-span-5 bg-brand-neutralLight border border-gray-200 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-brand-primary">Our Core Philosophy</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mr-3 mt-1 font-bold text-xs">✓</div>
                <p className="text-sm font-semibold text-brand-neutralDark/80">Objective advice: We work for you, not the banks.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mr-3 mt-1 font-bold text-xs">✓</div>
                <p className="text-sm font-semibold text-brand-neutralDark/80">Compliant channels: 100% adherence to RBI lending frameworks.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mr-3 mt-1 font-bold text-xs">✓</div>
                <p className="text-sm font-semibold text-brand-neutralDark/80">Tailored solutions: Structured repayment models.</p>
              </div>
            </div>
            <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10 flex items-center space-x-3">
              <Award className="w-10 h-10 text-brand-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Our Trust Guarantee</p>
                <p className="text-xs text-brand-neutralDark font-bold mt-0.5">Approved referral partner to top banks &amp; NBFCs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-brand-neutralLight py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-brand-primary flex items-center justify-center rounded-xl">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-neutralDark">Our Vision</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              To become India's most preferred and trusted digital financial services helper, known for reducing borrowing costs and providing seamless access to credit for every eligible household and entrepreneur across the nation.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-brand-accent flex items-center justify-center rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-neutralDark">Our Mission</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              To simplify loan procurement through technology-led processes, total transparency, and expert financial matchmaking, enabling our customers to bypass procedural delays and obtain credit on the fairest possible terms.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-brand-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-brand-accent">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Our Culture
          </span>
          <h2 className="text-3xl font-extrabold text-brand-neutralDark mt-4 mb-3">
            Values That Guide Our Journey
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            Behind our high speed and rates is a strict code of professional and financial ethics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-neutralLight text-brand-primary flex items-center justify-center mx-auto">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-neutralDark">{value.title}</h3>
              <p className="text-gray-400 text-xs font-semibold leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Difference Comparison */}
      <section className="py-20 bg-brand-neutralLight px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
              Comparison
            </span>
            <h2 className="text-3xl font-extrabold text-brand-neutralDark mt-4 mb-3">
              How Credmax Differs From Banks
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              We leverage partnerships to do the legwork you'd usually do yourself—only more effectively.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-brand-neutralDark text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider">Features</th>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider">Traditional Banks</th>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-accent">Credmax Finserve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-500">
                {comparison.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-bold text-brand-neutralDark">{item.feature}</td>
                    <td className="px-6 py-4">{item.bank}</td>
                    <td className="px-6 py-4 font-semibold text-brand-primary bg-brand-primary/5">{item.credmax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Partner With India's Speediest Loan Facilitators
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Let us do the rate comparison for you and fetch bank credit offers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-secondary hover:text-white text-white font-bold px-8 py-4 rounded-full shadow-lg text-center"
            >
              Check My Eligibility
            </Link>
            <Link
              href="/business-loan"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 text-center"
            >
              Browse Loan Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
