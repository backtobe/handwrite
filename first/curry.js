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

function add() {
  const arg1 = [].slice.call(arguments)
  function fn() {
    const arg2 = arg1.concat([].slice.call(arguments))
    return add.apply(null, arg2)
  }
  fn.toString = function () {
    return arg1.reduce((pre, cur) => pre + cur)
  }
  return fn
}
add(1)(2)(3)