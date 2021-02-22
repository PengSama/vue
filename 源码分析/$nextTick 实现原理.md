## $nextTick 实现原理

In this fiddle, you can see that the DOM was actually updated with “B” correctly, but the page wasn’t repainted yet:

[https://jsfiddle.net/Linusborg/n9jmu5v7/24098/]

this is because the the dom patching by Vue is done in a microtask on the same callstack, and the nexttick pushed another task on that microtask queue - which will also run before the browser can actually do a re-paint after the current callstack has finished.

Using setTimeout() with a couple ms delay on the other hand creates a macro task, pushing execution to the next callstack and gives the browser a brief window of time to do the repaint.

[https://jsfiddle.net/Linusborg/n9jmu5v7/24101/]

setImmediate() has the same effect, but has to be polyfilled in IE if I recall correctly?

[https://jsfiddle.net/Linusborg/n9jmu5v7/24103/]

That’s as far as I myself understand it. the event loop & callstack are a fickle beast.

$nextTick 利用了 microtask 的特性
nextTick只保证dom状态更新完成，并不保证浏览器完成渲染
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