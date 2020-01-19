## vue打包文件的区别
打包后的 Vue 文件可以分为两种类型：1. 包含编译器的版本（完整版），2. 不包含编译器的版本（runtime版本）

完整版打包的入口文件为 `platforms/web/entry-runtime-with-compiler.js`
runtime版本入口文件为 `platforms/web/entry-runtime.js`

其中完整版包括了runtime版本所有代码，区别在于完整版引入了编译器功能，将字符串模板编译为render函数，
``` javascript
import { compileToFunctions } from 'platforms/compiler/index'

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el,hydrating) {
  el = el && query(el)
  const options = this.$options
  ...
  if (!options.render) {
    let template = options.template
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        ...
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}
```
通过 `compileToFunctions` 可以将字符串形式的模板编译为一个函数，`compileToFunctions` 为 Vue 编译器函数，同时也挂载在 Vue 上面

``` javascript
Vue.compile = compileToFunctions
```

