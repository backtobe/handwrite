const resolvePromise = (promise,x,resolve,reject) => {
  if(x === promise){
    return reject(TypeError('chain cycle'))
  }
  if((typeof x === 'object' && x !== null) || typeof x === 'function'){
    let called
    try {
      let then = x.then
      if(typeof then === 'function'){
        then.call(x,y =>{
          if(called) return
          called = true
          resolvePromise(promise,y,resolve,reject)
        },r => {
          if(called) return
          called = true
          reject(r)
        })
      }else{
        if(called) return
        called = true
        resolve(x)
      }
    } catch (error) {
      if(called) return 
      called = true
      reject(error)
    }
  }else{
    resolve(x)
  }
}

const status = {
  PENGDING: 'PENGDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED'
}
class Promise {
  constructor(executor) {
    this.status = status.PENGDING
    this.value = undefined
    this.reason = undefined
    this.onFilFulledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.status === status.PENGDING) {
        this.status = status.RESOLVED
        this.value = value
        this.onFilFulledCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === status.PENGDING) {
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
  then (onFilFulled, onRejected) {
    onFilFulled = typeof onFilFulled === 'function' ? onFilFulled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
    let p = new Promise((resolve, reject) => {
      // setTimeout(() => {
        if (this.status === status.RESOLVED) {
          setTimeout(() => {
            try {
              let x = onFilFulled(this.value)
              resolvePromise(p,x,resolve,reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
          
        }
        if (this.status === status.REJECTED) {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p,x,resolve,reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
          
        }
        if (this.status === status.PENGDING) {
          this.onFilFulledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFilFulled(this.value)
                resolvePromise(p,x,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          })
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason)
                resolvePromise(p,x,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          })
        }
      // }, 0);
    })
    return p
  }
}

Promise.defer = Promise.deferred = function(){
  let dfd = {}
  dfd.promise = new Promise((resolve,reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise