import { DutyChain } from "./Core";
import { RequestParams } from "./DTO";
import { ResponseData } from "./DTO";

/**
 * 重复请求插件
 */
export class RepeatRequest extends DutyChain {
    canUse(params: RequestParams | ResponseData): boolean {
        throw new Error("Method not implemented.");
    }
    /**
     * 处理重复请求逻辑
     * @param params 请求参数
     */
    protected async process(params: RequestParams): Promise<void> {
        // 实现重复请求逻辑
    }

    /**
     * 执行责任链处理
     */
    public async handler(): Promise<void> {

    }
}

/**
 * 请求认证插件
 */
export class RequestAuth extends DutyChain {
    canUse(params: RequestParams | ResponseData): boolean {
        throw new Error("Method not implemented.");
    }
    /**
     * 处理请求认证逻辑
     * @param params 请求参数
     */
    protected async process(params: RequestParams): Promise<void> {
        // 实现请求认证逻辑
    }

    /**
     * 执行责任链处理
     */
    public async handler(): Promise<void> {

    }
}

/**
 * 消息处理插件
 */
export class Message extends DutyChain {
    canUse(params: RequestParams | ResponseData): boolean {
        throw new Error("Method not implemented.");
    }
    /**
     * 处理消息逻辑
     * @param response 响应数据
     */
    protected async process(response: ResponseData): Promise<void> {
        // 实现消息处理逻辑
    }

    /**
     * 执行责任链处理
     */
    public async handler(): Promise<void> {

    }
}
