import './globals.css'

export const metadata = {
  title: 'Pisani Plan',
  description: 'Družinski planer za opravila, nagrade in skrb za Missy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="sl">
      <body>{children}</body>
    </html>
  )
}
