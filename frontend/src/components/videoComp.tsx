import React, { useEffect, useRef } from "react";

const VideoComp: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const controlAudio = () => {
    console.log("audio");
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const controlVideo = () => {
    console.log("video");
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={controlAudio}>audio</button>
      <button onClick={controlVideo}>video</button>
    </div>
  );
};

export default VideoComp;
