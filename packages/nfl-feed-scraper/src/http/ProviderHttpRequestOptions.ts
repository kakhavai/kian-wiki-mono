import { AxiosRequestConfig, AxiosHeaders } from 'axios';

export class ProviderHttpRequestOptions {
  private _config: AxiosRequestConfig;

  public constructor(path: string, params?: { [key: string]: string }) {
    this._config = {
      method: 'GET',
      baseURL: process.env.RAPID_API_URL,
      url: path,
      params: params,
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
      },
    };
  }

  public get method(): string | undefined {
    return this._config.method;
  }

  public get url(): string | undefined {
    return this._config.url;
  }

  public get headers(): AxiosHeaders {
    return this._config.headers as AxiosHeaders;
  }

  public get params(): { [key: string]: string } | undefined {
    return this._config.params;
  }

  public getAxiosRequestOptions(): AxiosRequestConfig {
    return this._config;
  }
}
