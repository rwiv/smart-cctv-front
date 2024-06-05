import {consts} from "@/configures/consts.ts";

export async function getCamApiAddress() {
  const res = await fetch(`${consts.endpoint}/rest/addr/get/cam-api`);
  return res.text();
}

export async function getCamNginxAddress() {
  const res = await fetch(`${consts.endpoint}/rest/addr/get/cam-nginx`);
  return res.text();
}
