import { API_URL } from "@/utils/consts";
import { useStore } from "@/utils/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import InputFloatingLabel from "../widgets/InputFloatingLabel";
import Spinner from "../widgets/Spinner";

const OtpForm = () => {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/otp/verify`, {
        otp,
        id: user.id,
      });
      if (res.data.status === "Success") {
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/otp/resendOTP`, {
        id: user.id,
        email: user.email,
      });
      if (res.data.status === "Success") {
        toast.success(res.data.message);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-4 p-4">
      <InputFloatingLabel name="otp" label="OTP" type="text" handleChange={(e) => setOtp(e.target.value)} />
      <button disabled={isLoading} type="submit" className="btn-grad mt-6 rounded-full p-4">
        Verify {isLoading && <Spinner color="white" />}
      </button>
      <button type="button" onClick={resendOtp} className="text-sm text-gray-400/80">
        Resend OTP
      </button>

      <Link href={"/login?form=login"} type="button" className="mt-20 rounded-full border border-secondary-400 p-4">
        Login
      </Link>
    </form>
  );
};

export default OtpForm;
