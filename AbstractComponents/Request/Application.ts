import { AbstractRequestAdapter } from "./FrameworkAdapters";

/**
 * 异步操作基类
 */
export abstract class AsyncBase {
    /** 请求适配器实例 */
    public Requester: AbstractRequestAdapter;

    /**
     * 构造函数
     * @param Requester 请求适配器实例
     */
    constructor(Requester: AbstractRequestAdapter) {
        this.Requester = Requester;
    }
}

