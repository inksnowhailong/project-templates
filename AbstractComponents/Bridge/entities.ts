/**
 * 桥接类型枚举
 */
export enum BridgeEnum {
    /** WebSocket通信 */
    WEBSOCKET = 'websocket',
    /** iframe通信 */
    IFRAME = 'iframe',
    /** WebView通信 */
    WEBVIEW = 'webview'
}

/**
 * 桥接数据传输对象
 * @template T - 请求数据类型
 * @template O - 响应数据类型
 */
export interface BridgeDTO<T = any, O = any> {
    /** 桥接类型 */
    bridgeType: BridgeEnum;
    /** 请求数据 */
    request?: T;
    /** 响应数据 */
    response?: O;
    /** 错误信息 */
    error?: string;
}

/**
 * 桥接状态枚举
 */
export enum BridgeStatus {
    DISCONNECTED = 'disconnected',
    CONNECTED = 'connected'
}
