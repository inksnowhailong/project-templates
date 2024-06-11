/**
 * @description:字符串参数去除前后空格
 * @param {any} params
 * @return {*}
 */
export const trimParams = (params: any) => {
  if (!params || typeof params !== 'object') return
  try {
    const params2 = JSON.parse(JSON.stringify(params))
    if (params) {
      for (const key in params) {
        if (typeof params[key] === 'string') {
          params[key] = params[key].trim()
        }
      }
    }
  } catch (e) {
    console.error('自动去除字符串前后空格失败，请检查传参或关闭自动去除字符串前后空格功能')
    console.log(params, e)
  }
}
