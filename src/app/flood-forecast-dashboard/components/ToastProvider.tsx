'use client';
import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(222, 40%, 9%)',
          border: '1px solid hsl(217, 32%, 17%)',
          color: 'hsl(210, 40%, 96%)',
          fontFamily: 'IBM Plex Sans, sans-serif',
        },
      }}
    />
  );
}