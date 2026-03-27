'use client';
import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(222, 40%, 11%)',
          border: '1px solid hsl(217, 32%, 22%)',
          color: 'hsl(210, 40%, 96%)',
          fontFamily: 'IBM Plex Sans, sans-serif',
        },
      }}
    />
  );
}