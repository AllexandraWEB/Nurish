import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "../ui/button";

const RegisterForm = () => {
  return (
      <div className="w-full max-w-[500px] bg-[#0a0a0a] p-8 text-center text-white rounded-3xl shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-2">Register</h1>
        <p className="text-gray-400 mb-6">
          Ready to become part of the exclusive club? Fill in the details below,
          and let the journey begin!
        </p>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "100%",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
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
        >
          <TextField label="Full Name" variant="outlined" />
          <TextField label="Email Address" variant="outlined" />
          <TextField label="Password" variant="outlined" type="password" />

          <Button
            variant="default"
            className="mt-4 w-full bg-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            Submit
          </Button>
        </Box>
      </div>
  );
};

export default RegisterForm;
