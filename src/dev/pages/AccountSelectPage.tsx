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

  return (
    <>
      <div>
        <Button onClick={onLoginAdmin}>admin login</Button>
      </div>
      <div>
        <Link to={"/login"}><Button>로그인 페이지</Button></Link>
      </div>
    </>
  )
}
