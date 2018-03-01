import { getColor, getDiagramDefaultProps } from '@utils/theme'
import { sortLinesByValue, timeFormat } from '@utils'

export default function productCountData (origin) {
  // 如果有数据
    var _dataset = []
    var points=[]
    if (origin && origin.length) {
      origin.forEach((line, i) => {
          points.push([line.Name, line.TotalCount])
      })
    _dataset.push({
      label: "访问量",
      points: points
    })
  }

  _dataset = sortLinesByValue(_dataset)
  _dataset.forEach((line,i) => {
    line.maxcolors= getColor(i)
    line.mincolors = getColor(i+1)
  })
  let _props = getDiagramDefaultProps()
  _props.dataset = _dataset
  return _props
}
