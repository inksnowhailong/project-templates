import { FormInst } from 'naive-ui'
import { IForm } from '../abstract/IForm'

export class formNaiveUI<T> extends IForm {
  protected initFields: T
  private submitMethod?: IForm['submit']

  constructor(
    fields: Ref<T>,
    public validRef: FormInst,
    submitMethod?: IForm['submit']
  ) {
    super(fields)
    this.initFields = structuredClone(fields.value)
    this.submitMethod = submitMethod
  }

  async valid(): Promise<ReturnType<FormInst['validate']>> {
    return await this.validRef.validate()
  }

  // submit 方法已经在构造函数中定义
  public submit() {
    if (this.submitMethod) {
      return this.submitMethod!(this.fields.value)
    } else {
      console.error('未正确定义提交函数')
    }
  }
  reset(): void {
    // 还原到未校验的状态
    this.validRef.restoreValidation()
    this.fields.value = structuredClone(this.initFields)
  }
}
