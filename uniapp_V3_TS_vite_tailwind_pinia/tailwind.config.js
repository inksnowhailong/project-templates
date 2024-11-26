/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // 兼容小程序，将 : 替换成 __
  separator: '__',
  theme: {
    // 兼容小程序，将默认配置里带 .和/ 清除
    extend:{
      colors:{
     /* 颜色变量 */
    'uni-color-primarybg': '#2a2a2a', /* 主色背景: 深蓝黑 */
    'uni-color-Secondary': '#000000', /* 次色：更深的蓝灰色 */
    'uni-color-Accent': '#005BB5', /* 较深的蓝色作为主要强调色 */
    'uni-color-Accent2': '#fd730b', /* 深橙色作为次要强调色 */

    /* 行为相关颜色 */
    'uni-color-primary': '#005BB5', /* 主色：深蓝 */
    'uni-color-success': '#3CA65D', /* 成功色：深绿色 */
    'uni-color-warning': '#fd730b', /* 提示色：深橙色 */
    'uni-color-error': '#C74643', /* 错误色：更暗红 */

    /* 文字基本颜色 */
    'uni-text-color': '#D1D9E6', /* 主文字色：浅灰蓝，适用于深色背景 */
    'uni-text-color-inverse': '#FFFFFF', /* 反色保持白色 */
    'uni-text-color-grey': '#58667A', /* 辅助文字：较深灰蓝 */
    'uni-text-color-placeholder': '#656565', /* 占位符颜色：深灰 */
    'uni-text-color-disable': '#8C8C8C', /* 禁用文字色：深灰 */

    /* 背景颜色 */
    'uni-bg-color': '#0D1B2A', /* 深色背景 */
    'uni-bg-color-grey': '#1C2734', /* 深灰蓝色背景 */
    'uni-bg-color-hover': '#182537', /* 点击状态色：深蓝 */
    'uni-bg-color-mask': 'rgba(8, 29, 50, 0.6)', /* 遮罩色：深蓝黑透明度 */

    /* 边框颜色 */
    'uni-border-color': '#324A5F', /* 边框色：较深灰蓝，增强协调性 */

    /* 尺寸变量 */

    /* 文字尺寸 */
    'uni-font-size-sm': '12px',
    'uni-font-size-base': '14px',
    'uni-font-size-lg': '16px',

    /* 图片尺寸 */
    'uni-img-size-sm': '20px',
    'uni-img-size-base': '26px',
    'uni-img-size-lg': '40px',

    /* Border Radius */
    'uni-border-radius-sm': '2px',
    'uni-border-radius-base': '3px',
    'uni-border-radius-lg': '6px',
    'uni-border-radius-circle': '50%',

    /* 水平间距 */
    'uni-spacing-row-sm': '5px',
    'uni-spacing-row-base': '10px',
    'uni-spacing-row-lg': '15px',

    /* 垂直间距 */
    'uni-spacing-col-sm': '4px',
    'uni-spacing-col-base': '8px',
    'uni-spacing-col-lg': '12px',

    /* 透明度 */
    'uni-opacity-disabled': '0.3', /* 组件禁用态的透明度 */

    /* 文章场景相关 */
    'uni-color-title': '#BCC6D9', /* 文章标题颜色：浅灰蓝 */
    'uni-font-size-title': '20px',
    'uni-color-subtitle': '#8B98A7', /* 二级标题颜色：深灰蓝 */
    'uni-font-size-subtitle': '18px',
    'uni-color-paragraph': '#A0AEC1', /* 文章段落颜色：灰蓝 */
    'uni-font-size-paragraph': '15px',

      }
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
    space: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false
  }
};

