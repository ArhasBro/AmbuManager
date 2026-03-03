import "./globals.css";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}