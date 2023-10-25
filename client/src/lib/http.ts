import axios from "axios";
const http = axios.create({
  timeout: 60000,
  withCredentials: true,
});
export default http;
export const post = function <T>(url: string, data: any): Promise<{ error?: string; message?: boolean } & T> {
  return http.post(url, data).then((res) => res.data);
};
