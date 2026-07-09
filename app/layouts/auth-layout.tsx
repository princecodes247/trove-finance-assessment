import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-page">
      {/* Top-Left Waves */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="relative flex items-center justify-center">
          {/* Large soft glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-primary-light/45 filter blur-3xl animate-pulse" />
          <div className="absolute w-[800px] h-[800px] rounded-full bg-accent-blue/12 filter blur-3xl" />
        </div>
      </div>
      
      {/* Bottom-Right Waves */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none select-none">
        <div className="relative flex items-center justify-center">
          {/* Large soft glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-primary-light/45 filter blur-3xl animate-pulse" />
          <div className="absolute w-[800px] h-[800px] rounded-full bg-accent-blue/12 filter blur-3xl" />
        </div>
      </div>

      <div className="w-full max-w-[480px] z-10">
        <Outlet />
      </div>
    </div>
  );
}
