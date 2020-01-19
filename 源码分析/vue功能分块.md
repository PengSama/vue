vue功能：采用**模板语法**编写页面，并且在**渲染数据变化**时能在视图层**自动**发生变化。

从vue的功能可知vue把模板语法转换为浏览器可识别的Html，那么vue需要做哪些工作？

```js
let template = `<div>
    <input v-model='text'/ @change='handleInputChange'>
    input is: <span>{{ text }}</span>
  </div>`
```
上面的template看做为一个合法的vue模板语法，如果需要在浏览器显示，那么vue就需要将这段模板
转变为html合法的标签属性。过程可以看做如下：

```js
template -> vue处理template -> html
```
但是从template到html并不是一个简单的过程，vue模板语法有自己定义的规则，比如`{{}}`, `v-model`, `v-bind`, 所以模板语法需要经过编译转化为合法html。这就是vue中一块
重要的功能：**模板编译**。

如果通过一个函数表示则为：
```js
compiler(template) -> html
```



