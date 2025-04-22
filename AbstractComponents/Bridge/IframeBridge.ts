import { Bridge, BridgeListener } from './Bridge';
import { BridgeDTO, BridgeEnum, BridgeStatus } from './entities';

/**
 * iframe桥接实现类，用于通过iframe进行跨窗口通信
 * @implements {Bridge}
 */
export class IframeBridge implements Bridge {
    /** iframe窗口对象 */
    target: Window;
    /** 监听器集合，按桥接类型分组 */
    listeners: Record<string, BridgeListener[]>;
    /** 当前连接状态 */
    status: BridgeStatus = BridgeStatus.DISCONNECTED;
    /** 连接钩子集合 */
    connectHooks: Set<Function> = new Set();
    /** 断开连接钩子集合 */
    disconnectHooks: Set<Function> = new Set();
    /** 目标窗口的源 */
    private targetOrigin: string;

    /**
     * 创建iframe桥接实例
     * @param {Window} target - iframe窗口对象
     * @param {string} targetOrigin - 目标窗口的源
     */
    constructor(target: Window, targetOrigin: string) {
        this.target = target;
        this.targetOrigin = targetOrigin;
        this.listeners = {};
        this.setupMessageListener();
    }

    /**
     * 建立iframe连接
     * @returns {void}
     */
    connect(): void {
        this.status = BridgeStatus.CONNECTED;
        this.connectHooks.forEach(hook => hook());
    }

    /**
     * 断开iframe连接
     * @returns {void}
     */
    disconnect(): void {
        window.removeEventListener('message', this.handleMessage);
        this.status = BridgeStatus.DISCONNECTED;
        this.disconnectHooks.forEach(hook => hook());
    }

    /**
     * 发送数据到iframe窗口
     * @template T - 请求数据类型
     * @template O - 响应数据类型
     * @param {BridgeDTO<T, O>} data - 要发送的数据
     * @returns {void}
     */
    send<T, O>(data: BridgeDTO<T, O>): void {
        this.target.postMessage(JSON.stringify(data), this.targetOrigin);
    }

    /**
     * 添加连接钩子
     * @param {Function} hook - 钩子函数
     * @returns {void}
     */
    addConnectHook(hook: Function): void {
        this.connectHooks.add(hook);
    }

    /**
     * 添加断开连接钩子
     * @param {Function} hook - 钩子函数
     * @returns {void}
     */
    addDisconnectHook(hook: Function): void {
        this.disconnectHooks.add(hook);
    }

    /**
     * 添加消息监听器
     * @param {BridgeListener} listener - 监听器对象
     * @returns {void}
     */
    addListener(listener: BridgeListener): void {
        const type = listener.listentType;
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }

    /**
     * 移除消息监听器
     * @param {BridgeListener} listener - 要移除的监听器对象
     * @returns {void}
     */
    removeListener(listener: BridgeListener): void {
        const type = listener.listentType;
        const listeners = this.listeners[type];
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * 设置消息监听器
     * @private
     * @returns {void}
     */
    private setupMessageListener(): void {
        window.addEventListener('message', this.handleMessage.bind(this));
    }

    /**
     * 处理接收到的消息
     * @private
     * @param {MessageEvent} event - 消息事件对象
     * @returns {void}
     */
    private handleMessage(event: MessageEvent): void {
        if (event.origin !== this.targetOrigin) {
            return;
        }

        try {
            const data = JSON.parse(event.data) as BridgeDTO;
            this.notifyListeners(data);
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    /**
     * 通知所有监听器接收到的消息
     * @private
     * @param {BridgeDTO} data - 接收到的数据
     * @returns {void}
     */
    private notifyListeners(data: BridgeDTO): void {
        const typeListeners = this.listeners[data.bridgeType];
        if (typeListeners) {
            typeListeners.forEach(listener => {
                listener.onListent(data);
            });
        }
    }
}
