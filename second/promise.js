// 静态方法 reject resolve all race
// 动态方法 then finally catch

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
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
    // 初始化状态与值
    this.status = status.PENGING
    this.value = undefined
    this.reason = undefined
    this.onFulFilledCallbacks = [] // 成功的回调 异步
    this.onRejectedCallbacks = [] // 失败的回调 异步

    const resolve = value => {
      if (this.status === status.PENGING) {
        this.status = status.RESOLVED
        this.value = value
        this.onFulFilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = reason => {
      if (this.status === status.PENGING) {
        this.status = status.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    let p = new MyPromise((resolve, reject) => {
      if (this.status === status.RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value)
            resolvePromise(p, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === status.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(p, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      // 异步代码
      if (this.status === status.PENGING) {
        this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(p, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return p
  }
  finally (onDone) {
    if (typeof onDone !== 'function') {
      return this.then()
    }
    let promise = new this.constructor()
    return this.then(value => promise.resolve(onDone()).then(() => value), reason => promise.resolve(onDone()).then(() => { throw reason }))
  }
  catch (onError) {
    return this.then(null, onError);
  }
}
MyPromise.reject = reason => new MyPromise((resolve, reject) => {
  reject(reason)
})
MyPromise.resolve = value => {
  let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolvePromise(p, value, resolve, reject)
    }, 0)
  })
  return p
}
MyPromise.all = promises => new MyPromise((resolve, reject) => {
  if (!promises || promises && promises.length === 0) resolve([])
  let res = []
  let j = 0
  promises.forEach((promise, index) => {
    MyPromise.resolve(promise).then(data => {
      res[index] = data
      if (++j === promises.length) {
        resolve(res)
      }
    }, err => {
      reject(err)
    })
  })
})
MyPromise.race = promises => new MyPromise((resolve, reject) => {
  // debugger
  if (!promises || promises && promises.length === 0) resolve(undefined)
  promises.forEach(promise => {
    MyPromise.resolve(promise).then(data => {
      resolve(data)
    }, err => {
      reject(err)
    })
  })
})
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise