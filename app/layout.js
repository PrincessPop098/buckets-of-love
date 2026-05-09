import './globals.css'

export const metadata = {
  title: 'Buckets of Love',
  description: 'A community appreciation platform designed to make sharing gratitude easy and meaningful.',
  icons: {
    icon: '💝',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
