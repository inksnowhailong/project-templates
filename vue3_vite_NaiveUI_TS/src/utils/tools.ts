/*
    这里呢，主要是放一些工程本身的工具函数，如果你的函数是跟你业务逻辑相关的，就别往这里放了

*/

/**
 * @description:将一个样式对象转换为CSS样式字符串
 * @param {any} cssVars_
 * @return {*}
 */
export function styleObjToCss(cssVars_: Partial<CSSStyleDeclaration>) {
  let str = ``
  for (const i in cssVars_) {
    str += `${i}:${cssVars_[i]};`
  }
  return str as string
}
