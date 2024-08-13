// 接口
export interface IFormType {
  /**
   * 校验方法
   */
  valid(): Promise<any> | void
  /**
   * 提交方法
   */
  submit(...args: any[]): Promise<any> | void
  /**
   * 重置方法
   */
  reset(...args: any[]): Promise<any> | void
}
export abstract class IForm implements IFormType {
  constructor(public fields: Record<string, any>) {}
  public abstract valid(): Promise<any> | void

  public abstract submit(...args: any[]): Promise<any> | void

  public abstract reset(...args: any[]): Promise<any> | void
}
