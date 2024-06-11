declare namespace Request {
  /**
   * @description:
   * @param {}
   * @return {
   *  ,
   *  loading: 加载中
   *  reduct_data_format: 数据格式化
   *  errorMessage_show: 错误信息显示
   *  [propName: string]: any
   * }
   */
  interface TCustomOptions {
    /** 后端configBaseURL映射的key */
    serverType: string
    /** 是否取消重复请求 */
    repeatRequestCancel: boolean
    /** 是否开启loading层效果, 默认为true */
    loading: boolean
    /** 是否开启简洁的数据结构响应, 默认为true */
    reductDataFormat: boolean
    /** 是否开启接口错误信息展示,默认为true
     * 支持string或者boolean
     */
    stringTrim: boolean // 是否开启字符串前后空格去除,默认为true
    errorMessage: boolean | string
    successMessage: boolean | string
    [propName: string]: unknown
  }
  /**
   * @description: 错误消息的配置项
   */
  type ErrorConfig = Partial<{
    code: number
    messageStatus: Message.TMessageType
    message: any
  }>
}
