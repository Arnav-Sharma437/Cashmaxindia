import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const db = await getDb();
    
    // 1. Seed Admin User
    const adminEmail = "admin@cashmaxindia.in";
    const existingAdmin = await db.collection("users").findOne({ email: adminEmail });
    
    let adminCreated = false;
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@Cashmax2026", 10);
      await db.collection("users").insertOne({
        name: "Cashmax Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date()
      });
      adminCreated = true;
    }

    // 2. Seed Default Services content
    const defaultServices = [
      {
        slug: "business-loan",
        title: "Business Loan",
        description: "Accelerate your enterprise growth with collateral-free funding up to ₹75 Lakhs. Expand operations, purchase inventory, or scale your production unit with rapid disbursal options.",
        features: [
          "Collateral-free business term loans up to ₹50 Lakhs",
          "Flexible payment models (OD limit, term loan, machinery backing)",
          "Credit check based on business GST returns and bank turnover",
          "Special concessions for registered women entrepreneurs"
        ],
        interestRateNote: "Starting from 12.00%*",
        eligibility: [
          "Minimum 3 years of active continuous business operation",
          "Annual filed business ITR of ₹3 Lakhs minimum",
          "Location: Operating within our serviced cities",
          "Healthy credit score (CIBIL 700+ preferred)"
        ],
        documents: [
          "GST registration certificate & business address proof",
          "GST return summaries for latest 12 months",
          "ITR files & income computations for the last 2 financial years",
          "Primary company bank statements for the past 12 months"
        ],
        updatedAt: new Date()
      },
      {
        slug: "personal-loan",
        title: "Personal Loan",
        description: "Instant cash loans for medical emergencies, home renovation, child education, or dream travel plans. Secure up to ₹40 Lakhs with 100% paperless digital verification.",
        features: [
          "Zero security or asset collateral required",
          "Fully digital verification and quick bank credit",
          "Flexible repayment tenures ranging from 1 to 6 years",
          "No end-use restrictions—spend on any personal requirement"
        ],
        interestRateNote: "Starting from 10.49%*",
        eligibility: [
          "Applicant age: Between 21 and 60 years old",
          "Employment type: Salaried professional in MNC, Gov or reputed firm",
          "Minimum net monthly salary: ₹25,000 credit in bank account",
          "Clean payment history (CIBIL 650+ preferred)"
        ],
        documents: [
          "KYC: Aadhaar Card, PAN Card and recent photograph",
          "Latest 3 months salary slips carrying company details",
          "Salary account bank statements for the past 6 months",
          "Form 16 / Income Tax Returns documents"
        ],
        updatedAt: new Date()
      },
      {
        slug: "home-loan-lap",
        title: "Home Loan & Loan Against Property (LAP)",
        description: "Own your dream residence or unlock the equity of your residential/commercial property. Get up to ₹15 Crore with competitive margins and extended repayment schedules.",
        features: [
          "High Loan-to-Value (LTV) ratios up to 70% of market value",
          "Extended loan tenures up to 30 years for home buyers",
          "Simple balance transfer facilities with top-up options",
          "Accepts commercial, residential, and vacant industrial plots"
        ],
        interestRateNote: "Starting from 8.40%*",
        eligibility: [
          "Applicant age: Between 21 and 65 years old at maturity",
          "Stable source of income (Salaried or Self-Employed)",
          "Property title: Clear, marketable, free from litigation",
          "CIBIL score: 650+ preferred"
        ],
        documents: [
          "KYC: Aadhaar Card, PAN Card and Address proof",
          "Property original registration chain deeds and approvals",
          "Salary account statement (6 months) or audited financials (2 years)",
          "Approved building layouts & maps"
        ],
        updatedAt: new Date()
      },
      {
        slug: "machinery-finance",
        title: "Machinery & Equipment Finance",
        description: "Upgrade your manufacturing plant, packaging line, or clinical diagnostic setup. Fund up to 90% of new machine invoice values with tailored repayment models.",
        features: [
          "High financing limits covering up to 90% of proforma invoice",
          "Custom payment modules aligning with seasonal business output",
          "Fast direct dealer payment processing to reduce lead times",
          "Preserves working capital reserves for raw material purchases"
        ],
        interestRateNote: "Starting from 11.50%*",
        eligibility: [
          "Minimum 3 years active manufacturing or packaging business",
          "Valid machinery purchase quotation / proforma invoice",
          "Positive net operating profit for the past 2 fiscal years",
          "CIBIL rating: 700+ for key promoters/partners"
        ],
        documents: [
          "Proforma invoice / dealer quotation of machinery to buy",
          "Company registration proof (GST/MSME/Partnership deed)",
          "Audited balance sheet & Profit & Loss statements (2 years)",
          "Turnover bank statements for the past 6 months"
        ],
        updatedAt: new Date()
      },
      {
        slug: "working-capital",
        title: "Working Capital Finance",
        description: "Maintain smooth operational cycles without inventory gaps. Avail flexible cash credits, overdraft lines, and trade finance limits to accelerate accounts receivables.",
        features: [
          "Cash Credit (CC) limits matching periodic stock statements",
          "Overdraft (OD) facilities backed by physical property or turnover",
          "Letter of Credit (LC) & Bank Guarantees (BG) for suppliers",
          "Interest charged only on the exact utilized credit amount"
        ],
        interestRateNote: "Starting from 10.99%*",
        eligibility: [
          "Registered entity (LLP, Pvt Ltd, Partnership, Proprietorship)",
          "Annual turnover of ₹50 Lakhs minimum with active trading",
          "Healthy debt-to-equity ratio and positive operational indicators",
          "Clean banking operations with zero check/mandate bounces"
        ],
        documents: [
          "Stock & Debtors statements (certified by Chartered Accountant)",
          "ITR filings and audited reports for the last 3 financial years",
          "GST returns & primary company bank statements (12 months)",
          "Partnership deeds / Board resolutions to borrow"
        ],
        updatedAt: new Date()
      }
    ];

    let servicesSeeded = 0;
    for (const service of defaultServices) {
      const exists = await db.collection("services").findOne({ slug: service.slug });
      if (!exists) {
        await db.collection("services").insertOne(service);
        servicesSeeded++;
      }
    }

    return NextResponse.json({
      status: "success",
      message: "Database seeding sequence completed.",
      details: {
        adminCreated,
        adminUser: adminCreated ? adminEmail : "Already exists",
        servicesSeeded
      }
    });

  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
