import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useQuery} from "@apollo/client";
import {MY_INFO} from "@/client/account.ts";
import {Query} from "@/graphql/types.ts";
import {consts} from "@/configures/consts.ts";

export function useMyInfo() {

  const {data: myInfoData, error} = useQuery<Query>(MY_INFO);
  const myInfo = myInfoData?.account ?? undefined;

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (consts.isDev) {
        navigate("/account-select");
      } else {
        navigate("/login");
      }
    }
  }, [error]);

  return {myInfo, error};
}
