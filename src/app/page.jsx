import Link from 'next/link'
import ImportOPML from '@/app/components/importOPML'


export default async function Home() {

  return (
    <section className="p-4">   
      <div className="text-4xl mb-4">Intro Text</div>
      <ul>
        <li><Link href="/packs/1">Technology</Link></li>
        <li><Link href="/packs/2">IndieWeb</Link></li>
      </ul>
      <ImportOPML />


    </section>
  )
}
