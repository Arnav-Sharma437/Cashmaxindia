"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Landmark, Calendar, Percent, IndianRupee } from "lucide-react";

export default function EMICalculator() {
  const [amount, setAmount] = useState(500000); // 5 Lakhs default
  const [interestRate, setInterestRate] = useState(9.5); // 9.5% default
  const [tenure, setTenure] = useState(5); // 5 Years default
  const [tenureType, setTenureType] = useState("years"); // years vs months

  const [emiDetails, setEmiDetails] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayable: 0,
    interestPercent: 0,
    principalPercent: 0,
  });

  useEffect(() => {
    const P = amount;
    const annualR = interestRate;
    const n = tenureType === "years" ? tenure * 12 : tenure;
    const r = annualR / 12 / 100;

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;
    const interestPercent = (totalInterest / totalPayable) * 100;
    const principalPercent = (P / totalPayable) * 100;

    setEmiDetails({
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      interestPercent: parseFloat(interestPercent.toFixed(1)) || 0,
      principalPercent: parseFloat(principalPercent.toFixed(1)) || 0,
    });
  }, [amount, interestRate, tenure, tenureType]);

  // Format currency in Indian numbering system
  const formatIndianCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // SVG Donut Chart variables
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const interestStrokeOffset =
    circumference - (emiDetails.interestPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header bar */}
      <div className="bg-brand-primary p-6 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Landmark className="w-6 h-6 text-brand-accent" />
          <h3 className="text-xl font-bold font-heading">Loan EMI Calculator</h3>
        </div>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          Interactive
        </span>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loan Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-brand-neutralDark/80 flex items-center">
                <IndianRupee className="w-4 h-4 mr-1 text-brand-primary" />
                Loan Amount
              </label>
              <div className="px-3 py-1.5 bg-brand-neutralLight text-brand-primary font-bold rounded-lg border border-gray-200">
                {formatIndianCurrency(amount)}
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 font-semibold">
              <span>₹50K</span>
              <span>₹25L</span>
              <span>₹50L</span>
              <span>₹75L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-brand-neutralDark/80 flex items-center">
                <Percent className="w-4 h-4 mr-1 text-brand-primary" />
                Interest Rate (p.a.)
              </label>
              <div className="px-3 py-1.5 bg-brand-neutralLight text-brand-primary font-bold rounded-lg border border-gray-200">
                {interestRate}%
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 font-semibold">
              <span>6%</span>
              <span>10%</span>
              <span>14%</span>
              <span>18%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-brand-neutralDark/80 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-brand-primary" />
                Tenure
              </label>
              <div className="flex items-center space-x-2">
                {/* Years / Months toggle */}
                <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setTenureType("years");
                      setTenure(5);
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      tenureType === "years"
                        ? "bg-white text-brand-primary shadow-sm"
                        : "text-gray-400 hover:text-brand-neutralDark"
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTenureType("months");
                      setTenure(60);
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      tenureType === "months"
                        ? "bg-white text-brand-primary shadow-sm"
                        : "text-gray-400 hover:text-brand-neutralDark"
                    }`}
                  >
                    Months
                  </button>
                </div>
                
                <div className="px-3 py-1.5 bg-brand-neutralLight text-brand-primary font-bold rounded-lg border border-gray-200 min-w-[70px] text-center">
                  {tenure} {tenureType === "years" ? "Yrs" : "Mo"}
                </div>
              </div>
            </div>
            <input
              type="range"
              min={tenureType === "years" ? "1" : "12"}
              max={tenureType === "years" ? "30" : "360"}
              step="1"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 font-semibold">
              <span>{tenureType === "years" ? "1 Yr" : "12 Mo"}</span>
              <span>{tenureType === "years" ? "10 Yrs" : "120 Mo"}</span>
              <span>{tenureType === "years" ? "20 Yrs" : "240 Mo"}</span>
              <span>{tenureType === "years" ? "30 Yrs" : "360 Mo"}</span>
            </div>
          </div>
          
        </div>

        {/* Results Area & Donut Chart (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-brand-neutralLight/50 p-6 rounded-xl border border-gray-100 space-y-6">
          
          {/* SVG Donut Chart */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle (Principal Component) */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="#0E4DA4"
                strokeWidth={strokeWidth}
              />
              {/* Foreground arc (Interest Component) */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="#F5A623"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={interestStrokeOffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            
            {/* Center label inside chart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Monthly EMI</span>
              <span className="text-xl font-extrabold text-brand-neutralDark font-heading mt-0.5">
                {formatIndianCurrency(emiDetails.monthlyEmi)}
              </span>
            </div>
          </div>

          {/* Details & Legends Grid */}
          <div className="w-full space-y-3">
            {/* Principal Legend */}
            <div className="flex justify-between items-center text-sm border-b border-gray-200/50 pb-2">
              <div className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-primary mr-2.5"></span>
                <span className="text-gray-500 font-medium">Principal Amount</span>
              </div>
              <span className="font-bold text-brand-neutralDark">
                {formatIndianCurrency(amount)} ({emiDetails.principalPercent}%)
              </span>
            </div>

            {/* Interest Legend */}
            <div className="flex justify-between items-center text-sm border-b border-gray-200/50 pb-2">
              <div className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F5A623] mr-2.5"></span>
                <span className="text-gray-500 font-medium">Total Interest</span>
              </div>
              <span className="font-bold text-brand-neutralDark">
                {formatIndianCurrency(emiDetails.totalInterest)} ({emiDetails.interestPercent}%)
              </span>
            </div>

            {/* Total Payable */}
            <div className="flex justify-between items-center text-sm pt-1">
              <div className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-gray-400 mr-2.5"></span>
                <span className="text-gray-500 font-semibold">Total Payable</span>
              </div>
              <span className="font-extrabold text-brand-primary">
                {formatIndianCurrency(emiDetails.totalPayable)}
              </span>
            </div>
          </div>

          {/* CTA under results */}
          <Link
            href="/contact"
            className="w-full text-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 rounded-xl shadow-md transition-colors"
          >
            Apply for this Loan
          </Link>
          
        </div>
        
      </div>
    </div>
  );
}
