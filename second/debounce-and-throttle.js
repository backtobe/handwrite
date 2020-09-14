function debounce (fn,delay,...arg) {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,arg)
    },delay)
  }
}

function throttle (fn,delay,...arg) {
  let enable = true
  return function () {
    if(!enable) {
      return false
    }
    enable = false
    setTimeout(() => {
      enable = true
      fn.apply(this,arg)
    },delay)
  }
}