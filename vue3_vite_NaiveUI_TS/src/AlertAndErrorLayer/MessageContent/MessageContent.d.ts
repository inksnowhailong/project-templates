import { MessageOptions, MessageReactive, MessageType } from 'naive-ui'
declare global {
  namespace Message {
    type TMessageType = 'create' | 'info' | 'success' | 'warning' | 'error' | 'loading' | 'destroyAll'
    type ContentType = string | (() => VNodeChild)
    interface MessageApiInjection {
      create: (content: ContentType, options?: MessageOptions) => MessageReactive
      info: (content: ContentType, options?: MessageOptions) => MessageReactive
      success: (content: ContentType, options?: MessageOptions) => MessageReactive
      warning: (content: ContentType, options?: MessageOptions) => MessageReactive
      error: (content: ContentType, options?: MessageOptions) => MessageReactive
      loading: (content: ContentType, options?: MessageOptions) => MessageReactive
      destroyAll: () => void
      [key in TMessageType]: (content: ContentType, options?: MessageOptions) => MessageReactive
    }
  }
  interface Window {
    $message: ((type: MessageType, content: Message.ContentType, options?: MessageOptions) => void) & Message.MessageApiInjection
  }
}
