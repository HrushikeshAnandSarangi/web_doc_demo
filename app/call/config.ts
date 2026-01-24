// app/call/config.ts
export function getMeetingConfig(role: string) {
  return {
    name: role === 'doctor' ? 'Doctor' : 'Patient',
    meetingId: 'milkyway',
    apiKey: process.env.NEXT_PUBLIC_VIDEOSDK_API_KEY!,

    region: 'sg001',

    containerId: 'video-container',
    redirectOnLeave: 'https://www.videosdk.live/',

    micEnabled: true,
    webcamEnabled: true,
    participantCanToggleSelfWebcam: true,
    participantCanToggleSelfMic: true,
    participantCanLeave: true,

    chatEnabled: true,
    screenShareEnabled: 'ENABLED',
    pollEnabled: true,
    whiteboardEnabled: true,
    raiseHandEnabled: true,

    layout: {
      type: 'SPOTLIGHT',
      priority: 'PIN',
    },

    branding: {
      enabled: true,
      logoURL: 'https://static.zujonow.com/videosdk.live/videosdk_logo_circle_big.png',
      name: 'Prebuilt',
      poweredBy: false,
    },

    permissions: {
      pin: true,
      askToJoin: false,
      toggleParticipantMic: true,
      toggleParticipantWebcam: true,
      toggleParticipantMode: true,
      toggleParticipantScreenshare: true,
      drawOnWhiteboard: true,
      toggleWhiteboard: true,
      toggleHLS: true,
      toggleVirtualBackground: true,
      toggleRecording: true,
      toggleRealtimeTranscription: true,
      toggleLivestream: true,
      removeParticipant: true,
      endMeeting: true,
      changeLayout: true,
      canToggleParticipantTab: true,
      canToggleRecording: true,
      canToggleLivestream: true,
      canCreatePoll: true,
      copyInviteUrl: true,
    },

    joinScreen: {
      visible: true,
      title: 'Daily scrum',
      meetingUrl: typeof window !== 'undefined' ? window.location.href : '',
    },

    leftScreen: {
      actionButton: {
        label: 'Video SDK Live',
        href: 'https://videosdk.live/',
      },
      rejoinButtonEnabled: true,
    },

    notificationSoundEnabled: true,

    debug: true,

    maxResolution: 'sd',

    realtimeTranscription: {
      enabled: false,
      visible: false,
    },
  };
}