function _new(){
  // 1.创建一个新的对象
  let obj = {}
  // 2.将构造函数的作用域赋给新对象（因此this指向了这个新对象）
  let constructor = [].unshift.call(arguments)
  obj.__proto__ = constructor.prototype
  // 3.执行构造函数中的代码（为这个新对象添加属性)
  const result = constructor.apply(obj,arguments)
  // 4.返回新对象(如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象)
  if((typeof result === 'object' && res !== null) || typeof result === 'function'){
    return result
  }
  result obj
}