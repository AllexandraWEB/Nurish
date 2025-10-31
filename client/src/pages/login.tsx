import { Leaf } from "lucide-react";
import LoginForm from "@/components/auth/loginForm";
// import SplashCursor from "@/components/SplashCursor";
import Waves from "@/components/Waves";

export default function LoginPage() {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-linear-to-b from-[#2c2c2c] to-[#0a0a0a]">
        {/* Logo (Top-left) */}
        <div className="absolute top-6 left-8 flex items-center gap-2 z-20">
          <Leaf className="w-6 h-6" />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Nurish
          </h1>
        </div>

        {/* Waves background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[950px] h-[950px] rounded-full overflow-hidden">
            <Waves
              lineColor="#7d7d7d"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={30}
              waveAmpY={40}
              friction={0.7}
              tension={0.1}
              maxCursorMove={180}
              xGap={15}
              yGap={12}
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Login form in the center (above waves) */}
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>

      {/* Cursor effect */}
      {/* <SplashCursor /> */}
    </>
  );
}
