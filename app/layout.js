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
      <head>
        {/*
          Fonts load here rather than via `@import url(...)` in twkTheme.scss.
          Those imports sat at the bottom of the stylesheet, and CSS requires
          @import to precede all other rules — Turbopack's stricter output made
          browsers drop them, so every family silently fell back (Bungee -> cursive).
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Roboto+Mono:ital@0;1&family=Roboto:ital,wght@0,400;0,900;1,400;1,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,800;1,400;1,500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
