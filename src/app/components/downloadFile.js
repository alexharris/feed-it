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
      <button className="button" onClick={() => downloadOPML(data)}>Download OPML</button>
    </div>
  );
}

export default DownloadFile;