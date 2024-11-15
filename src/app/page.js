import Link from 'next/link'

export default async function Home() {

  return (
    <section>   
      <ul>
        <li><Link href="/packs/1">Technology</Link></li>
        <li><Link href="/packs/2">IndieWeb</Link></li>
      </ul>
    </section>
  )
}
