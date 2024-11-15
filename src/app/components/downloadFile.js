'use client'

import React from 'react';

function generateOPML(feeds) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
  <head>
    <title>Feeds</title>
  </head>
  <body>
    <outline text="Feeds">`;

  const footer = `
    </outline>
  </body>
</opml>`;

  const body = Object.values(feeds).map(feed => `
      <outline text="${feed.title}" description="${feed.description}" type="rss" xmlUrl="${feed.rss}" htmlUrl="${feed.url}" />`).join('');

  return header + body + footer;
}

function downloadOPML(feeds) {
  const opmlContent = generateOPML(feeds);
  const blob = new Blob([opmlContent], { type: 'text/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feeds.opml';
  a.click();
  URL.revokeObjectURL(url);
}

function DownloadFile({ feeds }) {
  return (
    <div>
      <button className="button" onClick={() => downloadOPML(feeds)}>Download OPML</button>
    </div>
  );
}

export default DownloadFile;