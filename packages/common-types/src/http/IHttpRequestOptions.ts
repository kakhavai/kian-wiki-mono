export interface IHttpRequestOptions {
  method: string;
  url: string;
  params?: { [key: string]: string };
  headers: { [key: string]: string };
}
