

// 世界地区
const themeColors = ['#FF5000', '#FF8800', '#FFED00', '#92FFB0', '#6DBAFF', '#BF95FF']

// 中国地图上气泡的渐变色
const popBallColors = [
  ['#FF4300', '#FFB989'], // 0为深色、1为浅色
  ['#E77C05', '#FFDFBB'],
  ['#E7D705', '#FFFCD9'],
  ['#68C084', '#E8FFEF'],
  ['#64A9EB', '#D5E6FF'],
  ['#AE88EB', '#EFE6FF']
]

/**
* 中国地图热点颜色梯度
*/
export function getAllThemeColors () {
  return popBallColors
}

export function getChinaMapStepInfo (value) {
  if (value > 30000) {
    return {
      level: 0,
      color: popBallColors[0],
      r: 65, // 外圆直径
      r0: 34  // 内圆直径
    }
  } else if (value > 15000) {
    return {
      level: 1,
      color: popBallColors[1],
      r: 55,
      r0: 22
    }
  } else if (value > 5000) {
    return {
      level: 2,
      color: popBallColors[2],
      r: 45,
      r0: 15
    }
  } else if(value > 1000) {
    return {
      level: 3,
      color: popBallColors[3],
      r: 35,
      r0: 12
    }
  } else if(value > 100) {
    return {
      level: 4,
      color: popBallColors[4],
      r: 25,
      r0: 8
    }
  } else {
    return {
      level: 5,
      color: popBallColors[5],
      r: 15,
      r0: 5
    }
  }
}

/**
* 世界地图颜色梯度分布
* step: 0-50  ，50-100，100-200，200以上
*/
export function getWorldMapStepInfo (value) {
  if (value > 200) {
    return {
      color: themeColors[0]
    }
  } else if (value > 100) {
    return {
      color: themeColors[1]
    }
  } else if (value > 50) {
    return {
      color: themeColors[2]
    }
  } else {
    return {
      color: themeColors[3]
    }
  }
}

/**
* 柱状图diagram默认属性
*/
export function getDiagramDefaultProps () {
  return {
    type: 'curveCardinal',
    axisXBaseLine: true,
    axisYBaseLine: true,
    axisXLength: 5,
    axisYLength: 5,
    dataset: [],
    axisTitle: {
      x: '',
      y: ''
    }
  }
}

/**
* 柱状图中的六个颜色梯度
*/
export function getColor (i) {
  const colors = [
    ['#FFE300', '#FF5C00'],
    ['#3CA2FF', '#005CFF'],
    ['#FF67A7', '#B7001B'],
    ['#D3FF86', '#2A9300'],
    ['#D980FF', '#9600E2'],
    ['#29D1FF', '#00AFD0']
  ]
  if (i >= colors.length) {
    i = i % colors.length
  }
  return colors[i]
}
// 中国地图中，根据地名长度，确定显示的样式
export function getTextAttrs (text) {
  const textLength = text.length
  if (textLength === 2) {
    return [{
      dx: -12,
      dy: -24,
      textLength: 24,
      fontSize: 12,
      name: text
    }]
  } else if (textLength === 3) {
    return [{
      dx: -13,
      dy: -26,
      textLength: 26,
      fontSize: 9,
      name: text
    }]
  } else {
    return [{
      dx: -10,
      dy: -30,
      textLength: 20,
      fontSize: 9,
      name: text.substr(0, 2)
    }, {
      dx: -10,
      dy: -20,
      textLength: 20,
      fontSize: 9,
      name: text.substr(2, 2)
    }]
  }
}