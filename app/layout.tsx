import './globals.css'

export const metadata = {
  title: 'Buckets of Love',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}