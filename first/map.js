class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
  }
}
class Map {
  constructor() {
    console.log('Map')
    this.data = []
  }
  put (key, val) {
    const hasFlag = this.data.some(node => {
      if (node.key === key) {
        node.val = val
        return true
      }
    })
    if (!hasFlag) {
      this.data.push(new Node(key, val))
    }
  }
  has (key) {
    return this.data.some(node => node.key === key)
  }
  get (key) {
    this.data.forEach(node => {
      if (node.key === key) {
        return node.val
      }
    })
    return undefined
  }
  containsVal(val){
    return this.data.some(node => node.val === val)
  }
  containsKey(key){
    return this.data.some(node => node.key === key)
  }
  element(index){
    if(index<0 || index >=this.data.length) return undefined
    return this.data[index]
  }
  remove (key) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].key === key) {
        this.data.splice(i, 1)
        break
      }
    }
  }
  isEmpty(){
    return !this.data.length
  }
  size(){
    return this.data.length
  }
  clear(){
    this.data = []
  }
  values(){
    return this.data.map(node => node.val)
  }
  keys(){
    return this.data.map(node => node.key)
  }
}