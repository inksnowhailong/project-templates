import { BridgeDTO, BridgeEnum, BridgeStatus } from "./entities";

/**
 * 桥接监听器接口，用于处理接收到的消息
 */
export interface BridgeListener {
    /** 监听器类型 */
    listentType: BridgeEnum;
    /** 消息处理回调函数 */
    onListent: (data: BridgeDTO) => void;
}

/**
 * 桥接接口，定义通信的基本操作
 */
export interface Bridge {
    /** 通信目标对象 */
    target: any;
    /** 监听器集合 */
    listeners: Record<string, BridgeListener[]>;
    /** 连接状态 */
    status: BridgeStatus;
    /** 连接钩子 */
    connectHooks:Set<Function>
    /** 断开连接钩子 */
    disconnectHooks:Set<Function>
    /**
     * 建立连接
     * @returns {void}
     */
    connect(): void;

    /**
     * 添加连接钩子
     * @param {Function} hook - 钩子函数
     * @returns {void}
     */
    addConnectHook(hook: Function): void;
    /**
     * 添加断开连接钩子
     * @param {Function} hook - 钩子函数
     * @returns {void}
     */
    addDisconnectHook(hook: Function): void;

    /**
     * 断开连接
     * @returns {void}
     */
    disconnect(): void;

    /**
     * 发送数据
     * @template T - 请求数据类型
     * @template O - 响应数据类型
     * @param {BridgeDTO<T, O>} data - 要发送的数据
     * @returns {void}
     */
    send<T, O>(data: BridgeDTO<T, O>): void;

    /**
     * 添加消息监听器
     * @param {BridgeListener} listener - 监听器对象
     * @returns {void}
     */
    addListener(listener: BridgeListener): void;

    /**
     * 移除消息监听器
     * @param {BridgeListener} listener - 要移除的监听器对象
     * @returns {void}
     */
    removeListener(listener: BridgeListener): void;
}
