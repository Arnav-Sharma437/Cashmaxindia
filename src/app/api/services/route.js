import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET: Fetch all services (Public)
export async function GET() {
  try {
    const db = await getDb();
    const services = await db.collection("services").find({}).toArray();
    return NextResponse.json({
      status: "success",
      services
    });
  } catch (error) {
    console.error("GET Services Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update dynamic service details (Protected - Admin Only)
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { slug, title, description, features, interestRateNote, eligibility, documents } = body;

    if (!slug || !title || !description) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields (slug, title, description)" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("services").updateOne(
      { slug },
      {
        $set: {
          title,
          description,
          features: Array.isArray(features) ? features : [],
          interestRateNote: interestRateNote || "",
          eligibility: Array.isArray(eligibility) ? eligibility : [],
          documents: Array.isArray(documents) ? documents : [],
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { status: "error", message: `Service with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: `Service '${title}' updated successfully`
    });

  } catch (error) {
    console.error("PUT Services Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
