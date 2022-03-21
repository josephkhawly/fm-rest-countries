import Head from 'next/head'
import { CountryCard } from '../components/CountryCard'

export async function getStaticProps() {
  const countries = await fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())

  return {
    props: {
      countries
    }
  }
}

export default function Home({ countries }) {
  return (
    <main className='container mx-auto px-8 w-full my-8 md:my-16'>
      <Head>
        <title>Frontend Mentor REST Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {countries.map(country => <CountryCard key={country.name.common} country={country} />)}
      </div>
    </main>
  )
}

