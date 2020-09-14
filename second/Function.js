Function.prototype._bind = function (context, ...arg) {
  if (typeof this !== 'function') {
    return throw TypeError('Bind must be called on a function ')
  }
  context = context || window
  const self = this
  return function F () {
    if (this instanceof F) {
      return new self(...arg, ...arguments)
    }
    return self.call(context, ...arg, ...arguments)
  }
}

Function.prototype._apply = function (context, arg) {
  if (typeof this !== 'function') {
    return throw TypeError('apply must be called on a function ')
  }
  context = context || window
  context.fn = this
  const res = context.fn(...arg)
  delete context.fn
  return res
}
Function.prototype._call = function (context, ...arg) {
  if (typeof this !== 'function') {
    return throw TypeError('call must be called on a function ')
  }
  context = context || window
  context.fn = this
  const res = context.fn(...arg)
  delete context.fn
  return res
}