import './globals.css';

export const metadata = {
  title: 'Thamodharan.',
  description: 'I build apps and products.',
  openGraph: {
    title: 'Thamodharan.',
    description: 'I build apps and products.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="starfield" id="starfield"></div>
        {children}
      </body>
    </html>
  );
}
