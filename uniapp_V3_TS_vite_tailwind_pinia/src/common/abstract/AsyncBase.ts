
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions<T> {
  url: string;
  method?: HttpMethod;
  data?: T;
  header?: Record<string, string>;
  showLoading?: boolean;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
export type RequestMethod = <P = any,R = any>(params:RequestOptions<P>) => Promise<ApiResponse<R>>

/**所有具有请求功能的类 都应该初始化时得到应有的请求函数 */
export abstract class AsyncBase<T = RequestMethod >  {
    public request: T;
    constructor(request: T) {
      this.request = request;
    }
}
