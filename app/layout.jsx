import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Buckets of Love</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
