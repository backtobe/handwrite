Array.prototype._flat = function (depth = 1) {
  if(!Array.isArray(this) || depth <= 0) return this
  return this.reduce((pre,cur) => {
    if(Array.isArray(cur)) return [...pre,...cur._flat(depth - 1)]
    return [...pre,cur]
  },[])
}
