import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import AuthWrapper from "@/components/AuthWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Cashmax Finserve | Fast Personal, Home & Business Loans in India",
  description: "Get fast and easy loan solutions with Cashmax Finserve. 100% digital process, starting from 8.40% interest. Apply now for Home, Personal, LAP, or Business loans.",
  metadataBase: new URL("https://cashmaxindia.in"),
  openGraph: {
    title: "Cashmax Finserve | Fast Personal, Home & Business Loans in India",
    description: "Compare and apply for top loan products with leading banks and NBFCs. 100% digital documentation and rapid disbursals.",
    url: "https://cashmaxindia.in",
    siteName: "Cashmax Finserve",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png", // Using logo as og:image
        width: 320,
        height: 80,
        alt: "Cashmax Finserve Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased font-body bg-white text-brand-neutralDark min-h-screen flex flex-col">
        <AuthWrapper>
          <ClientLayout>{children}</ClientLayout>
        </AuthWrapper>
      </body>
    </html>
  );
}
