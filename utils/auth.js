import { useStore, useStoreLoginModal } from "./store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
// import { LIEN } from "./consts";

export const requireAuthRedirect = ({ isOnlyUser = false, isOnlyPartner = false, setIsLoading }) => {
  const user = useStore((state) => state.user);
  const removeUser = useStore((state) => state.removeUser);
  const router = useRouter();

  //   const getMe = async () => {
  //     try {
  //       const res = await axios(`${LIEN}/api/v1/users/get-me`, {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       });
  //     } catch (err) {
  //       removeUser();
  //       router.push("/");
  //       console.log(err);
  //     }
  //   };

  useEffect(() => {
    // getMe();
    if (!user.token) {
      router.push("/login?form=login");
    }
    // if (isOnlyPartner && !user.status) {
    //   router.push("/");
    // }
    // if (isOnlyUser && user.status) {
    //   router.push("/");
    // }
    setIsLoading(false);
  }, []);
};
