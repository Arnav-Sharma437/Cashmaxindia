import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import LoanPage from "@/components/LoanPage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "working-capital" });
  return {
    title: service ? `${service.title} | Credmax Finserve` : "Working Capital",
    description: service ? service.description : "Overdraft and Working Capital Loans at Credmax Finserve.",
  };
}

export default async function Page() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "working-capital" });

  if (!service) {
    notFound();
  }

  return <LoanPage service={service} />;
}
