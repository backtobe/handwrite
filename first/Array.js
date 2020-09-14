// class MyArray {
//   constructor() {
//     this.data = []
//     switch (arguments.length) {
//       case 0:
//         this.data = []
//         break
//       case 1:
//         if (typeof arguments[0] === 'number') {
//           this.data.length = arguments[0]
//         } else {
//           this.data = [arguments[0]]
//         }
//         break
//       default:
//         for (let i = 0; i < arguments.length; i++) {
//           this.data[i] = arguments[i]
//         }
//     }
//     return this.data
//   }
// }

// console.log(new MyArray('1', 2, 3))

// flat start
Array.prototype._flat = function (depth = 1) {
  // 数组扁平化
  if (!Array.isArray(this) || depth <= 0) {
    return this
  }
  return this.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return pre.concat(cur._flat(depth - 1))
    } else {
      return pre.concat(cur)
    }
  }, [])
}
console.log([1, 2, [3, 4, [5]]]._flat(2))
// flat end

// filter start
Array.prototype._filter = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须为函数')
  }
  let arr = []
  this.forEach(item => fn(item) && arr.push(item))
  return arr
}
console.log([1, 2, 3, 4]._filter(item => item > 2))
// filter end

// map start
Array.prototype._map = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须为函数')
  }
  let arr = []
  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this))
  }
  return arr
}
console.log([1, 2, 3, 4]._map(item => {console.log(item > 2)}))
// map end

// forEach start
Array.prototype._forEach = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须为函数')
  }
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this)
  }
}
let arr = []
  ;[1, 2, 3, 4]._forEach(item => {
    if (item > 2) {
      arr.push(item)
    }
  })
console.log(arr)
// forEach end

// 修改原数组 start
// push start
Array.prototype._push = function (element) {
  this[this.length] = element
  return this.length
}
console.log([1, 3]._push(4))
// push end

// pop start
Array.prototype._pop = function () {
  let res = this[this.length - 1]
  this.length = this.length - 1
  return res
}
console.log([1, 3]._pop())
// pop end

// unshift start
Array.prototype._unshift = function () {
  const argLen = arguments.length
  if (argLen === 0) return this.length
  this.length = this.length + argLen
  for (let i = this.length - 1; i >= 0; i--) {
    if (i < argLen) {
      this[i] = arguments[i]
    } else {
      this[i] = this[i - argLen]
    }
  }
  return this.length
}
let arr2 = [1, 2]
console.log(arr2._unshift())
console.log(arr2)
// unshift end

// shift start
Array.prototype._shift = function () {
  if (this.length === 0) return undefined
  let res = this[0]
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1]
  }
  this.length = this.length - 1
  return res
}
let shiftArr = [1, 2, 3, 5]
console.log(shiftArr._shift())
console.log(shiftArr)
// shift end

// reverse start
Array.prototype._reverse = function () {
  for (let i = 0; i < Math.floor(this.length / 2); i++) {
    [this[i], this[this.length - 1 - i]] = [this[this.length - 1 - i], this[i]]
  }
  return this
}
console.log([]._reverse())
// reverse start
// 修改原数组 end

// join start
Array.prototype._join = function (separator) {
  if (separator === undefined) {
    separator = ','
  } else if (separator === null) {
    separator = 'null'
  }
  let str = ''
  for (let i = 0; i < this.length; i++) {
    if (i === 0) {
      str += this[i]
    } else {
      str += separator + this[i]
    }
  }
  return str
}
// join end

// concat
// Array.prototype._concat = function (){
//   if(arguments.length === 0) return this
//   const length = this.length
//   this.length = this.length + arguments.length
//   for(let i = length;i<this.length;i++){
//     this[i] = 
//   }
  
// }

function mergeOrderArray (arr1,arr2) {
  if(arr1.length === 0) return arr2
  if(arr2.length === 0) return arr1
  let arr = []
  let i = 0,j = 0
  while(arr1[i] !== undefined || arr2[j] !== undefined) {
    if(arr1[i] === undefined) {
      arr.push(arr2[j++])
    }
    if(arr2[j] === undefined) {
      arr.push(arr1[i++])
    }
    if(arr1[i] > arr2[j]){
      arr.push(arr2[j++])
    }else if( arr1[i] < arr2[j]) {
      arr.push(arr1[i++])
    }else {
      arr.push(arr1[i++],arr2[j++])
    }
  }
  return arr
}


console.log(mergeOrderArray([1,2,3],[]))
