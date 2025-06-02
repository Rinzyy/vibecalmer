"use client"

import { VolumeX, Music } from "lucide-react"
import { AudioMode } from "../../hooks/useAudio"

interface AudioControlsProps {
  audioMode: AudioMode
  isRunning: boolean
  onAudioChange: (mode: AudioMode) => void
}

export function AudioControls({ audioMode, isRunning, onAudioChange }: AudioControlsProps) {
  const handleAudioToggle = (mode: AudioMode) => (e: React.MouseEvent) => {
    e.stopPropagation()
    onAudioChange(mode)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className={`flex flex-col bg-neutral-50 dark:bg-neutral-800 rounded-full p-1.5 ${isRunning ? "opacity-50 pointer-events-none" : ""}`}>
        {/* Off option */}
        <button
          onClick={handleAudioToggle("none")}
          className={`p-2 rounded-full flex items-center cursor-pointer justify-center transition-colors duration-200 ${audioMode === "none" ? "bg-neutral-100 dark:bg-neutral-700" : "hover:bg-neutral-50 dark:hover:bg-neutral-700"}`}
          aria-label="No audio"
          title="No audio"
          disabled={isRunning}
        >
          <VolumeX className={`w-5 h-5 ${audioMode === "none" ? "text-neutral-600 dark:text-neutral-200" : "text-neutral-300 dark:text-neutral-500"}`} />
        </button>
        
        {/* HRV option */}
        {/* <button
          onClick={handleAudioToggle("music1")}
          className={`p-2 rounded-full flex items-center cursor-pointer justify-center transition-colors duration-200 ${audioMode === "music1" ? "bg-neutral-100 dark:bg-neutral-700" : "hover:bg-neutral-50 dark:hover:bg-neutral-700"}`}
          aria-label="HRV sound"
          title="HRV sound"
          disabled={isRunning}
        >
          <Waves className={`w-5 h-5 ${audioMode === "music1" ? "text-neutral-600 dark:text-neutral-200" : "text-neutral-300 dark:text-neutral-500"}`} />
        </button> */}
        
        {/* Ambient option */}
        <button
          onClick={handleAudioToggle("music2")}
          className={`p-2 rounded-full flex items-center cursor-pointer justify-center transition-colors duration-200 ${audioMode === "music2" ? "bg-neutral-100 dark:bg-neutral-700" : "hover:bg-neutral-50 dark:hover:bg-neutral-700"}`}
          aria-label="Ambient sound"
          title="Ambient sound"
          disabled={isRunning}
        >
          <Music className={`w-5 h-5 ${audioMode === "music2" ? "text-neutral-600 dark:text-neutral-200" : "text-neutral-300 dark:text-neutral-500"}`} />
        </button>
      </div>
      
      {/* Audio mode labels */}
      <div className="text-center">
        <span className={`text-xs text-neutral-400 dark:text-neutral-500 ${isRunning ? "opacity-50" : ""}`}>
          {audioMode === "none" ? "Off" : audioMode === "music1" ? "HRV" : "Ambient"}
        </span>
      </div>


    </div>
  )
}
