import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import nodemailer from "nodemailer";

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

    // Send Email Notification in try/catch to ensure database write is not blocked on failure
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: true, // true since port is 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const emailHtml = `
        <h3>New Lead captured on Cashmax Finserve</h3>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
          <tr style="background-color: #f2f2f2;">
            <th align="left">Field</th>
            <th align="left">Value</th>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Company Name</strong></td>
            <td>${companyName || "N/A"}</td>
          </tr>
          <tr>
            <td><strong>Profession</strong></td>
            <td>${profession}</td>
          </tr>
          <tr>
            <td><strong>City</strong></td>
            <td>${city}</td>
          </tr>
          <tr>
            <td><strong>Loan Product</strong></td>
            <td>${loanProduct}</td>
          </tr>
          <tr>
            <td><strong>Annual ITR/Salary</strong></td>
            <td>${annualIncome || "Not Specified"}</td>
          </tr>
          <tr>
            <td><strong>Loan Amount</strong></td>
            <td>₹${loanAmount}</td>
          </tr>
          <tr>
            <td><strong>Mobile No</strong></td>
            <td>${mobile}</td>
          </tr>
          <tr>
            <td><strong>Lead ID</strong></td>
            <td>${result.insertedId}</td>
          </tr>
        </table>
      `;

      await transporter.sendMail({
        to: process.env.NOTIFY_EMAIL,
        from: process.env.SMTP_USER,
        subject: "New Lead — Cashmax Finserve",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Nodemailer Email Notification Error:", emailError);
    }

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
