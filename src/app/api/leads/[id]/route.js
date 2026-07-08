import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// PATCH: Update Lead Status (Protected - Admin Only)
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { status: "error", message: "Invalid lead ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    // Validate status values
    if (!["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json(
        { status: "error", message: "Invalid status value. Must be 'new', 'contacted' or 'closed'" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { status: "error", message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Lead status updated successfully"
    });

  } catch (error) {
    console.error("PATCH Lead Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
