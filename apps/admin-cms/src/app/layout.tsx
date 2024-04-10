// ** import Core Packages


import { cookies } from 'next/headers';

// ** import apis
import { TRPCReactProvider } from '@/trpc/react';

// ** Import Styles


// ** Import Configs


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>

      <html
        lang="en"
        dir="ltr"
        // required this one for next-themes, remove it if you are not using next-theme
        // 💡 Prevent next-themes hydration warning
        suppressHydrationWarning
      >
        <head>
          {/* Add the app icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body
          // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>

    </TRPCReactProvider>
  );
}
