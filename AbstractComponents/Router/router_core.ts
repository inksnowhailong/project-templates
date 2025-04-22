import {
  NavigationContext,
  NavigationInstruction,
  NavigationOptions,
  NavigationType,
  ResolvedRoute,
} from "./router_domain";

/**
 * @description:导航器，使用有两种方式进行编程式路由导航
 * @return {*}
 */
export interface INavigator {

  push(target: string, options: NavigationOptions): Promise<void>;
  replace(target: string, options: NavigationOptions): Promise<void>;
  back(): Promise<void>;
  forward(): Promise<void>;
}

/**
 * @description: 路由解析器，用于解析路由实际对象
 * @return {*}
 */
export interface IRouteResolver {
  resolve(path: string): Promise<ResolvedRoute>;
}

/**
 * @description: 中间件逻辑，用于处理路由跳转前的随时可插拔处理
 * @return {*}
 */
export interface IMiddleware {
  process(context: NavigationContext, next: () => Promise<void>): Promise<void>;
}

/**
 * @design: 建议实现为单例模式
 * @description: 历史管理器，用于管理路由历史记录，用于可监控式路由路径
 * @return {*}
 */
export interface IHistoryManager {
  push(entry: NavigationInstruction): void;
  replace(entry: NavigationInstruction): void;
  back(): void;
  forward(): void;
  getAllHistory(): NavigationInstruction[];
  clear(): void;
}

/**
 * @description: 路由数据，用于存储全部路由信息
 * @return {*}
 */
export interface IRoute {
  routes: ResolvedRoute[];
  routeMap: Map<string, ResolvedRoute>;
  createRouteMap(): void;
  addRoute(route: ResolvedRoute): void;
}

