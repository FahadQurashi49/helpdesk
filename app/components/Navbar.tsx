import Image from "next/image";
import Link from "next/link";
import Logo from './dojo-logo.png';


export default function Navbar() {
  return (
    <nav>
        <Image
         src={Logo}
         alt='Helpdesk Logo'
         width={70}
         placeholder='blur'
         quality={100}
        />
        <h1>Helpdesk</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">Tickets</Link>
    </nav>
  )
}
