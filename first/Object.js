Object._create = function (proto, protoOptions) {
  function F () { }
  F.prototype = proto
  let res = new F()
  for (let i in protoOptions) {
    res[i] = protoOptions[i]
  }
  return res
}

/* 
    Object内置对象里有几个静态方法, 用来限制对对象的扩展和配置.
    Object.preventExtension: 禁止对象添加属性
    Object.seal: 在对象上调用Object.preventExtension(...)并且把所有属性标记为configurable: false, 即不能给对象添加新属性, 也不能重新配置对象的所有属性
    Object.freeze: 在对象上调用Object.seal(...)并把所有属性标记为writable: false, 即"不能给对象添加属性, 也不能修改对象的属性值, 并且还不能重新配置该对象的所有属性, 基本上不能对该对象做任何事情".
*/


/*
  Object.freeze() 方法可以冻结一个对象。
  一个被冻结的对象再也不能被修改；
  冻结了一个对象则不能向这个对象添加新的属性，
  不能删除已有属性，
  不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。
  此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

*/
Object._freeze = function (obj) {
  Object.preventExtensions(obj)
  Object.getOwnPropertyNames(obj).forEach(key => {
    Object.defineProperty(obj, key, {
      writable: false,
      configurable: false
    })
  })
  return obj
}
// Object.seal()方法封闭一个对象，
// 阻止添加新属性并将所有现有属性标记为不可配置。
// 当前属性的值只要原来是可写的就可以改变。
Object._seal = function (obj) {
  Object.preventExtensions(obj)
  Object.getOwnPropertyNames(obj).forEach(key => {
    Object.defineProperty(obj, key, {
      configurable: false,
    })
  })
  return obj
}