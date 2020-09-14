/*
  1、创建一个新对象；
  2、将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
  3、执行构造函数中的代码（为这个新对象添加属性）
  4、返回新对象。
*/

function _new (Func,...arg) {
  // 1、使用Object.create
  const obj = Object.create(Func.prototype)
  // 2、使用直接创建字面量对象
  // const obj = {}
  // obj.__proto__ = Func.prototype
  const res = Func.call(obj,...arg)
  if(typeof !== null && typeof res === 'object' || typeof res === 'function' ) {
    return res
  }
  return obj
}

function _instanceof (instance,target) {
  let proto = instance.__proto__
  let targetProtoType = target.prototype
  while(true) {
    if(proto === null) return false
    if(proto === targetProtoType) return true
    proto = proto.__proto__
  }
}

