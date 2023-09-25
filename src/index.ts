import axios, { AxiosError, AxiosResponse } from "axios";
interface Response {
  url: string;
  name: string;
}
const instance = axios.create({
  baseURL: "https://upload.itsgaurav.co/api",
});
export default class Uploadify {
  private _KEY: string;
  private _SECRET: string;
  constructor(API_KEY: string, API_SECRET: string) {
    if (!API_KEY || !API_SECRET) throw new Error("key and value are required");
    this._KEY = API_KEY;
    this._SECRET = API_SECRET;
  }
  async upload(file: File) {
    if (!file) throw new Error("file is required");
    if (file instanceof File === false)
      throw new Error("file must be an instance of File");
    const reader = new FormData();
    reader.append("file", file);
    reader.append("key", this._KEY);
    try {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this._SECRET}`;
      instance.defaults.headers.common["Content-Type"] = "multipart/form-data";
      const resp: AxiosResponse<Response> = await instance.post(
        "/upload",
        reader
      );
      if (resp.status !== 200) throw new Error("something went wrong");
      return resp.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      } else {
        console.log("something went wrong");
      }
    }
  }
}
