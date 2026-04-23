import "./globals.css";
import AppShell from "./app-shell";
import Providers from "./providers";

export const metadata = {
  title: "Ambulance Manager",
  description: "Gestion multi-entreprise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
