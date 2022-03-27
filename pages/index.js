import Head from 'next/head'
import { useState } from 'react'
import { CountryCard } from '../components/CountryCard'

export async function getStaticProps() {
  const countries = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region,cca2'
  ).then((res) => res.json())

  return {
    props: {
      countries,
    },
  }
}

export default function Home({ countries }) {
  const [countriesList, setCountriesList] = useState(countries)
  const filterByRegion = (e) => {
    if (e.target.value === 'All') {
      setCountriesList(countries)
    } else {
      setCountriesList(
        countries.filter((country) => country.region === e.target.value)
      )
    }
  }

  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setCountriesList(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      )
    )
  }

  return (
    <>
      <Head>
        <title>Frontend Mentor REST Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mb-6 flex items-center justify-between">
        <input
          type="text"
          className="bg-white px-4 py-4 shadow-md dark:bg-dm-element"
          placeholder="Search for a country"
          onChange={search}
        />

        <select
          onChange={filterByRegion}
          className="p-4 pr-8 shadow-md dark:bg-dm-element"
        >
          <option value={'All'}>Filter by Region</option>
          <option value={'Africa'}>Africa</option>
          <option value={'Americas'}>Americas</option>
          <option value={'Asia'}>Asia</option>
          <option value={'Europe'}>Europe</option>
          <option value={'Oceania'}>Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {countriesList.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </>
  )
}
