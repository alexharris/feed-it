'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient'



export default function importFeedsFromOpml(packId) {
  const [fileUploaded, setFileUploaded] = useState(false)

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
    <div>
      {!fileUploaded && <input type="file" accept=".opml" onChange={handleFileUpload} />}
    </div>

  );  
}