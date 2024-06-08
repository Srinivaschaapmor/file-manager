import React from "react";
import { Stack, Typography } from "@mui/material";

export const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [getOtp, setGetOtp] = useState(false);
  let length = 6;
  const [otp, setOTP] = useState(new Array(length).fill(""));
  const otpFields = useRef([]);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    otp: "",
  });

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChange = (index, event) => {
    let value = event.target.value;
    // Only allow numeric input
    if (isNaN(value)) return;
    // Limit input length to 1 character
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically move to next input box if available
    if (value !== "" && index < length - 1) {
      otpFields.current[index + 1].focus();
    }

    const newCombinedOTP = newOTP.join("");
    // handleOTPChange(newCombinedOTP);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text");
    if (!/^\d{6}$/.test(pasteData)) return;

    const newOTP = pasteData.split("");
    setOTP(newOTP);
    handleOTPChange(pasteData);
    otpFields.current.forEach((field, index) => {
      field.value = newOTP[index];
    });
  };

  const handleKeyDown = (index, event) => {
    // Handle backspace to move to previous input box
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      otpFields.current[index - 1].focus();
    }
  };

  const handleGetOTP = async () => {
    setFormErrors(validate(loginDetails));
    setIssubmit(true);
    setLoading(true);
    const email = loginDetails.email;
    if (Object.entries(formErrors).length === 1) {
      try {
        const response = await axios.post(`${loginEmail}`, { email });
        setGetOtp(true);
        setLoading(false);
        toast.success("OTP sent successfully!");
      } catch (error) {
        console.error("Error sending OTP:", error);
        setLoading(false);
        toast.error("Error sending OTP. Please try again.");
      }
    } else {
      setLoading(false);
      toast.error("Please enter a valid email.");
    }
  };

  const handleSubmitOTP = async () => {
    setIsOtpsubmit(true);
    setFormErrors(validate(loginDetails));

    if (Object.entries(formErrors).length === 0) {
      try {
        const response = await axios.post(`${verifyOtp}`, {
          otp: loginDetails.otp,
          email: loginDetails.email,
        });
        if (response.data.jwt_token) {
          const useremail = response.data.userEmail;
          const jwtToken = response.data.jwt_token;
          const redirect_uri = queryParameters.get("redirect_uri");
          const access = response.data.access;
          console.log(redirect_uri);
          Cookies.set("jwtToken", jwtToken, { expires: 1 / 12 });
          Cookies.set("userEmail", useremail);
          Cookies.set("access", JSON.stringify(access));
          if (redirect_uri) {
            window.location.href = decodeURIComponent(redirect_uri);
          } else {
            navigate("/dashboard/users-list");
            toast.success("Login successful!");
          }
        } else {
          toast.error("Invalid OTP.");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          toast.error("Access denied for this email address.");
        } else {
          console.error("Error verifying OTP:", error);
          toast.error(
            "An error occurred while verifying OTP. Please try again."
          );
        }
      }
    } else {
      toast.error("Please enter a valid OTP.");
    }
  };

  return (
    <Stack>
    <Typography variant="h6" fontWeight={600} m={"auto"}>
      {" "}
      LOGO AUTHENTICATION
    </Typography>

    {!getOtp ? (
      <>
        {" "}
        <Typography m={"auto"} pt={5}>
          Login with your email
        </Typography>
        <TextField
          type="email"
          name="email"
          value={loginDetails.email}
          helperText={formErrors.email}
          FormHelperTextProps={{ style: { color: "red" } }}
          onChange={(e) => handleEmailChange(e)}
          placeholder="Enter your email"
          size="small"
          sx={{ width: 300, m: "auto", pt: 5 }}
        ></TextField>
        <Button
          variant="contained"
          disabled={loginDetails.email.length === 0}
          sx={{
            width: 300,
            m: "auto",
            mt: 5,
            bgcolor: "rgb(49, 38, 228)",
          }}
          onClick={handleGetOTP}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "GET OTP"
          )}
        </Button>
      </>
    ) : (
      <>
        <Typography m={"auto"} pt={5}>
          Enter the OTP
        </Typography>
        <Stack
          direction={"row"}
          gap={2}
          mt={4}
          textAlign={"center"}
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (otpFields.current[index] = el)}
              variant="outlined"
              name="otp"
              size="small"
              sx={{ width: 50, height: 50 }}
              inputProps={{ style: { textAlign: "center" } }}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
            />
          ))}
        </Stack>
        <FormHelperText sx={{ color: "red", fontSize: 12 }}>
          {formErrors.otp}
        </FormHelperText>
        <Typography
          sx={{
            color: "green",
            textAlign: "center",
            mt: 2,
            fontSize: 12,
          }}
        >
          OTP sent to {loginDetails.email}
        </Typography>
        <Button
          onClick={handleSubmitOTP}
          variant="contained"
          sx={{
            width: 300,
            m: "auto",
            mt: 3,
            bgcolor: "rgb(49, 38, 228)",
          }}
        >
          submit otp
        </Button>
        <Typography fontSize={15} mt={5}>
          Incorrect Email ?{" "}
          <span
            onClick={() => setGetOtp(false)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Click Here
          </span>
        </Typography>
      </>
    )}
  </Stack>
  );
};
