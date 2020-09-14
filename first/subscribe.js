class subscribe {
  constructor() {
    this.ponds = [] // 初始化时间池
  }
  // 向事件池追加方法
  add (fn) {
    if (typeof fn !== 'function') return false // 校验是否为函数
    if (this.ponds.some(item => item === fn)) return true // 去重
    this.ponds.push(fn)
  }
  remove (fn) {
    for (let i = 0; i < this.ponds.length; i++) {
      if (this.ponds[i] === fn) {
        // this.ponds.splice(i, 1)
        // i--
        this.ponds[i] = null
        break
      }
    }
  }
  fire () {
    let args = [].slice.call(arguments)
    for (let i = 0; i < this.ponds.length; i++) {
      if(this.ponds[i] === null) {
        this.ponds.splice(i,1)
        i--
        continue
      }
      let fn = this.ponds[i]
      fn.apply(this, args);
    }
  }
}