import { Bungee, Raleway, Roboto_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.scss";

// Self-hosted at build time by next/font: no request to fonts.googleapis.com,
// no render-blocking third-party connection, and no dependence on where an
// @import lands in the emitted CSS (which silently killed every font once).
// next/font also generates a size-adjusted local fallback, so swapping in the
// real face doesn't shift layout.
//
// Only these three are declared because only these three are used. The site
// was also downloading Montserrat (6 variants) and proportional Roboto (4),
// neither of which appears in a single font-family rule.
const display = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Raleway({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  title: "Tim | Software Engineer 👋 💻",
  description:
    "Expert in Node.js, Express, React, Vue, Ruby on Rails, and databases like MongoDB, PostgreSQL, & MySQL",
  manifest: "/manifest.json",
  icons: {
    icon: "/img/timknabdev-favico.png",
    apple: "/img/timknabdev-favico.png",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
