'use client'

import React from 'react';

function generateOPML(data) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
  <head>
    <title>` + data.title + `</title>
  </head>
  <body>
    <outline text="Feeds">`;

  const footer = `
    </outline>
  </body>
</opml>`;

  const body = Object.values(data.feeds).map(feed => `
      <outline text="${feed.title}" description="${feed.description}" type="rss" xmlUrl="${feed.rss}" htmlUrl="${feed.url}" />`).join('');

  return header + body + footer;
}

function downloadOPML(data) {
  const opmlContent = generateOPML(data);
  const blob = new Blob([opmlContent], { type: 'text/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = data.title.replace(/\s+/g, '') + '.opml';
  a.click();
  URL.revokeObjectURL(url);
}

function DownloadFile(data) {
  return (
    <div>
      <button className="border border-black hover:bg-gray-100 rounded-3xl py-2 px-4 flex flex-row text-sm gap-2" onClick={() => downloadOPML(data)}>
        <svg className="stroke-black w-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
        Download Pack
      </button>
      </div>
  );
}

export default DownloadFile;