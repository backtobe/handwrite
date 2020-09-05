Function.prototype._apply = function (context,args) {
  // 1.apply 无需循环参数列表，传入的 args 就是数组
  // 2.但是 args 是可选参数，如果不传入的话，直接执行
  context = context ? Object(context) : window
  context.fn = this
  if(!args){
    return context.fn()
  }
  let res = eval(`context.fn(${args})`)
  delete context.fn
  return res
}