// app/call/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import { getMeetingConfig } from './config';

export default function CallPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'patient';

  useEffect(() => {
    const config = getMeetingConfig(role);
    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, [role]);

  return <div id="video-container" style={{ width: '100%', height: '100vh' }}></div>;
}