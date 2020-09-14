function debounce (fn, delay,...arg) {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

function throttle (fn, delay, ...arg) {
  let enable
  return function () {
    if(!enable) return false
    enable = true
    setTimeout(() => {
      enable = false
      fn.apply(this, arg)
    },delay)
  }
}