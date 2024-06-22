'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const WatchContent = () => {
  const videoPrefix = 'https://storage.googleapis.com/jea68-yt-processed-videos/';
  const searchParams = useSearchParams();
  const videoSrc = searchParams.get('v');

  return (
    <div>
      <h1>Watch Page</h1>
      {videoSrc ? <video controls src={videoPrefix + videoSrc}/> : <p>Loading...</p>}
    </div>
  );
};

export default function Watch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchContent />
    </Suspense>
  );
}



  // name of the page in url depends on name of function => file must eb called "page"