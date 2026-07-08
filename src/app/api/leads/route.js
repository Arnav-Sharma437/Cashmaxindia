import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST: Lead Submission (Public)
export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      name, 
      companyName, 
      profession, 
      city, 
      loanProduct, 
      annualIncome, 
      loanAmount, 
      mobile 
    } = body;

    // Field Validations
    if (!name || !profession || !city || !loanProduct || !loanAmount || !mobile) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("leads").insertOne({
      name: name.trim(),
      companyName: companyName ? companyName.trim() : "",
      profession, // "Salaried" | "Self Employed" | "Professional"
      city: city.trim(),
      loanProduct,
      annualIncome: annualIncome ? annualIncome.trim() : "Not Specified",
      loanAmount: loanAmount.trim(),
      mobile: mobile.trim(),
      status: "new", // default status
      createdAt: new Date()
    });

    return NextResponse.json({
      status: "success",
      message: "Lead captured successfully",
      leadId: result.insertedId
    });

  } catch (error) {
    console.error("POST Lead Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch Leads list (Protected - Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const db = await getDb();
    // Fetch all leads sorted by most recent first
    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      status: "success",
      leads
    });

  } catch (error) {
    console.error("GET Leads Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
