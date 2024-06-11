import axios from 'axios'

/** 接口成功的统一回调
 * 1.http成功
 * 2.code为200
 */
export function successHandle(response: any, _options: Request.TCustomOptions) {
  // 是否提示成功信息
  if (_options.successMessage) {
    if (typeof _options.successMessage === 'string') {
      window.$message('success', _options.successMessage)
    } else if (response.data.message) {
      window.$message('success', response.data.message)
    }
  }
}

/** http错误和code错误的统一处理
 * 1.错误信息的展示处理
 * 权重，api配置>axios配置>后端返回的message
 */
export function errorHandle(errorConfig: any, custom_options: Request.TCustomOptions, type: 'http' | 'code' | 'request') {
  let errorData = {}
  switch (type) {
    case 'http':
      errorData = httpErrorStatusHandle(errorConfig, custom_options)
      break
    case 'code':
      errorData = codeErrorStatusHandle(errorConfig, custom_options)
      break
    case 'request':
      return Promise.resolve({
        code: 400,
        data: errorConfig,
        message: '请求发送失败'
      })

    default:
      break
  }
  // 配置项
  errorConfig = Object.assign(errorData, {
    messageStatus: 'error'
  } as typeof errorConfig)
  // 1.详见上
  if (custom_options.errorMessage) {
    if (typeof custom_options.errorMessage === 'string') {
      // 配置在API里的errorMessage权重更高
      window.$message(errorConfig.messageStatus, custom_options.errorMessage)
    } else {
      // 如果API没有配置errorMessage,则展示handle里面配置的提示
      window.$message(errorConfig.messageStatus, errorConfig.message)
    }
  }

  return Promise.resolve({
    code: errorConfig.code || 500,
    data: errorConfig.message
  }) // 错误继续返回给到具体页面
}

/**
 * @description: 处理异常请求确实失败的异常
 * @param {any} error
 * @return {*}
 */
export function httpErrorStatusHandle(error: any, custom_options: Request.TCustomOptions) {
  // 处理被取消的请求
  let message = ''
  if (axios.isCancel(error)) {
    message = `请求的重复请求：${error.message}`
  } else if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        setTimeout(() => {
          window.location.href = `${window.location.origin}/login?time=${new Date().getTime()}`
        }, 0)
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
    }
  } else if (error.message && error.message.includes('timeout')) {
    message = '网络请求超时！'
  } else if (error.message && error.message.includes('Network')) {
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  }

  return {
    code: error?.response?.status,
    message: message,
    messageStatus: 'error',
    custom_options
  }
}

/**
 * http成功,但是业务返回的状态码是错误的
 * @param response
 */

export function codeErrorStatusHandle(response: any, custom_options: Request.TCustomOptions) {
  let message = ''
  let messageStatus: Message.TMessageType = 'success'
  switch (response.data.code) {
    case 403:
      // 执行退出
      message = '您没有权限操作!'
      messageStatus = 'warning'
      break
    case 400:
      // 执行退出
      message = '请求数据异常!'
      messageStatus = 'error'
      break
    case 500:
      // 执行退出
      message = response.data.message
      messageStatus = 'error'
      break
    default:
      message = `异常问题${response.data.code || 500}，请联系管理员！`
      messageStatus = 'error'
  }

  return { message, messageStatus, code: response.data.code, custom_options }
}

/**
 * @description: request请求的loading
 * @return {*}
 */
export class requestLoadding {
  _count = 0
  start() {
    this._count++
    if (this._count === 1) {
      window.$loading.start()
    }
  }
  close(_options: Request.TCustomOptions, type: boolean) {
    if (!_options.loading) return
    if (_options.loading && this._count > 0) this._count--
    if (this._count === 0) {
      type ? window.$loading.finish() : window.$loading.error()
    }
  }
}
