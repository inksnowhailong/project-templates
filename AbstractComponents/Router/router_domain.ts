/**
 * @description: 路由携带数据
 * @return {*}
 */
export interface NavigationOptions {
  params?: Record<string, string>;
  query?: Record<string, string>;
  hash?: string;
}
/**
 * @description: 跳转类型
 * @return {*}
 */
export enum NavigationType {
    push = 'push',
    replace = 'replace',
    back = 'back',
    forward = 'forward',
}

/**
 * @description: 路由守卫，返回一个真正要跳转的路由
 * @return {*} 返回一个新的跳转路径，或者什么也不返回，按原计划跳转
 */
export interface RouteGuard {
    (context: NavigationContext): NavigationInstruction|void | Promise<NavigationInstruction|void>;
}

/**
 * @description: 路由进入前的钩子
 * @return {*}
 */
export interface RouterBefore {
    (context: NavigationContext): void | Promise<void>;
}

/**
 * @description: 路由离开前的钩子
 * @return {*}
 */
export interface RouterLeave {
    (context: NavigationContext): void | Promise<void>;
}


/**
 * @description: 路由上下文
 * @return {*}
 */
export class NavigationContext {
  constructor(
    public instruction: NavigationInstruction,
    public prevInstruction: NavigationInstruction|null,
    public nextInstruction: NavigationInstruction|null,
    public currentRoute: ResolvedRoute,
  ) {}
}

/**
 * @description: 路由指令
 * @return {*}
 */
export class NavigationInstruction {
  constructor(
    public type: NavigationType,
    public target: string,
    public options: NavigationOptions,
    public timestamp: number
  ) {}
}

/**
 * @description: 路由解析
 * @return {*}
 */
export class ResolvedRoute {
  constructor(
    public path: string,
    public component: any,
    public guards: RouteGuard[] = [],
    public enterHook: RouterBefore[] = [],
    public leaveHook: RouterLeave[] = [],
    public children: ResolvedRoute[] = [],
    public metadata: Map<string, any> = new Map()
  ) {}
}
