/**
* create by gms_smg@163.com
* @params container
*/


/**
* 通过path创建指定起始点、起始弧度的标准圆弧
*/
export function createCircleByPath (container, options ) {
  var {
      id: _id,
      centerX: _centerX,
      centerY: _centerY,
      radius: _radius,
      startAngle: _startAngle,
      endAngle: _endAngle,
      stroke: _stroke,
      sweepFlag: _sweepFlag  // 0-顺时针,1-逆时针
  } = options
  var x = _centerX + Math.cos(_startAngle * Math.PI / 180) * _radius
  var y = _centerY - Math.sin(_startAngle * Math.PI / 180) * _radius
  // 终点坐标
  var x0 = _centerX + Math.cos(_endAngle * Math.PI / 180) * _radius
  var y0 = _centerY - Math.sin(_endAngle * Math.PI / 180) * _radius
  // 起点坐标
  var largeArcFlag  = Math.abs(_endAngle - _startAngle) > 180 ? 1 : 0 // 是否为大弧 0小弧度 1大弧度
  //path 属性
  var descriptions = ['M', x, y, 'A', _radius, _radius, 0, largeArcFlag, _sweepFlag, x0, y0];

  var path = container.append('path')
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('stroke', () => {
      return _stroke || '#fff'
    })
    .attr('id', () => {
      return _id || ''
    })
    .attr('d', () => {
      return descriptions.join(' ')
    })
  return path
}


/**
* 创建渐变
*/
export function gradientCreate (defs) {
  const { type = 'linearGradient', id = '', container = {} , attrs = {}, stops = [] } = defs

  let gradient = container.append('defs')
                          .append(type)
                          .attr('id', id)
  // 添加渐变节点的属性
  Object.keys(attrs).forEach((key) => {
    gradient.attr(key, attrs[key])
  })
  // 添加stop
  stops.forEach((stop) => {
    var stp = gradient.append('stop')
    Object.keys(stop).forEach(key => {
      stp.attr(key, stop[key])
    })
  })
}
