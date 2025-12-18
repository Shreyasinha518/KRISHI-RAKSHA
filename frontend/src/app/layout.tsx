import React from 'react';
import '@/styles/tailwind.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Next.js with Tailwind CSS',
  description: 'A boilerplate project with Next.js and Tailwind CSS',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;500&family=Source+Sans+Pro:wght@400&family=JetBrains+Mono:wght@400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
        <script 
          type="module" 
          async 
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fagriinsure1581back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" 
        />
        <script 
          type="module" 
          defer 
          src="https://static.rocket.new/rocket-shot.js?v=0.0.1"
        />
      </body>
    </html>
  );
}
