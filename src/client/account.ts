import {gql} from "@apollo/client";
import {consts} from "@/configures/consts.ts";
import {AccountCreation} from "@/graphql/types.ts";
import {post} from "@/lib/web/http.ts";

export const ACCOUNT_FIELDS = gql`
  fragment AccountFields on Account {
    id
    role
    username
    nickname
    avatarUrl
  }
`;

export const MY_INFO = gql`
  query MyInfo {
    account {
      ...AccountFields
    }
  }
  ${ACCOUNT_FIELDS}
`;

export function signup(creation: AccountCreation) {
  return post(`${consts.endpoint}/api/auth/signup`, creation);
}

export interface LoginRequest {
  username: string;
  password: string;
}

export function login(req: LoginRequest, remember: boolean) {
  let url = `${consts.endpoint}/api/auth/login`;
  if (remember) {
    url += "?remember=true";
  }
  return post(url, req);
}

export function logout() {
  return post(`${consts.endpoint}/api/auth/logout`, null);
}

export const getAccountByUsername = gql`
  query GetAccountByUsername($username: String!) {
    account(username: $username) {
      ...AccountFields
    }
  }
  ${ACCOUNT_FIELDS}
`;
