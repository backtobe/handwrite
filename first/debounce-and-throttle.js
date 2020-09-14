function debounce (fn, second = 1000,immediate = false,...arg) {
  // 最后一次触发
  let timer
  return function () {
    timer && clearTimeout(timer)
    if (immediate && !timer) {
      fn.apply(this, arg)
      timer = setTimeout(() => {
        clearTimeout(timer)
      })
    } else {
      timer = setTimeout(() => { 
        fn.apply(this, arg)
      }, second);
    }
  }
}
function debounce1 (fn, second = 1000,...arg) {
  // 最后一次触发
  let timer
  return function () {

    timer && clearTimeout(timer)
    timer = setTimeout(() => { fn.apply(this, arg) }, second);
  }
}

function throttle (fn, second = 200,...arg) {
  // 一段时间只触发一次
  let enable = true
  return function () {
    if (!enable) {
      return false
    }
    enable = false
    setTimeout(() => {
      enable = true
      fn.apply(this, arg)
    }, second)
  }
}