"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const loanProducts = [
    { name: "Business Loan", path: "/business-loan" },
    { name: "Personal Loan", path: "/personal-loan" },
    { name: "Home Loan & LAP", path: "/home-loan-lap" },
    { name: "Machinery Finance", path: "/machinery-finance" },
    { name: "Working Capital", path: "/working-capital" },
  ];

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  // Helper to check if current route starts with loan product path
  const isLoanActive = loanProducts.some((p) => pathname === p.path);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-white py-4 shadow-sm"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section (SVG logo inside /public/) */}
          <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setIsOpen(false)}>
            <img
              src="/logo.png"
              alt="Cashmax Finserve Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-brand-primary font-bold"
                    : "text-brand-neutralDark/80 hover:text-brand-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Loans Dropdown (Desktop) */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  isLoanActive
                    ? "text-brand-primary font-bold"
                    : "text-brand-neutralDark/80 hover:text-brand-primary"
                }`}
              >
                <span>Loan Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Card */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 transform origin-top-left transition-all">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.path}
                      href={product.path}
                      className={`block px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-brand-neutralLight transition-colors ${
                        pathname === product.path
                          ? "text-brand-primary bg-brand-primary/5 font-bold"
                          : "text-brand-neutralDark/80 hover:text-brand-primary"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === "/contact"
                  ? "text-brand-primary font-bold"
                  : "text-brand-neutralDark/80 hover:text-brand-primary"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919876543210"
              className="flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>+91 98765 43210</span>
            </a>
            <Link
              href="/contact"
              className="bg-brand-accent hover:bg-brand-secondary text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all duration-200"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-neutralDark hover:text-brand-primary p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-72 max-w-[80vw] h-full bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-bold text-brand-primary">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-neutralDark hover:text-brand-primary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-3.5 flex-grow overflow-y-auto pr-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-brand-primary/10 text-brand-primary font-bold"
                  : "text-brand-neutralDark/80 hover:bg-brand-neutralLight hover:text-brand-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/about"
                  ? "bg-brand-primary/10 text-brand-primary font-bold"
                  : "text-brand-neutralDark/80 hover:bg-brand-neutralLight hover:text-brand-primary"
              }`}
            >
              About Us
            </Link>

            {/* Mobile Loans List Section */}
            <div className="border-t border-b border-gray-100 py-3 space-y-1">
              <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                Loan Products
              </span>
              {loanProducts.map((product) => (
                <Link
                  key={product.path}
                  href={product.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                    pathname === product.path
                      ? "text-brand-primary bg-brand-primary/5 font-bold"
                      : "text-brand-neutralDark/80 hover:bg-brand-neutralLight hover:text-brand-primary"
                  }`}
                >
                  {product.name}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/contact"
                  ? "bg-brand-primary/10 text-brand-primary font-bold"
                  : "text-brand-neutralDark/80 hover:bg-brand-neutralLight hover:text-brand-primary"
              }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
            <a
              href="tel:+919876543210"
              className="flex items-center text-sm font-semibold text-brand-primary justify-center"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>+91 98765 43210</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full bg-brand-accent hover:bg-brand-secondary text-white font-bold py-3 rounded-full shadow-md"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
