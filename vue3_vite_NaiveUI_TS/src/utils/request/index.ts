import { successHandle, errorHandle, requestLoadding } from '@/AlertAndErrorLayer/RequestError/requestError'
import { userStore } from '@/store/modules/userStore'
import axios, { AxiosRequestConfig } from 'axios'
import { RepeatRequest } from './repeatRequest'
import { trimParams } from './tool'
// 重复请求去除功能
const repeatClass = new RepeatRequest()
// loading类
const loading = new requestLoadding()

/**baseUrl配置 */
const baseURLObj: Record<string, string> = {
  default: import.meta.env.VITE_JAVA_API_URL
  // usercenter: import.meta.env.VITE_UCENTER_API_URL
}

/**
 * @description: 请求实体
 * @param {AxiosRequestConfig} axiosConfig axios配置
 * @param {} customOptions 自定义配置
 * @return {*}
 */
function mainAxios<T>(axiosConfig: AxiosRequestConfig, customOptions: Partial<Request.TCustomOptions> = {}) {
  /** 自定义配置各项功能*/
  const custom_options = Object.assign(
    {
      serverType: 'default',
      repeatRequestCancel: true, // 是否开启取消重复请求, 默认为 true
      loading: true, // 是否开启loading层效果, 默认为true
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      errorMessage: true, // 是否开启接口错误信息展示,默认为true
      successMessage: false, // 是否开启接口成功信息展示,默认为false
      stringTrim: true // 是否开启字符串前后空格去除,默认为true
      // code_message_show: false // 是否开启code为200时的信息提示, 默认为false
    } as Request.TCustomOptions,
    customOptions
  )
  /** 后端接口地址匹配配置，key是请求的serverType,value是后端接口 */
  const configBaseURL = baseURLObj[custom_options.serverType]

  const service = axios.create({
    baseURL: configBaseURL, // 设置统一的请求前缀
    timeout: 30000 // 设置统一的超时时长
  })

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      // 删除重复请求
      repeatClass.removePending(config)
      // 添加此请求标识
      custom_options.repeatRequestCancel && repeatClass.addPending(config)

      // 创建loading实例
      if (custom_options.loading) {
        loading.start()
      }
      // 去除字符串前后空格
      if (custom_options.stringTrim) {
        // get请求
        trimParams(config.params)
        // post请求
        trimParams(config.data)
      }
      // 自动携带token
      if (userStore.token && typeof window !== 'undefined' && config.headers && axiosConfig.url && axiosConfig.url.indexOf('/login') < 0) {
        config.headers['token'] = userStore.token
      }
      // logintype
      config.headers.logintype = 'other_system'
      // 平台id
      config.headers.platformId = import.meta.env.VITE_PLATFORM_ID
      return config
    },
    (error) => {
      return errorHandle(error, custom_options, 'request')
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      // 删除重复请求
      repeatClass.removePending(response.config)
      // 关闭loading
      loading.close(custom_options, true)
      // 请求成功： 1、默认判断code===200算成功，2、文件流形式，不存在data.code
      if (response.data.code === 200 || response.config.responseType === 'blob') {
        successHandle(response, custom_options)
      } else {
        return errorHandle(response, custom_options, 'code') // 处理错误状态码
      }
      // 返回数据
      return custom_options.reductDataFormat ? response.data : response
    },
    (error) => {
      // 删除重复请求
      error.config && repeatClass.removePending(error.config)
      // 关闭loading
      loading.close(custom_options, false)

      return errorHandle(error, custom_options, 'http') // 处理错误状态码
    }
  )
  return service(axiosConfig).then((res) => res as T)
}

export default mainAxios
