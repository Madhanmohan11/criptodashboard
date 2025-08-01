export const metadata = {
  title: 'Crypto Dashboard',
  description: 'MacV AI Internship Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-green text-white font-sans">
        {children}
      </body>
    </html>
  );
}
