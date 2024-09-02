import { isArray } from '@vue/shared'
import { Emitter } from '@dcloudio/uni-shared'
import { defineSyncApi } from '../../helpers/api'
import {
  API_EMIT,
  API_OFF,
  API_ON,
  API_ONCE,
  type API_TYPE_EMIT,
  type API_TYPE_OFF,
  type API_TYPE_ON,
  type API_TYPE_ONCE,
  EmitProtocol,
  OffProtocol,
  OnProtocol,
  OnceProtocol,
} from '../../protocols/base/eventBus'
import type { EventBus } from '@dcloudio/uni-app-x/types/uni'

type EventStopHandler = () => void

export class UniEventBus implements EventBus {
  private $emitter = new Emitter()
  on(name: string, callback: Function) {
    this.$emitter.on(name, callback)
  }
  once(name: string, callback: Function) {
    this.$emitter.once(name, callback)
  }
  off(name?: string, callback?: Function | null) {
    if (!name) {
      this.$emitter.e = {}
      return
    }
    this.$emitter.off(name, callback)
  }
  emit(name: string, ...args: any[]) {
    this.$emitter.emit(name, ...args)
  }
}

const eventBus = new UniEventBus()
export const $on = defineSyncApi<API_TYPE_ON>(
  API_ON,
  (name, callback): EventStopHandler => {
    eventBus.on(name, callback)

    return () => eventBus.off(name, callback)
  },
  OnProtocol
)
export const $once = defineSyncApi<API_TYPE_ONCE>(
  API_ONCE,
  (name, callback): EventStopHandler => {
    eventBus.once(name, callback)

    return () => eventBus.off(name, callback)
  },
  OnceProtocol
)
export const $off = defineSyncApi<API_TYPE_OFF>(
  API_OFF,
  (name, callback) => {
    // 类型中不再体现 name 支持 string[] 类型, 仅在 uni.$off 保留该逻辑向下兼容
    if (!isArray(name)) name = name ? [name] : []
    name.forEach((n) => eventBus.off(n, callback))
  },
  OffProtocol
)
export const $emit = defineSyncApi<API_TYPE_EMIT>(
  API_EMIT,
  (name, ...args: any[]) => {
    eventBus.emit(name, ...args)
  },
  EmitProtocol
)
