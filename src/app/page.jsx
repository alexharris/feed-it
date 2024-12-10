import Link from 'next/link'
import ImportOPML from '@/app/components/importOPML'
import PackCard from './components/widgets/packCard'


export default async function Home() {

  return (
    <section className="">   
    <div className="flex flex-row items-center gap-8 justify-around px-4 py-16">
      <div className="w-1/2 pl-24 ">
        <div className="text-6xl pb-6">Share your RSS reading list</div>

        <div className="text-2xl mb-8">Create, analyze and share starter packs of your favorite blogs, newsletters and social feeds.</div>
        <div className="button">Get Started</div>
      </div>
      <div className="w-1/2 flex justify-center">
        <img src="/computer-feed.png" alt="Computer Feed" className="max-w-80" />
      </div>
    </div>
      
    <div className="flex flex-col bg-blue-100 p-12">
      <div className="text-center text-3xl">
      Check out some starter packs
      </div>
      <div className="flex flex-row py-12 rounded gap-4 justify-center">
        <PackCard packId="33" />
        <PackCard packId="33" />
        <PackCard packId="33" />
      </div>

    </div>
      

      {/* <ImportOPML /> */}


    </section>
  )
}
