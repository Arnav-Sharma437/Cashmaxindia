import Link from "next/link";
import { CheckCircle, ShieldCheck, ArrowRight, Percent, FileText } from "lucide-react";

export default function LoanPage({ service }) {
  if (!service) return null;

  // Render a secondary title or tagline
  const tagline = service.slug === "personal-loan" 
    ? "Unsecured personal credit for urgent milestones" 
    : service.slug === "business-loan" 
    ? "Collateral-free expand term capital for SMEs" 
    : service.slug === "home-loan-lap" 
    ? "Long term high LTV property backing limits"
    : service.slug === "machinery-finance"
    ? "Hypothecated asset finance for manufacturing units"
    : "Flexible CC/OD credit bridges for operations";

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-brand-neutralLight text-brand-neutralDark pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center relative border-b border-gray-150">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Cashmax Sourcing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-primary">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            {tagline}
          </p>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-brand-neutralDark">
                About this Offering
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Core Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-neutralDark border-b border-gray-100 pb-3">
                Key Features &amp; Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features && service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-brand-neutralDark/80">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-neutralDark border-b border-gray-100 pb-3">
                Eligibility Guidelines
              </h3>
              <ul className="space-y-3">
                {service.eligibility && service.eligibility.map((crit, idx) => (
                  <li key={idx} className="flex items-start text-sm font-semibold text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3 mt-2 flex-shrink-0"></span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Metrics Card & Documents Checklist (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Interest Rates & Quick Apply */}
            <div className="bg-brand-neutralLight border border-gray-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-sm font-bold text-brand-primary uppercase tracking-wider">Interest Rate</span>
                <span className="text-2xl font-black text-brand-neutralDark">{service.interestRateNote}</span>
              </div>
              
              <div className="space-y-4">
                <Link
                  href={`/contact?product=${service.slug}`}
                  className="block w-full text-center bg-brand-accent hover:bg-brand-secondary text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Apply Online Now
                </Link>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Cashmax,%20I%20am%20interested%20in%20checking%20my%20eligibility%20for%20a%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-transparent border-2 border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary/5 text-brand-primary font-bold py-3 rounded-xl transition-all"
                >
                  Verify on WhatsApp
                </a>
              </div>

              <div className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                * T&amp;C Apply. All interest rates and terms listed above are referral indicators. Approval remains at the sole discretion of partner banks based on active credit checks.
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-brand-primary flex items-center border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 mr-2.5 text-brand-accent" />
                Documents Required
              </h3>
              <ul className="space-y-3">
                {service.documents && service.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3 mt-2 flex-shrink-0"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-brand-primary text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Get Multiple Bank Options under One Application
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            No need to visit multiple offices. Our credit advisors analyze your files to match you with top lending NBFCs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href={`/contact?product=${service.slug}`}
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-secondary text-white font-extrabold px-8 py-4 rounded-full shadow-lg"
            >
              Get Free Assessment
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 text-center"
            >
              Support Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
