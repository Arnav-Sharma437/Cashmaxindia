"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

function ContactForm() {
  const searchParams = useSearchParams();
  const productQuery = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    profession: "Salaried",
    city: "",
    loanProduct: "Personal Loan",
    annualIncome: "",
    loanAmount: "",
    mobile: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Map URL parameter slugs to dropdown display names
  useEffect(() => {
    if (productQuery) {
      const mapping = {
        "business-loan": "Business Loan",
        "personal-loan": "Personal Loan",
        "home-loan-lap": "Home Loan/LAP",
        "machinery-finance": "Machinery/Equipment Finance",
        "working-capital": "Working Capital",
      };
      if (mapping[productQuery]) {
        setFormData((prev) => ({ ...prev, loanProduct: mapping[productQuery] }));
      }
    }
  }, [productQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Form Validations
    if (!formData.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!formData.city.trim()) {
      setFormError("Please enter your city.");
      return;
    }
    if (!formData.loanAmount.trim() || isNaN(formData.loanAmount.replace(/,/g, ""))) {
      setFormError("Please enter a valid loan amount.");
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          companyName: "",
          profession: "Salaried",
          city: "",
          loanProduct: "Personal Loan",
          annualIncome: "",
          loanAmount: "",
          mobile: "",
        });
      } else {
        setFormError(data.message || "Failed to submit lead. Please try again.");
      }
    } catch (err) {
      console.error("Submit Lead Error:", err);
      setFormError("Connection error. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = "https://wa.me/919911956789?text=Hi%20Credmax%20Finserve,%20I%20want%20to%20apply%20for%20a%20loan.%20Please%20guide%20me.";

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Details (Left Column) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-brand-neutralDark">Get In Touch</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Reach out through any channel below. Our credit team will verify your eligibility details and match you with lenders.
            </p>
          </div>

          <div className="space-y-4">
            {/* Address */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-neutralDark text-sm sm:text-base">Office Address</h4>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-1 leading-relaxed">
                  602, Kirti Mahal Tower, Rajendra Place, <br />
                  New Delhi, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-neutralDark text-sm sm:text-base">Phone Assistance</h4>
                <a href="tel:+919911956789" className="text-gray-400 text-xs sm:text-sm font-semibold mt-1 hover:text-brand-primary block">
                  +91 99119 56789
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-neutralDark text-sm sm:text-base">Support Email</h4>
                <a href="mailto:info@credmaxindia.in" className="text-gray-400 text-xs sm:text-sm font-semibold mt-1 hover:text-brand-primary block">
                  info@credmaxindia.in
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-neutralDark text-sm sm:text-base">Office Hours</h4>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-1">
                  Monday - Saturday: 9:30 AM to 6:30 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Support Button */}
          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-green-800 text-base sm:text-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#25D366] mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 12c0-5.799 4.701-10.5 10.5-10.5S22.5 6.201 22.5 12s-4.701 10.5-10.5 10.5c-1.895 0-3.676-.503-5.215-1.382l-5.183 1.728a.75.75 0 0 1-.951-.95l1.728-5.183A10.457 10.457 0 0 1 1.5 12zm10.5-7.5a7.5 7.5 0 0 0-6.19 11.725.75.75 0 0 1 .094.618l-.946 2.837 2.837-.946a.75.75 0 0 1 .618.094A7.5 7.5 0 1 0 12 4.5zm2.84 8.78c-.2.435-.783.74-1.272.827-.37.067-.852.12-2.484-.555-2.086-.863-3.433-2.986-3.537-3.125-.104-.139-.834-1.11-.834-2.115 0-1.005.52-1.5.706-1.705.186-.205.405-.257.54-.257.135 0 .27.001.388.006.126.005.295-.047.461.353.17.411.583 1.42.632 1.52.05.1.083.218.016.353-.066.136-.1.218-.2.336-.1.117-.21.263-.3.353-.1.1-.205.209-.089.409.117.2.52 1.554 1.114 2.083.473.42 1.07.727 1.458.82.164.04.309.043.43-.021.16-.084.632-.736.8-1 .168-.263.336-.219.563-.135.228.084 1.442.68 1.69.798.248.118.413.176.474.281.062.105.062.61-.137 1.045z"
                  clipRule="evenodd"
                />
              </svg>
              Instant Support on WhatsApp
            </h3>
            <p className="text-xs text-green-700 font-semibold leading-relaxed">
              Prefer chatting over typing forms? Skip this form entirely. Chat with our loan support advisors directly. We respond instantly.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl shadow-md transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Lead Query Form (Right Column) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-brand-neutralDark border-b border-gray-100 pb-4">
              Loan Application Form
            </h3>

            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                </div>
                <h4 className="text-xl font-bold text-brand-neutralDark">Application Received!</h4>
                <p className="text-sm text-gray-500 max-w-sm mx-auto font-semibold">
                  Thank you! Our loan officer will call you within 15 minutes to run your credit assessment and match you with bank partners.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Name & 2. Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Company Name (if applicable)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 3. Profession & 4. City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Profession Type *
                    </label>
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                    >
                      <option value="Salaried">Salaried Employee</option>
                      <option value="Self Employed">Self Employed / Business Owner</option>
                      <option value="Professional">Independent Professional (CA/Doctor)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* 5. Loan Product & 6. Annual Income */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Loan Product Category *
                    </label>
                    <select
                      name="loanProduct"
                      value={formData.loanProduct}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                    >
                      <option value="Business Loan">Business Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Home Loan/LAP">Home Loan / LAP</option>
                      <option value="Machinery/Equipment Finance">Machinery/Equipment Finance</option>
                      <option value="Working Capital">Working Capital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Annual Income / Salary (p.a.)
                    </label>
                    <input
                      type="text"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      placeholder="e.g. ₹6 Lakhs"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 7. Loan Amount & 8. Mobile No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Loan Amount Required (₹) *
                    </label>
                    <input
                      type="text"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="e.g. 10,00,000"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData((prev) => ({ ...prev, mobile: val }));
                        }}
                        placeholder="10-digit number"
                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm font-semibold transition-all"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message / Details */}
                <div>
                  <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                    Message / Special Requests (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Share any other details like credit scores or property location to help speed up verification."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-red-500 text-xs font-semibold">{formError}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-secondary disabled:bg-gray-200 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-2 pt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Privacy Assured. Your details are never shared with unsolicited brokers.</span>
                </div>
              </form>
            )}
          </div>

          {/* Embedded Google Maps Placeholder */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white">
            <div className="bg-brand-primary p-4 text-white font-bold text-xs tracking-wider uppercase flex items-center">
              <MapPin className="w-4 h-4 text-brand-accent mr-2" />
              Office Location Map
            </div>
            <div className="w-full h-[300px] bg-brand-neutralLight relative">
              <iframe
                title="Credmax Finserve Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5807954002613!2d77.32420957630236!3d28.582352875691068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d1136!2d77.3255!3d28.5825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <Suspense fallback={<div className="text-center py-20 font-semibold">Loading Form...</div>}>
        <ContactForm />
      </Suspense>
    </>
  );
}
