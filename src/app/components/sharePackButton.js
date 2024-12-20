'use client'

import React from 'react';

function sharePack() {
if (navigator.share) {
  navigator.share({
    title: 'Check out this pack!',
    text: 'I found this amazing pack, you should check it out!',
    url: window.location.href,
  })
  .then(() => console.log('Successful share'))
  .catch((error) => console.log('Error sharing', error));
} else {
  console.log('Web Share API is not supported in your browser.');
}
}

function DownloadFile(data) {
  return (
    <div>
      <button className="border border-black hover:bg-gray-100 rounded-3xl py-2 px-4 flex flex-row text-sm gap-2"  onClick={() => sharePack()}>
      <svg className="stroke-black w-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        Share Pack
      </button>
      </div>
  );
}

export default DownloadFile;