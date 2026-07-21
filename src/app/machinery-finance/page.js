import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import LoanPage from "@/components/LoanPage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "machinery-finance" });
  return {
    title: service ? `${service.title} | Credmax Finserve` : "Machinery Finance",
    description: service ? service.description : "Equipment and Machinery Finance at Credmax Finserve.",
  };
}

export default async function Page() {
  const db = await getDb();
  const service = await db.collection("services").findOne({ slug: "machinery-finance" });

  if (!service) {
    notFound();
  }

  return <LoanPage service={service} />;
}
