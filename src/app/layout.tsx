import "~/styles/globals.css";
import { Inter } from "next/font/google";
import FooterContent from "~/modules/layout/components/footer/footer-content";
import { Toaster } from "~/components/ui/sonner";
import AppHeader from "~/modules/layout/components/header/app-header";
import { ThemeProvider } from "~/modules/layout/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tooling Data Explorer/Dashboard | TalentOlympics",
  description: "Tooling Data Explorer/Dashboard | TalentOlympics",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${inter.variable} min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          {children}
          <FooterContent />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
