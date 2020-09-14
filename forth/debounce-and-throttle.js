function debounce ( fn, delay = 200, immediate = false) {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this)
    },delay)
  }
}

function throttle ( fn, delay = 200) {
  let enable = true
  return function () {
    !enable && return false
    enable = false
    setTimeout(() => {
      enable = true
      fn.call(this)
    },delay)
  }
}