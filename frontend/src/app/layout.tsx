import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MissionX | Educational Sensor & Quiz Platform',
  description: 'A minimal, stable educational learning and quiz platform with real-time temperature sensor monitoring.',
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
          {/* Subtle ambient background glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          
          <main className="flex-1 relative z-10 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
