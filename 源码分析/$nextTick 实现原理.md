## $nextTick 实现原理

$nextTick 利用了 microtask 的特性

内部使用 Promise 来开启一个 microtask, 将要执行的函数推入一个callback数组，然后通过 Promise 来执行任务

```javascript
let callback = []
function task() {
	Promise.resolve().then(flush)
}

function flush() {
	for (let i = 0; i < callback.length; i++) {
		callback[i]()
	}
}

function nextTick(fn, ctx) {
	callback.push(() => {
		fn.apply(ctx)
	})
	task()
	if (!fn) {
		return Promise.resolve()
	}
}
```

## macrotask 与 microtask

marcotask事件队列是由浏览器事件触发线程维护。
mircitask微任务队列是由JS引擎线程维护。

microtask 在每个 macrotask 结束后， 渲染前，执行

macrotask(microtask) -> 渲染 -> macrotask(microtask)