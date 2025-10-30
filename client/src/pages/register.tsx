import RegisterForm from "@/components/auth/register";
import SplashCursor from "@/components/SplashCursor";
import Waves from "@/components/Waves";

export default function RegisterPage() {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Waves background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Waves
            lineColor="#7d7d7d"
            backgroundColor="#0a0a0a"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={20}
            waveAmpY={50}
            friction={0.9}
            tension={0.1}
            maxCursorMove={180}
            xGap={12}
            yGap={36}
            className=" h-full rounded-full"
          />
        </div>

        {/* Signup form in the center (above waves) */}
        <div className="relative z-10">
          <RegisterForm />
        </div>
      </div>
      {/* <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      /> */}
      <SplashCursor />
    </>
  );
}

// import { SignupForm } from "@/components/auth/signup-form";
// import SplashCursor from "@/components/SplashCursor";

// export default function RegisterPage() {
//   return (
//     <>
//       <div className="w-full h-screen bg-[url('/src/assets/images/Background.png')] bg-cover bg-no-repeat bg-center">
//         <div className="w-full max-w-sm mx-auto py-10">
//           <SignupForm />
//         </div>
//       </div>
//       <SplashCursor />
//     </>
//   );
// }
