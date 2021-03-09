import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'


// 1. 定义 Vue 构造函数，并且在Vue.prototype上添加功能函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 将_init方法添加到Vue.prototype, new Vue()时执行_init()
initMixin(Vue)

// 在Vue.prototype上定义$data, 实际返回实例的_data
// 在Vue.prototype上定义$props, 实际返回实例的_props
// 在Vue.prototype上定义$set
// 在Vue.prototype上定义$delete
// 在Vue.prototype上定义$watch
stateMixin(Vue)

// 在Vue.prototype 上定义了事件系统 $on, $once, $off, $emit
eventsMixin(Vue)

// 在Vue.prototype 上面添加了_update, $forceUpdate, $destroy
lifecycleMixin(Vue)

// 在Vue.prototype上面添加了$nextTick， _render方法，以及
  //  target._o = markOnce
  // target._n = toNumber
  // target._s = toString
  // target._l = renderList
  // target._t = renderSlot
  // target._q = looseEqual
  // target._i = looseIndexOf
  // target._m = renderStatic
  // target._f = resolveFilter
  // target._k = checkKeyCodes
  // target._b = bindObjectProps
  // target._v = createTextVNode
  // target._e = createEmptyVNode
  // target._u = resolveScopedSlots
  // target._g = bindObjectListeners
  // target._d = bindDynamicKeys
  // target._p = prependModifier
renderMixin(Vue)

export default Vue

