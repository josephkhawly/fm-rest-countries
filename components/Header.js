import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className="z-10 h-16 w-full bg-white shadow-md dark:bg-dm-background">
      <div className="container mx-auto flex h-full w-full items-center justify-between">
        <Link href="/" passHref>
          <a className="text-2xl font-extrabold">Where in the world?</a>
        </Link>
        <button
          className=""
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Dark Mode
        </button>
      </div>
    </header>
  )
}
