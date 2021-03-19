## vue 渲染流程

``` js
let vm = new Vue({
  template: '<div>{{ name }}</div>',
  data: {
    name: 'vue'
  },
})

vm.$mount('#app')
``` 
1. 在实例化一个 Vue 实例时初始化选项中的各种数据
    - `initLifecycle(vm)`
        - 初始化杂项
        - 将实例推入父组件的 `$children` 
    - `initEvents(vm)`
        - 挂载事件
    - `initRender(vm)`
        - 挂载一些使用的函数，如_c, $createElement, $attrs, $listener
    - `callHook(vm, 'beforeCreate')`
    - `initInjections(vm)`
        - 初始化 inject
    - `initState(vm)`
        - 初始化 props
        - 初始化 methods
        - 初始化 data
        - 初始化 computed
        - 初始化 watch
    - `initProvide(vm)`
        - 初始化 provide
    - `callHook(vm, 'created')`
2. 调用 $mount 方法时编译 template 为 render 函数， render 函数返回值为 vnode
3. 把当前实例生成一个 watcher 实例，调用 _update 方法来渲染成 dom 
4. 主要算法为 `__patch__` 方法，对比新旧 vnode 来生成 dom


## vue 主要的几个原理
1. 响应式系统的实现，包括 observe 和 watcher
2. 字符串模板的编译 template -> render
3. 虚拟DOM，涉及 vNode，`__patch__` 算法


## 钩子函数的区别
1. beforeCreate中还未执行initState操作，所以data和props中的数据不可获取
2. created 表示Vue实例已经创建，等待调用实例的$mount方法来执行渲染
3. beforeMount 在调用了$mount中，templeate已经编译为了render。验证了实例是可以渲染的以后调用，组件的渲染函数watcher还未注册
4. mounted 组件的渲染函数已经注册，dom已经创建。


## patch算法中对比新旧vnode的关键方法 updateChildren