import { Bridge, BridgeListener } from './Bridge';
import { BridgeDTO, BridgeEnum, BridgeStatus } from './entities';

/**
 * WebView桥接实现类，用于通过原生WebView进行通信
 * @implements {Bridge}
 */
export class WebViewBridge implements Bridge {
    /** WebView目标对象 */
    target: any;
    /** 监听器集合，按桥接类型分组 */
    listeners: Record<string, BridgeListener[]>;
    /** 当前连接状态 */
    status: BridgeStatus = BridgeStatus.DISCONNECTED;
    /** 连接钩子集合 */
    connectHooks: Set<Function> = new Set();
    /** 断开连接钩子集合 */
    disconnectHooks: Set<Function> = new Set();
    /** 原生桥接对象 */
    private nativeBridge: any;

    /**
     * 创建WebView桥接实例
     * @param {any} nativeBridge - 原生桥接对象
     */
    constructor(nativeBridge: any) {
        this.nativeBridge = nativeBridge;
        this.listeners = {};
        this.setupNativeBridge();
    }

    /**
     * 建立WebView连接
     * @returns {void}
     */
    connect(): void {
        this.status = BridgeStatus.CONNECTED;
        this.connectHooks.forEach(hook => hook());
    }

    /**
     * 断开WebView连接
     * @returns {void}
     */
    disconnect(): void {
        this.nativeBridge = null;
        this.status = BridgeStatus.DISCONNECTED;
        this.disconnectHooks.forEach(hook => hook());
    }

    /**
     * 发送数据到原生WebView
     * @template T - 请求数据类型
     * @template O - 响应数据类型
     * @param {BridgeDTO<T, O>} data - 要发送的数据
     * @returns {void}
     */
    send<T, O>(data: BridgeDTO<T, O>): void {
        if (this.nativeBridge) {
            this.nativeBridge.postMessage(JSON.stringify(data));
        } else {
            console.error('Native bridge is not available');
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
     * 设置原生桥接
     * @private
     * @returns {void}
     */
    private setupNativeBridge(): void {
        if (this.nativeBridge) {
            this.nativeBridge.onMessage = (message: string) => {
                try {
                    const data = JSON.parse(message) as BridgeDTO;
                    this.notifyListeners(data);
                } catch (error) {
                    console.error('Failed to parse native message:', error);
                }
            };
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
