import Head from 'next/head'
import Image from 'next/image'

export async function getStaticPaths() {
  const countries = await fetch('https://restcountries.com/v3.1/all').then(
    (res) => res.json()
  )
  return {
    paths: countries.map((country) => ({
      params: { name: country.cca2.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const country = await fetch(
    `https://restcountries.com/v3.1/alpha/${params.name}`
  ).then((res) => res.json())

  return {
    props: { country: country[0] },
  }
}

export default function Details({ country }) {
  console.log(country)
  return (
    <main className="container mx-auto my-8 w-full px-8 md:my-16">
      <Head>
        <title>{country.name.common} | Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{country.name.common}</h2>
    </main>
  )
}
