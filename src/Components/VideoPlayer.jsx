import React, { useRef, useState, useEffect } from "react";
import "../App.css";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const getVolumeGradient = () => {
    const percent = volume * 100;
    return {
      background: `linear-gradient(to right, var(--mostaza) 0%, var(--mostaza) ${percent}%, #555 ${percent}%, #555 100%)`
    };
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsFadingOut(false);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsFadingOut(true);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsFadingOut(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="video-placeholder"
        src="/img/video.mp4"
        muted={isMuted}
        loop={false}
        playsInline
        onEnded={handleEnded}
      />

      <button
        className={`custom-play fade ${!isPlaying ? "visible" : ""}`}
        onClick={togglePlay}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <button
        className={`custom-pause fade ${isPlaying && isHovered ? "visible" : ""}`}
        onClick={togglePlay}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </button>

      <div className={`volume-control fade ${isHovered ? "visible" : ""} ${isFadingOut ? "fading-out" : ""}`}>
        <button className="mute-button" onClick={toggleMute}>
          {isMuted ? "🔇" : "🔊"}
        </button>
        <input
          id="vol"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          style={getVolumeGradient()}
        />
      </div>
    </div>
  );
}
