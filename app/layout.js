import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.scss";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
