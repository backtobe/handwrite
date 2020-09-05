function deepClone (obj) {
  if (typeof obj !== 'object' || obj === null) return obj // 简单类型直接返回
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  let newObj = new obj.constructor // 调用原型上的构造器
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = deepClone(obj[i])
    }
  }
  return newObj
}
let obj = {
  a: 1,
  b: '1',
  c: true,
  d: undefined,
  e: null,
  f: { prop: 1 },
  g: [1, 2, 3],
  h: /^\d/g,
  i: new Date(),
  j() {
    console.log('test')
  }
}
let newObj = deepClone(obj)
newObj.j = function () {
  console.log('deep clone')
}
newObj.j()
obj.j()
console.log(obj,newObj)