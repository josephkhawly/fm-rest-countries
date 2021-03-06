import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const countries = await fetch(
    'https://restcountries.com/v3.1/all?fields=cca2'
  ).then((res) => res.json())
  return {
    paths: countries.map((country) => ({
      params: { name: country.cca2.toLowerCase() },
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
      `https://restcountries.com/v3.1/alpha/${border.toLowerCase()}`
    ).then((res) => res.json())
    borderCountries.push(borderCountry[0])
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

  const router = useRouter()

  const valuesToString = (obj, mapper) => {
    if (obj) {
      return Object.entries(obj).map(mapper).join(', ')
    }

    return 'Unknown'
  }

  return (
    <>
      <Head>
        <title>{name.common} | Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        className="hover-transition mr-3 mb-5 inline-block cursor-pointer rounded-sm bg-white px-9 py-2 shadow-md hover:-translate-y-1 dark:bg-dm-element"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>
      <div className="grid grid-cols-1 items-center gap-x-16 md:grid-cols-2">
        <Image
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          width={900}
          height={600}
          layout="responsive"
        />
        <div>
          <h2 className="mb-4 text-xl font-bold">{name.common}</h2>
          <div className="mb-8 grid grid-cols-1 gap-x-8 md:grid-cols-2">
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

          <div className="flex flex-wrap">
            <h3 className="mr-5 inline-block text-detail font-bold">
              Border Countries:
            </h3>

            {borderCountries.length > 0
              ? borderCountries.map((c) => (
                  <Link
                    key={c.cca2}
                    href={`/country/${c.cca2.toLowerCase()}`}
                    passHref
                  >
                    <div className="hover-transition mr-3 mb-5 inline-block cursor-pointer rounded-sm bg-white px-5 py-1 shadow-md hover:-translate-y-1 dark:bg-dm-element">
                      {c.name.common}
                    </div>
                  </Link>
                ))
              : 'None'}
          </div>
        </div>
      </div>
    </>
  )
}
