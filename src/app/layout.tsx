import './globals.css';
import Providers from '@/components/Providers';
import QueryProvider from '@/lib/QueryProviders';
import { Poppins } from 'next/font/google';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'UWKS.MABAR',
    template: '%s | UWKS.MABAR',
  },
  description: 'UWKS.MABAR',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="images/logo.png" type="image/png" />
      </head>
      <body className={`font-sans ${poppins.variable} bg-primary`}>
        <Providers>
          <EdgeStoreProvider>
            <QueryProvider>{props.children}</QueryProvider>
          </EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
