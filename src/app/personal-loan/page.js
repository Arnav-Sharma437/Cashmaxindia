import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import LoanPage from "@/components/LoanPage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "personal-loan" });
  return {
    title: service ? `${service.title} | Credmax Finserve` : "Personal Loan",
    description: service ? service.description : "Instant Personal Loans at Credmax Finserve.",
  };
}

export default async function Page() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "personal-loan" });

  if (!service) {
    notFound();
  }

  return <LoanPage service={service} />;
}
