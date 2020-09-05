function debounce (fn, second = 200) {
  // 最后一次触发
  let timer = null
  return function () {
    if(timer){
      clearTimeout(timer)
    }
    setTimeout(fn, second);
  }
}

function throttle (fn,second){
  // 一段时间只触发一次
  let enable = true
  return function (){
    if(!enable){
      return false
    }
    enable = false
    setTimeout(() => {
      enable = true
      fn()
    },second)
  }
}