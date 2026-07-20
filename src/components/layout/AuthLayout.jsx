export default function AuthLayout({ children }) {
  const bubbles = [
    { top: '10%', left: '15%', size: 70, delay: '0s', duration: '7s' },
    { top: '25%', left: '65%', size: 40, delay: '1.2s', duration: '5s' },
    { top: '55%', left: '20%', size: 55, delay: '2s', duration: '8s' },
    { top: '70%', left: '55%', size: 90, delay: '0.5s', duration: '6.5s' },
    { top: '15%', left: '45%', size: 30, delay: '2.5s', duration: '5.5s' },
    { top: '85%', left: '25%', size: 45, delay: '1.8s', duration: '7.5s' },
    { top: '40%', left: '80%', size: 60, delay: '0.8s', duration: '6s' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-ink">
        {/* Floating bubbles */}
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}
        {/* Violet accent bubbles */}
        <div
          className="absolute rounded-full bg-violet-500/80 animate-float"
          style={{ top: '30%', left: '30%', width: 22, height: 22, animationDelay: '1s', animationDuration: '6s' }}
        />
        <div
          className="absolute rounded-full bg-violet-400/60 animate-float"
          style={{ top: '65%', left: '70%', width: 16, height: 16, animationDelay: '2.2s', animationDuration: '7s' }}
        />

        {/* Panel content */}
        <div className="relative z-10 flex flex-col justify-center px-14 text-white animate-fade-in-up">
          <h1 className="font-serif text-5xl font-medium leading-tight">
            Social<span className="text-violet-400">App</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-sm">
            A place to share what matters, and stay close to the people who matter.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}