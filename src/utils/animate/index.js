/**
* 数组增长动效
*/
export function countUpAnimate (elem, endVal, startVal, duration, decimal, digit, callback) {  
  //传入参数依次为 数字要变化的元素，最终显示数字，数字变化开始值，变化持续时间，小数点位数, 数字的总位数, 回调函数
  var startTime = 0;
  var dec = Math.pow(10, decimal);
  var progress,value;
  function startCount(timestamp) {
    if(!startTime) startTime = timestamp
    progress = timestamp - startTime
    value = startVal + (endVal - startVal) * (progress / duration)
    value = (value > endVal) ? endVal : value
    value = Math.floor(value*dec) / dec
    value = value.toFixed(decimal)
    value = countCompletion(value)
    if (elem) {
      elem.innerHTML = value
    }
    callback(value)
    progress < duration && requestAnimationFrame(startCount)
  }
  // 补全数字的所有位数（前面添加若干个零）
  function countCompletion (count) {
    var length = count.length
    if (length < digit) {
      var prefix = ''
      for (var i = length; i < digit; i++) {
        prefix += '0'
      }
      return prefix + count
    }
    return count
  }
  requestAnimationFrame(startCount)
}