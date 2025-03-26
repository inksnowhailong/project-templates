import { IRequestMethod } from "./Core";
import { IRequestInterceptor } from "./Core";
import { IResponseInterceptor } from "./Core";
import { DutyChain } from "./Core";

/**
 * 抽象请求适配器类
 */
export abstract class AbstractRequestAdapter {
    /** 请求方法实例 */
    public request: IRequestMethod;
    /** 请求拦截器实例 */
    private requestInterceptor: IRequestInterceptor;
    /** 响应拦截器实例 */
    private responseInterceptor: IResponseInterceptor;
    /** 请求责任链 */
    public requestDutyChain: DutyChain;
    /** 响应责任链 */
    public responseDutyChain: DutyChain;
    /** 错误责任链 */
    public errorDutyChain: DutyChain;

    /**
     * 初始化方法
     */
    public abstract init(): void;
}
