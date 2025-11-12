import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#160000]">
        <LoginForm />
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#160000] items-center justify-center">
        <div className="relative w-full h-full overflow-hidden p-4">
          <img
            src="/images/auth-background.jpg"
            alt=""
            className="rounded-4xl w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
