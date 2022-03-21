import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export async function getStaticPaths() {
  const countries = await fetch(
    'https://restcountries.com/v3.1/all?fields=cca3'
  ).then((res) => res.json())
  return {
    paths: countries.map((country) => ({
      params: { name: country.cca3.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const country = await fetch(
    `https://restcountries.com/v3.1/alpha/${params.name}?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`
  ).then((res) => res.json())

  const borderCountries = []

  for (const border of country.borders) {
    const borderCountry = await fetch(
      `https://restcountries.com/v3.1/alpha/${border.toLowerCase()}?fields=name,cca3`
    ).then((res) => res.json())
    borderCountries.push(borderCountry)
  }

  return {
    props: {
      country,
      borderCountries,
    },
  }
}

function Detail({ name, value }) {
  return (
    <p className="mb-1 text-detail">
      <span className="font-semibold">{name}:</span> {value}
    </p>
  )
}

export default function CountryDetails({ country, borderCountries }) {
  const {
    name,
    flags,
    population,
    region,
    capital,
    subregion,
    tld,
    currencies,
    languages,
  } = country
  const formattedPopulation = population.toLocaleString('en-US')

  const valuesToString = (obj, mapper) => {
    if (obj) {
      return Object.entries(obj).map(mapper).join(', ')
    }

    return 'Unknown'
  }

  return (
    <main className="container mx-auto my-8 w-full px-8 md:my-16">
      <Head>
        <title>{name.common} | Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Image
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          width={900}
          height={600}
          layout="responsive"
        />
        <div>
          <h2 className="mb-4 text-xl font-bold">{name.common}</h2>
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
            <div className="mb-8 md:mb-0">
              <Detail
                name="Native Name"
                value={valuesToString(
                  name.nativeName,
                  ([, value]) => value.common
                )}
              />
              <Detail name="Population" value={formattedPopulation} />
              <Detail name="Region" value={region} />
              <Detail name="Sub Region" value={subregion} />
              <Detail name="Capital" value={capital} />
            </div>

            <div>
              <Detail name="Top Level Domain" value={tld} />
              <Detail
                name="Currencies"
                value={valuesToString(currencies, ([, value]) => value.name)}
              />
              <Detail
                name="Languages"
                value={valuesToString(languages, ([, value]) => value)}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Border Countries:</h3>
            {borderCountries.map((c) => (
              <Link key={c.cca3} href={`/country/${c.cca3.toLowerCase()}`}>
                {c.name.common}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
