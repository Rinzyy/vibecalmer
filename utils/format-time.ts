/**
 * Formats seconds into a MM:SS time format
 * @param seconds Number of seconds to format
 * @returns Formatted time string in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
