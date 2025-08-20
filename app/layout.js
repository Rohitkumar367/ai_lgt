import localFont from 'next/font/local'
import Provider from './provider'
import './globals.css'

const hostGrotesk = localFont({
  src: './_fonts/HostGrotesk-VariableFont_wght.ttf',
  variable: '--font-host-grotesk',
  display: 'swap',
})

export const metadata = {
  title: 'Logo Maker',
  description: 'Create your logo with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hostGrotesk.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
