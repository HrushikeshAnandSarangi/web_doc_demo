// app/call/page.tsx
'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import { getMeetingConfig } from './config';

function CallContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'patient';

  useEffect(() => {
    const config = getMeetingConfig(role);
    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, [role]);

  return <div id="video-container" style={{ width: '100%', height: '100vh' }}></div>;
}

export default function CallPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallContent />
    </Suspense>
  );
}