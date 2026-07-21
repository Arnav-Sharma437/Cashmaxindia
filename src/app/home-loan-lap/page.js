import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import LoanPage from "@/components/LoanPage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "home-loan-lap" });
  return {
    title: service ? `${service.title} | Credmax Finserve` : "Home Loan & LAP",
    description: service ? service.description : "Home Loans & Loan Against Property at Credmax Finserve.",
  };
}

export default async function Page() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "home-loan-lap" });

  if (!service) {
    notFound();
  }

  return <LoanPage service={service} />;
}
