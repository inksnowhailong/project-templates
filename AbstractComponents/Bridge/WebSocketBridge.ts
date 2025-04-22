import { Bridge, BridgeListener } from './Bridge';
import { BridgeDTO, BridgeEnum, BridgeStatus } from './entities';

/**
 * WebSocket桥接实现类，用于通过WebSocket进行通信
 * @implements {Bridge}
 */
export class WebSocketBridge implements Bridge {
    /** WebSocket连接目标 */
    target: WebSocket;
    /** 监听器集合，按桥接类型分组 */
    listeners: Record<string, BridgeListener[]>;
    /** 当前连接状态 */
    status: BridgeStatus = BridgeStatus.DISCONNECTED;
    /** 连接钩子集合 */
    connectHooks: Set<Function> = new Set();
    /** 断开连接钩子集合 */
    disconnectHooks: Set<Function> = new Set();
    /** WebSocket服务器URL */
    private url: string;

    /**
     * 创建WebSocket桥接实例
     * @param {string} url - WebSocket服务器URL
     */
    constructor(url: string) {
        this.url = url;
        this.listeners = {};
    }

    /**
     * 建立WebSocket连接
     * @returns {void}
     */
    connect(): void {
        if (this.status === BridgeStatus.CONNECTED) {
            return;
        }

        try {
            this.target = new WebSocket(this.url);

            this.target.onopen = () => {
                this.status = BridgeStatus.CONNECTED;
                this.connectHooks.forEach(hook => hook());
            };

            this.target.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data) as BridgeDTO;
                    this.notifyListeners(data);
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            };

            this.target.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            this.target.onclose = () => {
                this.status = BridgeStatus.DISCONNECTED;
                this.disconnectHooks.forEach(hook => hook());
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            this.status = BridgeStatus.DISCONNECTED;
        }
    }

    /**
     * 断开WebSocket连接
     * @returns {void}
     */
    disconnect(): void {
        if (this.target) {
            this.target.close();
            this.status = BridgeStatus.DISCONNECTED;
            this.disconnectHooks.forEach(hook => hook());
        }
    }

    /**
     * 发送数据到WebSocket服务器
     * @template T - 请求数据类型
     * @template O - 响应数据类型
     * @param {BridgeDTO<T, O>} data - 要发送的数据
     * @returns {void}
     */
    send<T, O>(data: BridgeDTO<T, O>): void {
        if (this.target && this.target.readyState === WebSocket.OPEN) {
            this.target.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not connected');
        }
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
