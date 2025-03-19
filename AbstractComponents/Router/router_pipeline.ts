import { IHistoryManager, IMiddleware } from "./router_core";
import { NavigationContext } from "./router_domain";

/**
 * @description: 管道设计，当前这个是阻塞式的管道设计，依次处理中间件
 * @return {*}
 */
export class NavigationPipeline {
  middlewares: IMiddleware[] = [];
  errorHandler?: (error: Error, context: NavigationContext) => void;

  async pipe(context: NavigationContext): Promise<void> {
    let index = 0;
    const next = async () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        await middleware.process(context, next);
      }
    };
    await next();
  }
  addMiddleware(middleware: IMiddleware): void {
    this.middlewares.push(middleware);
  }
  onError(handler: (error: Error, context: NavigationContext) => void): void {
    this.errorHandler = handler;
  }
}

/**
 * @description: 路由守卫中间件
 * @return {*}
 */
export class GuardMiddleware implements IMiddleware {
  async process(
    context: NavigationContext,
    next: () => Promise<void>
  ): Promise<void> {
    const route = context.currentRoute;
    for (const guard of route.guards) {
      const result = await guard(context);
      //   若得到了新的跳转路径，则跳转到新的路径
      if (result) {
        context.instruction = result;
        break;
      }
    }
    await next();
  }
}

export class HistoryMiddleware implements IMiddleware {
  histroyManager: IHistoryManager;
  constructor(histroyManager: IHistoryManager) {
    this.histroyManager = histroyManager;
  }
  async process(
    context: NavigationContext,
    next: () => Promise<void>
  ): Promise<void> {
    const instruction = context.instruction;
    const type = instruction.type;
    this.histroyManager[type](instruction);
    next();
  }
}
