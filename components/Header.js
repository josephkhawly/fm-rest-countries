import { useTheme } from 'next-themes'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/outline'
import { MoonIcon as FilledMoonIcon } from '@heroicons/react/solid'

export default function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className="z-10 h-16 w-full bg-white shadow-md dark:bg-dm-background">
      <div className="container mx-auto flex h-full w-full items-center justify-between">
        <Link href="/" passHref>
          <a className="text-2xl font-extrabold">Where in the world?</a>
        </Link>
        <button
          className="flex items-center"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <FilledMoonIcon className="mr-3 h-5 w-5" />
          ) : (
            <MoonIcon className="mr-3 h-5 w-5" />
          )}{' '}
          Dark Mode
        </button>
      </div>
    </header>
  )
}
