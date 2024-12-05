'use client'

import React, { useState, useEffect } from 'react'
import { fetchPostsFromRssUrl } from '@/app/components/fetchPostsFromRssUrl'
import Link from 'next/link'
import { calculateAverageDailyPosts } from '@/utils/tools'
import { createPackFromUploadClicked } from './createPackFromUpload'

const fetchedFeeds = []

export default function ImportOPML() {
  const [rssFeeds, setRssFeeds] = useState([])
  const [error, setError] = useState(null)
  const [fileUploaded, setFileUploaded] = useState(false)

  async function getFetchedFeeds(feeds) {
    const fetchedFeeds = await fetchPostsFromRssUrl(feeds)
    const fetchedFeedsArray = Array.isArray(fetchedFeeds) ? fetchedFeeds : [fetchedFeeds];
    setRssFeeds(fetchedFeedsArray)
    
  }


  function handleFileUpload(event) {
    console.log('file uploaded')
    const file = event.target.files[0]
    if (!file) {
      setError('No file selected')
      return
    }

    // Check if the file has a .opml extension
    if (!file.name.endsWith('.opml')) {
      setError('Please upload a valid OPML file')
      return
    }

    setFileUploaded(!fileUploaded)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const content = e.target.result

      // Validate the XML content
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(content, 'application/xml')
      const parseError = xmlDoc.getElementsByTagName('parsererror')

      if (parseError.length > 0) {
        setError('Invalid XML content')
        return
      }

      // Extract RSS feed URLs from the OPML content
      const outlines = xmlDoc.getElementsByTagName('outline')
      const feeds = []
      for (let i = 0; i < outlines.length; i++) {
        const xmlUrl = outlines[i].getAttribute('xmlUrl')
        if (xmlUrl) {
          feeds.push(xmlUrl)
        }
      }

      getFetchedFeeds(feeds)
      
      setError(null)
    }
    reader.onerror = (e) => {
      setError('Error reading file')
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 rounded">
      <h2>Import OPML</h2>
      {!fileUploaded && <input type="file" accept=".opml" onChange={handleFileUpload} />}

      {error && <div className="text-red-500">{error}</div>}
      {rssFeeds.length > 0 && (
        <div className="mt-4 w-full">
          <ul className="">
            {Object.keys(rssFeeds[0]).map((key, index) => (
              <li key={index} className="flex flex-row w-full items-center justify-between border-b border-gray-300 py-2 my-2">
                <div className="w-full md:w-3/5">
                  {rssFeeds[0][key].title}
                </div>
                <div className="w-full md:w-1/5 self-start">
                 {calculateAverageDailyPosts(rssFeeds[0][key].itemDates)} posts / day
                </div>
                <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end"></div>
                <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end">
                  <Link target="_blank" href={rssFeeds[0][key].rss}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg></Link>
                  <Link target="_blank" href={rssFeeds[0][key].url}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg></Link>
                </div>
              </li>
            ))}
          </ul>
          {/* <span className="button" onClick={() => createPackFromUploadClicked(rssFeeds[0])}>Create Starter Pack</span> */}
        </div>
      )}
    </div>
  )
}