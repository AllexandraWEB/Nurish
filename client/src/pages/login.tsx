import { LoginForm } from "@/components/auth/signin-form";
import SplashCursor from "@/components/SplashCursor";

export default function LoginPage() {
  return (
    <>
      <div className="w-full h-screen bg-[url('/src/assets/images/Background.png')] bg-cover bg-no-repeat bg-center">
        <div className="w-full max-w-sm mx-auto py-20">
          <LoginForm />
        </div>
      </div>
      <SplashCursor />
    </>
  );
}
