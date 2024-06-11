export interface SkeletonProps {
  /**圆形骨架 */
  circle?: boolean
  /**文本骨架 */
  text?: boolean
  /**骨架大小 */
  size?: 'small' | 'medium' | 'large'
  /**重复次数 */
  repeat?: number
  /**骨架高度 */
  height?: string | number
  /**圆角骨架 */
  round?: boolean
  /**骨架宽度 */
  width?: string | number
  /**是否启用动画 */
  animated?: boolean
  /**是否显示为直角骨架 */
  sharp?: boolean
}
