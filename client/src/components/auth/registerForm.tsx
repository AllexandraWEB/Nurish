import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "../ui/button";
import Separator from "../Separator";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = (typeof useNavigate === "function" ? useNavigate() : null) as any;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error("Server response error. Please check if the server is running.");
      }
      
      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }
      
      localStorage.removeItem("token");
      localStorage.setItem("user", JSON.stringify(data.user));
      
      if (navigate) {
        navigate("/");
      } else if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Cannot connect to server. Make sure the server is running on port 5001.");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[500px] bg-linear-to-b from-[#2c2c2c] to-[#0a0a0a] px-4 py-12 text-center text-white rounded-3xl shadow-2xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[44px] font-bold px-10 mb-1"><span className="italic font-thin">Welcome</span> to Nurish</h1>
        <p className="text-base text-gray-400 mb-4">
          Fill in the form below to create your account
        </p>

        <Box
          component="form"
          className="w-full flex flex-col items-center"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "83%",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Input Fields */}
          <TextField label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email Address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField label="Repeat Password" variant="outlined" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />

          {error && (
            <div className="w-10/12 text-left text-sm text-red-400 mt-1">{error}</div>
          )}
          {/* Submit Button */}
          <Button
            variant="default"
            size="lg"
            className="mt-4 w-10/12 bg-white uppercase text-black font-semibold rounded-xl hover:opacity-90 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {/* Separator */}
          <div className="w-10/12">
            <Separator text="Or continue with" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-10/12">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>

            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Apple
            </Button>
          </div>
          {/* Login Path */}
          <div className="pt-4">
            <p className="text-gray-400">
              Already have an account? <a href="/login" className="text-gray-50">Sign in</a>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RegisterForm;
