const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) { // 如果promise 就是 x本身 会陷入死递归 互相调用
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') { // 对象或者是函数
    let called
    try {
      let then = x.then // 获取 then方法 有可能这个值是通过Object.defineProperty来定义的
      if (typeof then === 'function') { // 当前有then方法 姑且认为这是一个promise
        then.call(x, y => { // y有可能还是一个promise 知道解析出来的值是一个普通值
          if (called) {
            return
          }
          called = true
          resolvePromise(promise, y, resolve, reject) // 采用成功值向下传递
        }, r => {
          if (called) {
            return
          }
          called = true
          reject(r) // 采用成功值向下传递
        })
      } else { // 基本值
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else { // 基本类型值
    resolve(x)
  }
}
const status = {
  PENGING: 'PENGING',
  REJECTED: 'REJECTED',
  RESOLVED: 'RESOLVED'
}
class MyPromise {
  constructor(executor) {
    this.status = status.PENGING
    this.value = undefined
    this.reason = undefined
    this.onRejectedCallback = [] // 异步函数 存储队列
    this.onResolvedCallback = [] // 异步函数 存储队列
    let resolve = value => {
      if (this.status === status.PENGING) {
        this.value = value // 更新实例的value
        this.status = status.RESOLVED // 更新实例的status
        this.onResolvedCallback.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.status === status.PENGING) {
        this.reason = reason // 更新实例的value
        this.status = status.REJECTED // 更新实例的status
        this.onRejectedCallback.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then (onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let p2 = new MyPromise((resolve, reject) => {
      if (this.status === status.RESOLVED) {
        setTimeout(() => { // 为了获取到实例后的p2，采用定时器
          try {
            let x = onFulFilled(this.value)
            resolvePromise(p2, x, resolve, reject)
            // resolve(res)
          } catch (e) {
            reject(e)
          }

        }, 0)
      }
      if (this.status === status.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(p2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === status.PENGING) { // 异步函数处理
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(p2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return p2
  }
}
MyPromise.all = function (values) {
  return new MyPromise((resolve, reject) => {
    let arr = []
    let index = 0
    function processDate (key, val) {
      arr[key] = val
      if (++key === values.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < values.length; i++) {
      let cur = values[i]
      if (isPromise(cur)) {
        cur.then((data) => {
          processDate(i, data)
        }, reject)
      } else {
        processDate(i, cur)
      }
    }
  })

}
MyPromise.race = function (values) {
  return new MyPromise((resolve,reject) => {
    let i = 0
    function processDate(cb,data){
      // console.log(cb,'cb')
      if(i++===0){
        cb(data)
      }
    }
    for(let i = 0;i<values.length;i++){
      // debugger
      let cur = values[i]
      if(isPromise(cur)){
        cur.then(data => {
          processDate(resolve,data)
        },err => {
          processDate(reject,err)
        })
      }else{
        processDate(resolve,cur)
      }
    }
  })
}
MyPromise.try = function () {

}
MyPromise.catch = function () {

}

MyPromise.resolve = function () {

}
MyPromise.reject = function () {

}
MyPromise.finnally = function () {

}
function isPromise (val) {
  if (typeof val === 'object' && val !== null || typeof val === 'function') {
    if (typeof val.then === 'function') {
      return true
    }
  }
  return false
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise