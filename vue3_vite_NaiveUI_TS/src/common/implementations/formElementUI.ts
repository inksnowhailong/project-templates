import { IForm } from '../abstract/IForm'
import { FormInstance } from 'element-plus'
export class formElementUI<T> extends IForm {
  protected initFields: T
  private submitMethod?: IForm['submit']

  constructor(
    fields: Ref<T>,
    public validRef:Ref<FormInstance>,
    submitMethod?: IForm['submit']
  ) {
    super(fields)
    this.initFields = structuredClone(toRaw(fields.value))
    this.submitMethod = submitMethod
  }

  async valid(): Promise<ReturnType<FormInstance['validate']>> {
   return await this.validRef.value.validate()
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
    this.validRef.value.resetFields()
    this.fields.value = structuredClone(this.initFields)
  }
}
