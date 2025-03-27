import { RequestParams } from "./DTO";
import { ResponseData } from "./DTO";

/**
 * 请求方法接口
 */
export interface IRequestMethod {
    /**
     * 发起 HTTP 请求
     * @param params 请求参数
     * @returns 响应数据
     */
   (params: RequestParams): Promise<ResponseData>;
}

/**
 * 请求拦截器接口
 */
export interface IRequestInterceptor {
    /**
     * 请求前的拦截处理
     * @param params 请求参数
     * @param options 可选配置
     * @returns 修改后的请求参数
     */
    beforeRequest(params: RequestParams, options?: any): Promise<RequestParams>;
}

/**
 * 响应拦截器接口
 */
export interface IResponseInterceptor {
    /**
     * 响应前的拦截处理
     * @param response 响应数据
     * @returns 修改后的响应数据
     */
    beforeResponse(response: ResponseData): Promise<ResponseData>;
}

/**
 * 责任链抽象类
 */
export abstract class DutyChain {
    /** 下一个责任链节点 */
    private nextDutyChain: DutyChain | null = null;

    /**
     * 设置下一个责任链节点
     * @param handler 下一个责任链节点
     * @returns 当前责任链节点
     */
    public setNext(handler: DutyChain): DutyChain {
        this.nextDutyChain = handler;
        return handler;
    }

    abstract  canUse(params: RequestParams | ResponseData): boolean
    /**
     * 执行责任链处理
     */
    abstract handler(): Promise<void>

    /**
     * 处理逻辑（抽象方法）
     * @param params 请求或响应参数
     */
    protected abstract process(params: RequestParams | ResponseData): Promise<void>;
}
