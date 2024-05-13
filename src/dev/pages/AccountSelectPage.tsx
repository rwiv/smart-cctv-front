import {MY_INFO, login, LoginRequest} from "@/client/account.ts";
import {useNavigate} from "react-router";
import {useApolloClient} from "@apollo/client";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export function AccountSelectPage() {

  const client = useApolloClient();
  const navigate = useNavigate();

  const onLoginAdmin = async () => {
    const req: LoginRequest = {
      username: "admin",
      password: "admin",
    };
    await login(req, false);
    await client.refetchQueries({ include: [MY_INFO] });
    navigate("/");
  }

  const onLoginUser1 = async () => {
    const req: LoginRequest = {
      username: "user1@gmail.com",
      password: "1234",
    };
    await login(req, false);
    await client.refetchQueries({ include: [MY_INFO] });
    navigate("/");
  }

  const onLoginUser2 = async () => {
    const req: LoginRequest = {
      username: "user2@gmail.com",
      password: "1234",
    };
    await login(req, false);
    await client.refetchQueries({ include: [MY_INFO] });
    navigate("/");
  }

  return (
    <>
      <div>
        <Button onClick={onLoginAdmin}>admin</Button>
        <Button onClick={onLoginUser1}>user1</Button>
        <Button onClick={onLoginUser2}>user2</Button>
      </div>
      <div>
        <Link to={"/signup"}><Button>회원가입</Button></Link>
        <Link to={"/login"}><Button>로그인</Button></Link>
      </div>
    </>
  )
}
