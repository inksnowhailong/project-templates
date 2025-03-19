
import { INavigator, IRouteResolver, IHistoryManager, IRoute } from "./router_core"
import { NavigationPipeline } from "./router_pipeline"

export abstract class AbstractRouterAdapter {
    navigator: INavigator
    resolver: IRouteResolver
    history: IHistoryManager
    route:IRoute
    pipeline: NavigationPipeline
    initialize(route:IRoute,pipeline:NavigationPipeline): void{
        this.route = route
        this.pipeline = pipeline
        this.navigator = this.createNavigator()
        this.resolver = this.createResolver()
        this.history = this.createHistory()
    }
    abstract createNavigator(): INavigator
    abstract createResolver(): IRouteResolver
    abstract createHistory(): IHistoryManager
    abstract errorHandler():void
}
