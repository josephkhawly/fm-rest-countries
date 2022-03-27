import { ThemeProvider } from 'next-themes'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <main className="container mx-auto my-8 w-full px-8 md:my-16">
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}

export default MyApp
