Function.prototype._call = function (context) {
  // 1.context 存在就使用 context，否则是 window
  context = context ? Object(context) : window
  // 2.使用 Object(context) 将 context 转换成对象，并通过 context.fn 将 this 指向 context
  context.fn = this
  // 3.循环参数，注意从 1 开始，第 0 个是上下文，后面才是我们需要的参数
  let args = []
  for (let i = 1; i < arguments.length; i++) {
    // 4.将参数字符串 push 进 args
    args.push(`arguments${i}`)
  }
  // 5.字符串和数组拼接时，数组会调用 toString 方法，这样可以实现将参数一个个传入，并通过 eval 执行
  const res = eval(`context.fn(${args})`)
  // 6.拿到结果返回前，删除掉 fn
  delete context.fn
  return res
}