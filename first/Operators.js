function _new () {
  // 1.创建一个新的对象
  let obj = {}
  // 2.将构造函数的作用域赋给新对象（因此this指向了这个新对象）
  let constructor = [].unshift.call(arguments)
  obj.__proto__ = constructor.prototype
  // 3.执行构造函数中的代码（为这个新对象添加属性)
  const result = constructor.apply(obj, arguments)
  // 4.返回新对象(如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象)
  if ((typeof result === 'object' && res !== null) || typeof result === 'function') {
    return result
  }
  result obj
}

function _new () {
  let obj = {}
  let constructor = [].unshift.call(arguments)
  obj.__proto__ = constructor.prototype
  let res = constructor.apply(obj, arguments)
  if((typeof res === 'object' && res !== null) || typeof res === 'function'){
    return res
  }
  return obj
}

function _new(Func, ...args) {
  
  // let obj = {};
  // obj.__proto__ = Func.prototype;
  // 创建一个Func的实例对象（实例.____proto____ = 类.prototype）
  let obj = Object.create(Func.prototype);
  
  // 把Func当做普通函数执行，并改变this指向
  let result = Func.call(obj, ...args);
  
  // 分析函数的返回值
  if (result !== null && /^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;
}


function _instanceof(instance,target) {
  // debugger
  let tarProType = target.prototype
  let insPro = instance.__proto__

  while(true) {
    if(insPro === null) return false // 找到原型链尽头
    if(insPro === tarProType) return true // 在原型链上
    insPro = insPro.__proto__
  }
}