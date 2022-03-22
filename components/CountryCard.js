import Image from 'next/image'
import Link from 'next/link'

export function CountryCard({ country }) {
  const { name, flags, population, region, capital } = country
  const formattedPopulation = population.toLocaleString('en-US')

  return (
    <Link href={`country/${country.cca2.toLowerCase()}`} passHref>
      <div className="hover-transition cursor-pointer shadow-md hover:-translate-y-2">
        <Image
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          width={900}
          height={600}
          layout="responsive"
        />
        <div className="bg-white px-5 pt-5 pb-10">
          <h2 className="mb-4 text-xl font-bold">{name.common}</h2>
          <p className="mb-1 text-homepage">
            <span className="font-semibold">Population:</span>{' '}
            {formattedPopulation}
          </p>
          <p className="mb-1 text-homepage">
            <span className="font-semibold">Region:</span> {region}
          </p>
          <p className="mb-1 text-homepage">
            <span className="font-semibold">Capital:</span> {capital}
          </p>
        </div>
      </div>
    </Link>
  )
}
