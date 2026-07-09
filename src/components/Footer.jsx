import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const loanProducts = [
    { name: "Business Loan", path: "/business-loan" },
    { name: "Personal Loan", path: "/personal-loan" },
    { name: "Home Loan & LAP", path: "/home-loan-lap" },
    { name: "Machinery Finance", path: "/machinery-finance" },
    { name: "Working Capital", path: "/working-capital" },
  ];

  return (
    <footer className="bg-brand-neutralDark text-white pt-16 pb-8 border-t-4 border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Cashmax Finserve Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in financial growth. We facilitate fast, secure, and hassle-free loans to help you achieve your personal and business dreams.
            </p>
            
            {/* Social Icons (Inline SVGs) */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-neutralDark flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary flex items-center justify-center text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-brand-accent tracking-wide mb-6">Quick Links</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Loan Products */}
          <div>
            <h3 className="text-lg font-bold text-brand-accent tracking-wide mb-6">Our Services</h3>
            <ul className="space-y-3.5 text-sm">
              {loanProducts.map((product, idx) => (
                <li key={idx}>
                  <Link href={product.path} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold text-brand-accent tracking-wide mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                <span>102, Royal Plaza, Sector 18, Noida, Uttar Pradesh, India - 201301</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0" />
                <a href="mailto:info@cashmaxindia.in" className="hover:text-white transition-colors">info@cashmaxindia.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="pt-8 text-center text-xs text-gray-400 space-y-4">
          <p className="max-w-4xl mx-auto leading-relaxed border-b border-white/5 pb-6">
            <span className="font-semibold text-gray-300 uppercase block mb-1">Disclaimer</span>
            Cashmax Finserve is a loan facilitation platform and a referral partner to leading banks and RBI-registered NBFCs. We do not directly disburse loans or offer banking services. Loans are approved and disbursed at the sole discretion of our partner banks/NBFCs and are subject to documentation, eligibility checks, and terms and conditions. Interest rates and charges displayed are indicative and represent market rates which can change without notice.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
            <p>&copy; {currentYear} Cashmax Finserve. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/contact" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
