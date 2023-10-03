import axios, { AxiosError, AxiosResponse } from "axios";
type Response = {
  url: string;
  fileName: string;
};
type Error = {
  message: {
    error: string;
  }
};

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
   * @returns {Promise<{response: Response, error: null} | {response: null, error: string}>} A promise that resolves to a tuple containing the response and error, if any.
   * @memberof Uploadify
   */
  async upload(file: File): Promise<
    | {
        response: Response;
        error: null;
      }
    | {
        response: null;
        error: string;
      }
  > {
    if (!file) return { response: null, error: "file is required" };
    if (file instanceof File === false)
      return { response: null, error: "file must be an instance of File" };
    if (file.size > 1024 * 1024 * 10)
      return { response: null, error: "file size must be less than 10MB" };
    const reader = new FormData();
    reader.append("file", file);
    reader.append("key", this._KEY);
    try {
      instance.defaults.headers.common["Authorization"] = this._SECRET;
      const resp: AxiosResponse<Response> = await instance.post(
        "/upload",
        reader
      );
      return {
        response: {
          url: resp.data.url,
          fileName: resp.data.fileName,
        },
        error: null,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const Error = error as AxiosError<Error>;
        return { response: null, error:  Error.response?.data.message.error || "Error" };
      } else {
        return { response: null, error: "Internal Server Error" };
      }
    }
  }
}
