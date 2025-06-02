import { useState, useEffect, useRef, useCallback } from "react"

export type AudioMode = "none" | "music1" | "music2"

interface UseAudioProps {
  isRunning: boolean
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

export function useAudio({ isRunning }: UseAudioProps) {
  // Initialize with stored preference or default to ambient
  const [audioMode, setAudioMode] = useState<AudioMode>("music2") // Default value until useEffect runs
  
  // Audio references
  const bellAudioRef = useRef<HTMLAudioElement | null>(null)
  const hrvAudioRef = useRef<HTMLAudioElement | null>(null)
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null)
  
  // Load stored audio preference on mount
  useEffect(() => {
    // Get stored preference
    const storedMode = getStoredAudioMode()
    if (storedMode !== audioMode) {
      setAudioMode(storedMode)
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements
    bellAudioRef.current = new Audio("/audio/bell.mp3")
    hrvAudioRef.current = new Audio("/audio/hrv.mp3")
    ambientAudioRef.current = new Audio("/audio/ambient.mp3")
    
    // Configure looping for background sounds
    if (hrvAudioRef.current) hrvAudioRef.current.loop = true
    if (ambientAudioRef.current) ambientAudioRef.current.loop = true
    
    // Cleanup function
    return () => {
      // Stop and cleanup all audio when component unmounts
      if (bellAudioRef.current) {
        bellAudioRef.current.pause()
        bellAudioRef.current.currentTime = 0
      }
      if (hrvAudioRef.current) {
        hrvAudioRef.current.pause()
        hrvAudioRef.current.currentTime = 0
      }
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current.currentTime = 0
      }
    }
  }, [])

  // Handle background audio based on audioMode
  useEffect(() => {
    // Stop all background audio first
    if (hrvAudioRef.current) {
      hrvAudioRef.current.pause()
      hrvAudioRef.current.currentTime = 0
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause()
      ambientAudioRef.current.currentTime = 0
    }
    
    // Only play if timer is running
    if (isRunning) {
      // Play the appropriate background audio
      if (audioMode === "music1" && hrvAudioRef.current) {
        hrvAudioRef.current.play().catch(err => console.error("Error playing HRV audio:", err))
      } else if (audioMode === "music2" && ambientAudioRef.current) {
        ambientAudioRef.current.play().catch(err => console.error("Error playing ambient audio:", err))
      }
    }
  }, [audioMode, isRunning])

  const playBellSound = useCallback(() => {
    if (bellAudioRef.current) {
      bellAudioRef.current.currentTime = 0
      bellAudioRef.current.play().catch(err => console.error("Error playing bell audio:", err))
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
