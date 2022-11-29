import { appId } from "../package.json";
import { request } from "./request";

export function fbLogin(data) {
  return request(
    {
      url: `/user/${data.fbData.id}`,
    },
    {
      hideAlert: true,
    }
  );
}

export function formLogin(data) {
  console.log("arde", data);
  return request({
    url: "kincode/auth/user",
    // url: 'kincode/auth/user',
    method: "POST",
    data,
  });
}

export function register(data) {
  return request({
    url: `/user?appId=${appId}`,
    method: "POST",
    data,
  });
}

export function registerUser(data) {
  return request(
    {
      url: "/user",
      method: "POST",
      data,
    },
    {
      timeout: 20000,
    }
  );
}
