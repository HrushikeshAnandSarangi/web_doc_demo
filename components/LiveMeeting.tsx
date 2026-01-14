// components/MeetingView.tsx
import React from 'react';
// Import your hook normally here
import { useMeeting } from '@videosdk.live/react-sdk'; // Example library based on your error

const LiveMeeting = () => {
  // Use the hook inside this component
  const { 
    meetingId, 
    participants, 
    join, 
    leave 
  } = useMeeting({
    onParticipantJoined: (participant) => {
      console.log("Joined", participant);
    },
    // ... other event listeners
  });

  return (
    <div>
      <h1>Meeting: {meetingId}</h1>
      {/* Render your participants here */}
    </div>
  );
};

export default LiveMeeting;