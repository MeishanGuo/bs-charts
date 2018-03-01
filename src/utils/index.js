/*
* 获得指定长度的随机字符串
*/
export function getRandomKey (len) {
  return Math.random().toString(36).substr(2, 2 + len)
}

/**
* 将图表数据按照数据量的大小排序
*/
export function sortLinesByValue (dataset) {
  if (dataset.length <= 1) {
    return dataset
  } else {
    return dataset.sort((a, b) => {
      var aMax = Math.max.apply(null, getValuesFromArray(a))
      var bMax = Math.max.apply(null, getValuesFromArray(b))
      return bMax - aMax
    })
  }
}
/**
* 获得线性表中的value集合
*/
function getValuesFromArray (line) {
  return line.points.map(p => {
    return p[1]
  })
}
/**
* 出来曲线图中的横坐标时间格式
*/
export function timeFormat (timeStr) {
  if (timeStr.indexOf('_') != -1) {
    return timeStr.split('_')[1]
  } else {
    return timeStr
  }
}