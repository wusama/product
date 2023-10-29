import axios from "axios";
const http = axios.create({
  timeout: 60000,
  withCredentials: true,
});
let token = localStorage.getItem("token") || "";
const post = function <T>(
  url: string,
  data: any
): Promise<{ error?: string; message?: string } & T> {
  return http
    .post(url, data, {
      headers: {
        token: token || undefined,
      },
    })
    .then((res) => res.data);
};
const get = function <T>(
  url: string
): Promise<{ error?: string; message?: string } & T> {
  return http
    .get(url, {
      headers: {
        token: token || undefined,
      },
    })
    .then((res) => res.data);
};
function setToken(val: string) {
  token = val;
}

export default { get, post, setToken };
