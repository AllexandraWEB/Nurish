import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#160000]">
        <LoginForm />
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 relative overflow-hidden bg-[#160000] flex items-center justify-center">
        <div className="relative w-full overflow-hidden p-4">
          <img
            src="/images/login-background.jpg"
            alt=""
            className="rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
}
