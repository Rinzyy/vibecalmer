import { ImageResponse } from 'next/og';
import { Brain } from 'lucide-react';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'VibeDown - Meditation Timer and Mindfulness App';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#0f172a',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 48,
        }}
      >
        <Brain color="#ffffff" size={200} strokeWidth={1.5} />
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginTop: 24,
          }}
        >
          VibeDown
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#94a3b8',
            marginTop: 12,
          }}
        >
          Meditation Timer and Mindfulness App
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
