import Link from 'next/link'

export default async function Home() {

  return (
    <section>   
      <ul>
        <li><Link href="/packs/1">Pack 1</Link></li>
        <li><Link href="/packs/2">Pack 2</Link></li>
      </ul>
    </section>
  )
}
