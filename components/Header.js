import Link from "next/link";

export default function Header() {
    return (
        <header className="shadow-md h-16 z-10 bg-white w-full">
            <div className="container mx-auto w-full flex items-center justify-between h-full">
                <Link href="/" passHref>
                    <a className="font-extrabold text-2xl">Where in the world?</a>
                </Link>
            </div>
        </header>
    )
}