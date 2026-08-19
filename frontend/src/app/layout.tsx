import './globals.css';
import type { Metadata } from 'next';
import CommandPalette from '@/components/ui/CommandPalette';

export const metadata: Metadata = {
  title: 'MissionX | AI & IoT Educational Escape Room Platform',
  description: 'Manage live physical escape rooms, hardware sensors, real-time telemetry, mission briefings, and student learning analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060911] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <CommandPalette />
          <main className="flex-1 relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
