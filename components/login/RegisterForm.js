import { API_URL } from "@/utils/consts";
import { useStore } from "@/utils/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import InputFloatingLabel from "../widgets/InputFloatingLabel";
import Spinner from "../widgets/Spinner";

const RegisterForm = () => {
  const router = useRouter();
  const setUserStore = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        ...user,
      });
      if (res.data.status === "Success") {
        toast.success("User created successfully");
        setUserStore({ ...res.data.client, id: res.data.client._id });
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
      <InputFloatingLabel name="fullname" label="Full Name" type="text" handleChange={handleChange} />
      <InputFloatingLabel name="email" label="Email" type="email" handleChange={handleChange} />
      <InputFloatingLabel name="password" label="Password" type="password" handleChange={handleChange} />
      <InputFloatingLabel name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} />
      <button disabled={isLoading} type="submit" className="btn-grad mt-6 rounded-full p-4">
        Sign Up {isLoading && <Spinner color="white" />}
      </button>

      <Link href={"/login?form=login"} type="button" className="mt-20 rounded-full border border-secondary-400 p-4">
        Login
      </Link>
      <style jsx>{`
        .btn-grad {
          background-image: linear-gradient(to right, #00927a 0%, #26d0ce 51%, #00927a 100%);
          padding: 15px 45px;
          text-align: center;
          text-transform: uppercase;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;
          display: block;
        }

        .btn-grad:hover {
          background-position: right center; /* change the direction of the change here */
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </form>
  );
};

export default RegisterForm;
