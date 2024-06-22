'use client';

import { useSearchParams } from 'next/navigation'

export default function Watch() {
  const videoPrefix = 'https://storage.googleapis.com/jea68-yt-processed-videos/';
  const videoSrc = useSearchParams().get('v');

  return (
    <div>
      <h1>Watch Page</h1>
      { <video controls src={videoPrefix + videoSrc}/> }
    </div>
  );
}


  // name of the page in url depends on name of function => file must eb called "page"