function bigNumberAdd (num1, num2) {
  num1 = num1.split('').reverse().join('')
  num2 = num2.split('').reverse().join('')
  let res = ''
  let perSum = 0
  let i = 0,
    carry = 0
  while (num1[i] || num2[i] || carry) {
    perSum = (+num1[i] || 0) + (+num2[i] || 0) + carry
    res = '' + perSum % 10 + res
    carry = parseInt(perSum / 10)
    i++
  }
  return res
}

function moneyFormat (number) {
  let str = ('' + number).split('').reverse().join('')
  let res = ''
  for(let i = 0;i <str.length;i++){
    res = '' + str[i] + res
    if(i % 3 === 2 && i !== str.length - 1){
      res = ',' + res
    }
  }
  return res
}

// function fib(index) {
//   let pre1 = 1,pre2 = 1
//   if(index <= 2) return 1
//   let i = 3,cur = 0
//   while(i++ <= index) {
//     cur = pre1 + pre2
//     pre1 = pre2
//     pre2 = cur
//   }
//   return cur
// }

// Array.prototype._findLastIndex  = function (num) {
//   if(this.length <= 1) return num === this[0] ? 0 : -1
//   this.sort((a,b) => a-b)
//   let l = 0,r = this.length - 1,m = parseInt((l+r)/2)
//   if(this[l] > num || this[r] < num ) return -1
//   while(l < r) {
//     if(num > this[m]) {
//       l = m
//       m = parseInt((l+r)/2)
//     }else if(num < this[m]) {
//       r = m
//       m = parseInt((l+r)/2)
//     }else {
//       return m
//     }
//   }
//   return - 1
// } 
// ;console.log([1,2,3,5,5,5,10,20]._findLastIndex(11))

// console.log(111)

