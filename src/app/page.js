"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Shield, Award, Zap, HeartHandshake, CheckCircle, 
  ChevronLeft, ChevronRight, Home as HomeIcon, User, Briefcase, 
  Building, Car, Coins, CheckSquare, Clock, FileText, Phone, Factory
} from "lucide-react";
import EMICalculator from "@/components/EMICalculator";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20Cashmax%20Finserve,%20I%27m%20interested%20in%20checking%20my%20loan%20eligibility.";

  const loanProducts = [
    {
      id: "business-loan",
      title: "Business Loan",
      desc: "Expand operations, purchase stock, or scale up your enterprise.",
      rate: "Starting 12.00%*",
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-600",
      path: "/business-loan"
    },
    {
      id: "personal-loan",
      title: "Personal Loan",
      desc: "Instant cash for weddings, travel, emergencies, or medical bills.",
      rate: "Starting 10.49%*",
      icon: User,
      color: "bg-purple-50 text-purple-600",
      path: "/personal-loan"
    },
    {
      id: "home-loan-lap",
      title: "Home Loan & LAP",
      desc: "Buy your dream home or unlock property value with long tenures.",
      rate: "Starting 8.40%*",
      icon: HomeIcon,
      color: "bg-blue-50 text-blue-600",
      path: "/home-loan-lap"
    },
    {
      id: "machinery-finance",
      title: "Machinery Finance",
      desc: "Finance new or pre-owned machines & heavy clinic equipment.",
      rate: "Starting 11.50%*",
      icon: Factory,
      color: "bg-indigo-50 text-indigo-600",
      path: "/machinery-finance"
    },
    {
      id: "working-capital",
      title: "Working Capital",
      desc: "Get flexible cash credit, overdraft lines & trade finance limits.",
      rate: "Starting 10.99%*",
      icon: Coins,
      color: "bg-yellow-50 text-yellow-600",
      path: "/working-capital"
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Quick Apply",
      desc: "Fill our simple digital form in under 2 minutes.",
      icon: FileText,
    },
    {
      num: "02",
      title: "Instant Verification",
      desc: "Submit basic soft-copy KYC and income proof.",
      icon: CheckSquare,
    },
    {
      num: "03",
      title: "Fast Approval",
      desc: "Receive loan offers from multiple top banks.",
      icon: Award,
    },
    {
      num: "04",
      title: "Direct Disbursal",
      desc: "Get funds credited to your account within 24 hours.",
      icon: Clock,
    },
  ];

  const benefits = [
    {
      title: "Fast Digital Approval",
      desc: "Get initial approval on your applications instantly without tedious bank visits.",
      icon: Zap,
    },
    {
      title: "Best Interest Rates",
      desc: "Our vast network of partner lenders ensures you secure the lowest possible interest rate.",
      icon: Award,
    },
    {
      title: "100% Transparency",
      desc: "Zero hidden charges, upfront processing fees disclosure, and clear prepayment terms.",
      icon: Shield,
    },
    {
      title: "Dedicated Advisor",
      desc: "Get a dedicated relationship manager to assist you from application to final disbursal.",
      icon: HeartHandshake,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "SME Business Owner, Delhi",
      quote: "Getting a business loan through Cashmax Finserve was incredibly smooth. They matched me with an NBFC offering 1.5% lower rate than my existing bank. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sneha Sharma",
      role: "Software Engineer, Bangalore",
      quote: "I was looking for a home loan, and being a first-time buyer I had tons of doubts. The Cashmax advisor explained everything patiently and handled the paperwork. Got disbursed in 7 days!",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Salaried Professional, Mumbai",
      quote: "Cashmax got my personal loan approved in less than 4 hours during an emergency. The process was entirely digital, online verification took 15 mins. Exceptional service!",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Hotelier, Jaipur",
      quote: "Used their Loan Against Property service. Excellent coordination, zero upfront costs, and complete transparency in operations. They work with the best banks.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-neutralLight text-brand-neutralDark pt-24 pb-20 lg:pt-32 lg:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-primary/10 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-brand-primary tracking-wide"
            >
              <CheckSquare className="w-4 h-4 text-brand-accent animate-pulse" />
              <span>India's Leading Loan Sourcing Referral Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-brand-primary tracking-tight"
            >
              Fast, Hassle-Free Loans <br />
              <span className="text-brand-accent">Tailored For You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              Compare and apply for top loan products with leading banks and NBFCs. Enjoy 100% digital documentation, transparent terms, and rapid disbursal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-brand-accent hover:bg-brand-secondary text-white border-2 border-brand-accent hover:border-brand-secondary font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent hover:bg-brand-primary/5 text-brand-primary border-2 border-brand-primary/60 hover:border-brand-primary font-bold px-8 py-3.5 rounded-full transition-all text-center flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Right: Live Tracker visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6 border-b border-gray-150 pb-4">
                <span className="font-bold text-xs text-brand-primary tracking-wide">DIGITAL DISBURSAL TRACKER</span>
                <span className="bg-brand-accent/20 text-brand-accent text-xs px-2.5 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-brand-neutralLight p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-xs">₹</div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Business Loan Approval</p>
                      <p className="text-sm font-bold text-brand-neutralDark">Verma Exports (Noida)</p>
                    </div>
                  </div>
                  <span className="text-xs text-brand-accent font-bold">₹45 Lakhs Approved</span>
                </div>
                <div className="flex justify-between items-center bg-brand-neutralLight p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs">H</div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Home Loan Eligible</p>
                      <p className="text-sm font-bold text-brand-neutralDark">Amit K. (Delhi)</p>
                    </div>
                  </div>
                  <span className="text-xs text-brand-accent font-bold">₹75 Lakhs Approved</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-150 flex justify-between text-xs text-gray-400">
                <span>Facilitated Disbursals today:</span>
                <span className="font-bold text-brand-accent">₹2.4 Cr+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-brand-neutralLight border-y border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold text-brand-neutralDark/50 uppercase tracking-widest">Our Promise</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm leading-relaxed">
              *Facilitation platform compliant with RBI digital lending guidelines. Partner NBFC/Banks terms apply.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
            <div className="text-center">
              <p className="text-lg lg:text-2xl font-extrabold text-brand-primary">100%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Digital Process</p>
            </div>
            <div className="text-center">
              <p className="text-lg lg:text-2xl font-extrabold text-brand-primary">24 Hrs</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Quick Disbursal</p>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <p className="text-lg lg:text-2xl font-extrabold text-brand-primary">Minimal</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Paperwork</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-neutralDark mt-4 mb-3">
            Financial Products for Every Need
          </h2>
          <p className="text-gray-500 font-medium">
            Explore our range of credit solutions designed to match your specific financial milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between transition-shadow duration-300"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${product.color}`}>
                  <product.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-neutralDark mb-2">{product.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>
              </div>
              <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-brand-primary">{product.rate}</span>
                <Link
                  href={product.path}
                  className="text-brand-primary hover:text-brand-secondary font-bold text-sm flex items-center space-x-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-20 bg-brand-neutralLight px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
              Financial Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-neutralDark leading-tight">
              Plan Your Budget with Our EMI Calculator
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              Calculate your installments beforehand to make informed decisions. Play around with different amounts, interest rates, and loan durations to find your perfect payment setup.
            </p>
            <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm space-y-3">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Example Interest Rates</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Home Loans:</span>
                <span className="font-bold text-brand-primary">From 8.40%*</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Personal Loans:</span>
                <span className="font-bold text-brand-primary">From 10.49%*</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <EMICalculator />
          </div>
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-neutralDark mt-4 mb-3">
            Simple 4-Step Journey
          </h2>
          <p className="text-gray-500 font-medium">
            Getting loan disbursal has never been quicker. Follow our 100% digital operational flow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-16 right-16 h-0.5 bg-gray-100 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 text-center relative group">
              <div className="w-16 h-16 rounded-full bg-brand-neutralLight group-hover:bg-brand-primary text-brand-primary group-hover:text-white flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors duration-300">
                <step.icon className="w-7 h-7" />
              </div>
              <span className="absolute top-4 right-4 text-xs font-black text-gray-200 tracking-wider text-[24px]">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-brand-neutralDark mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-semibold">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-neutralLight text-brand-neutralDark px-4 sm:px-6 lg:px-8 border-y border-gray-150">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Why Left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
              Why Choose Cashmax
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary leading-tight">
              Redefining Loan Processing in India
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              We understand that timing is everything when seeking credit. That's why we bypassed old bureaucratic hurdles to bring you custom, rate-competitive loans backed by industry experts.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-brand-neutralDark/80">No Hidden Costs or Brokerages</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-brand-neutralDark/80">Partnership with 25+ Lead Banks &amp; NBFCs</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-brand-neutralDark/80">Highest Approval Ratios in the Market</span>
              </div>
            </div>
          </div>

          {/* Why Right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-gray-200/60 p-6 rounded-xl space-y-4 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary">{benefit.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-accent pb-1">
            Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-neutralDark mt-4 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 font-medium">
            Over 500+ happy applicants have achieved their finance objectives through our facilitating services.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto bg-brand-neutralLight border border-gray-200/60 p-8 sm:p-12 rounded-2xl shadow-inner">
          <div className="min-h-[160px] flex flex-col justify-between">
            <p className="text-brand-neutralDark/90 text-base sm:text-lg italic leading-relaxed font-medium">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-brand-primary text-base sm:text-lg">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
              <div className="flex space-x-1 text-brand-accent">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-lg">&#9733;</span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-6 bottom-6 sm:right-12 sm:bottom-12 flex space-x-2">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 rounded-full bg-white hover:bg-brand-primary hover:text-white border border-gray-200 text-brand-neutralDark flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="w-9 h-9 rounded-full bg-white hover:bg-brand-primary hover:text-white border border-gray-200 text-brand-neutralDark flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Unlock Your Loan Offer?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Contact us today or fill our 2-minute online eligibility query form. Our representative will contact you with bank offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-secondary text-white border-2 border-brand-accent hover:border-brand-secondary font-extrabold px-8 py-4 rounded-full shadow-lg text-center flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 text-center flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>Talk to Advisor on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
