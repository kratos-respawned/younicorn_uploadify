import axios, { AxiosError, AxiosResponse } from "axios";
interface Response {
  url: string;
  fileName: string;
}
const instance = axios.create({
  baseURL: "https://upload.itsgaurav.co/api",
});
export default class Uploadify {
  private _KEY: string;
  private _SECRET: string;

  /**
   * Creates an instance of Uploadify.
   * @param {string} API_KEY - The API key for the server.
   * @param {string} API_SECRET - The API secret for the server.
   * @throws {Error} Throws an error if API_KEY or API_SECRET is not provided.
   * @memberof Uploadify
   */
  constructor(API_KEY: string, API_SECRET: string) {
    if (!API_KEY || !API_SECRET) throw new Error("key and value are required");
    this._KEY = API_KEY;
    this._SECRET = API_SECRET;
  }

  /**
   * Uploads a file to the server.
   * @async
   * @param {File} file - The file to upload.
   * @returns {Promise<[Response | null, string | null]>} A promise that resolves to a tuple containing the response and error, if any.
   * @memberof Uploadify
   */
  async upload(file: File): Promise<[Response | null, string | null]> {
    if (!file) return [null, "file is required"];
    if (file instanceof File === false)
      return [null, "file must be an instance of File"];
    const reader = new FormData();
    reader.append("file", file);
    reader.append("key", this._KEY);
    try {
      instance.defaults.headers.common["Authorization"]=this._SECRET;
      const resp: AxiosResponse<Response> = await instance.post(
        "/upload",
        reader
      );
      if (resp.status !== 200) return [null, "Something went wrong"];
      return [resp.data, null];
    } catch (error) {
      if (error instanceof AxiosError) {
        return [null, error.response?.data];
      } else {
        return [null, "Internal Server Error"];
      }
    }
  }
}
