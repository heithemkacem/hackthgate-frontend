import { API_URL } from "@/utils/consts";
import { useStore } from "@/utils/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import InputFloatingLabel from "../widgets/InputFloatingLabel";
import Spinner from "../widgets/Spinner";

const LoginForm = () => {
  // const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        ...currentUser,
      });
      if (res.data.status === "Success") {
        toast.success("Welcome!");
        setUser({ ...res.data.user, id: res.data.user._id });
        router.push("/login?form=otp");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-4 p-4">
      <InputFloatingLabel name="email" label="Email" type="email" handleChange={handleChange} />
      <InputFloatingLabel name="password" label="Password" type="password" handleChange={handleChange} />
      <button disabled={isLoading} type="submit" className="btn-grad mt-6 rounded-full p-4">
        Login {isLoading && <Spinner color="white" />}
      </button>
      <Link href="/forgot-password" className="text-sm text-gray-400/80">
        Forgot Password?
      </Link>
      <Link href={"/login?form=register"} type="button" className="mt-20 rounded-full border border-secondary-400 p-4">
        Sign Up
      </Link>
    </form>
  );
};

export default LoginForm;
