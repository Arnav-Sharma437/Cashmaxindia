import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import LoanPage from "@/components/LoanPage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "business-loan" });
  return {
    title: service ? `${service.title} | Cashmax Finserve` : "Business Loan",
    description: service ? service.description : "Affordable Business Loans at Cashmax Finserve.",
  };
}

export default async function Page() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "business-loan" });

  if (!service) {
    notFound();
  }

  return <LoanPage service={service} />;
}
