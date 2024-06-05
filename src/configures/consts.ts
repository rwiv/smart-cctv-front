import {env} from "@/configures/env.ts";


const isDev = env.MODE === "development";
const isProd = env.MODE === "production";

const protocol = env.VITE_PROTOCOL;
const host = env.VITE_HOST
const port = env.VITE_PORT
const domain = isDev ? `${host}:${port}` : window.location.host;

const endpoint = `${protocol}://${domain}`;

export const consts = {
  isDev,
  isProd,
  protocol,
  host,
  port,
  domain,
  endpoint,
}
