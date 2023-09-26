# Uploadify

Uploadify is an npm package that allows you to easily upload files to the cloud. This README will guide you through the process of setting up and using Uploadify.

## Getting Started

1. Create an account on [uploadify.itsgaurav.co](https://uploadify.itsgaurav.co/) [Coming Soon] to get your client key and secret.
2. Create a `.env` file in the root directory of your project and add your client key and secret in it:
    ```
    API_KEY=your_api_key_here
    SECRET=your_secret_here
    ```
3. Install the `younicorn_uploadify` package:
    ```
    npm install younicorn_uploadify

    ```
4. Create an instance of the `uploadify` class:
    ```
    import uploadify from "younicorn_uploadify"
    const instance = new uploadify(API_KEY, SECRET)
    ```
5. Use the `upload` method to upload a file:
    ```
    const [data, error] = await instance.upload(file)
    ```

## API

### `uploadify(API_KEY, SECRET)`

Creates a new instance of the `uploadify` class.

- `API_KEY` - Your Uploadify API key.
- `SECRET` - Your Uploadify API secret.

### `upload(file)`

Uploads a file to the cloud.

- `file` - The file to upload.

Returns an array containing the uploaded file's data and any errors that occurred during the upload.

- `data` - The uploaded file's data.
- `error` - Any errors that occurred during the upload.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
