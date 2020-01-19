## computed 与 watch 的异同

### 不同之处

- computed 在 `vue` 实例化发过程中会变成实例的一个属性，而 `watch` 则只生成一个watcher实例并存放在vue实例中_watchers中。
- computed 可以监听多个属性值， watch 只能监听一个属性
- computed 使用的函数返回值，watch 是运行函数
- computed 的 watcher 是懒加载，在使用到该computed属性时才会去求值，并且在依赖不变的时候不进行再次求值。 watch 则在实例化时就进行求值。


### 相同之处

- computed 和 watch 都会监听属性的变化
- computed 和 watch 都会生成 watcher 实例