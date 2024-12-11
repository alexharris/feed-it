import Link from 'next/link'
import ImportOPML from '@/app/components/importOPML'
import PackCard from './components/widgets/packCard'


export default async function Home() {

  return (
    <section className="">   
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-4 py-8 md:py-16 max-w-5xl mx-auto">
      <div className="w-full md:w-1/2">
        <div className="text-4xl md:text-6xl pb-6 thermo">Create and discover RSS starter packs</div>

        <div className="text-xl md:text-2xl mb-8">Create, analyze and share starter packs of your favorite blogs, newsletters and social feeds.</div>
        <Link href="/signup"><div className="button">Get Started</div></Link>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <img src="/computer-feed.png" alt="Computer Feed" className="" />
      </div>
    </div>
      
    <div className="flex flex-col bg-gray-800 p-12 text-white">
      <div className="text-center text-3xl">
      Check out some packs
      </div>
      <div className="flex flex-col lg:flex-row py-12 rounded gap-4 justify-center">
        <PackCard packId="33" />
        <PackCard packId="52" />
        <PackCard packId="33" />
      </div>

    </div>
      

      {/* <ImportOPML /> */}


    </section>
  )
}
