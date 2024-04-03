import { IHttpRequestOptions } from 'common-types';
export class ProviderHttpRequestOptions implements IHttpRequestOptions {
  private _method: string = 'GET';
  private _url: string;
  private _params?: { [key: string]: string };
  private _headers: { [key: string]: string } = {
    'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
    'X-RapidAPI-Host': `${process.env.RAPID_API_HOST}`,
  };

  private _baseURL: string = `${process.env.RAPID_API_URL}`;

  public constructor(path: string, params?: { [key: string]: string }) {
    this._url = `${this._baseURL}/${path}`;
    this._params = params;
  }
  public get method(): string {
    return this._method;
  }

  public get url(): string {
    return this._url;
  }

  public get headers(): { [key: string]: string } {
    return this._headers;
  }

  public get params(): { [key: string]: string } | undefined {
    return this._params;
  }
}
