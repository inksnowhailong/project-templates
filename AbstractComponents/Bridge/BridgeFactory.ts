import { Bridge } from './Bridge';
import { WebSocketBridge } from './WebSocketBridge';
import { IframeBridge } from './IframeBridge';
import { WebViewBridge } from './WebViewBridge';
import { BridgeEnum } from './entities';

/**
 * 桥接工厂类，用于创建和管理不同类型的桥接实例
 */
export class BridgeFactory {
    /** 桥接实例缓存 */
    private static bridges: Map<BridgeEnum, Bridge> = new Map();

    /**
     * 创建桥接实例
     * @param {BridgeEnum} type - 桥接类型
     * @param {Record<string,any>} options - 创建选项
     * @returns {Bridge} 桥接实例
     * @throws {Error} 不支持的桥接类型
     */
    public static createBridge(type: BridgeEnum, options: Record<string,any>): Bridge {
        let bridge = this.bridges.get(type);
        if (!bridge) {
            switch (type) {
                case BridgeEnum.WEBSOCKET:
                    bridge = new WebSocketBridge(options.url);
                    break;
                case BridgeEnum.IFRAME:
                    bridge = new IframeBridge(options.target, options.targetOrigin);
                    break;
                case BridgeEnum.WEBVIEW:
                    bridge = new WebViewBridge(options.nativeBridge);
                    break;
                default:
                    throw new Error(`Unsupported bridge type: ${type}`);
            }
            this.bridges.set(type, bridge);
        }
        return bridge;
    }

    /**
     * 获取桥接实例
     * @param {BridgeEnum} type - 桥接类型
     * @returns {Bridge | undefined} 桥接实例
     */
    public static getBridge(type: BridgeEnum): Bridge | undefined {
        return this.bridges.get(type);
    }

    /**
     * 销毁桥接实例
     * @param {BridgeEnum} type - 桥接类型
     * @returns {void}
     */
    public static destroyBridge(type: BridgeEnum): void {
        const bridge = this.bridges.get(type);
        if (bridge) {
            bridge.disconnect();
            this.bridges.delete(type);
        }
    }
}
