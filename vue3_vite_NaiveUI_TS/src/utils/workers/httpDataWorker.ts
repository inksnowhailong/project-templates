// worker.js
self.onmessage = function (event) {
  // 这里可以做一些异步操作，比如请求数据，这里可以import引入那些请求函数

  // 这里只是一个模拟的异步操作 返回数据 以此做到数据使用web worker 来进行处理
  self.postMessage({
    onlyKey: event.data.onlyKey,
    data: {
      code: 200,
      data: {
        path: event.data.path,
        data: event.data.data
      }
    }
  })
}
