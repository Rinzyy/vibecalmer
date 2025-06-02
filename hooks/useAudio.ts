import { useState, useEffect, useRef, useCallback } from "react"
import { Howl } from "howler"

export type AudioMode = "none" | "music1" | "music2"

interface UseAudioProps {
  isRunning: boolean
  timeLeft?: number
}

// Helper function to get stored audio mode or default to "music2" (ambient)
const getStoredAudioMode = (): AudioMode => {
  if (typeof window === "undefined") return "music2" // Default to ambient on server
  
  const stored = localStorage.getItem("vibedown-audio-mode")
  return (stored as AudioMode) || "music2" // Default to ambient if not found
}

// Helper function to store audio mode preference
const storeAudioMode = (mode: AudioMode): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vibedown-audio-mode", mode)
  }
}



export function useAudio({ isRunning, timeLeft }: UseAudioProps) {
  // Initialize with stored preference or default to ambient
  const [audioMode, setAudioMode] = useState<AudioMode>("music2") // Default value until useEffect runs
  // Fixed volume at 50%
  const FIXED_VOLUME = 0.5
  
  // Howl audio references
  const bellSoundRef = useRef<Howl | null>(null)
  const hrvSoundRef = useRef<Howl | null>(null)
  const ambientSoundRef = useRef<Howl | null>(null)
  
  // Flag to track if fade-out has started
  const fadeOutStartedRef = useRef(false)
  
  // Load stored audio preference on mount
  useEffect(() => {
    // Get stored preference
    const storedMode = getStoredAudioMode()
    if (storedMode !== audioMode) {
      setAudioMode(storedMode)
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  // Initialize Howl audio objects
  useEffect(() => {
    // Create Howl instances for each sound
    bellSoundRef.current = new Howl({
      src: ["/audio/bell.mp3"],
      volume: FIXED_VOLUME, // Bell sound always plays at full volume
      preload: true
    })
    
    hrvSoundRef.current = new Howl({
      src: ["/audio/hrv.mp3"],
      volume: FIXED_VOLUME, // Fixed at 50%
      loop: true,
      preload: true
    })
    
    ambientSoundRef.current = new Howl({
      src: ["/audio/ambient.mp3"],
      volume: FIXED_VOLUME, // Fixed at 50%
      loop: true,
      preload: true
    })
    
    // Cleanup function
    return () => {
      // Stop all sounds when component unmounts
      if (bellSoundRef.current) bellSoundRef.current.stop()
      if (hrvSoundRef.current) hrvSoundRef.current.stop()
      if (ambientSoundRef.current) ambientSoundRef.current.stop()
    }
  }, [])

  // Handle background audio based on audioMode
  useEffect(() => {
    // Stop all background audio first
    if (hrvSoundRef.current) hrvSoundRef.current.stop()
    if (ambientSoundRef.current) ambientSoundRef.current.stop()
    
    // Reset fade-out flag when audio mode changes
    fadeOutStartedRef.current = false
    
    // Only play if timer is running
    if (isRunning) {
      // Play the appropriate background audio
      if (audioMode === "music1" && hrvSoundRef.current) {
        hrvSoundRef.current.volume(FIXED_VOLUME) // Fixed at 50%
        hrvSoundRef.current.play()
      } else if (audioMode === "music2" && ambientSoundRef.current) {
        ambientSoundRef.current.volume(FIXED_VOLUME) // Fixed at 50%
        ambientSoundRef.current.play()
      }
    }
  }, [audioMode, isRunning])
  
  // Handle fade-out when approaching the end of the session
  useEffect(() => {
    // Only apply fade-out if timer is running and timeLeft is provided
    if (!isRunning || timeLeft === undefined) return
    
    // Reset the fade-out flag when timer resets or stops
    if (timeLeft > 5) {
      fadeOutStartedRef.current = false
      
      // Make sure volume is reset to fixed setting when not in fade-out range
      if (audioMode === "music1" && hrvSoundRef.current) {
        hrvSoundRef.current.volume(FIXED_VOLUME)
      } else if (audioMode === "music2" && ambientSoundRef.current) {
        ambientSoundRef.current.volume(FIXED_VOLUME)
      }
    }
    
    // Start fade-out exactly when 5 seconds remain, but only once
    if (timeLeft <= 5 && !fadeOutStartedRef.current) {
      fadeOutStartedRef.current = true
      
      const currentSound = audioMode === "music1" ? hrvSoundRef.current : audioMode === "music2" ? ambientSoundRef.current : null
      
      if (currentSound && currentSound.playing()) {
        // Use Howler's built-in fade method for smooth fade-out over 5 seconds
        currentSound.fade(FIXED_VOLUME, 0, 5000) // 5000ms = 5 seconds
      }
    }
  }, [isRunning, timeLeft, audioMode])

  const playBellSound = useCallback(() => {
    if (bellSoundRef.current) {
      bellSoundRef.current.play()
    }
  }, [])

  const setAudio = useCallback((mode: AudioMode) => {
    // Update state
    setAudioMode(mode)
    
    // Store preference in localStorage
    storeAudioMode(mode)
  }, [])
  


  return {
    audioMode,
    setAudio,
    playBellSound
  }
}
