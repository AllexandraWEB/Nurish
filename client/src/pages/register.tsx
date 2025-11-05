import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
  return (
    <div className="w-full h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#160000]">
        <RegisterForm />
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 relative overflow-hidden bg-[#160000] flex items-center justify-center">
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
