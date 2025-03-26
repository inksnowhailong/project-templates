/**
 * HTTP 请求方法枚举
 */
export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

/**
 * 请求参数接口
 */
export interface RequestParams {
    /** 请求的 URL */
    url: string;
    /** 请求方法 */
    method: RequestMethod;
    /** 请求头 */
    headers: Map<string, string>;
    /** 请求体数据（可选） */
    data?: any;
    /** 查询参数（可选） */
    params?: Map<string, string>;
    /** 元信息（可选） */
    meta?: Map<string, any>;
}

/**
 * 响应数据接口
 */
export interface ResponseData {
    /** 响应状态码 */
    status: number;
    /** 响应消息 */
    message: string;
    /** 响应数据 */
    data: any;
    /** 元信息（可选） */
    meta?: Map<string, any>;
}
