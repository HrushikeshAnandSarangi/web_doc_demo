"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback, memo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ----------------------------- LOGIC COMPONENT ----------------------------- */

function MeetingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [meetingId, setMeetingId] = useState<string | null>(searchParams.get("roomId"));
  const [token, setToken] = useState<string | null>(null);
  const [sdk, setSdk] = useState<typeof import("@videosdk.live/react-sdk") | null>(null);
  const [userName, setUserName] = useState<string>("Guest");
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  // Set display name once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("displayName");
      if (savedName) {
        setUserName(savedName);
      } else {
        const name = prompt("Enter your display name:", "Guest") || "Guest";
        setUserName(name);
        localStorage.setItem("displayName", name);
      }
      setIsNameSet(true);
    }
  }, []);

  // Lazy load SDK
  useEffect(() => {
    import("@videosdk.live/react-sdk").then((module) => {
      setSdk(module);
    });
  }, []);

  // Handle meeting ID and token
  useEffect(() => {
    if (!isNameSet) return;

    if (meetingId) {
      fetch("/api/video/token")
        .then((res) => res.json())
        .then((data) => setToken(data.token))
        .catch(() => alert("Failed to get token"));
    } else {
      fetch("/api/video/create-meeting", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setMeetingId(data.roomId);
          router.replace(`?roomId=${data.roomId}`);
        })
        .catch(() => alert("Failed to create meeting"));
    }
  }, [meetingId, router, isNameSet]);

  if (!isNameSet || !meetingId || !token || !sdk) {
    return (
      <div className="p-10 text-center">
        🔄 Setting up meeting... Please enter your name if prompted.
      </div>
    );
  }

  const { MeetingProvider, useMeeting, useParticipant, usePubSub } = sdk;

  // ---------------- INNER COMPONENTS ---------------- //

  const MemoParticipantView = memo(({ participantId }: { participantId: string }) => {
    const { webcamStream, micStream, webcamOn, micOn, displayName, isLocal } =
      useParticipant(participantId);

    return (
      <div className="relative border rounded-lg overflow-hidden bg-black text-white shadow-lg">
        <p className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-sm z-10">
          {displayName} {isLocal ? "(You)" : ""}
        </p>

        {webcamOn && webcamStream ? (
          <video
            autoPlay
            playsInline
            muted
            ref={(ref) => {
              if (ref) ref.srcObject = new MediaStream([webcamStream.track]);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-800">
            Webcam Off
          </div>
        )}

        {!isLocal && micOn && micStream && (
          <audio
            autoPlay
            ref={(ref) => {
              if (ref) ref.srcObject = new MediaStream([micStream.track]);
            }}
          />
        )}

        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">
          🎤 {micOn ? "On" : "Off"}
        </div>
      </div>
    );
  });

  MemoParticipantView.displayName = "MemoParticipantView";

  function InnerControls({
    toggleMic,
    toggleWebcam,
    leave,
    participantId,
  }: {
    toggleMic: () => void;
    toggleWebcam: () => void;
    leave: () => void;
    participantId: string;
  }) {
    const { micOn, webcamOn } = useParticipant(participantId);

    const handleLeave = useCallback(() => {
      if (confirm("Leave the meeting?")) leave();
    }, [leave]);

    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/80 p-3 rounded-full shadow-xl z-20">
        <button
          onClick={toggleMic}
          className={`px-6 py-3 rounded-full text-white flex items-center gap-2 ${
            micOn ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {micOn ? "🎤 Mute" : "🎤 Unmute"}
        </button>
        <button
          onClick={toggleWebcam}
          className={`px-6 py-3 rounded-full text-white flex items-center gap-2 ${
            webcamOn ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {webcamOn ? "📷 Stop Cam" : "📷 Start Cam"}
        </button>
        <button
          onClick={handleLeave}
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          ❌ Leave
        </button>
      </div>
    );
  }

  function Controls() {
    const { toggleMic, toggleWebcam, leave, localParticipant } = useMeeting();

    if (!localParticipant) {
      return <div className="text-center py-4">Loading controls...</div>;
    }

    return (
      <InnerControls
        toggleMic={toggleMic}
        toggleWebcam={toggleWebcam}
        leave={leave}
        participantId={localParticipant.id}
      />
    );
  }

  const MemoChatView = memo(() => {
    const { publish, messages } = usePubSub("CHAT");
    const { localParticipant } = useMeeting();
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSend = useCallback(() => {
      if (messageText.trim()) {
        publish(messageText, { persist: true });
        setMessageText("");
      }
    }, [messageText, publish]);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <div className="border rounded-xl p-4 bg-gray-50 dark:bg-gray-900 h-[400px] flex flex-col shadow-inner">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          💬 Chat
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === localParticipant?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.senderId === localParticipant?.id
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none shadow-sm"
                }`}
              >
                <p className="font-semibold text-sm opacity-90">{msg.senderName}</p>
                <p className="mt-1">{msg.message}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            ➤
          </button>
        </div>
      </div>
    );
  });
  
  MemoChatView.displayName = "MemoChatView";

  function MeetingView() {
    const { participants } = useMeeting({
      onMeetingLeft: () => router.push("/"),
    });

    const participantIds = useMemo(
      () => Array.from(participants.keys()),
      [participants]
    );

    return (
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Room: {meetingId}
              <span className="ml-3 text-sm font-normal text-gray-500">
                ({participantIds.length} online)
              </span>
            </h1>
            <button
              onClick={() => {
                const link = `${window.location.origin}/call?roomId=${meetingId}`;
                navigator.clipboard
                  .writeText(link)
                  .then(() => alert("Invite link copied!"));
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300"
            >
              🔗 Copy Invite
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {participantIds.map((id) => (
              <MemoParticipantView key={id} participantId={id} />
            ))}
            {participantIds.length === 0 && (
              <div className="col-span-full h-40 flex items-center justify-center text-gray-500">
                Waiting for participants to join...
              </div>
            )}
          </div>

          <Controls />
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <MemoChatView />
        </div>
      </div>
    );
  }

  return (
    <MeetingProvider
      token={token}
      config={{
        meetingId,
        name: userName,
        micEnabled: true,
        webcamEnabled: true,
        debugMode: false,
      }}
      joinWithoutUserInteraction
    >
      <div className="p-6 max-w-7xl mx-auto">
        <MeetingView />
      </div>
    </MeetingProvider>
  );
}

/* ----------------------------- MAIN EXPORT ----------------------------- */

export default function MeetingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          ⏳ Loading meeting environment...
        </div>
      }
    >
      <MeetingContent />
    </Suspense>
  );
}