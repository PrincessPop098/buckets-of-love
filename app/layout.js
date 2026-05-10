import './globals.css'

export const metadata = {
  title: 'Buckets of Love',
  description: 'A community appreciation platform designed to make sharing gratitude easy and meaningful.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
