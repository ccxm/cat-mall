// 监听屏幕的变化
export default (function (doc, win) {
  const docEl = doc.documentElement
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    const recalc = function () {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      console.log(clientWidth)
      docEl.style.fontSize = 32 * (clientWidth / 1920) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
