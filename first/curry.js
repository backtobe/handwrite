function curry01 (fn) {
  // 第一版 实现固定参数的柯里化
  let args = [].slice.call(arguments, 1)
  return function () {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

let add = (a, b) => a + b
let curAdd = curry01(add,1,3)
console.log(curAdd())
