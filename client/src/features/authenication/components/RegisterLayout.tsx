import RegisterForm from "./RegisterForm";

export default function RegisterLayout() {
  return (
    <div className="w-full h-screen flex flex-col xl:flex-row bg-[#160000]">
      {/* Left Side - Form */}
      <div className="w-full xl:w-1/2 flex items-center justify-center my-auto">
        <RegisterForm />
      </div>

      {/* Right Side - Image */}
      <div className="hidden xl:flex w-1/2 relative h-screen overflow-hidden bg-[#160000] items-center justify-center">
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
